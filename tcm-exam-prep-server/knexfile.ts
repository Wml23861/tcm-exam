import type { Knex } from 'knex'
import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: Knex.Config = {
  client: 'better-sqlite3',
  connection: {
    filename: path.resolve(__dirname, process.env.DB_PATH || './data/tcm-exam.db'),
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
    extension: 'ts',
  },
  seeds: {
    directory: path.resolve(__dirname, 'seeds'),
    extension: 'ts',
  },
}

export default config
