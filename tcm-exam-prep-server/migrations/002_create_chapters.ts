import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('chapters', (t) => {
    t.text('id').primary()
    t.text('subject_id').notNullable().references('id').inTable('subjects').onDelete('CASCADE')
    t.text('title').notNullable()
    t.text('description').notNullable().defaultTo('')
    t.integer('sort_order').notNullable().defaultTo(0)
    t.integer('section_count').notNullable().defaultTo(0)
    t.integer('knowledge_point_count').notNullable().defaultTo(0)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('chapters')
}
