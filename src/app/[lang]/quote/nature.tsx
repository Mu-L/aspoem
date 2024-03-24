import { type Quote } from "@prisma/client";
import { type Locale } from "~/dictionaries";
import { cn } from "~/utils";

interface Props {
  data: Quote;
  lang: Locale;
}

const NatureBgPreview = ({ data, lang }: Props) => {
  const content = (
    lang === "zh-Hans" ? data.quote : data.quote_zh_Hant || ""
  ).split(/。|，|；|！|？/);

  return (
    <div
      id="draw-share-card"
      className="relative h-[600px] w-[450px] bg-cover bg-no-repeat p-6 text-white"
      style={{
        backgroundImage: `url(https://source.unsplash.com/random/?nature)`,
      }}
    >
      <div className={cn("h-full w-full")}>
        <div className="mt-12 space-y-4 rounded-xl bg-white/5 py-8 shadow-md backdrop-blur-xl">
          {content.map((c, i) => {
            return (
              <div key={i} className="text-center text-5xl text-white">
                {c}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full pb-2 pr-4 text-right text-base font-light text-white"
        style={{
          mixBlendMode: "difference",
        }}
      >
        aspoem
      </div>
    </div>
  );
};

export default NatureBgPreview;
