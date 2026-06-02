/** 视频相关类型定义 */

export type VideoStatus = 'uploading' | 'processing' | 'ready' | 'error'

export interface Video {
  id: string
  title: string
  description: string
  /** 视频本地文件 URL (Blob URL 或 IndexedDB 存储) */
  fileUrl: string
  /** 时长 (秒) */
  duration: number
  /** 文件大小 (bytes) */
  fileSize: number
  /** 关联科目 */
  subjectIds: string[]
  /** 关联知识点 */
  knowledgePointIds: string[]
  /** AI 提取的总结 (Markdown) */
  extractedSummary: string
  /** AI 提取的知识点列表 (带时间戳) */
  extractedKeyPoints: VideoKeyPoint[]
  /** 字幕/文稿文本 */
  transcriptText: string
  /** 处理状态 */
  status: VideoStatus
  /** 上传时间 */
  uploadedAt: number
  /** 缩略图 URL */
  thumbnailUrl: string
}

export interface VideoKeyPoint {
  /** 知识点标题 */
  title: string
  /** 知识点内容 */
  content: string
  /** 视频中的时间戳 (秒) */
  timestamp: number
}

export interface VideoAnnotation {
  id: string
  videoId: string
  /** 视频时间戳 */
  timestamp: number
  /** 标注内容 */
  content: string
  /** 创建时间 */
  createdAt: number
}
