import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('wrong_question_records', (t) => {
    t.text('id').primary()
    t.text('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    t.text('question_id').notNullable()
    t.text('subject_id').notNullable()
    t.integer('wrong_count').notNullable().defaultTo(1)
    t.integer('last_wrong_at').notNullable()
    t.text('last_wrong_answer').notNullable().defaultTo('')
    t.text('notes').notNullable().defaultTo('')
    t.integer('is_mastered').notNullable().defaultTo(0)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('wrong_question_records')
}
