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

  return (
    <div
      ref={droppableSectionRef}
      className={cn(
        "h-full w-full ",
        isOverdroppableSection && "bg-purple-300/10"
      )}
    >
      <SlideInput ref={p.slideInputRef} />
    </div>
  );
};
