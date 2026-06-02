/**
 * 日期处理工具函数
 */

import dayjs from 'dayjs'

/**
 * 格式化日期为 YYYY-MM-DD
 */
export function formatDate(timestamp: number): string {
  return dayjs(timestamp).format('YYYY-MM-DD')
}

/**
 * 格式化日期时间为 YYYY-MM-DD HH:mm
 */
export function formatDateTime(timestamp: number): string {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm')
}

/**
 * 格式化时长为 mm:ss 或 hh:mm:ss
 */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`
  return `${pad(m)}:${pad(s)}`
}

/**
 * 获取今日开始时间戳
 */
export function getStartOfDay(date?: Date): number {
  const d = date || new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}

/**
 * 获取今日结束时间戳
 */
export function getEndOfDay(date?: Date): number {
  return getStartOfDay(date) + 86400000
}

/**
 * 距离考试还有多少天
 */
export function daysUntilExam(examDate: number): number {
  const now = Date.now()
  return Math.ceil((examDate - now) / (1000 * 60 * 60 * 24))
}
