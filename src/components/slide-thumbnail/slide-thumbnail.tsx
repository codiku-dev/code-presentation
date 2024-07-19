import { cn } from "@/utils";
import { Trash } from "lucide-react";
import { memo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./slide-thumbnail.css";
export const SlideThumbnail = memo(
  (p: {
    code: string;
    onClick: () => void;
    onClickTrash: () => void;
    isActive: boolean;
    label: string;
  }) => {
    return (
      <div
        className={cn(
          "w-32 rounded-sm h-20 overflow-y-hidden bg-black group cursor-pointer",
          " hover:ring-2  hover:ring-indigo-500 rounded-sm ",
          p.isActive && "ring-[4px]  ring-indigo-500"
        )}
        onClick={() => {
          p.onClick();
        }}
      >
        <div className="p-2 overflow-y-hidden">
          <div className=" z-20 absolute right-2 top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end overflow-y-hidden">
            <Trash
              className=" w-6 self-end text-white     rounded-full   cursor-pointer"
              size={16}
              onClick={(e) => {
                e.stopPropagation();
                p.onClickTrash();
              }}
            />
          </div>
          <div className="absolute text-xs text-white">{p.label}</div>
          {p.code && (
            <div className="code-text-thumbnail">
              <SyntaxHighlighterMemoized code={p.code} />
            </div>
          )}
        </div>
      </div>
    );
  },
  (prev, next) => prev.code === next.code
);

export const SyntaxHighlighterMemoized = memo((p: { code: string }) => {
  return (
    <SyntaxHighlighter
      customStyle={{ backgroundColor: "transparent" }}
      language="tsx"
      style={theme}
    >
      {p.code}
    </SyntaxHighlighter>
  );
});
