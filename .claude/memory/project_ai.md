---
name: AI老师集成
description: AI对话功能 - DeepSeek集成、系统提示、前后端实现
type: project
---

# AI老师 (岐黄先生) 集成

## 概述

- Git提交: `5555838 添加中医AI`
- 前端路由: `/ai-teacher` → AiTeacherPage.vue
- 后端路由: `POST /api/ai/chat` (需认证)
- AI服务: `src/services/ai.service.ts`

## 后端实现

### AI配置 (.env)
```
AI_API_KEY=sk-...           # DeepSeek API密钥
AI_API_URL=https://api.deepseek.com/v1/chat/completions
AI_MODEL=deepseek-chat      # 可切换其他OpenAI兼容API
```

### AI服务 (ai.service.ts)
- **系统提示**: 设定AI角色为"岐黄先生" — 经验丰富的中医老师
- **上下文**: 维护最近20轮对话历史
- **参数**: temperature=0.7, max_tokens=2048
- **兼容性**: OpenAI API格式，可替换为任何兼容API

## 前端实现

### AiTeacherPage.vue
- **左侧栏**: 对话历史列表 (可切换)
- **右侧主区域**:
  - 头部: "岐黄先生 - AI 中医老师"
  - 对话区: 聊天式界面
  - 输入区: 文本框 + 发送按钮
- **功能**:
  - 建议问题快速开始
  - AI回答Markdown渲染
  - 本地对话持久化 (内存 + localStorage)
- **设计**: 中医国风主题配色

## 扩展可能性

- 可切换AI模型 (通过.env配置)
- 系统提示可定制 (调整AI角色和知识范围)
- 支持流式响应 (OpenAI streaming格式)
