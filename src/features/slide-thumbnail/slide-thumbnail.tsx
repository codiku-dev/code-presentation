import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";
import "./slide-thumbnail.css";
import { Trash } from "lucide-react";
export function SlideThumbnail(p: {
  code: string;
  onClick: () => void;
  onClickTrash: () => void;
}) {
  return (
    <div className="rounded-sm h-20 bg-black group" onClick={p.onClick}>
      <div className="p-2">
        <div className=" opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
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
          <CodeMirror
            value={p.code.substring(0, 240)}
            style={{
              fontSize: "0.2rem",
              userSelect: "none",
            }}
            editable={false}
            theme={tokyoNight}
            basicSetup={{
              lineNumbers: true,
            }}
            extensions={[javascript({ jsx: true, typescript: true })]}

          />
        )}
      </div>
    </div>
  );
}
