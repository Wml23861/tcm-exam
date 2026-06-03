---
name: API路由端点
description: 后端Express API的所有路由端点、中间件、请求/响应格式
type: project
---

# API路由端点

**前缀**: `/api`
**中间件栈**: CORS → JSON解析 → 可选JWT认证 → 验证 → 路由处理 → 错误处理

## 认证路由 (`/api/auth`)

| 方法 | 路径 | 认证 | 说明 |
|------|------|------|------|
| POST | /login | 无 | 登录，返回JWT token |
| POST | /register | 无 | 注册 (ALLOW_REGISTRATION=true时) |
| GET | /me | 必须 | 获取当前用户信息 |

**默认管理员**: admin / tcm2024 (首次启动自动创建)

## 科目路由 (`/api/subjects`)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | / | 获取所有14个科目列表 |
| GET | /:id | 获取单个科目详情 |
| GET | /:id/chapters | 获取科目的所有章节 |

## 章节/小节/知识点路由

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /chapters/:id/sections | 获取章节的所有小节 |
| GET | /sections/:id | 获取小节详情(含Markdown内容) |
| GET | /knowledge-points | 获取知识点列表(支持筛选) |
| GET | /knowledge-points/:id | 获取单个知识点详情 |

## 试题路由 (`/api/questions`)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | / | 试题列表(分页/筛选) |
| GET | /:id | 单个试题详情 |
| GET | /filter | 筛选条件查询试题 |

## 闪卡路由 (`/api/flashcards`)

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | / | 闪卡列表 |
| GET | /:id | 单个闪卡详情 |

## 学习记录路由 (`/api/study-records`, `/api/review-schedules`)

- GET/POST 学习记录 (按user_id+item_type+item_id追踪)
- GET/POST 复习计划 (SM-2间隔重复参数)

## 考试记录路由 (`/api/exam-records`)

- GET/POST/PUT/DELETE 考试记录 (含答题详情和评分)

## 错题路由 (`/api/wrong-questions`)

- GET/POST/PUT/DELETE 错题记录

## 笔记路由 (`/api/notes`)

- GET/POST/PUT/DELETE 用户笔记 (可关联知识点/试题/闪卡/视频)

## 视频路由 (`/api/videos`)

- GET/POST/DELETE 视频资源
- 视频标注的CRUD

## 设置路由 (`/api/settings`)

- GET/PUT 用户应用设置 (每日目标/主题/字体/考试日期等)

## AI路由 (`/api/ai/chat`)

- POST /chat - AI对话 (需认证)

## 认证机制

- JWT: 存储在localStorage (`tcm_auth_token`)
- 有效期: 30天
- 前端API客户端: `src/utils/api-client.ts` 自动注入token
- 路由守卫: 未认证重定向到 `/login`
