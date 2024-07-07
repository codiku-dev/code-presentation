import { Input } from "@/components/ui/input";
import { Slide } from "@/types/slide.types";
import { cx } from "class-variance-authority";
import { Minus, Square, X } from "lucide-react";

export function SlideLayout(p: {
  children: React.ReactNode;
  isPreviewMode: boolean;
  slide: Slide;
  onChangeFilename: (filename: string) => void;
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
              className="flex min-w-20 w-20 max-w-44 bg-red-400  text-white hover:text-white cursor-pointer bg-transparent border-0 border-b-2 border-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
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
      className={cx(
        "   min-h-[90%] bg-primary rounded-md  border-2 border-gray-700 p-4 text-white ",
        p.isPreviewMode
          ? "min-w-[1200px] max-h-[930px] overflow-y-auto"
          : "max-h-[950px] min-w-[930px] max-w-[1200px] "
      )}
    >
      {header}
      {p.children}
    </div>
  );
}
