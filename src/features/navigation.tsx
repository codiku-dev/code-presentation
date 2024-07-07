import { SlideThumbnail } from "./slide-thumbnail/slide-thumbnail";

export function Navigation(p : {slideCodeList: string[], currentSlideIndex: number}) {
  return <div className="bg-primary w-44 h-screen p-4">
    <SlideThumbnail code={p.slideCodeList[p.currentSlideIndex]} />
  </div>;
}
