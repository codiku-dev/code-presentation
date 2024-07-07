import { SlideNavigation } from "@/features/slide-navigation";
import { SlideInput } from "@/features/slide-input/slide-input";
import { SlideLayout } from "@/features/slide-layout";
import { Button } from "@/components/ui/button";
import { SlidePreview } from "@/features/slide-preview/slide-preview";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const INITIAL_CODE = `const hey = "Try to preview !"`;
export function Home() {
  const [isPreviewShown, setisPreviewShown] = useState(false);
  const [code, setCode] = useState(INITIAL_CODE);

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
        <div className="flex gap-2">
          <SlideNavigation />
          <div className=" p-2 w-full  mt-6 flex-center">
            <div className={`flex w-full flex-center  gap-12 `}>
              {isPreviewShown && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCode(INITIAL_CODE)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              <SlideLayout>
                {isPreviewShown ? (
                  <SlidePreview code={code} />
                ) : (
                  <SlideInput code={code} />
                )}
              </SlideLayout>
              {isPreviewShown && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCode(`const hello = "world yo!"`)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <Button
            className="absolute w-44 right-4 top-4"
            onClick={() => setisPreviewShown(!isPreviewShown)}
          >
            {isPreviewShown ? "Go to edit" : "Go to preview"}
          </Button>
        </div>
      </div>
    </div>
  );
}
