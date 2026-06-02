/** 知识点/章节相关类型定义 */

export interface Chapter {
  id: string
  subjectId: string
  title: string
  description: string
  order: number
  sectionCount: number
  knowledgePointCount: number
}

export interface Section {
  id: string
  chapterId: string
  subjectId: string
  title: string
  order: number
  /** Markdown 格式的正文内容 */
  content: string
  /** 学习时间预估 (秒) */
  estimatedStudyTime: number
}

export type KnowledgePointTagType = 'key' | 'difficult' | 'high-frequency' | 'predicted' | 'memorize'

export interface KnowledgePointTag {
  type: KnowledgePointTagType
  label: string
  description?: string
}

export type DifficultyLevel = 'basic' | 'intermediate' | 'advanced'

export interface KnowledgePoint {
  id: string
  sectionId: string
  chapterId: string
  subjectId: string
  /** 知识点标题 */
  title: string
  /** Markdown 格式的详细内容 */
  content: string
  /** 难度等级 */
  difficulty: DifficultyLevel
  /** 考点标注 */
  tags: KnowledgePointTag[]
  /** 关联题目 ID 列表 */
  relatedQuestionIds: string[]
  /** 关联闪卡 ID 列表 */
  relatedFlashcardIds: string[]
  /** 学习顺序 */
  order: number
  /** 是否为考点 (重点/难点) */
  isKeyPoint: boolean
  /** 是否为难点 */
  isDifficultPoint: boolean
  /** 高频考点等级 (1-5, 0 表示非高频) */
  frequencyLevel: number
  /** 是否预测为当年考点 */
  isPredicted: boolean
}
