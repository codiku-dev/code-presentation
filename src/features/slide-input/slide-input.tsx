import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";
import "./slide-input.css";

export function SlideInput(p: { code: string, style?: React.CSSProperties, onChange: (value: string) => void }) {
  const [lineCount, setLineCount] = useState(p.code.split('\n').length);
  return (
    <div className="p-2">
      <CodeMirror
        value={p.code}
        style={{
          fontSize: "1.2rem",
          margin: "5px",
          ...p.style
        }}

        theme={githubDark}
        basicSetup={{
          lineNumbers: true,
        }}
        maxHeight="600px"
        extensions={[javascript({ jsx: true, typescript: true })]}
        onChange={(value, viewUpdate) => {
          const lineCount = value.split('\n').length;
          setLineCount(lineCount);

          console.log(value.length)
          p.onChange(value);
        }}
      />
    </div>
  );
}
