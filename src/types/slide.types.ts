
export type Slide = {
  code: string;
  fileName: string;
  emojiList : Emoji[]
};

export type Emoji = {
  x : number;
  y : number;
  emoji: string
  name:string
}