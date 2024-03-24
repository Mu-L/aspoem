"use client";

import NatureBgPreview from "../nature";
import { type Locale } from "~/dictionaries";
import { api } from "~/trpc/react";

export default function Page({
  params,
}: {
  params: { lang: Locale; id: string };
}) {
  const { data } = api.quote.findById.useQuery({
    id: Number(params.id),
  });

  return (
    <div>{data && <NatureBgPreview data={data} lang={params.lang} />}</div>
  );
}
