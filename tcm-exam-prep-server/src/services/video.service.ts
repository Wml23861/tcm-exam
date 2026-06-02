import { getDb } from '../config/database.js'
import { parseJson } from '../utils/sqlite-json.js'

interface VideoRow {
  id: string
  user_id: string
  title: string
  description: string
  file_url: string
  duration: number
  file_size: number
  subject_ids_json: string
  knowledge_point_ids_json: string
  extracted_summary: string
  extracted_key_points_json: string
  transcript_text: string
  status: string
  uploaded_at: number
  thumbnail_url: string
}

interface AnnotationRow {
  id: string
  user_id: string
  video_id: string
  timestamp: number
  content: string
  created_at: number
}

function mapVideo(row: VideoRow) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    fileUrl: row.file_url,
    duration: row.duration,
    fileSize: row.file_size,
    subjectIds: parseJson<string[]>(row.subject_ids_json, []),
    knowledgePointIds: parseJson<string[]>(row.knowledge_point_ids_json, []),
    extractedSummary: row.extracted_summary,
    extractedKeyPoints: parseJson<{ title: string; content: string; timestamp: number }[]>(
      row.extracted_key_points_json, [],
    ),
    transcriptText: row.transcript_text,
    status: row.status,
    uploadedAt: row.uploaded_at,
    thumbnailUrl: row.thumbnail_url,
  }
}

function mapAnnotation(row: AnnotationRow) {
  return {
    id: row.id,
    videoId: row.video_id,
    timestamp: row.timestamp,
    content: row.content,
    createdAt: row.created_at,
  }
}

export const videoService = {
  async findAll(userId: string) {
    const db = getDb()
    const rows = await db<VideoRow>('videos')
      .where({ user_id: userId })
      .orderBy('uploaded_at', 'desc')
    return rows.map(mapVideo)
  },

  async findById(userId: string, id: string) {
    const db = getDb()
    const row = await db<VideoRow>('videos').where({ id, user_id: userId }).first()
    return row ? mapVideo(row) : undefined
  },

  async upsert(userId: string, video: {
    id: string
    title: string
    description: string
    fileUrl: string
    duration: number
    fileSize: number
    subjectIds: string[]
    knowledgePointIds: string[]
    extractedSummary: string
    extractedKeyPoints: { title: string; content: string; timestamp: number }[]
    transcriptText: string
    status: string
    uploadedAt: number
    thumbnailUrl: string
  }) {
    const db = getDb()
    const row = {
      id: video.id,
      user_id: userId,
      title: video.title,
      description: video.description,
      file_url: video.fileUrl,
      duration: video.duration,
      file_size: video.fileSize,
      subject_ids_json: JSON.stringify(video.subjectIds),
      knowledge_point_ids_json: JSON.stringify(video.knowledgePointIds),
      extracted_summary: video.extractedSummary,
      extracted_key_points_json: JSON.stringify(video.extractedKeyPoints),
      transcript_text: video.transcriptText,
      status: video.status,
      uploaded_at: video.uploadedAt,
      thumbnail_url: video.thumbnailUrl,
    }
    await db('videos')
      .insert(row)
      .onConflict(['id'])
      .merge()
    return video
  },

  async delete(userId: string, id: string) {
    const db = getDb()
    // 级联删除 annotations
    await db('video_annotations').where({ video_id: id, user_id: userId }).del()
    await db('videos').where({ id, user_id: userId }).del()
  },

  async getAnnotations(userId: string, videoId: string) {
    const db = getDb()
    const rows = await db<AnnotationRow>('video_annotations')
      .where({ user_id: userId, video_id: videoId })
      .orderBy('timestamp', 'asc')
    return rows.map(mapAnnotation)
  },

  async addAnnotation(userId: string, annotation: {
    id: string
    videoId: string
    timestamp: number
    content: string
    createdAt: number
  }) {
    const db = getDb()
    await db('video_annotations').insert({
      id: annotation.id,
      user_id: userId,
      video_id: annotation.videoId,
      timestamp: annotation.timestamp,
      content: annotation.content,
      created_at: annotation.createdAt,
    })
    return annotation
  },

  async deleteAnnotation(userId: string, videoId: string, annotationId: string) {
    const db = getDb()
    await db('video_annotations')
      .where({ id: annotationId, video_id: videoId, user_id: userId })
      .del()
  },
}
