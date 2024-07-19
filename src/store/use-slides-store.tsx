import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { DraggableImageT, Slide } from "../types/slide.types";

type Store = {
  slideList: Slide[];
  slideIdInClipBoard?: string;
  currentSlideIndex: number;
  isFileNameInputFocused: boolean;
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
};

const KEYS_TO_NOT_STORE = ["slideIdInClipBoard", "isFileNameInputFocused"];

const useSlidesStore = create(
  devtools(
    persist(
      subscribeWithSelector<Store>((set, get) => ({
        //STATE

        slideList: [],
        currentSlideIndex: -1,
        slideIdInClipBoard: undefined,
        isFileNameInputFocused: false,
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
          // if (slideList.length === 0) {
          //   set({ slideList: [getNewEmptySlide()], currentSlideIndex: 0 });
          // } else {
          // const previousSlide = { ...slideList[slideList.length - 1] };
          // const newSlide = {
          //   ...previousSlide,
          //   id: uuidv4(),
          //   imageList: previousSlide.imageList.map((image) => ({
          //     ...image,
          //     id: uuidv4(),
          //   })),
          // };
          set({
            slideList: [...slideList, getNewEmptySlide()],
            currentSlideIndex: slideList.length,
          });
          // }
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
          set(({ currentSlideIndex }) => ({
            currentSlideIndex: currentSlideIndex - 1,
          }));
        },

        goToNextSlide: () => {
          set(({ currentSlideIndex }) => ({
            currentSlideIndex: currentSlideIndex + 1,
          }));
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
        setIsFileNameInputFocused: (isFocused: boolean) => {
          set({ isFileNameInputFocused: isFocused });
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
