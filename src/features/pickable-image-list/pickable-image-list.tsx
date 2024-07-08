import { PickableImage } from "@/types/slide.types";
import { cx } from "class-variance-authority";
import { useDraggable } from "@dnd-kit/core";

const PICKABLE_IMAGES: { filePath: string }[] = [
  { filePath: "../../assets/point_left.png" },
  { filePath: "../../assets/point_up.png" },
];
export function PickableImageList(p: { selectedImage?: PickableImage }) {
  const {
    attributes: attributes1,
    listeners: listeners1,
    setNodeRef: setNodeRef1,
    transform: transform1,
  } = useDraggable({
    id: PICKABLE_IMAGES[0].filePath,
  });
  const {
    attributes: attributes2,
    listeners: listeners2,
    setNodeRef: setNodeRef2,
    transform: transform2,
  } = useDraggable({
    id: PICKABLE_IMAGES[1].filePath,
  });

  const style1 = transform1
    ? {
        transform: `translate3d(${transform1.x}px, ${transform1.y}px, 0)`,
      }
    : undefined;

  const style2 = transform2
    ? {
        transform: `translate3d(${transform2.x}px, ${transform2.y}px, 0)`,
      }
    : undefined;

  return (
    <div className="rounded-md">
      <div
        ref={setNodeRef1}
        style={style1}
        {...listeners1}
        {...attributes1}
        key={PICKABLE_IMAGES[0].filePath}
        className={cx(" cursor-pointer  hover:bg-primary rounded-md")}
      >
        <img
          src={new URL(PICKABLE_IMAGES[0].filePath, import.meta.url).href}
          width={100}
          height={100}
        />
      </div>
      <div
        ref={setNodeRef2}
        style={style2}
        {...listeners2}
        {...attributes2}
        key={PICKABLE_IMAGES[1].filePath}
        onClick={() => {}}
        className={cx(" cursor-pointer hover:bg-primary rounded-md  ")}
      >
        <img
          src={new URL(PICKABLE_IMAGES[1].filePath, import.meta.url).href}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
