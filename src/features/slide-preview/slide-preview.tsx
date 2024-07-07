import { Slide } from "@/types/slide.types";
import { useEffect, useState } from "react";
import {
  BundledTheme,
  getSingletonHighlighter,
  type HighlighterCore,
} from "shiki";
import "shiki-magic-move/dist/style.css";
import { ShikiMagicMove } from "shiki-magic-move/react";
const CODE_THEME: BundledTheme = "tokyo-night";

export function SlidePreview(p: { slide: Slide }) {
  const [highlighter, setHighlighter] = useState<HighlighterCore>();

  const renderAnimatedCode = () => {
    return (
      <div className="p-4  w-44 ">
        <ShikiMagicMove
          lang="ts"
          theme={CODE_THEME}
          highlighter={highlighter!}
          code={p.slide.code || ""}
          options={{
            duration: 800,
            stagger: 0.3,
            lineNumbers: false,
            containerStyle: false,
          }}
       
        />
           
      </div>
    );
  };

  useEffect(() => {
    async function initializeHighlighter() {
      const highlighter = await getSingletonHighlighter({
        themes: [CODE_THEME],
        langs: ["javascript", "typescript"],
      });
      setHighlighter(highlighter);
    }
    initializeHighlighter();
  }, []);

  return <div>{highlighter && renderAnimatedCode()}</div>;
}
