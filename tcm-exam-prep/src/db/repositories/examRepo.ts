import { apiGet, apiPost, apiPut, apiDelete } from '@/utils/api-client'
import type { ExamRecord } from '@/types'

export const examRepo = {
  async findAll(): Promise<ExamRecord[]> {
    return apiGet<ExamRecord[]>('/api/exam-records')
  },

  async findById(id: string): Promise<ExamRecord | undefined> {
    try { return await apiGet<ExamRecord>(`/api/exam-records/${id}`) } catch { return undefined }
  },

  async create(record: ExamRecord): Promise<void> {
    await apiPost('/api/exam-records', record)
  },

  async update(id: string, data: Partial<ExamRecord>): Promise<void> {
    await apiPut(`/api/exam-records/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    await apiDelete(`/api/exam-records/${id}`)
  },

  async getCompleted(): Promise<ExamRecord[]> {
    const all = await apiGet<ExamRecord[]>('/api/exam-records')
    return all.filter(r => r.isCompleted === true).sort((a, b) => a.startTime - b.startTime)
  },

  async count(): Promise<number> {
    const all = await apiGet<ExamRecord[]>('/api/exam-records')
    return all.length
  },
}
