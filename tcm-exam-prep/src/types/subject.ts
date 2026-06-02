/** 科目相关类型定义 */

export interface Subject {
  /** 唯一标识，如 'zhongji', 'zhenjuan' */
  id: string
  /** 科目全称 */
  name: string
  /** 简称 */
  shortName: string
  /** 科目图标 (Element Plus icon name) */
  icon: string
  /** 科目描述 */
  description: string
  /** 考试权重 (1-10) */
  examWeight: number
  /** 章节总数 */
  totalChapters: number
  /** 题目总数 */
  totalQuestions: number
  /** 科目主题色 (hex) */
  color: string
  /** 排序 */
  order: number
}
