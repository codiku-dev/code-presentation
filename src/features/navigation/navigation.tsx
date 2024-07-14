import { SlideThumbnail } from "@/components/slide-thumbnail/slide-thumbnail";
import { Slide } from "@/types/slide.types";
import { cx } from "class-variance-authority";
import { useCallback } from "react";
import DraggableList from "react-draggable-list";
import { SlideAddThumbnail } from "./slide-add-thumbnail";

export const Navigation = (
  (p: {
    slideList: Slide[];
    currentSlide?: Slide;
    onClickItem: (slide: Slide) => void;
    onClickAdd: () => void;
    onClickDelete: (slide: Slide) => void;
    onChangeOrder: (newSlides: Slide[]) => void;
  }) => {
    const template = (props: any) => {
      return (
        <DraggableSlideThumbnailTemplate
          {...props}
          onClickItem={p.onClickItem}
          onClickDelete={p.onClickDelete}
          currentSlide={p.currentSlide}
          onClickAdd={p.onClickAdd}
          onChangeOrder={p.onChangeOrder}
        />
      );
    };
    return (
      <div className="fixed overflow-y-auto h-[calc(100vh-2rem)] p-4 flex flex-col ">
        <DraggableList<Slide, any, any>
          itemKey={"id"}
          springConfig={{ stiffness: 300, damping: 25, precision: 0.01 }}
          template={template as any}
          list={p.slideList}
          onMoveEnd={(slides) => {
            p.onChangeOrder(slides as Slide[]);
          }}
        />
        <div className="">
          <SlideAddThumbnail onClick={p.onClickAdd} />
        </div>
      </div>
    );
  }
);

type DraggableSlideThumbnailTemplateProps = {
  item: Slide;
  itemSelected: number;
  dragHandleProps: object;
  currentSlide?: Slide;
  onClickItem: (slide: Slide) => void;
  onClickDelete: (slide: Slide) => void;
};
const DraggableSlideThumbnailTemplate = (
  p: DraggableSlideThumbnailTemplateProps
) => {
  const scale = p.itemSelected * 0.05 + 1;
  const shadow = p.itemSelected * 15 + 1;
  const dragged = p.itemSelected !== 0;

  const handleClick = useCallback(() => {
    p.onClickItem(p.item);
  }, [p.item.id]);

  const handleClickTrash = useCallback(() => {
    p.onClickDelete(p.item);
  }, [p.item.id]);
  return (
    <div
      className={cx("", { dragged })}
      style={{
        transform: `scale(${scale})`,
        boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
      }}
    >
      <div {...p.dragHandleProps}>
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
