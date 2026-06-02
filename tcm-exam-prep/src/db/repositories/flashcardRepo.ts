import { apiGet } from '@/utils/api-client'
import type { Flashcard } from '@/types'

export const flashcardRepo = {
  async findAll(): Promise<Flashcard[]> {
    return apiGet<Flashcard[]>('/api/flashcards')
  },

  async findById(id: string): Promise<Flashcard | undefined> {
    try { return await apiGet<Flashcard>(`/api/flashcards/${id}`) } catch { return undefined }
  },

  async findBySubject(subjectId: string): Promise<Flashcard[]> {
    return apiGet<Flashcard[]>('/api/flashcards', { subjectId })
  },

  async findByCategory(category: string): Promise<Flashcard[]> {
    return apiGet<Flashcard[]>('/api/flashcards', { category })
  },

  async count(): Promise<number> {
    const cards = await apiGet<Flashcard[]>('/api/flashcards')
    return cards.length
  },

  async upsert(_card: Flashcard): Promise<void> {
    // 静态闪卡，暂不支持写入
  },

  async bulkUpsert(_cards: Flashcard[]): Promise<void> {
    // 静态闪卡，暂不支持写入
  },

  async delete(_id: string): Promise<void> {
    // 静态闪卡，暂不支持写入
  },
}
