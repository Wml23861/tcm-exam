import { apiGet, apiPost } from '@/utils/api-client'
import type { StudyRecord, ReviewSchedule } from '@/types'

export const studyRepo = {
  // 学习记录
  async getRecord(itemType: string, itemId: string): Promise<StudyRecord | undefined> {
    try { return await apiGet<StudyRecord>(`/api/study-records/${itemType}/${itemId}`) } catch { return undefined }
  },

  async upsertRecord(record: StudyRecord): Promise<void> {
    await apiPost('/api/study-records', record)
  },

  async getRecordsBySubject(subjectId: string): Promise<StudyRecord[]> {
    return apiGet<StudyRecord[]>('/api/study-records', { subjectId })
  },

  async getAllRecords(): Promise<StudyRecord[]> {
    return apiGet<StudyRecord[]>('/api/study-records')
  },

  // 复习调度
  async getSchedule(itemType: string, itemId: string): Promise<ReviewSchedule | undefined> {
    try { return await apiGet<ReviewSchedule>(`/api/review-schedules/${itemType}/${itemId}`) } catch { return undefined }
  },

  async getDueReviews(): Promise<ReviewSchedule[]> {
    return apiGet<ReviewSchedule[]>('/api/review-schedules', { due: 'true' })
  },

  async getDueReviewsBySubject(subjectId: string): Promise<ReviewSchedule[]> {
    return apiGet<ReviewSchedule[]>('/api/review-schedules', { due: 'true', subjectId })
  },

  async upsertSchedule(schedule: ReviewSchedule): Promise<void> {
    await apiPost('/api/review-schedules', schedule)
  },

  async getAllSchedules(): Promise<ReviewSchedule[]> {
    return apiGet<ReviewSchedule[]>('/api/review-schedules')
  },

  async getTodayStats(): Promise<{ total: number; completed: number }> {
    const due = await apiGet<ReviewSchedule[]>('/api/review-schedules', { due: 'true' })
    return { total: due.length, completed: 0 }
  },
}
