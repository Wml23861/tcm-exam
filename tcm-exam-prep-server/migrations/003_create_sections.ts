import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('sections', (t) => {
    t.text('id').primary()
    t.text('chapter_id').notNullable().references('id').inTable('chapters').onDelete('CASCADE')
    t.text('subject_id').notNullable().references('id').inTable('subjects').onDelete('CASCADE')
    t.text('title').notNullable()
    t.integer('sort_order').notNullable().defaultTo(0)
    t.text('content').notNullable().defaultTo('')
    t.integer('estimated_study_time').notNullable().defaultTo(0)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('sections')
}
