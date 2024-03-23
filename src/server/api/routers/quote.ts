import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const quoteRouter = createTRPCRouter({
  createMany: publicProcedure
    .input(
      z.object({
        quotes: z.array(z.string()),
        quotes_zh_Hant: z.array(z.string()),
        token: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.token !== process.env.TOKEN) throw new Error("Invalid token");

      return ctx.db.quote.createMany({
        data: input.quotes.map((text, index) => {
          return {
            quote: text,
            quote_zh_Hant: input.quotes_zh_Hant[index],
          };
        }),
      });
    }),

  find: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        pageSize: z.number().default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.quote.findMany({
        take: input.pageSize,
        skip: (input.page - 1) * input.pageSize,
        orderBy: { id: "desc" },
      });
    }),
});
