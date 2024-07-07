import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";
import "./slide-input.css";
import { Slide } from "@/types/slide.types";

export function SlideInput(p: {
  slide: Slide;
  style?: React.CSSProperties;
  onCodeChange: (code: string) => void;
}) {
  return (
    <div className="p-2">
      <CodeMirror
        value={p.slide.code}
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
          p.onCodeChange(value);
        }}
      />
    </div>
  );
}
