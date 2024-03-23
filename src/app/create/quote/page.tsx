"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { convertToHant } from "~/utils/convert";

export default function Page() {
  const [text, setText] = useState("");
  const mutation = api.quote.createMany.useMutation({
    onSuccess() {
      alert("保存成功");
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

      <div className="space-y-4">
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
                quotes: quotes,
                quotes_zh_Hant: quotes_zh_Hant,
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
