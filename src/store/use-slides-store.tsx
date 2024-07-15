import { hookstate, useHookstate, State, __state } from "@hookstate/core";
import { subscribable } from "@hookstate/subscribable";

import { Slide } from "../types/slide.types";
import { DEFAULT_SLIDE_LIST } from "@/constant";
import { useEffect } from "react";

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

export const useSlideStore = () => {
  const { slideList, currentSlide, currentSlideIndex } = useHookstate(
    slideStore
  );

  //Update slide index when slide changes
  useEffect(function onCurrentSlideChange() {
    currentSlideIndex.set(slideList.findIndex((s) => s.get().id == currentSlide?.get()?.id));
  }, [currentSlide]);

  useEffect(function onSlideListChange() {
    localStorage.setItem("slideList", JSON.stringify(slideList));
    if (slideList.get().length === 0) {
      currentSlide.set(undefined);
    }
  }, [slideList]);

  return { slideList, currentSlide, currentSlideIndex };
};
