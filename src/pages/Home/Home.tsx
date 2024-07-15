import { Button } from "@/components/ui/button";
import { DroppableSlideLayout } from "@/features/droppable-slide-layout/droppable-slide-layout";
import { Navigation } from "@/features/navigation/navigation";
import { SlideInput } from "@/features/slide-input/slide-input";
import { SlidePreview } from "@/features/slide-preview/slide-preview";
import { Slide } from "@/types/slide.types";
import { cx } from "class-variance-authority";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSlides } from "@/features/navigation/use-slides";
import { cn } from "@/utils";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export function Home() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const {
    slideList,
    setSlideList,
    currentSlide,
    setCurrentSlide,
    currentSlideIndex,
    updateCurrentSlideCode,
    updateCurrentSlideFilename,
    updateCurrentSlideImageList,
    addSlide,
    addNewCurrentSlideCopy,
    deleteSlide,
    deleteImageFromCurrentSlide,
    goToPreviousSlide,
    goToNextSlide,
  } = useSlides();

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

  const renderWithBackgroundDark = (children: React.ReactNode) => {
    return (
      <div className=" z-[-2] w-screen h-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        {children}
      </div>
    );
  };

  const buttonMode = (
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
  );
  const dropImage = (event: DragEndEvent) => {
    if (currentSlide && event.over && event.over.id === "droppable") {
      // If the id is comming from the list of images, we add it to the current slide
      if (event.active.id.toString().startsWith("/")) {
        // add new image to the current slide
        const droppableRect = event.over.rect;
        const mouseX = event.active.rect.current.translated?.left;
        const mouseY = event.active.rect.current.translated?.top;
        const relativeXToDroppable = mouseX! - droppableRect.left;
        const relativeYToDroppable = mouseY! - droppableRect.top;

        updateCurrentSlideImageList([
          ...currentSlide.imageList,
          {
            id: uuidv4(),
            filePath: event.active.id.toString(),
            x: relativeXToDroppable,
            y: relativeYToDroppable,
          },
        ]);
      } else {
        // Just moving the image using the delta
        const imageIndexToUpdate = currentSlide.imageList.findIndex(
          (img) => img.id == event.active.id.toString()
        );

        const imageToUpdate = currentSlide.imageList[imageIndexToUpdate];
        const updatedImageList = [...currentSlide.imageList];

        updatedImageList[imageIndexToUpdate] = {
          ...imageToUpdate,
          x: imageToUpdate.x! + event.delta.x,
          y: imageToUpdate.y! + event.delta.y,
        };

        updateCurrentSlideImageList(updatedImageList);
      }
    }
  };
  const content = (
    <div className="flex gap-2 h-full">
      <div className="w-full flex justify-center ">
        <div
          className={`h-full w-full gap-12 pt-12 overflow-y-hidde flex-center`}
        >
          {currentSlide && (
            <DroppableSlideLayout
              isPreviewMode={isPreviewMode}
              slide={currentSlide}
              onChangeFilename={updateCurrentSlideFilename}
              onRightClickPickableImage={deleteImageFromCurrentSlide}
              onPickLocationForImage={(image) => {
                const newSlideList = [...slideList];
                newSlideList[currentSlideIndex].imageList.push(image);
                setSlideList(newSlideList);
              }}
              onDropImage={dropImage}
            >
              {isPreviewMode ? (
                <SlidePreview slide={currentSlide} />
              ) : (
                <SlideInput
                  slide={currentSlide}
                  onCodeChange={updateCurrentSlideCode}
                  onCutAndCreateSlide={addNewCurrentSlideCopy}
                />
              )}
            </DroppableSlideLayout>
          )}
        </div>
        {slideList.length > 0 && buttonMode}
      </div>
    </div>
  );

  const setCurrentSlideCallback = useCallback((slide: Slide | undefined) => {
    setCurrentSlide(slide);
  }, []);
  const renderWithBackgroundLight = (children: React.ReactNode) => {
    return (
      <div className="  h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
          {!isPreviewMode && (
            <Navigation
              slideList={slideList}
              currentSlide={currentSlide}
              onClickItem={setCurrentSlideCallback}
              onClickAdd={addSlide}
              onClickDelete={deleteSlide}
              onChangeOrder={setSlideList}
            />
          )}
          <DndContext
            modifiers={[restrictToWindowEdges, snapCenterToCursor]}
            collisionDetection={pointerWithin}
            onDragEnd={dropImage}
          >
            {children}
          </DndContext>
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
  const renderArrows = () => {
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
  return (
    <div className="w-screen h-full">
      {isPreviewMode
        ? renderWithBackgroundDark(content)
        : renderWithBackgroundLight(content)}
      {!isPreviewMode && madeWithLoveSignature}
      {isPreviewMode && renderArrows()}
    </div>
  );
}
