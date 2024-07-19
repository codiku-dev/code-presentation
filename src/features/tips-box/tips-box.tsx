import { Info, X } from "lucide-react";
import { useState } from "react";
import { ReactNode } from "react";
// Assuming you have heroicons installed

export function TipsBox(p: {}) {
  const [isOpen, setIsOpen] = useState(false);
  const isMac =
    typeof window !== "undefined" &&
    /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const ctrlOrCmd = isMac ? "⌘" : "ctrl";

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className=" animate-fadeIn03 relative p-4 bg-indigo-500 text-white rounded-md text-md">
          <button
            className="absolute top-2 right-2 text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
          <h2 className="text-lg font-semibold mb-2">Tips / Shortcuts</h2>
          <ul className="list-disc list-inside flex flex-col gap-3">
            <li>Drag/drop emoji (right click to delete)</li>
            <li>
              <Kdb>{ctrlOrCmd}</Kdb>+<Kdb>s</Kdb> to prettify the code
            </li>
            <li>
              <Kdb>{ctrlOrCmd}</Kdb>+<Kdb>x </Kdb> then <Kdb>alt</Kdb> to
              quickly create animated slides
            </li>
            <li>
              <Kdb>{ctrlOrCmd}</Kdb>+<Kdb>c</Kdb> and <Kdb>{ctrlOrCmd}</Kdb>+
              <Kdb>v</Kdb> to copy and paste slides
            </li>
          </ul>
        </div>
      ) : (
        <button
          className="p-2 h-12 w-12 flex-center bg-indigo-500/30 hover:bg-indigo-500 text-white rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <Info className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}

export function Kdb(p: { children: ReactNode }) {
  return (
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
      {p.children}
    </kbd>
  );
}
