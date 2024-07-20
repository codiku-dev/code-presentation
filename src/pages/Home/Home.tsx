import { Button } from "@/components/ui/button";
import { DragDropContext } from "@/features/drag-drop-context/drag-drop-context";
import { DragDropWorkspace } from "@/features/drag-drop-workspace/drag-drop-workspace";
import { Navigation } from "@/features/navigation/navigation";
import { TipsBox } from "@/features/tips-box/tips-box";
import { useSlidesStore } from "@/store/use-slides-store";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { cx } from "class-variance-authority";
import { useRef } from "react";

export function Home() {
  const slideInputRef = useRef<ReactCodeMirrorRef>(null);
  const slideInputFileNameRef = useRef<HTMLInputElement>(null);
  const { isPreviewMode, setIsPreviewMode, slideList } = useSlidesStore();

  const renderPreviewMode = () => {
    return (
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <DragDropWorkspace
          slideInputRef={slideInputRef}
          slideInputFileNameRef={slideInputFileNameRef}
        />
      </div>
    );
  };

  const buttonMode = (
    <div className="animate-fadeIn05">
      <Button
        className={cx(
          "absolute w-44 right-4 top-4",
          isPreviewMode
            ? "opacity-50 hover:opacity-100"
            : "opacity-100 hover:opacity-50"
        )}
        onClick={() => setIsPreviewMode(!isPreviewMode)}
      >
        {isPreviewMode ? "Edit" : "Preview"}
      </Button>
    </div>
  );

  const renderEditMode = () => {
    return (
      <div className="  h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
          <div className="animate-fadeIn05">
            <Navigation
              slideInputRef={
                slideInputRef as React.RefObject<ReactCodeMirrorRef>
              }
              onClick={() => {
                slideInputRef?.current?.view?.contentDOM.blur();
                slideInputFileNameRef.current?.blur();
              }}
            />
          </div>
          <DragDropWorkspace
            slideInputRef={slideInputRef}
            slideInputFileNameRef={slideInputFileNameRef}
          />
        </div>

        <div className="animate-fadeIn05">{madeWithLoveSignature}</div>

        <div className="fixed bottom-3 right-5 w-72">
          <TipsBox />
        </div>
      </div>
    );
  };

  const madeWithLoveSignature = (
    <div
      className={cx(
        "text-xs fixed top-5 left-1/2 transform -translate-x-1/2",
        isPreviewMode && "text-white"
      )}
    >
      Made with love by{" "}
      <a
        className="underline"
        href="https://twitter.com/codiku_dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        @codiku_dev
      </a>
    </div>
  );

  return (
    <div className="w-screen h-full">
      {isPreviewMode ? renderPreviewMode() : renderEditMode()}
      {slideList.length > 0 && buttonMode}
    </div>
  );
}
