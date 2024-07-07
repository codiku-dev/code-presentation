import { Button } from "@/components/ui/button";
import { Navigation } from "@/features/navigation";
import { SlideInput } from "@/features/slide-input/slide-input";
import { SlideLayout } from "@/features/slide-layout";
import { SlidePreview } from "@/features/slide-preview/slide-preview";
import { cx } from "class-variance-authority";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";


export function Home() {
  const [isPreviewShown, setisPreviewShown] = useState(false);
  const [slideCodeList, setSlideCodeList] = useState<string[]>([`let welcome = "Hello"`, `let welcome = "Hello"
function addWorld(){

}`, `let welcome = "Hello"
function addWorld(){
  console.log(welcome)
}`, `let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}`]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlideCode = slideCodeList[currentSlideIndex];

  const updateCurrentSlideCode = (value: string) => {
    const newSlideCodeList = [...slideCodeList];
    newSlideCodeList[currentSlideIndex] = value;
    setSlideCodeList(newSlideCodeList);
  }
  const addSlide = () => {
    setSlideCodeList([...slideCodeList, slideCodeList[slideCodeList.length - 1]]);
    setCurrentSlideIndex(slideCodeList.length);
  }
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
        <div className="flex gap-2">
          <Navigation slideCodeList={slideCodeList} currentSlideIndex={currentSlideIndex} onClickItem={(index) => setCurrentSlideIndex(index)} onClickAdd={addSlide} />
          <div className=" p-2 w-full  mt-6 flex-center">
            <div className={`flex w-full flex-center  gap-12 `}>
              {isPreviewShown && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
                  className={cx(currentSlideIndex === 0 && "invisible")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              <SlideLayout>
                {isPreviewShown ? (
                  <SlidePreview code={currentSlideCode} />
                ) : (
                  <SlideInput code={currentSlideCode} onChange={updateCurrentSlideCode} />
                )}
              </SlideLayout>
              {isPreviewShown && (
                <Button
                  variant="outline"
                  size="icon"
                  className={cx(currentSlideIndex === slideCodeList.length - 1 && "invisible")}
                  onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <Button
            className="absolute w-44 right-4 top-4"
            onClick={() => setisPreviewShown(!isPreviewShown)}
          >
            {isPreviewShown ? "Go to edit" : "Go to preview"}
          </Button>
        </div>
      </div>
    </div>
  );
}
