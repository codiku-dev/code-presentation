import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import "./slide-input.css";
import { Slide } from "@/types/slide.types";
import * as prettier from "prettier";
import babel from "prettier/plugins/babel";
import esTree from "prettier/plugins/estree";

import { useEffect } from "react";
import { CODE_FONT_SIZE } from "@/constant";
export function SlideInput(p: {
  slide: Slide;
  style?: React.CSSProperties;
  onCodeChange: (code: string) => void;
}) {
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        const formattedCode = await prettier.format(p.slide.code, {
          semi: false,
          parser: "babel",
          plugins: [esTree, babel],
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
    <div className="code-text-input">
      <CodeMirror
        value={p.slide.code}
        style={{
          overflowX: "hidden",
          ...p.style,
        }}
        theme={dracula}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
        }}
        extensions={[javascript({ jsx: true, typescript: true })]}
        onChange={(value, viewUpdate) => {
          p.onCodeChange(value);
        }}
      />
    </div>
  );
}
