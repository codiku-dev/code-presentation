import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";
import "./slide-input.css";

export function SlideInput(p: {
  code: string;
  style?: React.CSSProperties;
  onChange: (value: string) => void;
}) {
  return (
    <div className="p-2">
      <CodeMirror
        value={p.code}
        style={{
          fontSize: "1.2rem",
          margin: "5px",
          ...p.style,
        }}
        theme={tokyoNight}
        basicSetup={{
          lineNumbers: true,
        }}
        maxHeight="860px"
        extensions={[javascript({ jsx: true, typescript: true })]}
        onChange={(value, viewUpdate) => {
          p.onChange(value);
        }}
      />
    </div>
  );
}
