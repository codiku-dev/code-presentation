import { useSlideStore } from "../store/use-slides-store";

export default function Sandbox() {
    const slideStore = useSlideStore();

    return <div>{slideStore.get().slideList.length}</div>;
}