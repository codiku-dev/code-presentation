import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";

export function SlideThumbnail(p: { code: string; onClick: () => void }) {
  return (
    <div
      className="rounded-sm h-20 bg-black overflow-hidden"
      onClick={p.onClick}
    >
      <div className="p-2">
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
          onChange={(value, viewUpdate) => {
            console.log("value:", value);
          }}
        />
      </div>
    </div>
  );
}
