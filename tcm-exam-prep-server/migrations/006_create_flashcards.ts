import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('flashcards', (t) => {
    t.text('id').primary()
    t.text('subject_id').notNullable().references('id').inTable('subjects').onDelete('CASCADE')
    t.text('chapter_id').notNullable().defaultTo('')
    t.text('knowledge_point_ids_json').notNullable().defaultTo('[]')
    t.text('front_content').notNullable()
    t.text('back_content').notNullable()
    t.text('mnemonic').notNullable().defaultTo('')
    t.text('category').notNullable().defaultTo('other')
    t.text('tags_json').notNullable().defaultTo('[]')
    t.integer('created_at').notNullable()
    t.integer('is_system').notNullable().defaultTo(1)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('flashcards')
}
