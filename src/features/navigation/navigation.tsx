import { SlideThumbnail } from "@/components/slide-thumbnail/slide-thumbnail";
import { useSlidesStore } from "@/store/use-slides-store";
import { Slide } from "@/types/slide.types";
import { cx } from "class-variance-authority";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import DraggableList from "react-draggable-list";
import { SlideAddThumbnail } from "./slide-add-thumbnail";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";

export const Navigation = (p: {
  onClick: () => void;
  slideInputRef: React.RefObject<ReactCodeMirrorRef>;
}) => {
  const {
    slideList,
    getCurrentSlide,
    setCurrentSlide,
    deleteSlide,
    addSlide,
    setSlideOrder,
    addNewSlideBefore,
    setSlideIdInClipBoard,
    addCurrentSlideCopy,
    isFileNameInputFocused,
    goToNextSlide,
  } = useSlidesStore();

  const currentSlide = getCurrentSlide();
  const slideListWithIndex = slideList.map((slide, index) => ({
    ...slide,
    index,
  }));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === "c" || event.key === "C")
      ) {
        if (currentSlide) {
          setSlideIdInClipBoard(currentSlide.id);
        }
      } else if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === "v" || event.key === "V")
      ) {
        if (
          p.slideInputRef?.current?.view?.hasFocus === false &&
          isFileNameInputFocused === false
        ) {
          addCurrentSlideCopy();
          goToNextSlide();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide]);

  const template = (props: DraggableSlideThumbnailTemplateProps) => {
    return (
      <DraggableSlideThumbnailTemplate
        {...props}
        onClickItem={() => {
          setCurrentSlide(props.item);
          p.onClick();
        }}
        onClickDelete={deleteSlide}
        currentSlide={getCurrentSlide()}
        onClickAddNewSlideBefore={addNewSlideBefore}
        label={String(props.item.index + 1)}
      />
    );
  };
  return (
    <div className="fixed overflow-y-auto h-[calc(100vh-2rem)] p-4 flex flex-col">
      <DraggableList<Slide, any, any>
        padding={0}
        itemKey={"id"}
        springConfig={{ stiffness: 300, damping: 25, precision: 0.01 }}
        template={template as any}
        list={slideListWithIndex}
        onMoveEnd={(slides) => {
          setSlideOrder(slides as Slide[]);
        }}
      />
      <div className="mt-6">
        <SlideAddThumbnail onClick={addSlide} />
      </div>
    </div>
  );
};

type DraggableSlideThumbnailTemplateProps = {
  item: Slide & { index: number };
  itemSelected: number;
  dragHandleProps: object;
  currentSlide?: Slide;
  onClickItem: (slide: Slide) => void;
  onClickDelete: (slide: Slide) => void;
  onClickAddNewSlideBefore: (slide: Slide) => void;
  label: string;
};
const DraggableSlideThumbnailTemplate = (
  p: DraggableSlideThumbnailTemplateProps
) => {
  const scale = p.itemSelected * 0.05 + 1;
  const shadow = p.itemSelected * 15 + 1;
  // const dragged = p.itemSelected !== 0;
  const handleClick = useCallback(() => {
    p.onClickItem(p.item);
  }, [p.item.id]);

  const handleClickTrash = useCallback(() => {
    p.onClickDelete(p.item);
  }, [p.item.id]);

  const buttonAddSlideBefore = (
    <div
      className="group  h-6 cursor-pointer "
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        p.onClickAddNewSlideBefore(p.item);
      }}
    >
      <Plus
        size={12}
        className={cx(
          "invisible group-hover:visible group-hover:animate-fadeIn02  group-active:bg-primary/20 mt-[0.30rem] w-full flex-center   group-hover:bg-primary/30 text-white text-xs  rounded-md"
        )}
      />
    </div>
  );

  return (
    <div
      style={{
        transform: `scale(${scale})`,
      }}
      className=" flex flex-col"
    >
      {buttonAddSlideBefore}
      <div
        {...p.dragHandleProps}
        style={{
          boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${1.2 * shadow}px 0px`,
        }}
      >
        <SlideThumbnail
          code={p.item.code || ""}
          onClick={handleClick}
          onClickTrash={handleClickTrash}
          isActive={p.item.id == p.currentSlide?.id}
          label={p.label}
        />
      </div>
    </div>
  );
};
