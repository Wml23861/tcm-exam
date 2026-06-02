import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('video_annotations', (t) => {
    t.text('id').primary()
    t.text('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    t.text('video_id').notNullable().references('id').inTable('videos').onDelete('CASCADE')
    t.integer('timestamp').notNullable()
    t.text('content').notNullable()
    t.integer('created_at').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('video_annotations')
}
