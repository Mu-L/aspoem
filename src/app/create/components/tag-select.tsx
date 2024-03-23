"use client";

import * as React from "react";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { type Tag } from "@prisma/client";

export function TagSelect(props: { onChange: (value: Tag[]) => void }) {
  const { data } = api.tag.search.useQuery("");
  const [select, setSelect] = React.useState<Tag[]>([]);

  return (
    <div className="space-x-1 space-y-1">
      {data?.map((tag) => {
        const v = select.find((item) => item.name === tag.name);

        return (
          <Button
            size={"sm"}
            variant={v ? "default" : "ghost"}
            key={tag.id}
            onClick={() => {
              const value = v
                ? select.filter((item) => item.name !== tag.name)
                : [...select, tag];

              setSelect(value);
              props.onChange(value);
            }}
          >
            {tag.name}
          </Button>
        );
      })}
    </div>
  );
}
