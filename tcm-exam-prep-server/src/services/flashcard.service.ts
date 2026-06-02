import { getDb } from '../config/database.js'
import { parseJson } from '../utils/sqlite-json.js'

interface FlashcardRow {
  id: string
  subject_id: string
  chapter_id: string
  knowledge_point_ids_json: string
  front_content: string
  back_content: string
  mnemonic: string
  category: string
  tags_json: string
  created_at: number
  is_system: number
}

function mapFlashcard(row: FlashcardRow) {
  return {
    id: row.id,
    subjectId: row.subject_id,
    chapterId: row.chapter_id,
    knowledgePointIds: parseJson<string[]>(row.knowledge_point_ids_json, []),
    frontContent: row.front_content,
    backContent: row.back_content,
    mnemonic: row.mnemonic,
    category: row.category,
    tags: parseJson<string[]>(row.tags_json, []),
    createdAt: row.created_at,
    isSystem: row.is_system === 1,
  }
}

export const flashcardService = {
  async findAll(filter?: { subjectId?: string; category?: string }) {
    const db = getDb()
    let query = db<FlashcardRow>('flashcards')

    if (filter?.subjectId) query = query.where({ subject_id: filter.subjectId })
    if (filter?.category) query = query.where({ category: filter.category })

    const rows = await query
    return rows.map(mapFlashcard)
  },

  async findById(id: string) {
    const db = getDb()
    const row = await db<FlashcardRow>('flashcards').where({ id }).first()
    return row ? mapFlashcard(row) : undefined
  },

  async findBySubject(subjectId: string) {
    const db = getDb()
    const rows = await db<FlashcardRow>('flashcards').where({ subject_id: subjectId })
    return rows.map(mapFlashcard)
  },

  async findByCategory(category: string) {
    const db = getDb()
    const rows = await db<FlashcardRow>('flashcards').where({ category })
    return rows.map(mapFlashcard)
  },

  async count() {
    const db = getDb()
    const result = await db('flashcards').count('* as count').first()
    return (result as { count: number }).count
  },
}
