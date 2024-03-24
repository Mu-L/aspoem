"use client";
import DrawWuYanPreview from "~/app/[lang]/poem/[id]/components/share/draw/wu-yan";
import { api } from "~/trpc/react";

export default function Page() {
  const { data } = api.poem.findById.useQuery({
    id: 2235,
  });

  return (
    data && (
      <DrawWuYanPreview
        data={data}
        bgImg="https://source.unsplash.com/random/1080x1920?Nature"
      />
    )
  );
}
