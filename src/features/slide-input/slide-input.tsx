import { githubDark } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { SlideLayout } from "../slide-layout";
import "./slide-input.css";

export function SlideInput(p: { code: string }) {
  return (
    <div className="p-2">
      <CodeMirror
        value={p.code}
        style={{
          fontSize: "1.085rem",
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
