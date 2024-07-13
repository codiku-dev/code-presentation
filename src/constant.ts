import { Slide } from "@/types/slide.types";
export const CODE_FONT_SIZE = "1rem";
export const INITIAL_SLIDES: Slide[] = [
  {
    id: "x1",
    fileName: "code.tsx",
    code: 'function StartEditingYourSlides(){\n                    console.log("ctrl+s will format")\n    }',
    imageList: [],
  },
  {
    id: "x4",
    fileName: "code.tsx",
    code: 'function StartEditingYourSlides() {\n  console.log("Drag emojis from the right nav")\n}',
    imageList: [
      {
        id: "1eae6dc5-6926-49e6-b977-731fbba2bb44",
        filePath: `${window.location.origin}/point_right.png`,
        x: 1034.9687600000002,
        y: 328.3984375,
      },
    ],
  },
  {
    id: "cec9c7d6-487a-40ac-b253-d53a047015e2",
    fileName: "code.tsx",
    code: 'function StartEditingYourSlides() {\n  console.log("Delete emojis by right clicking on them")\n}',
    imageList: [
      {
        id: "760952db-d8f3-4b97-b6c7-4cc0d7acf116",
        filePath: `${window.location.origin}/point_right.png`,
        x: 1034.9687600000002,
        y: 328.3984375,
      },
    ],
  },
];
