"use client";

import { MonacoEditor } from "@/components/ide";
import { Resizable, Separator, Tabs } from "@/components/ui";
import {
  SANDPACK_THEMES,
  SandpackConsole,
  SandpackFileExplorer,
  SandpackLayout,
  Navigator as SandpackNavigator,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { BookOpenIcon, FileIcon, FileTextIcon, HistoryIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SandpackIde = () => {
  const [theme] = useState(SANDPACK_THEMES.dark);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  return (
    <SandpackProvider template="react" theme={theme} style={{ height: "100%", padding: 12 }}>
      <SandpackLayout className="h-full" style={{ background: "transparent", border: "none" }}>
        <Resizable.PanelGroup direction="horizontal">
          <Resizable.Panel defaultSize={30} minSize={10}>
            <Tabs.Root
              className="border border-neutral-800 bg-[#1E1E1E] h-full rounded-lg"
              defaultValue={`${searchParams.get("tab") ?? "description"}`}
            >
              <div className="bg-[#151515] rounded-t-lg">
                <Tabs.List className="bg-transparent my-1 mx-2 gap-x-1.5">
                  <Tabs.Trigger
                    className="space-x-2 p-1.5 text-neutral-500 data-[state=active]:bg-[#2b2a2a] data-[state=active]:text-white"
                    value="description"
                    onClick={() => router.push(`${pathName}?tab=description`)}
                  >
                    <FileTextIcon size={16} />
                    <p>Description</p>
                  </Tabs.Trigger>

                  <Separator className="h-4 bg-neutral-700" orientation="vertical" />

                  <Tabs.Trigger
                    className="space-x-2 p-1.5 text-neutral-500 data-[state=active]:bg-[#2b2a2a] data-[state=active]:text-white"
                    value="file-explorer"
                    onClick={() => router.push(`${pathName}?tab=file-explorer`)}
                  >
                    <FileIcon size={16} />
                    <p>File Exlporer</p>
                  </Tabs.Trigger>

                  <Separator className="h-4 bg-neutral-700" orientation="vertical" />

                  <Tabs.Trigger
                    className="space-x-2 p-1.5 text-neutral-500 data-[state=active]:bg-[#2b2a2a] data-[state=active]:text-white"
                    value="editorial"
                    onClick={() => router.push(`${pathName}?tab=editorial`)}
                  >
                    <BookOpenIcon size={16} />
                    <p>Editorial</p>
                  </Tabs.Trigger>

                  <Separator className="h-4 bg-neutral-700" orientation="vertical" />

                  <Tabs.Trigger
                    className="space-x-2 p-1.5 text-neutral-500 data-[state=active]:bg-[#2b2a2a] data-[state=active]:text-white"
                    value="submissions"
                    onClick={() => router.push(`${pathName}?tab=submissions`)}
                  >
                    <HistoryIcon size={16} />
                    <p>Submissions</p>
                  </Tabs.Trigger>
                </Tabs.List>
              </div>

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

          <Resizable.Handle className="p-0.5 mx-1.5 bg-transparent hover:bg-yellow-200 rounded-full transition-colors" />

          <Resizable.Panel className="rounded-lg border border-neutral-800" defaultSize={40} minSize={10}>
            <MonacoEditor language="javascript" />
          </Resizable.Panel>

          <Resizable.Handle className="p-0.5 mx-1.5 bg-transparent hover:bg-yellow-200 rounded-full transition-colors" />

          <Resizable.Panel defaultSize={30} minSize={10}>
            <Resizable.PanelGroup direction="vertical">
              <Resizable.Panel className="rounded-lg border border-neutral-800" defaultSize={60} minSize={20}>
                <SandpackNavigator className="rounded-t-lg" clientId="" />
                <SandpackPreview className="h-full" />
              </Resizable.Panel>

              <Resizable.Handle className="p-0.5 my-1.5 bg-transparent hover:bg-yellow-200 rounded-full transition-colors" />

              <Resizable.Panel defaultSize={40} minSize={20}>
                <SandpackConsole
                  className="h-full rounded-lg border border-neutral-800"
                  showSetupProgress={false}
                  resetOnPreviewRestart
                />
              </Resizable.Panel>
            </Resizable.PanelGroup>
          </Resizable.Panel>
        </Resizable.PanelGroup>
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default SandpackIde;
