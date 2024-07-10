import { Button } from "@/components/ui/button";
import { Navigation } from "@/features/navigation";
import { SlideInput } from "@/features/slide-input/slide-input";
import { DroppableSlideLayout } from "@/features/droppable-slide-layout/droppable-slide-layout";
import { SlidePreview } from "@/features/slide-preview/slide-preview";
import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";
import { INITIAL_SLIDES } from "./constant";
import { DraggableImageT, Slide } from "@/types/slide.types";
import {
  DRAGGABLE_IMAGES,
  DraggableImageList,
} from "@/features/draggable-image-list/draggable-image-list";
import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
export function Home() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [slideList, setSlideList] = useState<Slide[]>(
    localStorage.getItem("slideList")
      ? JSON.parse(localStorage.getItem("slideList")!)
      : INITIAL_SLIDES
  );
  const [currentSlide, setCurrentSlide] = useState<Slide>(slideList[0]);
  const currentSlideIndex = slideList.findIndex(
    (s) => s.id === currentSlide?.id
  );

  useEffect(() => {
    localStorage.setItem("slideList", JSON.stringify(slideList));
    if (slideList.length === 0) {
      setCurrentSlide(undefined);
    }
  }, [slideList]);

  const updateCurrentSlideCode = (code: string) => {
    const newSlideList = [...slideList];
    newSlideList[currentSlideIndex].code = code;
    setSlideList(newSlideList);
  };
  const updateCurrentSlideFilename = (filename: string) => {
    const newSlideList = [...slideList];
    newSlideList[currentSlideIndex].fileName = filename;
    setSlideList(newSlideList);
  };

  const updateCurrentSlideImageList = (imageList: DraggableImageT[]) => {
    const newSlideList = [...slideList];
    newSlideList[currentSlideIndex].imageList = imageList;
    setSlideList(newSlideList);
  };
  const addSlide = () => {
    if (slideList.length === 0) {
      const newSlide: Slide = {
        fileName: "code.tsx",
        code: `function letsPrez(){
            console.log("You can format with ctrl + s")
              console.log("You can drag emoji in here (right click to delete)")
        }`,
        imageList: [],
        id: uuidv4(),
      };
      setSlideList([newSlide]);
      setCurrentSlide(newSlide);
    } else {
      const previousSlide = { ...slideList[slideList.length - 1] };
      const newSlide = {
        ...previousSlide,
        id: uuidv4(),
        imageList: [
          ...slideList[slideList.length - 1].imageList.map((image) => {
            return {
              ...image,
              id: uuidv4(),
            };
          }),
        ],
      };

      setSlideList([...slideList, newSlide]);
      setCurrentSlide(newSlide);
    }
  };
  const deleteSlide = (slide: Slide) => {
    const newSlideList = [...slideList];
    newSlideList.splice(
      newSlideList.findIndex((s) => s.id === slide.id),
      1
    );
    if (newSlideList.length > 0 && currentSlideIndex > 0) {
      setCurrentSlide(newSlideList[newSlideList.length - 1]);
    }
    setSlideList(newSlideList);
  };

  const deleteImageFromCurrentSlide = (image: DraggableImageT) => {
    const newSlideList = [...slideList];
    newSlideList[currentSlideIndex].imageList = newSlideList[
      currentSlideIndex
    ].imageList.filter((img) => img.id !== image.id);
    setSlideList(newSlideList);
  };
  const goToPreviousSlide = () => {
    setCurrentSlide(slideList[currentSlideIndex - 1]);
  };

  const goToNextSlide = () => {
    setCurrentSlide(slideList[currentSlideIndex + 1]);
  };

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
            >
              {isPreviewMode ? (
                <SlidePreview slide={currentSlide} />
              ) : (
                <SlideInput
                  slide={currentSlide}
                  onCodeChange={updateCurrentSlideCode}
                />
              )}
            </DroppableSlideLayout>
          )}
        </div>
      </div>
      {slideList.length > 0 && buttonMode}
      {slideList.length > 0 && (
        <div className="fixed top-44 right-5  bg-black/5  group rounded-sm  ">
          <div className="opacity-0 rounded-sm group-hover:visible group-hover:opacity-100 group">
            <div className="">{!isPreviewMode && <DraggableImageList />}</div>
          </div>
        </div>
      )}
    </div>
  );

  const dropImage = (event: DragEndEvent) => {
    if (!currentSlide) return;
    const SHIFTX = -386;
    const SHIFTY = 118;
    // If the id is comming from the list of images, we add it to the current slide
    if (event.active.id.toString().startsWith("/")) {
      const imageIndex = DRAGGABLE_IMAGES.findIndex(
        (image) => image.filePath === event.active.id.toString()
      );

      const xFromBorderRight =
        Number(event.active.rect.current.translated?.right) -
        Number(event.active.rect.current.initial?.right);

      const yFromBorderTop =
        Number(event.active.rect.current.translated?.top) -
        Number(event.active.rect.current.initial?.top);
      // add new image to the current slide
      updateCurrentSlideImageList([
        ...currentSlide.imageList,
        {
          id: uuidv4(),
          filePath: event.active.id.toString(),
          x: window.innerWidth + xFromBorderRight + SHIFTX,

          y: yFromBorderTop + (SHIFTY + imageIndex * 100),
        },
      ]);
    } else {
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
  };

  const renderWithBackgroundLight = (children: React.ReactNode) => {
    return (
      <div className="  h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
          {!isPreviewMode && (
            <Navigation
              slideList={slideList}
              currentSlide={currentSlide}
              onClickItem={(slide) => {
                setCurrentSlide(slide);
              }}
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
  return (
    <div className="w-screen h-full">
      {isPreviewMode
        ? renderWithBackgroundDark(content)
        : renderWithBackgroundLight(content)}
      <div className="text-xs fixed top-5 left-1/2 transform -translate-x-1/2">
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
    </div>
  );
}
