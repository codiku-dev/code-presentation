import { Button } from "@/components/ui/button";
import { Navigation } from "@/features/navigation";
import { SlideInput } from "@/features/slide-input/slide-input";
import { SlideLayout } from "@/features/slide-layout";
import { SlidePreview } from "@/features/slide-preview/slide-preview";
import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";

export function Home() {
  const [isPreviewShown, setisPreviewShown] = useState(false);
  const [slideCodeList, setSlideCodeList] = useState<string[]>([
    `let welcome = "Hello"`,
    `let welcome = "Hello"
function addWorld(){

}`,
    `let welcome = "Hello"
function addWorld(){
  console.log(welcome)
}`,
    `let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}`,
    `let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}
let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}
let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}
let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}
let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}
let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}
let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}
let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}
let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}
let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}
let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}
let welcome = "Hello"
function addWorld(){
  welcome+" World !"
  console.log(welcome)
}`,
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlideCode = slideCodeList[currentSlideIndex];

  const updateCurrentSlideCode = (value: string) => {
    const newSlideCodeList = [...slideCodeList];
    newSlideCodeList[currentSlideIndex] = value;
    setSlideCodeList(newSlideCodeList);
  };
  const addSlide = () => {
    setSlideCodeList([
      ...slideCodeList,
      slideCodeList[slideCodeList.length - 1],
    ]);
    setCurrentSlideIndex(slideCodeList.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlideIndex(currentSlideIndex - 1);
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isPreviewShown) {
        if (
          event.key === "ArrowRight" &&
          currentSlideIndex < slideCodeList.length - 1
        ) {
          goToNextSlide();
        } else if (event.key === "ArrowLeft" && currentSlideIndex > 0) {
          goToPreviousSlide();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPreviewShown, currentSlideIndex]);

  const backgroundEdit = (children: React.ReactNode) => {
    return (
      <div className="  h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
          {children}
        </div>
      </div>
    );
  };

  const backgroundPreview = (children: React.ReactNode) => {
    return (
      <div className=" z-[-2] w-screen h-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        {children}
      </div>
    );
  };

  const content = (
    <div className="flex gap-2">
      <div className={cx(!isPreviewShown ? "visible" : "invisible")}>
        <Navigation
          slideCodeList={slideCodeList}
          currentSlideIndex={currentSlideIndex}
          onClickItem={(index) => setCurrentSlideIndex(index)}
          onClickAdd={addSlide}
        />
      </div>
      <div className="w-full flex justify-center ">
        <div
          className={`h-full w-full gap-12 pt-12 overflow-y-hidde flex-center`}
        >
          {/* {isPreviewShown && (
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousSlide}
            className={cx(currentSlideIndex === 0 && "invisible", "bg-transparent border-none hover:bg-transparent")}
          >
            <ChevronLeft className="h-4 w-4 text-gray-400 hover:text-white" />
          </Button>
        )} */}
          <SlideLayout isPreviewMode={isPreviewShown}>
            {isPreviewShown ? (
              <SlidePreview code={currentSlideCode} />
            ) : (
              <SlideInput
                code={currentSlideCode}
                onChange={updateCurrentSlideCode}
              />
            )}
          </SlideLayout>
          {/* {isPreviewShown && (
          <Button

            variant="outline"
            size="icon"
            className={cx(currentSlideIndex === slideCodeList.length - 1 && "invisible", "bg-transparent border-none hover:bg-transparent")}
            onClick={goToNextSlide}
          >
            <ChevronRight className="h-4 w-4 text-gray-400 hover:text-white" />
          </Button>
        )} */}
        </div>
      </div>
      <Button
        className="absolute w-44 right-4 top-4"
        onClick={() => setisPreviewShown(!isPreviewShown)}
      >
        {isPreviewShown ? "Go to edit" : "Go to preview"}
      </Button>
    </div>
  );
  return isPreviewShown ? backgroundPreview(content) : backgroundEdit(content);
}
