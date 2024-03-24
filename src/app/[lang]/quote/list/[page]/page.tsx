import { HeaderMain } from "~/components/ui/header";
import { api } from "~/trpc/server";
import NatureBgPreview from "../../nature";
import { type Locale } from "~/dictionaries";

export default async function Page({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: { lang: Locale };
}) {
  const data = await api.quote.find.query({
    page: Number(params.page),
  });

  return (
    <div>
      <HeaderMain>
        <div className="flex h-16 flex-1 items-center justify-between pl-4">
          <div className="flex h-full flex-1 items-center justify-between">
            <span className="text-f200">名句</span>
          </div>
        </div>
      </HeaderMain>

      <div className="p-4">
        {data.map((item) => {
          return (
            <div className="space-y-4 rounded-md p-4" key={item.id}>
              <div>
                <p className="text-f100">{item.quote}</p>
              </div>

              <div className="flex w-full justify-center overflow-hidden rounded-xl border border-border">
                <NatureBgPreview data={item} lang={searchParams.lang} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
