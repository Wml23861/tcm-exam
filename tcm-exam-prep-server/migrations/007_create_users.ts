import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (t) => {
    t.text('id').primary()
    t.text('username').notNullable().unique()
    t.text('password_hash').notNullable()
    t.text('display_name').notNullable().defaultTo('')
    t.text('role').notNullable().defaultTo('user')
    t.integer('created_at').notNullable()
    t.integer('updated_at').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users')
}
