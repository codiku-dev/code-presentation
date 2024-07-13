import { Plus } from "lucide-react";

export const SlideAddThumbnail = (p: { onClick: () => void }) => {
  return (
    <div
      className=" w-32 flex-center cursor-pointer rounded-sm h-20 bg-black "
      onClick={p.onClick}
    >
      <Plus
        className=" w-6  text-white     rounded-full   cursor-pointer"
        size={25}
        onClick={(e) => {
          e.stopPropagation();
          p.onClick();
        }}
      />
    </div>
  );
};
