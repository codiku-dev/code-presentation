import { Input } from "@/components/ui/input";
import { Slide } from "@/types/slide.types";
import { cx } from "class-variance-authority";
import { Minus, Square, X } from "lucide-react";

export function SlideLayout(p: {
  children: React.ReactNode;
  isPreviewMode: boolean;
  slide: Slide;
  onChangeFilename: (filename: string) => void;
  onPointEmoji: (emoji: {x: number, y: number, emoji: string, name: string}) => void;
  selectedEmoji: {name: string, emoji: string}
}) {
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
    onClick={(e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      var mouseX = e.clientX;
      var mouseY = e.clientY;
        const parentRect = e.currentTarget.getBoundingClientRect();
        const xPercent = ((mouseX - parentRect.left) / parentRect.width) * 100;
        const yPercent = ((mouseY - parentRect.top) / parentRect.height) * 100;
        console.log(`x: ${xPercent}%, y: ${yPercent}%`);
        console.log(`x: ${mouseX}, y: ${mouseY}`)
        if(p.selectedEmoji.name!==""){
          console.log("add emoji", {x: xPercent, y: yPercent, emoji: p.selectedEmoji.emoji, name: p.selectedEmoji.name})
          p.onPointEmoji({x: xPercent, y: yPercent, emoji: p.selectedEmoji.emoji, name: p.selectedEmoji.name})
        }

    }}
      className={cx(
        "relative max-h-[930px] overflow-y-auto min-h-[90%] min-w-[1200px] bg-primary rounded-md  border-2 border-gray-700 p-4 text-white ",
      )}
    >
      {header}
      {p.children}
            {p.slide.emojiList.map((emoji, index) => {
              return (
                <div key={index} className="absolute" style={{ top: `${emoji.y-(p.isPreviewMode?3:2.5)}%`, left: `${emoji.x-(p.isPreviewMode?6:0)}%` }}>
                  <div className="text-[10rem]">{emoji.emoji}</div>
              </div> 
              )
            })}

             
    </div>
  );
}
