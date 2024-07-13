import { cn } from "@/utils";
import { useDraggable } from "@dnd-kit/core";
import { cx } from "class-variance-authority";
export function DraggableImage(p: {
  id: string;
  imgHref: string;
  className?: string;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: p.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        " cursor-pointer rounded-md  hover:bg-indigo-400/20 w-20 h-20",
        p.className
      )}
    >
      <img src={p.imgHref} className="w-full h-full" />
    </div>
  );
}
