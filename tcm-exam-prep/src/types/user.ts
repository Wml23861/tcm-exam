/** 用户系统相关类型定义 (未来多用户扩展) */

export interface User {
  id: string
  username: string
  avatar?: string
  createdAt: number
}

export interface UserProgress {
  userId: string
  subjectId: string
  chapterId: string
  completed: boolean
  score?: number
  lastAccessed: number
}
