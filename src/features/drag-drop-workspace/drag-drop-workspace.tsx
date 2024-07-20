import { useSlidesStore } from "@/store/use-slides-store";
import { cn } from "@/utils";
import { Minus, Square, X } from "lucide-react";
import { RefObject, useState } from "react";
import { DraggableImageList } from "../draggable-image-list/draggable-image-list";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { SlidePreview } from "../slide-preview/slide-preview";
import { DroppableZone } from "../droppable-zone/droppable-zone";
export function DragDropWorkspace(p: {
  slideInputFileNameRef: RefObject<HTMLInputElement>;
  slideInputRef: RefObject<ReactCodeMirrorRef>;
}) {
  const {
    updateCurrentSlideFilename,
    getCurrentSlide,
    setIsFileNameInputFocused,
    isPreviewMode,
  } = useSlidesStore();
  const currentSlide = getCurrentSlide();

  const renderHeader = () => (
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
      {!isPreviewMode && <DraggableImageList />}
    </div>
  );
  return (
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
              {renderHeader()}
              <div className="relative h-[90vh] min-w-[70vw]">
                {isPreviewMode ? (
                  <SlidePreview />
                ) : (
                  <DroppableZone slideInputRef={p.slideInputRef} />
                )}
              </div>
            </div>

            {currentSlide && emojiList}
          </div>
        )}
      </div>
    </div>
  );
}
