import { Emoji } from "@/types/slide.types"
import { cx } from "class-variance-authority"

const EMOJI :{name: string, emoji: string}[]= [{name: "left", emoji: "👈"}, {name: "right", emoji: "👉"}, {name: "up", emoji: "👆"}, {name: "down", emoji: "👇"}]
export function EmojiList(p: { onSelect: (emoji: {name: string, emoji: string}) => void , selectedEmoji: {name: string, emoji: string}}) {
  return <div className="flex flex-col gap-6 " >
    {EMOJI.map(emojiObj => {
      return <div onClick={() => p.onSelect(p.selectedEmoji.name === emojiObj.name ? {name: "", emoji: ""}: emojiObj)} className={cx(" cursor-pointer flex flex-center text-[10rem] ", p.selectedEmoji.name === emojiObj.name ? "bg-purple-400" : "")} >{emojiObj.emoji}</div>
    })}
  </div>

}
