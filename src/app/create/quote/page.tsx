"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { convertToHant } from "~/utils/convert";
import { TagSelect } from "../components/tag-select";

export default function Page() {
  const [text, setText] = useState("");
  const [tagIds, setTagIds] = useState<number[]>([]);
  const mutation = api.quote.createMany.useMutation({
    onSuccess(result) {
      alert("保存成功");
      console.log(result);
      setText("");
    },

    onError(error) {
      alert(error.message);
    },
  });

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">
        名句
      </h3>

      <div className="mt-8 space-y-4">
        <div className="flex items-center space-x-4">
          <TagSelect
            onChange={(tags) => {
              setTagIds(tags.map((item) => item.id));
            }}
          />
        </div>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="名句多条换行分隔"
          className="mt-8 h-96 text-f50"
        />

        <div className="grid grid-cols-2 gap-8">
          <Button
            onClick={() => {
              const quotes = text.split("\n") || [];
              const quotes_zh_Hant = quotes.map((item) => convertToHant(item));

              void mutation.mutate({
                quotes,
                quotes_zh_Hant,
                tagIds,
                token: localStorage.getItem("token") || "",
              });
            }}
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}
