"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import Root from "../root";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  const navs = [
    { title: "诗词", path: "/create/poem" },
    { title: "作者", path: "/create/author" },
    { title: "标签", path: "/create/tag" },
    { title: "名句", path: "/create/quote" },
    { title: "名句图片", path: "/create/quote-image" },
  ];

  return (
    <Root
      lang="zh-Hans"
      head={
        <>
          <meta name="robots" content="noindex, nofollow" />
        </>
      }
    >
      <div className="relative z-10 flex">
        <aside className="sticky top-0 h-screen w-72 flex-shrink-0 border-r border-border">
          <nav className="grid w-full grid-cols-1 gap-y-2 p-4">
            {navs.map((item) => (
              <Button
                key={item.path}
                variant={item.path === path ? "default" : "ghost"}
                className="justify-start"
                asChild
              >
                <Link href={item.path}>{item.title}</Link>
              </Button>
            ))}
          </nav>
        </aside>
        <main className="m-auto min-h-screen max-w-screen-xl flex-1 py-8">
          {children}
        </main>
      </div>
    </Root>
  );
}
