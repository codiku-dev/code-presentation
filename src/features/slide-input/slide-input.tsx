import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";
import "./slide-input.css";

export function SlideInput(p: { code: string , style? : React.CSSProperties}) {
  return (
    <div className="p-2">
      <CodeMirror
        value={p.code}
        style={{
          fontSize: "1.5rem",
          margin:"5px",
          ...p.style
        }}
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
  );
}
