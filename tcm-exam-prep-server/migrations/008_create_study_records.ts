import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('study_records', (t) => {
    t.text('id').primary()
    t.text('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    t.text('item_type').notNullable()
    t.text('item_id').notNullable()
    t.text('subject_id').notNullable()
    t.integer('study_count').notNullable().defaultTo(0)
    t.integer('first_studied_at')
    t.integer('last_studied_at')
    t.integer('total_time_spent').notNullable().defaultTo(0)
    t.integer('mastery_level').notNullable().defaultTo(0)
    t.text('notes').notNullable().defaultTo('')
    t.unique(['user_id', 'item_type', 'item_id'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('study_records')
}
