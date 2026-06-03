/**
 * 中药和穴位图片映射
 * 图片存放：public/images/herbs/药材名.jpg  +  public/images/acupoints/穴位名.jpg
 * 图片来源：医学百科 www.yixue.com
 */

/** 获取药材本地图片路径 */
export function getHerbImageUrl(name: string): string {
  return `/images/herbs/${encodeURIComponent(name)}.jpg`
}

/** 获取穴位本地图片路径 — 先试中文名，再试代码 */
export function getAcupointImageUrl(code: string, name: string): string {
  // 优先中文名
  if (name) return `/images/acupoints/${encodeURIComponent(name)}.jpg`
  return `/images/acupoints/${encodeURIComponent(code)}.jpg`
}
