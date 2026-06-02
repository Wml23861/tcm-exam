import { apiGet, apiPost, apiPut, apiDelete } from '@/utils/api-client'
import type { Video, VideoAnnotation } from '@/types'

export const videoRepo = {
  async findAll(): Promise<Video[]> {
    return apiGet<Video[]>('/api/videos')
  },

  async findById(id: string): Promise<Video | undefined> {
    try { return await apiGet<Video>(`/api/videos/${id}`) } catch { return undefined }
  },

  async upsert(video: Video): Promise<void> {
    await apiPost('/api/videos', video)
  },

  async update(id: string, data: Partial<Video>): Promise<void> {
    await apiPut(`/api/videos/${id}`, data)
  },

  async delete(id: string): Promise<void> {
    await apiDelete(`/api/videos/${id}`)
  },

  async getAnnotations(videoId: string): Promise<VideoAnnotation[]> {
    return apiGet<VideoAnnotation[]>(`/api/videos/${videoId}/annotations`)
  },

  async addAnnotation(annotation: VideoAnnotation): Promise<void> {
    await apiPost(`/api/videos/${annotation.videoId}/annotations`, annotation)
  },

  async deleteAnnotation(id: string): Promise<void> {
    await apiDelete(`/api/videos/0/annotations/${id}`)
  },
}
