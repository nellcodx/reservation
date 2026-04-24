import { z } from "zod";

const EnvSchema = z.object({
  // Default matches `docker-compose.yml` in the repo root for local dev.
  DATABASE_URL: z
    .string()
    .min(1)
    .default(
      "postgresql://postgres:postgres@localhost:5432/restaurant_reservations?schema=public"
    ),
  PORT: z.coerce.number().int().positive().default(4000),
  WEB_ORIGIN: z.string().min(1).default("http://localhost:3000"),
  SMS_PROVIDER: z.enum(["mock", "twilio"]).default("mock"),
  SMS_FROM: z.string().min(1).default("+15555550123"),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional()
});

export const env = EnvSchema.parse(process.env);

