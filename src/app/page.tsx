import { SandpackIde } from "@/components/ide";
import { Suspense } from "react";

export default function Home() {
  return (
    <section className="grow">
      <Suspense fallback={null}>
        <SandpackIde />
      </Suspense>
    </section>
  );
}
