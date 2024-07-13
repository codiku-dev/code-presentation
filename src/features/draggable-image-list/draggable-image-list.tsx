import { DraggableImage } from "./draggable-image";
import draggableImages from "@/features/draggable-image-list/draggableImages.json";

export function DraggableImageList() {
  return (
    <div className="rounded-md hover:animate-fadeIn0 grid grid-cols-2 gap-2 p-4">
      {draggableImages.map((image) => (
        <DraggableImage
          key={image.filePath}
          id={image.filePath}
          imgHref={new URL(image.filePath, import.meta.url).href}
        />
      ))}
    </div>
  );
}
