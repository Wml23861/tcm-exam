import knexModule from 'knex'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const db = knexModule.default({
    client: 'better-sqlite3',
    connection: { filename: path.resolve(__dirname, 'data/tcm-exam.db') },
    useNullAsDefault: true,
  })

  // 清理所有表（按外键依赖顺序）
  const tables = [
    'video_annotations', 'videos', 'notes', 'wrong_question_records',
    'review_schedules', 'study_records', 'exam_records', 'app_settings',
    'flashcards', 'questions', 'knowledge_points', 'sections',
    'chapters', 'subjects',
  ]
  for (const t of tables) {
    await db(t).del()
  }

  // 运行种子
  const { seed: seed1 } = await import('./seeds/001_subjects_structure.ts')
  const { seed: seed2 } = await import('./seeds/002_sections_seed.ts')
  const { seed: seed2b } = await import('./seeds/002b_knowledge_points_seed.ts')
  const { seed: seed3 } = await import('./seeds/003_questions_seed.ts')
  const { seed: seed4 } = await import('./seeds/004_flashcards_seed.ts')
  const { seed: seed5 } = await import('./seeds/005_questions_expanded_seed.ts')

  await seed1(db)
  await seed2(db)
  await seed2b(db)
  await seed3(db)
  await seed4(db)
  await seed5(db)

  // 验证
  const sub = await db('subjects').count('* as c').first() as { c: number }
  const ch = await db('chapters').count('* as c').first() as { c: number }
  const sec = await db('sections').count('* as c').first() as { c: number }
  const kp = await db('knowledge_points').count('* as c').first() as { c: number }
  const q = await db('questions').count('* as c').first() as { c: number }
  const fc = await db('flashcards').count('* as c').first() as { c: number }

  console.log('\n=== 数据导入完成 ===')
  console.log(`科目: ${sub.c}`)
  console.log(`章节: ${ch.c}`)
  console.log(`小节: ${sec.c}`)
  console.log(`知识点: ${kp.c}`)
  console.log(`题目: ${q.c}`)
  console.log(`记忆卡片: ${fc.c}`)

  await db.destroy()
  process.exit(0)
}

main()
