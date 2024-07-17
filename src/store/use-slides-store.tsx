import { v4 as uuidv4 } from "uuid";
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { DraggableImageT, Slide } from "../types/slide.types";



type Store = {
  slideList: Slide[];
  currentSlide?: Slide;
  currentSlideIndex: number;
  updateCurrentSlideCode: (code: string) => void;
  updateCurrentSlideFilename: (filename: string) => void;
  updateCurrentSlideImageList: (imageList: DraggableImageT[]) => void;
  addSlide: () => void;
  addNewCurrentSlideCopy: (code: string) => void;
  deleteSlide: (slide: Slide) => void;
  deleteImageFromCurrentSlide: (image: DraggableImageT) => void;
  goToPreviousSlide: () => void;
  goToNextSlide: () => void;
  setSlideList: (slides: Slide[]) => void;
  setCurrentSlide: (slide?: Slide) => void;
}





const useSlidesStore = create(devtools(persist(subscribeWithSelector<Store>((set, get) => ({

  //STATE

  slideList: [],
  currentSlide: undefined,
  currentSlideIndex: -1,

  // SYNCHRONOUS ACTIONS

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
    const { currentSlide, slideList, currentSlideIndex } = get();
    if (currentSlide) {
      const newSlideList = [...slideList];
      newSlideList[currentSlideIndex].imageList = imageList;
      set({ slideList: newSlideList, currentSlide: newSlideList[currentSlideIndex] });
    }
  },

  addSlide: () => {
    const { slideList } = get();
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
      set({ slideList: [newSlide], currentSlide: newSlide });
    } else {
      const previousSlide = { ...slideList[slideList.length - 1] };
      const newSlide = {
        ...previousSlide,
        id: uuidv4(),
        imageList: previousSlide.imageList.map((image) => ({
          ...image,
          id: uuidv4(),
        })),
      };
      set({ slideList: [...slideList, newSlide], currentSlide: newSlide });
    }
  },

  addNewCurrentSlideCopy: (code: string) => {
    const { slideList, currentSlide } = get();
    if (currentSlide) {
      const slideListToUpdate = [...slideList];
      const currentSlideIndex = slideListToUpdate.findIndex(
        (slide) => slide.id === currentSlide.id
      );
      slideListToUpdate.splice(currentSlideIndex + 1, 0, {
        ...currentSlide,
        code,
        id: uuidv4(),
        imageList: currentSlide.imageList.map((image) => ({
          ...image,
          id: uuidv4(),
        })),
      });
      set({ slideList: slideListToUpdate });
    }
  },
  deleteSlide: (slide: Slide) => {
    const { slideList, currentSlideIndex } = get();
    const currentDeletingSlideIndex = slideList.findIndex(
      (s) => s.id === slide.id
    );
    const newSlideList = [...slideList];
    newSlideList.splice(currentDeletingSlideIndex, 1);

    if (newSlideList.length === 0) {
      set({ currentSlide: undefined });
    } else {
      if (currentDeletingSlideIndex === currentSlideIndex) {
        if (currentDeletingSlideIndex === slideList.length - 1) {
          set({ currentSlide: slideList[currentSlideIndex - 1] });
        } else {
          set({ currentSlide: slideList[currentSlideIndex + 1] });
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
    const { slideList, currentSlideIndex } = get();
    set({ currentSlide: slideList[currentSlideIndex - 1] });
  },

  goToNextSlide: () => {
    const { slideList, currentSlideIndex } = get();
    set({ currentSlide: slideList[currentSlideIndex + 1] });
  },

  setSlideList: (slides: Slide[]) => {
    set({ slideList: slides });
  },

  setCurrentSlide: (slide?: Slide) => {
    set({ currentSlide: slide })
  },
})), {
  name: 'slideList',
})))

// SYNCHRONOUS EFFECTS

useSlidesStore.subscribe(({ currentSlide, slideList }) => currentSlide, function updateIndex() {
  const { slideList, currentSlide } = useSlidesStore.getState()
  const newSlideIndex = slideList.findIndex(s => s.id === currentSlide?.id)
  useSlidesStore.setState({ currentSlideIndex: newSlideIndex })
})


export { useSlidesStore };

