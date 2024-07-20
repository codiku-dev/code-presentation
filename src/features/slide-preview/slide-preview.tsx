import { useSlidesStore } from "@/store/use-slides-store";
import { cn } from "@/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const {
    getCurrentSlide,
    isPreviewMode,
    currentSlideIndex,
    goToNextSlide,
    goToPreviousSlide,
    setIsPreviewMode,
    slideList,
  } = useSlidesStore();
  const [highlighter, setHighlighter] = useState<HighlighterCore>();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isPreviewMode) {
        if (
          event.key === "ArrowRight" &&
          currentSlideIndex < slideList.length - 1
        ) {
          goToNextSlide();
        } else if (event.key === "ArrowLeft" && currentSlideIndex > 0) {
          goToPreviousSlide();
        } else if (event.key === "Escape") {
          setIsPreviewMode(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPreviewMode, currentSlideIndex]);

  const renderArrows = () => {
    console.log("render arrows");
    return (
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <ChevronLeft
          className={cn(
            "h-6 w-6 text-gray-300",
            currentSlideIndex === 0 && "opacity-20 cursor-not-allowed"
          )}
        />

        <ChevronRight
          className={cn(
            "h-6 w-6 text-gray-300",
            currentSlideIndex === slideList.length - 1 &&
              "opacity-20 cursor-not-allowed "
          )}
        />
      </div>
    );
  };

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
        {isPreviewMode && <div>{renderArrows()}</div>}
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
