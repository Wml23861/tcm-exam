import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('videos', (t) => {
    t.text('id').primary()
    t.text('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    t.text('title').notNullable()
    t.text('description').notNullable().defaultTo('')
    t.text('file_url').notNullable()
    t.integer('duration').notNullable().defaultTo(0)
    t.integer('file_size').notNullable().defaultTo(0)
    t.text('subject_ids_json').notNullable().defaultTo('[]')
    t.text('knowledge_point_ids_json').notNullable().defaultTo('[]')
    t.text('extracted_summary').notNullable().defaultTo('')
    t.text('extracted_key_points_json').notNullable().defaultTo('[]')
    t.text('transcript_text').notNullable().defaultTo('')
    t.text('status').notNullable().defaultTo('uploading')
    t.integer('uploaded_at').notNullable()
    t.text('thumbnail_url').notNullable().defaultTo('')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('videos')
}
