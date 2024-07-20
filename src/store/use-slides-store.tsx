import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { DraggableImageT, Slide } from "../types/slide.types";
import { DragEndEvent } from "@dnd-kit/core";

type Store = {
  slideList: Slide[];

  slideIdInClipBoard?: string;
  currentSlideIndex: number;
  isFileNameInputFocused: boolean;

  isPreviewMode: boolean;

  setIsPreviewMode: (isPreviewMode: boolean) => void;
  getCurrentSlide: () => Slide;
  updateCurrentSlideCode: (code: string) => void;
  updateCurrentSlideFilename: (filename: string) => void;
  updateCurrentSlideImageList: (imageList: DraggableImageT[]) => void;
  addSlide: () => void;
  addNewCurrentSlideCopyWithCode: (code: string) => void;
  deleteSlide: (slide: Slide) => void;
  deleteImageFromCurrentSlide: (image: DraggableImageT) => void;
  goToPreviousSlide: () => void;
  goToNextSlide: () => void;
  setSlideList: (slides: Slide[]) => void;
  setCurrentSlide: (slide: Slide) => void;
  setSlideOrder: (reorderdSlides: Slide[]) => void;
  addNewSlideBefore: (slide: Slide) => void;
  setSlideIdInClipBoard: (slideId: string) => void;
  addCurrentSlideCopy: () => void;
  setIsFileNameInputFocused: (isFocused: boolean) => void;
  dropImage: (event: DragEndEvent) => void;
};

const KEYS_TO_NOT_STORE = ["slideIdInClipBoard", "isFileNameInputFocused"];

const useSlidesStore = create(
  devtools(
    persist(
      subscribeWithSelector<Store>((set, get) => ({
        //STATE

        slideList: [],
        currentSlideIndex: 0,
        slideIdInClipBoard: undefined,
        isFileNameInputFocused: false,
        isPreviewMode: false,

        // SYNCHRONOUS ACTIONS

        getCurrentSlide: () => {
          const { slideList, currentSlideIndex } = get();
          return slideList[currentSlideIndex];
        },

        updateCurrentSlideCode: (code: string) => {
          const { slideList, currentSlideIndex } = get();
          const newSlideList = [...slideList];
          newSlideList[currentSlideIndex].code = code;
          set({ slideList: newSlideList });
        },

        updateCurrentSlideFilename: (filename: string) => {
          const { slideList, currentSlideIndex } = get();
          const newSlideList = [...slideList];
          newSlideList[currentSlideIndex].fileName = filename;
          set({ slideList: newSlideList });
        },

        updateCurrentSlideImageList: (imageList: DraggableImageT[]) => {
          const { slideList, currentSlideIndex } = get();
          const newSlideList = [...slideList];
          newSlideList[currentSlideIndex].imageList = imageList;
          set({ slideList: newSlideList });
        },

        addSlide: () => {
          const { slideList } = get();
          set({
            slideList: [...slideList, getNewEmptySlide()],
            currentSlideIndex: slideList.length,
          });
        },

        addNewCurrentSlideCopyWithCode: (code: string) => {
          const { slideList, getCurrentSlide } = get();
          const slideListToUpdate = [...slideList];
          const currentSlideIndex = slideListToUpdate.findIndex(
            (slide) => slide.id === getCurrentSlide().id
          );
          slideListToUpdate.splice(currentSlideIndex + 1, 0, {
            ...getCurrentSlide(),
            code,
            id: uuidv4(),
            imageList: getCurrentSlide().imageList.map((image) => ({
              ...image,
              id: uuidv4(),
            })),
          });
          set({ slideList: slideListToUpdate });
        },
        deleteSlide: (slide: Slide) => {
          const { slideList, currentSlideIndex } = get();
          const currentDeletingSlideIndex = slideList.findIndex(
            (s) => s.id === slide.id
          );
          const newSlideList = [...slideList];
          newSlideList.splice(currentDeletingSlideIndex, 1);

          if (newSlideList.length === 0) {
            set({ currentSlideIndex: -1 });
          } else {
            if (currentDeletingSlideIndex === currentSlideIndex) {
              if (currentDeletingSlideIndex === slideList.length - 1) {
                set({ currentSlideIndex: newSlideList.length - 1 });
              }
            } else {
              if (currentDeletingSlideIndex < currentSlideIndex) {
                set({ currentSlideIndex: currentSlideIndex - 1 });
              }
            }
          }
          set({ slideList: newSlideList });
        },

        deleteImageFromCurrentSlide: (image: DraggableImageT) => {
          const { slideList, currentSlideIndex } = get();
          const newSlideList = [...slideList];
          newSlideList[currentSlideIndex].imageList = newSlideList[
            currentSlideIndex
          ].imageList.filter((img) => img.id !== image.id);
          set({ slideList: newSlideList });
        },

        goToPreviousSlide: () => {
          if (get().currentSlideIndex > 0) {
            set(({ currentSlideIndex }) => ({
              currentSlideIndex: currentSlideIndex - 1,
            }));
          }
        },

        goToNextSlide: () => {
          if (get().currentSlideIndex < get().slideList.length - 1) {
            set(({ currentSlideIndex }) => ({
              currentSlideIndex: currentSlideIndex + 1,
            }));
          }
        },

        setSlideList: (slides: Slide[]) => {
          set({ slideList: slides });
        },

        setSlideOrder: (reorderdSlides: Slide[]) => {
          const { getCurrentSlide } = get();
          const reorderedIndex = reorderdSlides.findIndex(
            (s) => s.id === getCurrentSlide().id
          );
          set({ currentSlideIndex: reorderedIndex, slideList: reorderdSlides });
        },
        setCurrentSlide: (slide: Slide) => {
          const { slideList } = get();
          const index = slideList.findIndex((s) => s.id === slide.id);
          set({ currentSlideIndex: index });
        },
        addNewSlideBefore: (slide: Slide) => {
          const { slideList, currentSlideIndex } = get();
          const slideToAddBeforeIndex = slideList.findIndex(
            (s) => s.id === slide.id
          );
          const newSlideList = [...slideList];
          newSlideList.splice(slideToAddBeforeIndex, 0, getNewEmptySlide());
          set({
            slideList: newSlideList,
            currentSlideIndex: slideToAddBeforeIndex,
          });
        },
        setSlideIdInClipBoard: (slideId: string) => {
          set({ slideIdInClipBoard: slideId });
        },

        addCurrentSlideCopy: () => {
          const { slideList, getCurrentSlide } = get();
          const slideListToUpdate = [...slideList];
          const currentSlideIndex = slideListToUpdate.findIndex(
            (slide) => slide.id === getCurrentSlide().id
          );
          slideListToUpdate.splice(currentSlideIndex + 1, 0, {
            ...getCurrentSlide(),
            id: uuidv4(),
            imageList: getCurrentSlide().imageList.map((image) => ({
              ...image,
              id: uuidv4(),
            })),
          });
          set({ slideList: slideListToUpdate });
        },

        setIsPreviewMode: (isPreviewMode: boolean) => {
          set({ isPreviewMode });
        },

        setIsFileNameInputFocused: (isFocused: boolean) => {
          set({ isFileNameInputFocused: isFocused });
        },

        dropImage: (event: DragEndEvent) => {
          const { getCurrentSlide, updateCurrentSlideImageList } = get();
          const currentSlide = getCurrentSlide();
          console.log("dropImage", event.over);
          if (currentSlide && event.over?.id === "droppable") {
            // If the id is coming from the list of images, we add it to the current slide
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
        },
      })),

      {
        name: "slideList",
        partialize: (store) =>
          Object.fromEntries(
            Object.entries(store).filter(
              ([key]) => !KEYS_TO_NOT_STORE.includes(key)
            )
          ),
      }
    )
  )
);

function getNewEmptySlide(): Slide {
  return {
    fileName: "code.tsx",
    code: ``,
    imageList: [],
    id: uuidv4(),
  };
}

export { useSlidesStore };
