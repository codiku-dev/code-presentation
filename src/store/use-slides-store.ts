import { hookstate, useHookstate, State } from "@hookstate/core";

import { Slide } from "../types/slide.types";
import { DEFAULT_SLIDE_LIST } from "@/constant";

type SlideStore = {
  slideList: Slide[];
  currentSlide?: Slide;
  currentSlideIndex?: number;
};
const INITIAL_SLIDES = localStorage.getItem("slideList")
  ? JSON.parse(localStorage.getItem("slideList")!)
  : DEFAULT_SLIDE_LIST;

export const slideStore = hookstate<SlideStore>({
  slideList: INITIAL_SLIDES,
  currentSlide: INITIAL_SLIDES[0],
  currentSlideIndex: 0,
});

const injectActions = (s: State<SlideStore>) => ({
  getCurrentSlideIndex: () => {
    return slideStore
      .get()
      .slideList.findIndex((s) => s.id == slideStore.get().currentSlide?.id);
  },
});

export const useSlideStore = () => injectActions(useHookstate(slideStore));

const s = useSlideStore();
s.currentSlideIndex;
