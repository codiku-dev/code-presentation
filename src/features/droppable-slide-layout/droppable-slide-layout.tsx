import { Input } from "@/components/ui/input";
import { DraggableImageT, Slide } from "@/types/slide.types";
import { cx } from "class-variance-authority";
import { Minus, Square, X } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { DraggableImage } from "../draggable-image-list/draggable-image";
import { useEffect, useRef, useState } from "react";

export function DroppableSlideLayout(p: {
  children: React.ReactNode;
  isPreviewMode: boolean;
  slide: Slide;
  onChangeFilename: (filename: string) => void;
  onPickLocationForImage: (image: DraggableImageT) => void;
  selectedImage?: DraggableImageT;
  onRightClickPickableImage: (image: DraggableImageT) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const refLayout = useRef<HTMLDivElement>(null);
  const [layoutRef, setLayoutRef] = useState<HTMLDivElement | null>(null);
  const [width , setWidth] = useState(window.innerWidth);
  useEffect(()=> {
    const handler = ()=> {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handler);
    return ()=> {
      window.removeEventListener('resize', handler);
    } 
  },[])
  
  useEffect(() => {
    setLayoutRef(refLayout.current);
    console.log("update")
  }, [refLayout]);

  const renderDraggedImageList = () => {
    return p.slide.imageList.map((image, index) => {
      return (
        <div
          className={cx(p.isPreviewMode && "animate-fadeIn")}
          key={image.id}
          style={{
            position: "absolute",
            width: 100,
            height: 100,
            top: isNaN(Number(image.y)) ? 0 : Number(image.y),
            left: isNaN(Number(image.x)) ? 0 : Number(image.x),
          }}
          onContextMenu={(e) => {
            if (!p.isPreviewMode) {
              e.preventDefault();
              p.onRightClickPickableImage(image);
            }
          }}
        >
          <DraggableImage
            key={image.id}
            id={image.id}
            imgHref={new URL(image.filePath, import.meta.url).href}
          />
        </div>
      );
    });
  };
  const header = (
    <div className="relative flex ">
      <div className="absolute left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
      </div>
      <div className="flex gap-2 ml-auto items-center justify-center">
        <Minus className="text-gray-600" size={14} />
        <Square className="text-gray-600" size={14} />
        <X className="text-gray-600" size={14} />
      </div>
    </div>
  );

  const droppableSection = (
    <div
      ref={setNodeRef}
      className={cx(
        "h-[870px] overflow-y-hidden",
        isOver ? "bg-green-900" : ""
      )}
    >
      {p.children}
      {renderDraggedImageList()}
    </div>
  );
  console.log(layoutRef?.offsetWidth)
  return (
    <div
      ref={refLayout}
      id="parent"
      style={{
        left:
          window.innerWidth / 2 - Number((layoutRef?.offsetWidth || 0) / 2),
      }}
      className={cx(
        "fixed top-14 max-h-[830px] overflow-y-hidden  min-w-[1200px] bg-primary rounded-md  border-2 border-gray-700 p-4 text-white h-full "
      )}
    >
      {header}
      {droppableSection}
    </div>
  );
}
