import { useSlidesStore } from "@/store/use-slides-store";
import { DraggableImageT } from "@/types/slide.types";
import { cn } from "@/utils";
import { useDroppable } from "@dnd-kit/core";
import { Minus, Square, X } from "lucide-react";
import { useRef } from "react";
import { DraggableImage } from "../draggable-image-list/draggable-image";
import { DraggableImageList } from "../draggable-image-list/draggable-image-list";

export function DroppableSlideLayout(p: {
  children: React.ReactNode;
  isPreviewMode: boolean;
  selectedImage?: DraggableImageT;

}) {
  const { updateCurrentSlideFilename, deleteImageFromCurrentSlide, getCurrentSlide } = useSlidesStore()
  const currentSlide = getCurrentSlide()
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const refLayout = useRef<HTMLDivElement>(null);

  const renderDraggedImageList = () => {
    return currentSlide.imageList.map((image, index) => {
      return (
        <div
          //className={cx(p.isPreviewMode && "animate-fadeIn")}
          key={image.id}
          style={{
            position: "absolute",
            width: 100,
            height: 100,
            top: Number(image.y),
            left: Number(image.x),
          }}
          onContextMenu={(e) => {
            if (!p.isPreviewMode) {
              e.preventDefault();
              deleteImageFromCurrentSlide(image);
            }
          }}
        >
          <DraggableImage
            key={image.id}
            id={image.id}
            className={"hover:bg-transparent cursor-auto"}
            imgHref={new URL(image.filePath, import.meta.url).href}
          />
        </div>
      );
    });
  };
  const header = (
    <div className="relative flex ">
      <div className="absolute left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
        {p.isPreviewMode ? (
          <div className="text-center">{currentSlide.fileName}</div>
        ) : (
          <input
            value={currentSlide.fileName}
            onChange={(e) => {
              updateCurrentSlideFilename(e.target.value);
            }}
            className="focus:text-white text-center bg-transparent border-NONE"
            placeholder="todo.tsx"
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

  const droppableSection = (
    <div
      ref={setNodeRef}
      className={cn(
        "relative h-[90vh] min-w-[70vw]",
        isOver && "bg-purple-300/10"
      )}
    >
      {p.children}
      {renderDraggedImageList()}
    </div>
  );

  const emojiList = (
    <div className="fixed top-1/2 right-5 transform -translate-y-1/2 bg-black/5 group rounded-sm">
      {/* <div className="opacity-0 rounded-sm group-hover:visible group-hover:opacity-100 group"> */}
      <div className="">{!p.isPreviewMode && <DraggableImageList />}</div>
      {/* </div> */}
    </div>
  );
  return (
    <div className="">
      <div
        ref={refLayout}
        className={cn(
          "  rounded-md  border-2 border-gray-700 p-4 text-white overflow-x-hidden ",
          p.isPreviewMode ? "bg-black/60" : "bg-primary"
        )}
      >
        {header}
        {droppableSection}
      </div>

      {currentSlide && emojiList}
    </div>
  );
}
