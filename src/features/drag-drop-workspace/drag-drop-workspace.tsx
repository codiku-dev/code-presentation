import { useSlidesStore } from "@/store/use-slides-store";
import { cn } from "@/utils";
import { Minus, Square, X } from "lucide-react";
import { RefObject } from "react";
import { DraggableImageList } from "../draggable-image-list/draggable-image-list";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { SlidePreview } from "../slide-preview/slide-preview";
import { DroppableZone } from "../droppable-zone/droppable-zone";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
import { v4 as uuidv4 } from "uuid";
export function DragDropWorkspace(p: {
  slideInputFileNameRef: RefObject<HTMLInputElement>;
  slideInputRef: RefObject<ReactCodeMirrorRef>;
}) {
  const {
    updateCurrentSlideFilename,
    getCurrentSlide,
    setIsFileNameInputFocused,
    isPreviewMode,
    updateCurrentSlideImageList,
  } = useSlidesStore();
  const currentSlide = getCurrentSlide();

  const dropImage = (event: DragEndEvent) => {
    console.log(event.over);
    if (currentSlide && event.over?.id === "droppable") {
      // If the id is coming from the list of images, we add it to the current slide
      if (event.active.id.toString().startsWith("/")) {
        // add new image to the current slide
        const droppableRect = event.over.rect;
        const mouseX = event.active.rect.current.translated?.left;
        const mouseY = event.active.rect.current.translated?.top;
        const relativeXToDroppable = mouseX! - droppableRect.left;
        const relativeYToDroppable = mouseY! - droppableRect.top;

        updateCurrentSlideImageList([
          ...currentSlide.imageList,
          {
            id: uuidv4(),
            filePath: event.active.id.toString(),
            x: relativeXToDroppable,
            y: relativeYToDroppable,
          },
        ]);
      } else {
        // Just moving the image using the delta
        const imageIndexToUpdate = currentSlide.imageList.findIndex(
          (img) => img.id == event.active.id.toString()
        );

        const imageToUpdate = currentSlide.imageList[imageIndexToUpdate];
        const updatedImageList = [...currentSlide.imageList];

        updatedImageList[imageIndexToUpdate] = {
          ...imageToUpdate,
          x: imageToUpdate.x! + event.delta.x,
          y: imageToUpdate.y! + event.delta.y,
        };

        updateCurrentSlideImageList(updatedImageList);
      }
    }
  };

  const header = (
    <div className="relative flex ">
      <div className="absolute left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
        {isPreviewMode ? (
          <div className="text-center">{currentSlide.fileName}</div>
        ) : (
          <input
            ref={p.slideInputFileNameRef}
            value={currentSlide.fileName}
            onChange={(e) => {
              updateCurrentSlideFilename(e.target.value);
            }}
            className="focus:text-white text-center bg-transparent border-NONE"
            placeholder="todo.tsx"
            onBlur={() => {
              setIsFileNameInputFocused(false);
            }}
            onFocus={() => {
              setIsFileNameInputFocused(true);
            }}
          />
        )}
      </div>
      <div className="flex gap-2 ml-auto items-center justify-center">
        <Minus className="text-gray-600" size={14} />
        <Square className="text-gray-600" size={14} />
        <X className="text-gray-600" size={14} />
      </div>
    </div>
  );

  const emojiList = (
    <div className="fixed top-1/2 right-5 transform -translate-y-1/2 bg-black/5 group rounded-sm">
      <div className="">{!isPreviewMode && <DraggableImageList />}</div>
    </div>
  );
  return (
    <DndContext
      modifiers={[restrictToWindowEdges, snapCenterToCursor]}
      collisionDetection={pointerWithin}
      onDragEnd={dropImage}
    >
      <div className="flex gap-2 h-full">
        <div className="w-full gap-12 pt-12 overflow-y-hidden flex-center">
          {currentSlide && (
            <div>
              <div
                className={cn(
                  "rounded-md  border-2 border-gray-700 p-4 text-white overflow-x-hidden ",
                  isPreviewMode ? "bg-black/60" : "bg-primary"
                )}
              >
                {header}
                {isPreviewMode ? (
                  <SlidePreview />
                ) : (
                  <DroppableZone slideInputRef={p.slideInputRef} />
                )}
              </div>

              {currentSlide && emojiList}
            </div>
          )}
        </div>
      </div>
    </DndContext>
  );
}
