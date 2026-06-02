import { getDb } from '../config/database.js'

interface NoteRow {
  id: string
  user_id: string
  knowledge_point_id: string | null
  question_id: string | null
  flashcard_id: string | null
  video_id: string | null
  content: string
  color: string
  created_at: number
  updated_at: number
}

function map(row: NoteRow) {
  return {
    id: row.id,
    knowledgePointId: row.knowledge_point_id,
    questionId: row.question_id,
    flashcardId: row.flashcard_id,
    videoId: row.video_id,
    content: row.content,
    color: row.color,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export const noteService = {
  async findAll(userId: string) {
    const db = getDb()
    const rows = await db<NoteRow>('notes')
      .where({ user_id: userId })
      .orderBy('updated_at', 'desc')
    return rows.map(map)
  },

  async findByKnowledgePoint(userId: string, kpId: string) {
    const db = getDb()
    const rows = await db<NoteRow>('notes')
      .where({ user_id: userId, knowledge_point_id: kpId })
      .orderBy('updated_at', 'desc')
    return rows.map(map)
  },

  async findByQuestion(userId: string, questionId: string) {
    const db = getDb()
    const rows = await db<NoteRow>('notes')
      .where({ user_id: userId, question_id: questionId })
      .orderBy('updated_at', 'desc')
    return rows.map(map)
  },

  async upsert(userId: string, note: {
    id: string
    knowledgePointId: string | null
    questionId: string | null
    flashcardId: string | null
    videoId: string | null
    content: string
    color: string
    createdAt: number
    updatedAt: number
  }) {
    const db = getDb()
    const row = {
      id: note.id,
      user_id: userId,
      knowledge_point_id: note.knowledgePointId,
      question_id: note.questionId,
      flashcard_id: note.flashcardId,
      video_id: note.videoId,
      content: note.content,
      color: note.color,
      created_at: note.createdAt,
      updated_at: note.updatedAt,
    }
    await db('notes')
      .insert(row)
      .onConflict(['id'])
      .merge()
    return note
  },

  async delete(userId: string, id: string) {
    const db = getDb()
    await db('notes').where({ id, user_id: userId }).del()
  },
}
