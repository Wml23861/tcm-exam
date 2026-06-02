import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('exam_records', (t) => {
    t.text('id').primary()
    t.text('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    t.text('exam_type').notNullable()
    t.text('scope_id').notNullable()
    t.text('scope_name').notNullable()
    t.integer('start_time').notNullable()
    t.integer('end_time')
    t.integer('is_completed').notNullable().defaultTo(0)
    t.integer('total_questions').notNullable()
    t.integer('answered_questions').notNullable().defaultTo(0)
    t.integer('correct_count').notNullable().defaultTo(0)
    t.float('score').notNullable().defaultTo(0)
    t.integer('duration').notNullable().defaultTo(0)
    t.text('answers_json').notNullable().defaultTo('[]')
    t.integer('time_limit').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('exam_records')
}
