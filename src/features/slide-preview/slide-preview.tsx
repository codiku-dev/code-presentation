import { Slide } from "@/types/slide.types";
import { useEffect, useState } from "react";
import {
  BundledTheme,
  getSingletonHighlighter,
  type HighlighterCore,
} from "shiki";
import "shiki-magic-move/dist/style.css";
import { ShikiMagicMove } from "shiki-magic-move/react";
const CODE_THEME: BundledTheme = "dracula";

export function SlidePreview(p: { slide: Slide }) {
  const [highlighter, setHighlighter] = useState<HighlighterCore>();

  const renderAnimatedCode = () => {
    return (
      <div className="pl-[0.4rem] pt-1 ">
        <ShikiMagicMove
          lang="tsx"
          theme={CODE_THEME}
          highlighter={highlighter!}
          code={p.slide.code || ""}
          className={"text-[1rem] leading-[1.4rem]"}
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
        langs: ["tsx"],
      });
      setHighlighter(highlighter);
    }
    initializeHighlighter();
  }, []);

  return <div>{highlighter && renderAnimatedCode()}</div>;
}
