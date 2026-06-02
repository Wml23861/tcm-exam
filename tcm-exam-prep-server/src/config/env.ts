import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().default('3001').transform(Number),
  DB_PATH: z.string().default('./data/tcm-exam.db'),
  JWT_SECRET: z.string().min(8, 'JWT_SECRET must be at least 8 characters'),
  ALLOW_REGISTRATION: z.string().default('true').transform((v) => v === 'true'),
})

export const config = envSchema.parse({
  PORT: process.env.PORT,
  DB_PATH: process.env.DB_PATH,
  JWT_SECRET: process.env.JWT_SECRET,
  ALLOW_REGISTRATION: process.env.ALLOW_REGISTRATION ?? 'true',
})
