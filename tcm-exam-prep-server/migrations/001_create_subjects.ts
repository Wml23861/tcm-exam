import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('subjects', (t) => {
    t.text('id').primary()
    t.text('name').notNullable()
    t.text('short_name').notNullable()
    t.text('icon').notNullable()
    t.text('description').notNullable()
    t.integer('exam_weight').notNullable().defaultTo(5)
    t.integer('total_chapters').notNullable().defaultTo(0)
    t.integer('total_questions').notNullable().defaultTo(0)
    t.text('color').notNullable()
    t.integer('sort_order').notNullable().defaultTo(0)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('subjects')
}
