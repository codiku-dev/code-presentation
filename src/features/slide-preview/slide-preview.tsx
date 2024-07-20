import { Button } from "@/components/ui/button";
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
        if (event.key === "ArrowRight") {
          goToNextSlide();
        } else if (event.key === "ArrowLeft") {
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
    return (
      <div className="fixed z-10 bottom-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <Button
          size="icon"
          variant={"ghost"}
          className="border-none ring-0"
          onClick={goToPreviousSlide}
        >
          <ChevronLeft
            className={cn(
              "h-6 w-6 text-gray-300",
              currentSlideIndex === 0 && "opacity-20 cursor-not-allowed"
            )}
          />
        </Button>
        <Button
          size="icon"
          className="border-none ring-0"
          variant={"ghost"}
          onClick={goToNextSlide}
        >
          <ChevronRight
            className={cn(
              "h-6 w-6 text-gray-300",
              currentSlideIndex === slideList.length - 1 &&
                "opacity-20 cursor-not-allowed "
            )}
          />
        </Button>
      </div>
    );
  };

  const renderAnimatedCode = () => {
    return (
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

  return (
    <div className="pl-[0.4rem] pt-1 ">
      {highlighter && renderAnimatedCode()}
      {isPreviewMode && renderArrows()}
    </div>
  );
}
