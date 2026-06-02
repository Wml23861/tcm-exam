import { getDb } from '../config/database.js'
import { parseJson } from '../utils/sqlite-json.js'

interface ExamRecordRow {
  id: string
  user_id: string
  exam_type: string
  scope_id: string
  scope_name: string
  start_time: number
  end_time: number | null
  is_completed: number
  total_questions: number
  answered_questions: number
  correct_count: number
  score: number
  duration: number
  answers_json: string
  time_limit: number
}

interface ExamAnswer {
  questionId: string
  userAnswer: string | null
  isCorrect: boolean
  timeSpent: number
  isMarked: boolean
}

function mapRecord(row: ExamRecordRow) {
  return {
    id: row.id,
    examType: row.exam_type,
    scopeId: row.scope_id,
    scopeName: row.scope_name,
    startTime: row.start_time,
    endTime: row.end_time,
    isCompleted: row.is_completed === 1,
    totalQuestions: row.total_questions,
    answeredQuestions: row.answered_questions,
    correctCount: row.correct_count,
    score: row.score,
    duration: row.duration,
    answers: parseJson<ExamAnswer[]>(row.answers_json, []),
    timeLimit: row.time_limit,
  }
}

export const examService = {
  async findAll(userId: string) {
    const db = getDb()
    const rows = await db<ExamRecordRow>('exam_records')
      .where({ user_id: userId })
      .orderBy('start_time', 'desc')
    return rows.map(mapRecord)
  },

  async findById(userId: string, id: string) {
    const db = getDb()
    const row = await db<ExamRecordRow>('exam_records')
      .where({ id, user_id: userId })
      .first()
    return row ? mapRecord(row) : undefined
  },

  async create(userId: string, record: {
    id: string
    examType: string
    scopeId: string
    scopeName: string
    startTime: number
    endTime: number | null
    isCompleted: boolean
    totalQuestions: number
    answeredQuestions: number
    correctCount: number
    score: number
    duration: number
    answers: ExamAnswer[]
    timeLimit: number
  }) {
    const db = getDb()
    await db('exam_records').insert({
      id: record.id,
      user_id: userId,
      exam_type: record.examType,
      scope_id: record.scopeId,
      scope_name: record.scopeName,
      start_time: record.startTime,
      end_time: record.endTime,
      is_completed: record.isCompleted ? 1 : 0,
      total_questions: record.totalQuestions,
      answered_questions: record.answeredQuestions,
      correct_count: record.correctCount,
      score: record.score,
      duration: record.duration,
      answers_json: JSON.stringify(record.answers),
      time_limit: record.timeLimit,
    })
    return record
  },

  async update(userId: string, id: string, data: Record<string, unknown>) {
    const db = getDb()
    const patch: Record<string, unknown> = {}
    // 转换 camelCase 到 snake_case
    if ('examType' in data) patch.exam_type = data.examType
    if ('scopeId' in data) patch.scope_id = data.scopeId
    if ('scopeName' in data) patch.scope_name = data.scopeName
    if ('endTime' in data) patch.end_time = data.endTime
    if ('isCompleted' in data) patch.is_completed = data.isCompleted ? 1 : 0
    if ('totalQuestions' in data) patch.total_questions = data.totalQuestions
    if ('answeredQuestions' in data) patch.answered_questions = data.answeredQuestions
    if ('correctCount' in data) patch.correct_count = data.correctCount
    if ('score' in data) patch.score = data.score
    if ('duration' in data) patch.duration = data.duration
    if ('answers' in data) patch.answers_json = JSON.stringify(data.answers)
    if ('timeLimit' in data) patch.time_limit = data.timeLimit

    await db('exam_records').where({ id, user_id: userId }).update(patch)

    const updated = await db<ExamRecordRow>('exam_records').where({ id, user_id: userId }).first()
    return updated ? mapRecord(updated) : undefined
  },

  async delete(userId: string, id: string) {
    const db = getDb()
    await db('exam_records').where({ id, user_id: userId }).del()
  },

  async getCompleted(userId: string) {
    const db = getDb()
    const rows = await db<ExamRecordRow>('exam_records')
      .where({ user_id: userId, is_completed: 1 })
      .orderBy('start_time', 'asc')
    return rows.map(mapRecord)
  },

  async count(userId: string) {
    const db = getDb()
    const result = await db('exam_records')
      .where({ user_id: userId })
      .count('* as count')
      .first()
    return (result as { count: number }).count
  },
}
