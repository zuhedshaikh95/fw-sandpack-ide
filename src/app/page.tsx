import Link from "next/link";

import { Button } from "@/components/ui";

export default async function IndexPage() {
  return (
    <section className="h-screen w-screen flex justify-center items-center">
      <Link href="/questions/todo-list">
        <Button className="rounded-sm cursor-pointer">Go to Question</Button>
      </Link>
    </section>
  );
}
