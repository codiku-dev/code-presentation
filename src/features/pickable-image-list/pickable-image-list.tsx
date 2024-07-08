import { PickableImage } from "@/types/slide.types";
import { cx } from "class-variance-authority";
import { useDraggable } from "@dnd-kit/core";

const PICKABLE_IMAGES: { filePath: string }[] = [
  { filePath: "/public/point_left.png" },
  { filePath: "/public/point_up.png" },
  { filePath: "/public/point_right.png" },
  { filePath: "/public/point_down.png" },
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
    <div className="flex flex-col bg-primaryrounded-md ">
      <div
        ref={setNodeRef1}
        style={style1}
        {...listeners1}
        {...attributes1}
        key={PICKABLE_IMAGES[0].filePath}
        onClick={() => {}}
        className={cx(" cursor-pointer flex flex-center  ")}
      >
        <img src={PICKABLE_IMAGES[0].filePath} width={100} height={100} />
      </div>
      <div
        ref={setNodeRef2}
        style={style2}
        {...listeners2}
        {...attributes2}
        key={PICKABLE_IMAGES[1].filePath}
        onClick={() => {}}
        className={cx(" cursor-pointer flex flex-center  ")}
      >
        <img src={PICKABLE_IMAGES[1].filePath} width={100} height={100} />
      </div>
    </div>
  );
}
