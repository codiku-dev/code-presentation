import { cx } from "class-variance-authority";
import { Plus } from "lucide-react";
import { SlideThumbnail } from "./slide-thumbnail/slide-thumbnail";

export function Navigation(p: { slideCodeList: string[], currentSlideIndex: number, onClickItem: (index: number) => void, onClickAdd: () => void }) {

  return <div className="bg-primary w-44 h-screen p-4 flex flex-col gap-2">
    {
      p.slideCodeList.map((code, index) => (
        <div className={cx("hover:ring-1 rounded-sm", index === p.currentSlideIndex ? "ring-1 ring-secondary" : "")} key={index}>
          <SlideThumbnail code={p.slideCodeList[index]} onClick={() => p.onClickItem(index)} />
        </div>
      ))
    }
    <div className="rounded-sm h-20 bg-black flex-center hover:ring-1" onClick={p.onClickAdd}>
      <Plus className="text-secondary" />
    </div>
  </div>;
}
