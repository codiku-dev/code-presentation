import { Minus, Square, X } from "lucide-react";

export function SlideLayout({ children }: { children: React.ReactNode }) {
  const header = (
    <div className="relative flex">
      <div className="absolute left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
        code.tsx
      </div>
      <div className="flex gap-2 ml-auto items-center justify-center">
        <Minus className="text-gray-600" size={14} />
        <Square className="text-gray-600" size={14} />
        <X className="text-gray-600" size={14} />
      </div>
    </div>
  );
  return (
    <div className=" min-w-[900px] h-[600px]  bg-primary rounded-md  border-4 border-secondary p-4 text-white">
      {header}
      {children}
    </div>
  );
}
