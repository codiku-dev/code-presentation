import { Input } from "@/components/ui/input";
import { PickableImage, Slide } from "@/types/slide.types";
import { cx } from "class-variance-authority";
import { Minus, Square, X } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";

export function SlideLayout(p: {
  children: React.ReactNode;
  isPreviewMode: boolean;
  slide: Slide;
  onChangeFilename: (filename: string) => void;
  onPickLocationForImage: (image: PickableImage) => void;
  selectedImage?: PickableImage;
  onRightClickPickableImage: (image: PickableImage) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const renderDroppedImageList = () => {
    return p.slide.imageList.map((image, index) => {
      return (
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            p.onRightClickPickableImage(image);
          }}
          key={index}
          className="absolute"
          style={{
            top: `${image.y}px`,
            left: `${image.x}px`,
          }}
        >
          <img src={image.filePath} height={100} width={100} />
        </div>
      );
    });
  };
  const header = (
    <div className="relative flex ">
      <div className="absolute left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
        {!p.isPreviewMode ? (
          <div className="flex-center">
            <span className="bg-purple-400 rounded-full w-1 h-1"></span>
            <Input
              type="text"
              placeholder="code.tsx"
              value={p.slide.fileName || ""}
              onChange={(e) => p.onChangeFilename(e.target.value)}
              className="flex min-w-20 w-20 max-w-44   text-white hover:text-white cursor-pointer bg-transparent border-0 border-b-2 border-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
            />
          </div>
        ) : (
          <span>{p.slide.fileName || "code.tsx"}</span>
        )}
      </div>
      <div className="flex gap-2 ml-auto items-center justify-center">
        <Minus className="text-gray-600" size={14} />
        <Square className="text-gray-600" size={14} />
        <X className="text-gray-600" size={14} />
      </div>
    </div>
  );
  return (
    <div
      id="parent"
      className={cx(
        "relative max-h-[930px] overflow-y-auto min-h-[90%] min-w-[1200px] bg-primary rounded-md  border-2 border-gray-700 p-4 text-white h-full "
      )}
    >
      {header}
      <div
        ref={setNodeRef}
        className={cx(
          "h-[870px] overflow-y-hidden",
          isOver ? "bg-green-900" : ""
        )}
      >
        {p.children}
        {renderDroppedImageList()}
      </div>
    </div>
  );
}
