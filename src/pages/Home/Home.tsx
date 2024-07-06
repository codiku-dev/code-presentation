import { useEffect, useState } from "react";
import { ShikiMagicMove } from "shiki-magic-move/react";
import { type HighlighterCore, getHighlighter } from "shiki";
import "shiki-magic-move/dist/style.css";
import { SlideNavigation } from "@/features/slide-navigation";
import { SlideInput } from "@/features/slide-input";

export function Home() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
        <div className="flex gap-2">
          <SlideNavigation />
          <div className=" p-2 w-full  mt-6 flex-center">
            <SlideInput />
          </div>
        </div>
      </div>
    </div>
  );
}

/*
  const [code, setCode] = useState(`const hello = 'world'`)
  const [highlighter, setHighlighter] = useState<HighlighterCore>()

  useEffect(() => {
    async function initializeHighlighter() {
      const highlighter = await getHighlighter({
        themes: ['nord'],
        langs: ['javascript', 'typescript'],
      })
      setHighlighter(highlighter)
    }
    initializeHighlighter()
  }, [])

  function animate() {
    setCode(`let hi = 'hello'`)
  }
  {highlighter && (
        <>
          <ShikiMagicMove
            lang="ts"
            theme="nord"
            highlighter={highlighter}
            code={code}
            options={{ duration: 800, stagger: 0.3, lineNumbers: true }}
          />
          <button onClick={animate}>Animate</button>
        </>
      )} */
