"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  SANDPACK_THEMES,
  SandpackConsole,
  SandpackFileExplorer,
  SandpackLayout,
  Navigator as SandpackNavigator,
  SandpackPreview,
  SandpackProvider,
  SandpackTests,
} from "@codesandbox/sandpack-react";
import { BookOpenIcon, FileIcon, FileTextIcon, HistoryIcon, PlayIcon, SquareTerminalIcon } from "lucide-react";

import { MonacoEditor } from "@/components";
import { Resizable, Tabs } from "@/components/ui";

const addTestFile = `import * as matchers from 'jest-extended';
import { add } from './add';

expect.extend(matchers);

describe('jest-extended matchers are supported', () => {
  test('adding two positive integers yields a positive integer', () => {
    expect(add(1, 2)).toBePositive();
  });
});
`;

const addFile = `export const add = (a: number, b: number): number => a + b;`;

const SandpackIde: React.FC = () => {
  const [theme] = useState(SANDPACK_THEMES.dark);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  return (
    <SandpackProvider
      customSetup={{ dependencies: { "jest-extended": "^3.0.2" } }}
      files={{ "/add.test.ts": addTestFile, "add.ts": addFile }}
      template="react"
      theme={theme}
      style={{ height: "100%", padding: 12 }}
    >
      <SandpackLayout className="h-full" style={{ background: "transparent", border: "none" }}>
        <Resizable.PanelGroup direction="horizontal">
          <Resizable.Panel defaultSize={30} minSize={10}>
            <Tabs.Root
              className="border border-neutral-800 bg-[#1E1E1E] h-full rounded-lg"
              defaultValue={`${searchParams.get("tab") ?? "description"}`}
            >
              <Tabs.List className="bg-transparent my-1 mx-2 gap-x-2">
                <Tabs.Trigger
                  className="text-neutral-500 data-[state=active]:bg-transparent cursor-pointer hover:text-green-500 shadow-none font-medium"
                  value="description"
                  onClick={() => router.push(`${pathName}?tab=description`)}
                >
                  <FileTextIcon className="w-1 h-1" />
                  <p>Description</p>
                </Tabs.Trigger>

                <Tabs.Trigger
                  className="text-neutral-500 data-[state=active]:bg-transparent cursor-pointer hover:text-green-500 shadow-none font-medium"
                  value="file-explorer"
                  onClick={() => router.push(`${pathName}?tab=file-explorer`)}
                >
                  <FileIcon className="w-1 h-1" />
                  <p>File Exlporer</p>
                </Tabs.Trigger>

                <Tabs.Trigger
                  className="text-neutral-500 data-[state=active]:bg-transparent cursor-pointer hover:text-green-500 shadow-none font-medium"
                  value="editorial"
                  onClick={() => router.push(`${pathName}?tab=editorial`)}
                >
                  <BookOpenIcon className="w-1 h-1" />
                  <p>Editorial</p>
                </Tabs.Trigger>

                <Tabs.Trigger
                  className="text-neutral-500 data-[state=active]:bg-transparent cursor-pointer hover:text-green-500 shadow-none font-medium"
                  value="submissions"
                  onClick={() => router.push(`${pathName}?tab=submissions`)}
                >
                  <HistoryIcon className="w-1 h-1" />
                  <p>Submissions</p>
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content className="h-full px-5" value="file-explorer">
                <SandpackFileExplorer className="h-full bg-[#1E1E1E]" style={{ background: "#1E1E1E" }} />
              </Tabs.Content>
              <Tabs.Content className="h-full px-5" value="description">
                <h1 className="text-2xl font-semibold">Description</h1>
              </Tabs.Content>
              <Tabs.Content className="h-full px-5" value="editorial">
                <h1 className="text-2xl font-semibold">Editorial</h1>
              </Tabs.Content>
              <Tabs.Content className="h-full px-5" value="submissions">
                <h1 className="text-2xl font-semibold">Submission</h1>
              </Tabs.Content>
            </Tabs.Root>
          </Resizable.Panel>

          <Resizable.Handle className="p-0.5 mx-1 bg-transparent hover:bg-yellow-200 rounded-full transition-colors" />

          <Resizable.Panel className="rounded-lg border border-neutral-800" defaultSize={40} minSize={10}>
            <MonacoEditor language="javascript" />
          </Resizable.Panel>

          <Resizable.Handle className="p-0.5 mx-1 bg-transparent hover:bg-yellow-200 rounded-full transition-colors" />

          <Resizable.Panel defaultSize={30} minSize={10}>
            <Resizable.PanelGroup direction="vertical">
              <Resizable.Panel className="rounded-lg border border-neutral-800" defaultSize={50} minSize={20}>
                <SandpackNavigator className="rounded-t-lg" clientId="" />
                <SandpackPreview className="h-full" />
              </Resizable.Panel>

              <Resizable.Handle className="p-0.5 my-1 bg-transparent hover:bg-yellow-200 rounded-full transition-colors" />

              <Resizable.Panel defaultSize={50} minSize={20}>
                <Tabs.Root
                  defaultValue="test-cases"
                  className="border border-neutral-800 bg-[#1E1E1E] h-full rounded-lg"
                >
                  <Tabs.List className="bg-transparent my-1 mx-2">
                    <Tabs.Trigger
                      className="text-neutral-500 data-[state=active]:bg-transparent cursor-pointer hover:text-green-500"
                      value="test-cases"
                    >
                      <PlayIcon className="w-1 h-1" />
                      <p>Run Tests</p>
                    </Tabs.Trigger>

                    <Tabs.Trigger
                      className="text-neutral-500 data-[state=active]:bg-transparent cursor-pointer hover:text-green-500"
                      value="console"
                    >
                      <SquareTerminalIcon className="w-1 h-1" />
                      <p>Console</p>
                    </Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content className="h-full" value="test-cases">
                    <SandpackTests
                      watchMode
                      showVerboseButton={false}
                      showWatchButton={false}
                      className="h-full rounded-lg"
                      style={{ background: "#1E1E1E" }}
                    />
                  </Tabs.Content>
                  <Tabs.Content className="h-full" value="console">
                    <SandpackConsole
                      className="h-full rounded-lg"
                      style={{ background: "#1E1E1E" }}
                      showSetupProgress={false}
                      resetOnPreviewRestart
                    />
                  </Tabs.Content>
                </Tabs.Root>
              </Resizable.Panel>
            </Resizable.PanelGroup>
          </Resizable.Panel>
        </Resizable.PanelGroup>
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default SandpackIde;
