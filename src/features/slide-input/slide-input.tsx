import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";
import "./slide-input.css";
import { Slide } from "@/types/slide.types";
import * as prettier from "prettier";
import tsParser from "prettier/parser-typescript";

import { useEffect } from "react";
export function SlideInput(p: {
  slide: Slide;
  style?: React.CSSProperties;
  onCodeChange: (code: string) => void;
}) {
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        const formattedCode = await prettier.format(p.slide.code, {
          semi: false,
          parser: "typescript",
          plugins: [tsParser],
        });
        p.onCodeChange(formattedCode);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [p.slide.code, p.onCodeChange]);
  return (
    <div className="p-2" onClick={(e) => {}}>
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
