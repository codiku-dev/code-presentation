export type Slide = {
  code: string;
  fileName: string;
  imageList: PickableImage[];
};

export type PickableImage = {
  id: string;
  x?: number;
  y?: number;
  filePath: string;
};
