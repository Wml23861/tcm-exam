import knex, { Knex } from 'knex'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from './env.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let dbInstance: Knex | null = null

export function getDb(): Knex {
  if (!dbInstance) {
    dbInstance = knex({
      client: 'better-sqlite3',
      connection: {
        filename: path.resolve(__dirname, '..', '..', config.DB_PATH),
      },
      useNullAsDefault: true,
      migrations: {
        directory: path.resolve(__dirname, '..', '..', 'migrations'),
        extension: 'ts',
      },
      seeds: {
        directory: path.resolve(__dirname, '..', '..', 'seeds'),
        extension: 'ts',
      },
    })
  }
  return dbInstance
}
