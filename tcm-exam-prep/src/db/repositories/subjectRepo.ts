import { apiGet } from '@/utils/api-client'
import type { Subject, Chapter, Section, KnowledgePoint } from '@/types'

export const subjectRepo = {
  async findAll(): Promise<Subject[]> {
    return apiGet<Subject[]>('/api/subjects')
  },

  async findById(id: string): Promise<Subject | undefined> {
    try { return await apiGet<Subject>(`/api/subjects/${id}`) } catch { return undefined }
  },

  async getChapters(subjectId: string): Promise<Chapter[]> {
    return apiGet<Chapter[]>(`/api/subjects/${subjectId}/chapters`)
  },

  async getSections(chapterId: string): Promise<Section[]> {
    return apiGet<Section[]>(`/api/chapters/${chapterId}/sections`)
  },

  async getSection(sectionId: string): Promise<Section | undefined> {
    try { return await apiGet<Section>(`/api/sections/${sectionId}`) } catch { return undefined }
  },

  async getKnowledgePoints(
    filter: { subjectId?: string; chapterId?: string; sectionId?: string }
  ): Promise<KnowledgePoint[]> {
    return apiGet<KnowledgePoint[]>('/api/knowledge-points', filter as Record<string, string>)
  },

  async getKnowledgePoint(id: string): Promise<KnowledgePoint | undefined> {
    try { return await apiGet<KnowledgePoint>(`/api/knowledge-points/${id}`) } catch { return undefined }
  },

  async getAllKnowledgePoints(): Promise<KnowledgePoint[]> {
    return apiGet<KnowledgePoint[]>('/api/knowledge-points')
  },

  async countBySubject(subjectId: string): Promise<number> {
    const points = await apiGet<KnowledgePoint[]>('/api/knowledge-points', { subjectId })
    return points.length
  },
}
