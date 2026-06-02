import { getDb } from '../config/database.js'

interface StudyRecordRow {
  id: string
  user_id: string
  item_type: string
  item_id: string
  subject_id: string
  study_count: number
  first_studied_at: number | null
  last_studied_at: number | null
  total_time_spent: number
  mastery_level: number
  notes: string
}

interface ReviewScheduleRow {
  id: string
  user_id: string
  item_type: string
  item_id: string
  easiness_factor: number
  interval_days: number
  repetitions: number
  next_review_date: number
  last_review_date: number | null
  last_quality: number | null
  subject_id: string
}

function mapRecord(row: StudyRecordRow) {
  return {
    id: row.id,
    itemType: row.item_type,
    itemId: row.item_id,
    subjectId: row.subject_id,
    studyCount: row.study_count,
    firstStudiedAt: row.first_studied_at,
    lastStudiedAt: row.last_studied_at,
    totalTimeSpent: row.total_time_spent,
    masteryLevel: row.mastery_level,
    notes: row.notes,
  }
}

function mapSchedule(row: ReviewScheduleRow) {
  return {
    id: row.id,
    itemType: row.item_type,
    itemId: row.item_id,
    easinessFactor: row.easiness_factor,
    interval: row.interval_days,
    repetitions: row.repetitions,
    nextReviewDate: row.next_review_date,
    lastReviewDate: row.last_review_date,
    lastQuality: row.last_quality,
    subjectId: row.subject_id,
  }
}

export const studyService = {
  // ===== Study Records =====
  async getRecord(userId: string, itemType: string, itemId: string) {
    const db = getDb()
    const row = await db<StudyRecordRow>('study_records')
      .where({ user_id: userId, item_type: itemType, item_id: itemId })
      .first()
    return row ? mapRecord(row) : undefined
  },

  async getRecordsBySubject(userId: string, subjectId: string) {
    const db = getDb()
    const rows = await db<StudyRecordRow>('study_records')
      .where({ user_id: userId, subject_id: subjectId })
    return rows.map(mapRecord)
  },

  async getAllRecords(userId: string) {
    const db = getDb()
    const rows = await db<StudyRecordRow>('study_records').where({ user_id: userId })
    return rows.map(mapRecord)
  },

  async upsertRecord(userId: string, record: {
    id: string
    itemType: string
    itemId: string
    subjectId: string
    studyCount: number
    firstStudiedAt: number | null
    lastStudiedAt: number | null
    totalTimeSpent: number
    masteryLevel: number
    notes: string
  }) {
    const db = getDb()
    const row = {
      id: record.id,
      user_id: userId,
      item_type: record.itemType,
      item_id: record.itemId,
      subject_id: record.subjectId,
      study_count: record.studyCount,
      first_studied_at: record.firstStudiedAt,
      last_studied_at: record.lastStudiedAt,
      total_time_spent: record.totalTimeSpent,
      mastery_level: record.masteryLevel,
      notes: record.notes,
    }
    await db('study_records')
      .insert(row)
      .onConflict(['user_id', 'item_type', 'item_id'])
      .merge()
    return record
  },

  // ===== Review Schedules =====
  async getSchedule(userId: string, itemType: string, itemId: string) {
    const db = getDb()
    const row = await db<ReviewScheduleRow>('review_schedules')
      .where({ user_id: userId, item_type: itemType, item_id: itemId })
      .first()
    return row ? mapSchedule(row) : undefined
  },

  async getDueReviews(userId: string, subjectId?: string) {
    const db = getDb()
    const tomorrow = Date.now() + 86400000
    let query = db<ReviewScheduleRow>('review_schedules')
      .where({ user_id: userId })
      .where('next_review_date', '<', tomorrow)

    if (subjectId) query = query.where({ subject_id: subjectId })

    const rows = await query.orderBy('next_review_date', 'asc')
    return rows.map(mapSchedule)
  },

  async getAllSchedules(userId: string) {
    const db = getDb()
    const rows = await db<ReviewScheduleRow>('review_schedules').where({ user_id: userId })
    return rows.map(mapSchedule)
  },

  async upsertSchedule(userId: string, schedule: {
    id: string
    itemType: string
    itemId: string
    easinessFactor: number
    interval: number
    repetitions: number
    nextReviewDate: number
    lastReviewDate: number | null
    lastQuality: number | null
    subjectId: string
  }) {
    const db = getDb()
    const row = {
      id: schedule.id,
      user_id: userId,
      item_type: schedule.itemType,
      item_id: schedule.itemId,
      easiness_factor: schedule.easinessFactor,
      interval_days: schedule.interval,
      repetitions: schedule.repetitions,
      next_review_date: schedule.nextReviewDate,
      last_review_date: schedule.lastReviewDate,
      last_quality: schedule.lastQuality,
      subject_id: schedule.subjectId,
    }
    await db('review_schedules')
      .insert(row)
      .onConflict(['user_id', 'item_type', 'item_id'])
      .merge()
    return schedule
  },
}
