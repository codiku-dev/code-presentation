import { useSlidesStore } from "@/store/use-slides-store";
import { useEffect, useState } from "react";
import {
  BundledTheme,
  getSingletonHighlighter,
  type HighlighterCore,
} from "shiki";
import "shiki-magic-move/dist/style.css";
import { ShikiMagicMove } from "shiki-magic-move/react";
const CODE_THEME: BundledTheme = "dracula";

export function SlidePreview() {
  const { getCurrentSlide } = useSlidesStore();
  const [highlighter, setHighlighter] = useState<HighlighterCore>();
  const renderAnimatedCode = () => {
    return (
      <div className="pl-[0.4rem] pt-1 ">
        <ShikiMagicMove
          lang="tsx"
          theme={CODE_THEME}
          highlighter={highlighter!}
          code={getCurrentSlide().code || ""}
          className={"leading-[28px] text-[20px]"}
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
