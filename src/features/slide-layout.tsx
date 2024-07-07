import { cx } from "class-variance-authority";
import { Minus, Square, X } from "lucide-react";

export function SlideLayout(p: {
  children: React.ReactNode;
  isPreviewMode: boolean;
}) {
  const header = (
    <div className="relative flex ">
      <div className="absolute left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
        code.tsx
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
        "   min-h-[90%] bg-primary rounded-md  border-4 border-secondary p-4 text-white ",
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
