"use client";

import { FileTabs, SandpackStack, useActiveCode, useSandpack } from "@codesandbox/sandpack-react";
import Editor from "@monaco-editor/react";

type Props = {
  language: string;
};

export const MonacoEditor: React.FC<Props> = ({ language }: Props) => {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  return (
    <SandpackStack className="h-full">
      <FileTabs closableTabs />
      <Editor
        language={language}
        theme="vs-dark"
        key={sandpack.activeFile}
        defaultValue={code}
        onChange={(value) => updateCode(value || "")}
        options={{ minimap: { enabled: false } }}
      />
    </SandpackStack>
  );
};

export default MonacoEditor;
