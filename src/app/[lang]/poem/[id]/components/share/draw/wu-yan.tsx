/* eslint-disable @next/next/no-img-element */
import { type Author, type Poem } from "@prisma/client";
import { Verse } from "~/components/verse";
import { cn } from "~/utils";

interface Props {
  data: Poem & { author: Author };
  className?: string;
  bgImg: string;
}

export default function DrawWuYanPreview({ data, className, bgImg }: Props) {
  const content = data.content
    .replace(/\n/g, "")
    .match(/[^(？|，|。|！)]+(？|，|。|！)?|(？|，|。|！)/g)
    ?.slice(0, 4);

  return (
    <div
      className={cn("relative h-[732px] w-[540px]", className)}
      id="draw-share-card"
    >
      <img
        src={bgImg}
        alt="background"
        className="z-1 absolute left-0 top-0 h-full w-full"
      />
      <div className="absolute bottom-4 right-4 text-lg text-muted-foreground">
        aspoem
      </div>
      <div className={"relative z-20 flex h-full items-center p-8"}>
        <div className="-mt-24 w-full overflow-hidden rounded-xl bg-background/10 pb-4 backdrop-blur-md">
          <Verse content={data.title} variant="title" />
          <p className="my-2 text-center text-xl">
            {data.author.dynasty} · {data.author.name}
          </p>
          <div className="space-y-2">
            {content!.map((line, index) => {
              return <Verse key={index} content={line} variant="shi" />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
