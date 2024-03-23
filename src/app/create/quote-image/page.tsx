"use client";

import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function Page() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;

  const { data } = api.quote.find.useQuery({
    page: Number(page),
  });

  return (
    <div>
      <h1 className="prose-h1">名句壁纸</h1>

      <div className="mt-8">
        {data?.map((item) => (
          <div className="flex h-12 items-center border-b" key={item.id}>
            <div>{item.quote}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
