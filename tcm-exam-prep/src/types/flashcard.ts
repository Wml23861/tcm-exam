/** 闪卡相关类型定义 */

export type FlashcardCategory =
  | 'definition'
  | 'herb'
  | 'formula'
  | 'acupoint'
  | 'song'
  | 'diagnosis'
  | 'clinical'
  | 'regulation'
  | 'other'

export interface Flashcard {
  id: string
  subjectId: string
  chapterId: string
  knowledgePointIds: string[]
  /** 正面内容 (问题) */
  frontContent: string
  /** 背面内容 (答案) */
  backContent: string
  /** 助记口诀/方法 */
  mnemonic: string
  /** 分类 */
  category: FlashcardCategory
  /** 标签 */
  tags: string[]
  /** 创建时间 */
  createdAt: number
  /** 是否为系统内置 (false 为用户自定义) */
  isSystem: boolean
}
