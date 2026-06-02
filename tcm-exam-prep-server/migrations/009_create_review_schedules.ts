import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('review_schedules', (t) => {
    t.text('id').primary()
    t.text('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
    t.text('item_type').notNullable()
    t.text('item_id').notNullable()
    t.float('easiness_factor').notNullable().defaultTo(2.5)
    t.integer('interval_days').notNullable().defaultTo(0)
    t.integer('repetitions').notNullable().defaultTo(0)
    t.integer('next_review_date').notNullable()
    t.integer('last_review_date')
    t.integer('last_quality')
    t.text('subject_id').notNullable()
    t.unique(['user_id', 'item_type', 'item_id'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('review_schedules')
}
