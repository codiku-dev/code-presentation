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
import { DndContext, pointerWithin } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
export function Home() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [slideList, setSlideList] = useState<Slide[]>(
    JSON.parse(
      localStorage.getItem("slideList") || JSON.stringify(INITIAL_SLIDES)
    )
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = slideList[currentSlideIndex];

  useEffect(() => {
    localStorage.setItem("slideList", JSON.stringify(slideList));
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
      setSlideList([{ fileName: "", code: "", imageList: [] }]);
      setCurrentSlideIndex(0);
    } else {
      // When creating a new slide we add a copy of the previous ( if there is a previous, but we don't want to keep the same id for the images )
      setSlideList([
        ...slideList,
        {
          ...slideList[slideList.length - 1],
          imageList: [
            ...slideList[slideList.length - 1].imageList.map((image) => {
              return {
                ...image,
                id: uuidv4(),
              };
            }),
          ],
        },
      ]);
      setCurrentSlideIndex(slideList.length);
    }
  };
  const deleteSlide = (index: number) => {
    const newSlideList = [...slideList];
    newSlideList.splice(index, 1);
    if (newSlideList.length > 0 && currentSlideIndex > 0) {
      setCurrentSlideIndex((curr) => curr - 1);
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
    setCurrentSlideIndex(currentSlideIndex - 1);
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex(currentSlideIndex + 1);
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
      {!isPreviewMode && (
        <Navigation
          slideList={slideList}
          currentSlideIndex={currentSlideIndex}
          onClickItem={(index) => {
            setCurrentSlideIndex(index);
          }}
          onClickAdd={addSlide}
          onClickDelete={deleteSlide}
        />
      )}

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
                console.log(newSlideList[currentSlideIndex]);
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

  const renderWithBackgroundLight = (children: React.ReactNode) => {
    return (
      <div className="  h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
          <DndContext
            modifiers={[restrictToWindowEdges, snapCenterToCursor]}
            collisionDetection={pointerWithin}
            onDragEnd={(event) => {
              const SHIFTX = -635;
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

                const imageToUpdate =
                  currentSlide.imageList[imageIndexToUpdate];
                console.log(event);
                const updatedImageList = [...currentSlide.imageList];
                updatedImageList[imageIndexToUpdate] = {
                  ...imageToUpdate,
                  x: imageToUpdate.x! + event.delta.x,
                  y: imageToUpdate.y! + event.delta.y,
                };

                updateCurrentSlideImageList(updatedImageList);
              }
            }}
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
    </div>
  );
}
