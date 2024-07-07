import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";

export function SlideThumbnail(p: { code: string, onClick: () => void }) {
  return (
    <div className="rounded-sm h-20 bg-black" onClick={p.onClick}>
      <div className="p-2">
        <CodeMirror
          value={p.code}
          style={{
            fontSize: "0.2rem",
            userSelect: "none"
          }}
          editable={false}

          theme={githubDark}
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
