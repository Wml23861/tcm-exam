/** 笔记相关类型定义 */

export interface Note {
  id: string
  /** 关联的知识点 ID */
  knowledgePointId: string | null
  /** 关联的题目 ID */
  questionId: string | null
  /** 关联的闪卡 ID */
  flashcardId: string | null
  /** 关联的视频 ID */
  videoId: string | null
  /** 笔记内容 (纯文本) */
  content: string
  /** 笔记颜色标记 */
  color: string
  /** 创建时间 */
  createdAt: number
  /** 更新时间 */
  updatedAt: number
}
