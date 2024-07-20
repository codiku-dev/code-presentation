import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror from "@uiw/react-codemirror";
import * as prettier from "prettier";
import babel from "prettier/plugins/babel";
import esTree from "prettier/plugins/estree";
import "./slide-input.css";

import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { useSlidesStore } from "@/store/use-slides-store";
import { forwardRef, memo, useEffect, useRef } from "react";
const EXTENSIONS = [javascript({ jsx: true, typescript: true })];
const TOAST_DURATION = 6000;
export const SlideInput = memo(
  forwardRef(
    (
      p: {
        style?: React.CSSProperties;
      },
      codeMirrorRef: React.ForwardedRef<any>
    ) => {
      const {
        updateCurrentSlideCode,
        addNewCurrentSlideCopyWithCode,
        getCurrentSlide,
        setIsCodeInputFocused,
      } = useSlidesStore();
      const currentSlide = getCurrentSlide();

      const refProgress = useRef(0);
      const toastRef = useRef<any>(null);

      let intervalIdProgressUpdateRef = useRef<number>();
      const selectedLineRef = useRef<{
        lineNumber: number | null;
        content: string;
        anchor: number | null;
      }>({ lineNumber: null, content: "", anchor: null });
      const oldCodeRef = useRef(currentSlide.code);

      useEffect(() => {
        const handleKeyDown = async (event: KeyboardEvent) => {
          if (
            (event.ctrlKey || event.metaKey) &&
            (event.key === "s" || event.key === "S")
          ) {
            event.preventDefault();
            const formattedCode = await prettier.format(currentSlide.code, {
              semi: false,
              parser: "babel",
              plugins: [esTree, babel],
            });
            updateCurrentSlideCode(formattedCode);
          } else if (event.altKey && refProgress.current > 0) {
            clearIntervalAndProgress();
            event.preventDefault();
            addNewCurrentSlideCopyWithCode(oldCodeRef.current);
            toastRef.current.dismiss();
          }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [currentSlide.code, refProgress.current]);

      const startToastProgress = (toastRef: any) => {
        const updateFrequency = TOAST_DURATION / 3000;
        intervalIdProgressUpdateRef.current = setInterval(() => {
          refProgress.current = refProgress.current + 0.05;
          toastRef.current.update({
            id: toastRef.current.id,
            description: renderToastDescription(),
          });
          if (refProgress.current >= 100) {
            setTimeout(() => {
              toastRef.current.dismiss();
              clearIntervalAndProgress();
            }, 500);
          }
        }, updateFrequency);
      };
      const renderToastDescription = () => (
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Press
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">alt</span>
            </kbd>
            to keep the previous content as a slide
          </p>
          <Progress value={refProgress.current} />
        </div>
      );

      const clearIntervalAndProgress = () => {
        clearInterval(intervalIdProgressUpdateRef.current);
        refProgress.current = 0;
      };

      return (
        <div
          className="code-text-input h-full"
          onClick={(e) => {
            setIsCodeInputFocused(true);
          }}
        >
          <CodeMirror
            placeholder={`// Write your code here`}
            ref={codeMirrorRef}
            value={currentSlide.code}
            onFocus={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsCodeInputFocused(true);
            }}
            onBlur={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsCodeInputFocused(false);
              console.log("blur");
            }}
            onCutCapture={(e) => {
              oldCodeRef.current = currentSlide.code;
              clearIntervalAndProgress();

              toastRef.current = toast({
                title: "Quick create",
                description: renderToastDescription(),
                duration: Infinity,
              });
              startToastProgress(toastRef);
            }}
            style={{
              overflowX: "hidden",
              height: "100%",
              ...p.style,
            }}
            theme={dracula}
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
            }}
            onStatistics={(data) => {
              if (data.selectionAsSingle.from !== 0) {
                selectedLineRef.current = {
                  lineNumber: data.line.number,
                  content: data.line.text,
                  anchor: data.selectionAsSingle.from,
                };
              }
            }}
            extensions={EXTENSIONS}
            onChange={updateCurrentSlideCode}
          />
        </div>
      );
    }
  )
);
