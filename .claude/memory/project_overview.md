---
name: 岐黄备考系统 - 项目概览
description: 中医执业助理医师考试备考平台的全栈项目架构、技术栈、目录结构
type: project
---

# 岐黄备考系统 (Qihuang Exam Prep) - 项目概览

**Git仓库**: `e:\中医\`
**提交历史**: 7 commits, 从 `feat: 岐黄备考系统 - 中医执业助理医师考试学习平台` 开始

## 整体结构

```
e:/中医/
├── 中医.txt                    # 设计需求文档/开发对话记录
├── 资料/                       # 考试真题PDF (2020/2021/2022年)
├── tcm-exam-prep/              # 前端 (Vue 3 + TypeScript + Vite)
└── tcm-exam-prep-server/       # 后端 (Express + Knex + SQLite)
```

## 前端技术栈 (tcm-exam-prep)

- **框架**: Vue 3.5 + TypeScript 6.0
- **构建**: Vite 8.0
- **状态管理**: Pinia 3.0
- **路由**: Vue Router 4 (Hash模式)
- **UI库**: Element Plus 2.14 + TailwindCSS 3
- **图表**: ECharts 6.1
- **Markdown**: markdown-it + highlight.js
- **SM-2算法**: 自实现间隔重复 (src/utils/sm2.ts)
- **部署**: Docker (nginx), Vercel, Netlify

## 后端技术栈 (tcm-exam-prep-server)

- **运行时**: Node.js + Express 4 + TypeScript 5.7
- **数据库**: better-sqlite3 + Knex 3.1 (SQLite)
- **认证**: bcryptjs + jsonwebtoken (JWT, 30天有效期)
- **验证**: Zod 3.24
- **AI**: DeepSeek API (可切换为其他OpenAI兼容API)
- **文件**: 本地存储 (图片/视频在 public/ 目录)
- **端口**: 3002
- **入口**: tsx src/index.ts

## 核心设计原则

1. 14门中医考试科目的完整内容体系
2. A1/A2/B1三种题型的题库系统
3. SM-2间隔重复算法用于闪卡复习
4. 中医风格的国风典雅设计 (米纸底、朱砂红、金色、碧绿)
5. AI老师 (岐黄先生) 对话辅导
6. 错题本自动收录和分析
7. 番茄钟、每日目标、学习统计

## 关键文件路径

| 用途 | 路径 |
|------|------|
| 前端入口 | tcm-exam-prep/src/main.ts |
| 路由定义 | tcm-exam-prep/src/router/routes.ts |
| Pinia stores | tcm-exam-prep/src/stores/ |
| TypeScript类型 | tcm-exam-prep/src/types/ |
| API客户端 | tcm-exam-prep/src/utils/api-client.ts |
| SM-2算法 | tcm-exam-prep/src/utils/sm2.ts |
| 设计系统变量 | tcm-exam-prep/src/assets/styles/variables.css |
| Tailwind配置 | tcm-exam-prep/tailwind.config.js |
| 后端入口 | tcm-exam-prep-server/src/index.ts |
| Express App | tcm-exam-prep-server/src/app.ts |
| 环境配置 | tcm-exam-prep-server/src/config/env.ts |
| 数据库配置 | tcm-exam-prep-server/src/config/database.ts |
| Knex配置 | tcm-exam-prep-server/knexfile.ts |
| 迁移文件 | tcm-exam-prep-server/migrations/ (015) |
| 种子文件 | tcm-exam-prep-server/seeds/ (001-015) |
| 真题PDF | 资料/ (2020/2021/2022年) |
