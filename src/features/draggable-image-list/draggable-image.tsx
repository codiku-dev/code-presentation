import { cn } from "@/utils";
import { useDraggable } from "@dnd-kit/core";
export function DraggableImage(p: {
  id: string;
  imgHref: string;
  className?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform,
  } = useDraggable({
    id: p.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={draggableRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        " rounded-md  hover:bg-indigo-400/20 w-20 h-20",
        p.className
      )}
    >
      <img src={p.imgHref} className="w-full h-full cursor-pointer" />
    </div>
  );
}
