import { SlideThumbnail } from "@/components/slide-thumbnail/slide-thumbnail";
import { useSlidesStore } from "@/store/use-slides-store";
import { Slide } from "@/types/slide.types";
import { cx } from "class-variance-authority";
import { Plus } from "lucide-react";
import { useCallback } from "react";
import DraggableList from "react-draggable-list";
import { SlideAddThumbnail } from "./slide-add-thumbnail";

export const Navigation = () => {
  const { slideList, getCurrentSlide, setCurrentSlide, deleteSlide, addSlide, setSlideOrder, addNewSlideBefore } = useSlidesStore();

  const template = (props: any) => {
    return (
      <DraggableSlideThumbnailTemplate
        {...props}
        onClickItem={setCurrentSlide}
        onClickDelete={deleteSlide}
        currentSlide={getCurrentSlide()}
        onClickAdd={addSlide}
        onChangeOrder={setSlideOrder}
        onClickAddNewSlideBefore={addNewSlideBefore}
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
        list={slideList}
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
  item: Slide;
  itemSelected: number;
  dragHandleProps: object;
  currentSlide?: Slide;
  onClickItem: (slide: Slide) => void;
  onClickDelete: (slide: Slide) => void;
  onClickAddNewSlideBefore: (slide: Slide) => void;
};
const DraggableSlideThumbnailTemplate = (p: DraggableSlideThumbnailTemplateProps) => {
  const scale = p.itemSelected * 0.05 + 1;
  const shadow = p.itemSelected * 15 + 1;
  const dragged = p.itemSelected !== 0;
  const handleClick = useCallback(() => {
    p.onClickItem(p.item);
  }, [p.item.id]);

  const handleClickTrash = useCallback(() => {
    p.onClickDelete(p.item);
  }, [p.item.id]);

  const buttonAddSlideBefore = (
    <div className="group  h-6 cursor-pointer " onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      p.onClickAddNewSlideBefore(p.item)
    }}>
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
      <div {...p.dragHandleProps} style={{
        // boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
      }}
        className="bg-blue-400">
        <SlideThumbnail
          code={p.item.code || ""}
          onClick={handleClick}
          onClickTrash={handleClickTrash}
          isActive={p.item.id == p.currentSlide?.id}
        />
      </div>
    </div>
  );
};
