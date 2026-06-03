---
name: 设计系统
description: 国风典雅设计系统的色彩、字体、动画、主题配置
type: project
---

# 设计系统 (国风典雅)

## 设计方向

Chinese Classical Elegance — 国风典雅风格

## 色彩系统

| 颜色 | CSS变量/用途 | 色值 |
|------|-------------|------|
| 米纸底 (背景) | --color-surface / rice-paper | #FDF8EE |
| 朱砂红 (主色) | --tcm-primary / vermilion | #C0392B |
| 金色 (强调) | --tcm-gold | #B8860B |
| 碧玉绿 (辅助) | --tcm-jade | #2E5E4E |

## 字体

- **主字体**: PingFang SC (苹方)
- **装饰字体**: KaiTi (楷体) — 标题用
- **Tailwind配置**: 自定义颜色类名 (tcm-primary, tcm-gold, tcm-jade)

## 主题

- **默认**: 浅色主题
- **Sepia**: 护眼纸质主题 (护眼模式) — Paper-like reading

## 动画 (Tailwind自定义)

| 动画名 | 用途 |
|--------|------|
| ink-spread | 水墨扩散效果 |
| card-flip | 闪卡翻转 |
| fade-in | 淡入过渡 |
| slide-up | 上滑进入 |

## 设计Token (variables.css)

`src/assets/styles/variables.css` 定义CSS自定义属性:
- 间距系统 (4px base)
- 圆角
- 阴影
- 过渡时长

## Element Plus 主题覆盖

- 主色覆盖为朱砂红 (#C0392B)
- 圆角调整
- 组件风格中式化

## 响应式断点

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px
- 底部移动导航 (AppMobileNav) 在小屏幕显示
