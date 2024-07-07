import { cx } from "class-variance-authority";
import { Plus } from "lucide-react";
import { SlideThumbnail } from "./slide-thumbnail/slide-thumbnail";
import { Slide } from "@/types/slide.types";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useRef } from "react";

export function Navigation(p: {
  slideList: Slide[];
  currentSlideIndex: number;
  onClickItem: (index: number) => void;
  onClickAdd: () => void;
  onClickDelete: (index: number) => void;
}) {
  const [parentAnimRef, enableAnimations] = useAutoAnimate()
  return (
    <div  ref={parentAnimRef} className="w-44 overflow-y-auto h-[calc(100vh-2rem)] p-4 flex flex-col gap-2">
      {p.slideList.map((slide, index) => (
        <div
          className={cx(
            "hover:ring-2 hover:ring-indigo-500 rounded-sm",
            index === p.currentSlideIndex ? "ring-4 ring-indigo-500" : ""
          )}
          key={index}
        >
          <SlideThumbnail
            code={slide?.code || ""}
            onClick={() => p.onClickItem(index)}
            onClickTrash={() => {
              p.onClickDelete(index);
            }}
          />
        </div>
      ))}
      <div
        className="rounded-sm  bg-black flex-center hover:ring-2 hover:ring-indigo-500"
        onClick={p.onClickAdd}
      >
        <Plus className="text-secondary h-20" />
      </div>
    </div>
  );
}
