import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('app_settings', (t) => {
    t.text('id').primary().defaultTo('default')
    t.text('user_id').notNullable().unique().references('id').inTable('users').onDelete('CASCADE')
    t.integer('daily_study_goal').notNullable().defaultTo(20)
    t.integer('daily_question_goal').notNullable().defaultTo(50)
    t.integer('daily_review_goal').notNullable().defaultTo(30)
    t.integer('default_exam_duration').notNullable().defaultTo(60)
    t.integer('default_exam_question_count').notNullable().defaultTo(100)
    t.text('theme').notNullable().defaultTo('light')
    t.text('font_size').notNullable().defaultTo('medium')
    t.integer('daily_new_cards').notNullable().defaultTo(20)
    t.integer('daily_review_cards').notNullable().defaultTo(100)
    t.integer('study_reminder_enabled').notNullable().defaultTo(0)
    t.text('study_reminder_time').notNullable().defaultTo('09:00')
    t.integer('exam_date')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('app_settings')
}
