export type Slide = {
  code: string;
  fileName: string;
  imageList: DraggableImageT[];
};

export type DraggableImageT = {
  id: string;
  x?: number;
  y?: number;
  filePath: string;
};
