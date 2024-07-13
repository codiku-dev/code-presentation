import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";
import "./slide-thumbnail.css";
import { Trash } from "lucide-react";
import { cn } from "@/utils";
export function SlideThumbnail(p: {
  code: string;
  onClick: () => void;
  onClickTrash: () => void;
  isActive: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-sm h-20 overflow-y-hidden bg-black group",
        " hover:ring-4  hover:ring-indigo-500 rounded-sm ",
        p.isActive && "ring-[5px]  ring-indigo-500"
      )}
      onClick={p.onClick}
    >
      <div className="p-2 overflow-y-hidden">
        <div className=" z-20 absolute right-2 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end overflow-y-hidden">
          <Trash
            className=" w-6 self-end text-white     rounded-full   cursor-pointer"
            size={16}
            onClick={(e) => {
              e.stopPropagation();
              p.onClickTrash();
            }}
          />
        </div>
        {p.code && (
          <div className="code-text-thumbnail">
            <CodeMirror
              value={p.code.split("\n").slice(0, 40).join("\n")}
              style={{
                userSelect: "none",
              }}
              editable={false}
              maxHeight="50px"
              theme={tokyoNight}
              basicSetup={{
                lineNumbers: false,
                foldGutter: false,
              }}
              extensions={[javascript({ jsx: true, typescript: true })]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
