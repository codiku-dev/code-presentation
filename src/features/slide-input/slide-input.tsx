import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";
import "./slide-input.css";

export function SlideInput(p: { code: string, style?: React.CSSProperties, onChange: (value: string) => void }) {
  return (
    <div className="p-2">
      <CodeMirror
        value={p.code}
        style={{
          fontSize: "1.5rem",
          margin: "5px",
          ...p.style
        }}
        theme={githubDark}
        basicSetup={{
          lineNumbers: true,
        }}
        extensions={[javascript({ jsx: true, typescript: true })]}
        onChange={(value, viewUpdate) => {
          p.onChange(value);
        }}
      />
    </div>
  );
}
