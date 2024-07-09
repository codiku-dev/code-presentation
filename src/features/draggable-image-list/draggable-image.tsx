import { useDraggable } from "@dnd-kit/core";
import { cx } from "class-variance-authority";
export function DraggableImage(p: { id: string; imgHref: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
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
      className={cx(" cursor-pointer rounded-md")}
    >
      <img src={p.imgHref} width={100} height={100} />
    </div>
  );
}
