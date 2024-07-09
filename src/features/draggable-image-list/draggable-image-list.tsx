import { DraggableImage } from "./draggable-image";

export const DRAGGABLE_IMAGES: { filePath: string }[] = [
  { filePath: "/point_left.png" },
  { filePath: "/point_up.png" },
];
export function DraggableImageList() {
  return (
    <div className="rounded-md hover:animate-fadeIn03">
      {DRAGGABLE_IMAGES.map((image) => (
        <DraggableImage
          key={image.filePath}
          id={image.filePath}
          imgHref={new URL(image.filePath, import.meta.url).href}
        />
      ))}
    </div>
  );
}
