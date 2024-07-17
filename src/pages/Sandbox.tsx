
import { useSlidesStore } from "@/store/use-slides-store";

export default function Sandbox() {
    const { slideList } = useSlidesStore()
    console.log("RENDER PARENT")
    return <div>{"LENGTH " + slideList.length}
        <Demo1 />
        <Demo2 />
    </div>;
}

export const Demo1 = () => {
    const { currentSlideIndex, addSlide } = useSlidesStore()
    return <div>{"CURRENT INDEX " + currentSlideIndex}
        <button type="button" onClick={() => addSlide()}>add</button>
    </div>;
};

export const Demo2 = () => {
    const { currentSlide } = useSlidesStore()
    console.log("render Demo2")
    return <div>{"CURRENT SLIDE ID " + currentSlide?.id}</div>;
};