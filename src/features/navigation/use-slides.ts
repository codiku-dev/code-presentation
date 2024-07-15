import { useState, useMemo, useEffect, useCallback } from "react";
import { INITIAL_SLIDES } from "../../constant";
import { DraggableImageT, Slide } from "../../types/slide.types";
import { v4 as uuidv4 } from "uuid";
export const useSlides = () => {
  const [slideList, setSlideList] = useState<Slide[]>(
    localStorage.getItem("slideList")
      ? JSON.parse(localStorage.getItem("slideList")!)
      : INITIAL_SLIDES
  );
  const [currentSlide, setCurrentSlide] = useState<Slide | undefined>(
    slideList[0]
  );
  const currentSlideIndex = useMemo(() => {
    return slideList.findIndex((s) => s.id == currentSlide?.id);
  }, [slideList, currentSlide]);

  useEffect(() => {
    localStorage.setItem("slideList", JSON.stringify(slideList));
    if (slideList.length === 0) {
      setCurrentSlide(undefined);
    }
  }, [slideList]);

  const updateCurrentSlideCode = useCallback(
    (code: string) => {
      const newSlideList = [...slideList];
      newSlideList[currentSlideIndex].code = code;
      setSlideList(newSlideList);
    },
    [slideList, currentSlideIndex]
  );

  const updateCurrentSlideFilename = useCallback(
    (filename: string) => {
      const newSlideList = [...slideList];
      newSlideList[currentSlideIndex].fileName = filename;
      setSlideList(newSlideList);
    },
    [slideList, currentSlideIndex]
  );

  const updateCurrentSlideImageList = useCallback(
    (imageList: DraggableImageT[]) => {
      const newSlideList = [...slideList];
      newSlideList[currentSlideIndex].imageList = imageList;
      setSlideList(newSlideList);
    },
    [slideList, currentSlideIndex]
  );

  const addSlide = useCallback(() => {
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
  }, [slideList]);

  const addNewCurrentSlideCopy = useCallback(
    (code: string) => {
      if (currentSlide) {
        const slideListToUpdate = [...slideList];
        const currentSlideIndex = slideListToUpdate.findIndex(
          (slide) => slide.id === currentSlide.id
        );
        slideListToUpdate.splice(currentSlideIndex + 1, 0, {
          ...currentSlide,
          code,
          id: uuidv4(),
          imageList: currentSlide.imageList.map((image) => {
            return { ...image, id: uuidv4() };
          }),
        });
        setSlideList(slideListToUpdate);
      }
    },
    [slideList, currentSlide]
  );

  const deleteSlide = useCallback(
    (slide: Slide) => {
      const currentDeletingSlideIndex = slideList.findIndex(
        (s) => s.id === slide.id
      );
      const newSlideList = [...slideList];
      newSlideList.splice(
        newSlideList.findIndex((s) => s.id == slide.id),
        1
      );

      if (
        currentDeletingSlideIndex == currentSlideIndex &&
        newSlideList.length > 0
      ) {
        if (currentDeletingSlideIndex == slideList.length - 1) {
          setCurrentSlide(slideList[currentSlideIndex - 1]);
        } else {
          setCurrentSlide(slideList[currentSlideIndex + 1]);
        }
      }

      setSlideList(newSlideList);
    },
    [slideList, currentSlideIndex]
  );

  const deleteImageFromCurrentSlide = useCallback(
    (image: DraggableImageT) => {
      const newSlideList = [...slideList];
      newSlideList[currentSlideIndex].imageList = newSlideList[
        currentSlideIndex
      ].imageList.filter((img) => img.id !== image.id);
      setSlideList(newSlideList);
    },
    [slideList, currentSlideIndex]
  );

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide(slideList[currentSlideIndex - 1]);
  }, [slideList, currentSlideIndex]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide(slideList[currentSlideIndex + 1]);
  }, [slideList, currentSlideIndex]);

  return {
    slideList,
    currentSlide,
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
    setSlideList,
    setCurrentSlide,
  };
};
