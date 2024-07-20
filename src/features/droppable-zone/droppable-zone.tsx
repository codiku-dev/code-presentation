import { cn } from "@/utils";
import { useDroppable } from "@dnd-kit/core";
import { SlideInput } from "../slide-input/slide-input";
import { useSlidesStore } from "@/store/use-slides-store";
import { DraggableImage } from "../draggable-image-list/draggable-image";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";

export const DroppableZone = (p: {
  slideInputRef: React.RefObject<ReactCodeMirrorRef>;
}) => {
  const { deleteImageFromCurrentSlide, getCurrentSlide, isPreviewMode } =
    useSlidesStore();
  const currentSlide = getCurrentSlide();

  const { isOver: isOverdroppableSection, setNodeRef: droppableSectionRef } =
    useDroppable({
      id: "droppable",
    });

  const renderDraggedImageList = () => {
    return currentSlide.imageList.map((image) => {
      return (
        <div
          key={image.id}
          style={{
            position: "absolute",
            width: 100,
            height: 100,
            top: Number(image.y),
            left: Number(image.x),
          }}
          onContextMenu={(e) => {
            if (!isPreviewMode) {
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

  return (
    <div
      ref={droppableSectionRef}
      className={cn(
        "h-full w-full ",
        isOverdroppableSection && "bg-purple-300/10"
      )}
    >
      <SlideInput ref={p.slideInputRef} />
      {renderDraggedImageList()}
    </div>
  );
};
