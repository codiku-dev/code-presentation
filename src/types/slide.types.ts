export type Slide = {
  id: string
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
