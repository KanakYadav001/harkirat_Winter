import * as z from "zod"


export const signupSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const onrampSchema = z.object({
  amount: z.number().int().positive(),
});

export const createMarketSchema = z.object({
  title: z.string().min(3),
  initialWager: z.number().int().positive(),
  side: z.enum(["yes", "no"]),
  expiry: z.string(),
});

export const placeBetSchema = z.object({
  marketId: z.string(),
  betAmount: z.number().int().positive(),
});

export const resolveMarketSchema = z.object({
  marketId: z.string(),
  resolution: z.enum(["yes", "no"]),
});

