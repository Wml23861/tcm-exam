import { apiGet, apiPost, apiDelete } from '@/utils/api-client'
import type { Note } from '@/types'

export const noteRepo = {
  async findAll(): Promise<Note[]> {
    return apiGet<Note[]>('/api/notes')
  },

  async findByKnowledgePoint(knowledgePointId: string): Promise<Note[]> {
    return apiGet<Note[]>('/api/notes', { knowledgePointId })
  },

  async findByQuestion(questionId: string): Promise<Note[]> {
    return apiGet<Note[]>('/api/notes', { questionId })
  },

  async upsert(note: Note): Promise<void> {
    await apiPost('/api/notes', note)
  },

  async delete(id: string): Promise<void> {
    await apiDelete(`/api/notes/${id}`)
  },
}
