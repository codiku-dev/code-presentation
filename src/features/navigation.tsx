import { cx } from "class-variance-authority";
import { Plus } from "lucide-react";
import { SlideThumbnail } from "./slide-thumbnail/slide-thumbnail";

export function Navigation(p: {
  slideCodeList: string[];
  currentSlideIndex: number;
  onClickItem: (index: number) => void;
  onClickAdd: () => void;
}) {
  return (
    <div className="w-44 overflow-y-auto h-[calc(100vh-2rem)] p-4 flex flex-col gap-2">
      {p.slideCodeList.map((code, index) => (
        <div
          className={cx(
            "hover:ring-2 hover:ring-indigo-500 rounded-sm",
            index === p.currentSlideIndex ? "ring-4 ring-indigo-500" : ""
          )}
          key={index}
        >
          <SlideThumbnail
            code={p.slideCodeList[index]}
            onClick={() => p.onClickItem(index)}
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
