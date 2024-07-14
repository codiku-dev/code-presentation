import { Slide } from "@/types/slide.types";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import * as prettier from "prettier";
import babel from "prettier/plugins/babel";
import esTree from "prettier/plugins/estree";
import "./slide-input.css";

import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { memo, useEffect, useRef } from "react";

const TOAST_DURATION = 5000;
export const SlideInput = memo(
  (p: {
    slide: Slide;
    style?: React.CSSProperties;
    onCodeChange: (code: string) => void;
    onCutAndCreateSlide?: (code: string) => void;
  }) => {
    const codeMirrorRef = useRef<ReactCodeMirrorRef>(null);
    const refProgress = useRef(0);
    const toastRef = useRef<any>(null);
    let intervalProgressUpdate: any;
    const selectedLineRef = useRef<{
      lineNumber: number | null;
      content: string;
      anchor: number | null;
    }>({ lineNumber: null, content: "", anchor: null });
    const oldCodeRef = useRef(p.slide.code);
    useEffect(() => {
      const handleKeyDown = async (event: KeyboardEvent) => {
        if ((event.ctrlKey || event.metaKey) && event.key === "s") {
          event.preventDefault();
          const formattedCode = await prettier.format(p.slide.code, {
            semi: false,
            parser: "babel",
            plugins: [esTree, babel],
          });
          p.onCodeChange(formattedCode);
        } else if (event.altKey && refProgress.current > 0) {
          event.preventDefault();
          p.onCutAndCreateSlide?.(oldCodeRef.current);
          toastRef.current.dismiss();
          clearInterval(intervalProgressUpdate);
          refProgress.current = 0;
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [p.slide.code, p.onCodeChange]);

    const startToastProgress = (toastRef: any) => {
      const updateFrequency = TOAST_DURATION / 100 / 15;
      intervalProgressUpdate = setInterval(() => {
        refProgress.current = refProgress.current + 0.1;
        toastRef.current.update({
          id: toastRef.current.id,
          description: renderToastDescription(),
        });
        if (refProgress.current >= 100) {
          clearInterval(intervalProgressUpdate);
          setTimeout(() => {
            toastRef.current.dismiss();
            refProgress.current = 0;
          }, 500);
        }
      }, updateFrequency);
    };
    const renderToastDescription = () => (
      <div>
        <p className="text-sm text-muted-foreground">
          Press
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">alt</span>
          </kbd>
          to keep the previous content as a slide
        </p>
        <Progress value={refProgress.current} />
      </div>
    );

    return (
      <div className="code-text-input">
        <CodeMirror
          ref={codeMirrorRef}
          value={p.slide.code}
          onCutCapture={(e) => {
            oldCodeRef.current = p.slide.code;
            toastRef.current = toast({
              title: "Quick create",
              description: renderToastDescription(),
              duration: Infinity,
            });
            startToastProgress(toastRef);
          }}
          style={{
            overflowX: "hidden",
            ...p.style,
          }}
          theme={dracula}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
          }}
          onStatistics={(data) => {
            // console.log(JSON.stringify(data, null, 2))
            if (data.selectionAsSingle.from !== 0) {
              selectedLineRef.current = {
                lineNumber: data.line.number,
                content: data.line.text,
                anchor: data.selectionAsSingle.from,
              };
            }
          }}
          // onKeyDown={(e) => {
          //   if ((e.key === "x" || e.key === "X") && e.metaKey && e.shiftKey) {
          //     cutCode(e);
          //   }
          // }}
          extensions={[javascript({ jsx: true, typescript: true })]}
          onChange={(value, viewUpdate) => {
            p.onCodeChange(value);
          }}
        />
      </div>
    );
  }
);
