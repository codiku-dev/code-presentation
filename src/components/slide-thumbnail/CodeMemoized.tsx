import { memo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CodeMemoized = memo((p: { code: string }) => {
  return (
    <SyntaxHighlighter
      customStyle={{ backgroundColor: "transparent" }}
      language="tsx"
      style={theme}
    >
      {p.code}
    </SyntaxHighlighter>
  );
});
