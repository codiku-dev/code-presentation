import { Slide } from "@/types/slide.types";

export const INITIAL_SLIDES: Slide[] = [
  {
    fileName: "code.tsx",
    code: `function StartEditingYourSlides(){
      console.log("ctrl+s will format")
    }`,
  },
  {
    fileName: "code.tsx",
    code: `function StartEditingYourSlides() {
  console.log("Click on preview to animate it")
}`,
  }
 
];
