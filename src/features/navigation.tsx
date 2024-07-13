import { cx } from "class-variance-authority";
import { Plus } from "lucide-react";
import { SlideThumbnail } from "./slide-thumbnail/slide-thumbnail";
import { Slide } from "@/types/slide.types";

import DraggableList from "react-draggable-list";

export function Navigation(p: {
  slideList: Slide[];
  currentSlide?: Slide;
  onClickItem: (slide: Slide) => void;
  onClickAdd: () => void;
  onClickDelete: (slide: Slide) => void;
  onChangeOrder: (newSlides: Slide[]) => void;
}) {
  return (
    <div className="fixed w-44 overflow-y-auto h-[calc(100vh-2rem)] p-4 flex flex-col ">
      <DraggableList<Slide, any, any>
        itemKey={"id"}
        springConfig={{ stiffness: 300, damping: 25, precision: 0.01 }}
        template={DraggableSlideThumbnailTemplate as any}
        list={p.slideList}
        onMoveEnd={(slides) => {
          p.onChangeOrder(slides as Slide[]);
        }}
      />
      <SlideAddButton onClick={p.onClickAdd} />
    </div>
  );
}

const DraggableSlideThumbnail = (p: {
  isActive: boolean;
  code: string;
  onClick: () => void;
  onClickTrash: () => void;
}) => {
  return (
    <div
      className={cx(
        "hover:ring-2 hover:ring-indigo-500 rounded-sm ",
        p.isActive ? "ring-4 ring-indigo-500" : ""
      )}
    >
      <SlideThumbnail
        code={p.code || ""}
        onClick={p.onClick}
        onClickTrash={p.onClickTrash}
      />
    </div>
  );
};

const SlideAddButton = (p: { onClick: () => void }) => {
  return (
    <div className="rounded-sm h-20 bg-black " onClick={p.onClick}>
      <div className="p-2">
        <div className=" flex justify-end">
          <Plus
            className=" w-6 self-end text-white     rounded-full   cursor-pointer"
            size={16}
            onClick={(e) => {
              e.stopPropagation();
              p.onClick();
            }}
          />
        </div>
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
};
const DraggableSlideThumbnailTemplate = (
  p: DraggableSlideThumbnailTemplateProps,
  context: any
) => {
  const scale = p.itemSelected * 0.05 + 1;
  const shadow = p.itemSelected * 15 + 1;
  const dragged = p.itemSelected !== 0;

  return (
    <div
      className={cx("", { dragged })}
      style={{
        transform: `scale(${scale})`,
        boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
      }}
    >
      <div {...p.dragHandleProps}>
        <DraggableSlideThumbnail
          isActive={p.item.id == p.currentSlide?.id}
          onClick={() => p.onClickItem(p.item)}
          onClickTrash={() => p.onClickDelete(p.item)}
          code={p.item.code}
        />
      </div>
    </div>
  );
};
