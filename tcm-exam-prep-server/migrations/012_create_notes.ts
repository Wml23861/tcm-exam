import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('notes', (t) => {
    t.text('id').primary()
    t.text('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    t.text('knowledge_point_id')
    t.text('question_id')
    t.text('flashcard_id')
    t.text('video_id')
    t.text('content').notNullable().defaultTo('')
    t.text('color').notNullable().defaultTo('yellow')
    t.integer('created_at').notNullable()
    t.integer('updated_at').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('notes')
}
