import { DraggableImageT, Slide } from "@/types/slide.types";
import { cx } from "class-variance-authority";
import { Minus, Square, X } from "lucide-react";
import { DragEndEvent, useDroppable } from "@dnd-kit/core";
import { DraggableImage } from "../draggable-image-list/draggable-image";
import { useRef } from "react";
import { DraggableImageList } from "../draggable-image-list/draggable-image-list";
import { cn } from "@/utils";

export function DroppableSlideLayout(p: {
  children: React.ReactNode;
  isPreviewMode: boolean;
  slide: Slide;
  onChangeFilename: (filename: string) => void;
  onPickLocationForImage: (image: DraggableImageT) => void;
  selectedImage?: DraggableImageT;
  onRightClickPickableImage: (image: DraggableImageT) => void;
  onDropImage: (event: DragEndEvent) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const refLayout = useRef<HTMLDivElement>(null);

  const renderDraggedImageList = () => {
    return p.slide.imageList.map((image, index) => {
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
              p.onRightClickPickableImage(image);
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
          <div className="text-center">{p.slide.fileName}</div>
        ) : (
          <input
            value={p.slide.fileName}
            onChange={(e) => {
              p.onChangeFilename(e.target.value);
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

      {p.slide && emojiList}
    </div>
  );
}
