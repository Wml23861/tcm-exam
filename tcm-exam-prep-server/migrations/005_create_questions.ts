import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('questions', (t) => {
    t.text('id').primary()
    t.text('question_type').notNullable()
    t.integer('is_group_root').notNullable().defaultTo(0)
    t.text('group_id')
    t.text('subject_id').notNullable().references('id').inTable('subjects').onDelete('CASCADE')
    t.text('chapter_id').notNullable().defaultTo('')
    t.text('section_id').notNullable().defaultTo('')
    t.text('knowledge_point_ids_json').notNullable().defaultTo('[]')
    t.integer('difficulty').notNullable().defaultTo(3)
    t.text('exam_years_json').notNullable().defaultTo('[]')
    t.text('question_stem').notNullable()
    t.text('options_json').notNullable().defaultTo('[]')
    t.text('shared_options_json')
    t.text('correct_answer').notNullable()
    t.text('explanation').notNullable().defaultTo('')
    t.text('tags_json').notNullable().defaultTo('[]')
    t.integer('order_in_group').notNullable().defaultTo(0)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('questions')
}
