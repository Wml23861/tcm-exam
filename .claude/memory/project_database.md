---
name: 数据库Schema
description: SQLite数据库表结构，包含15个迁移文件定义的所有表
type: project
---

# 数据库Schema (SQLite via Knex)

**数据库文件位置**: `DATA_PATH` 环境变量指定，默认 `./data/tcm-exam.db`
**迁移文件**: `tcm-exam-prep-server/migrations/` 目录下 001-015

## 核心业务表

### subjects (科目表) - 14个中医考试科目
| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT PK | 科目ID (如 zhongji, zhongyao) |
| name | TEXT | 科目全称 |
| short_name | TEXT | 简称 |
| icon | TEXT | 图标 |
| color | TEXT | 颜色标识 |
| exam_weight | INTEGER | 考试权重 |
| sort_order | INTEGER | 排序 |

### chapters (章节表) - 约106个章节
| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT PK | 章节ID |
| subject_id | TEXT FK | 所属科目 |
| title | TEXT | 章节标题 |
| description | TEXT | 章节描述 |
| sort_order | INTEGER | 排序 |

### sections (小节表) - 章节下属内容节
| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT PK | 小节ID |
| chapter_id | TEXT FK | 所属章节 |
| subject_id | TEXT FK | 所属科目 |
| title | TEXT | 小节标题 |
| content | TEXT | 内容 (Markdown) |
| estimated_study_time | INTEGER | 预估学习时间(分钟) |

### knowledge_points (知识点表)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT PK | 知识点ID |
| section_id | TEXT FK | 所属小节 |
| chapter_id | TEXT FK | 所属章节 |
| subject_id | TEXT FK | 所属科目 |
| title | TEXT | 知识点标题 |
| content | TEXT | 知识点内容 |
| difficulty | INTEGER | 难度 (1-5) |
| tags_json | TEXT | 标签JSON |
| is_key_point | BOOLEAN | 是否重点 |
| is_difficult_point | BOOLEAN | 是否难点 |
| frequency_level | TEXT | 考频等级 |
| is_predicted | BOOLEAN | 是否预测考点 |

### questions (试题表) - A1/A2/B1三种题型
| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT PK | 试题ID |
| question_type | TEXT | 题型 (A1/A2/B1) |
| is_group_root | BOOLEAN | B1题型-是否为题组根 |
| group_id | TEXT | B1题型-题组ID |
| subject_id | TEXT FK | 所属科目 |
| difficulty | INTEGER | 难度 (1-5) |
| question_stem | TEXT | 题干 |
| options_json | TEXT | 选项JSON |
| shared_options_json | TEXT | B1题型共用选项JSON |
| correct_answer | TEXT | 正确答案 |
| explanation | TEXT | 解析 |
| tags_json | TEXT | 标签JSON |
| exam_years_json | TEXT | 出现年份JSON |

### flashcards (闪卡表)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT PK | 闪卡ID |
| subject_id | TEXT FK | 所属科目 |
| front_content | TEXT | 正面内容 |
| back_content | TEXT | 背面内容 |
| mnemonic | TEXT | 记忆口诀 |
| category | TEXT | 分类 (definition/herb/formula/acupoint/song等) |
| is_system | BOOLEAN | 是否系统闪卡 |

## 用户相关表

### users (用户表)
- id, username (unique), password_hash, display_name, role (admin/user), created_at

### app_settings (用户设置表)
- id, user_id (unique FK), daily_study_goal, daily_question_goal, theme, font_size, exam_date等

### study_records (学习记录)
- id, user_id, item_type, item_id, study_count, mastery_level
- 唯一约束: (user_id, item_type, item_id)
- 跨时间连续跟踪学习行为

### review_schedules (复习计划 - SM-2算法)
- id, user_id, item_type, item_id, easiness_factor, interval_days, repetitions, next_review_date
- 唯一约束: (user_id, item_type, item_id)

### exam_records (考试记录)
- id, user_id, exam_type, scope_id, scope_name, total_questions, correct_count, score, answers_json, time_limit

### wrong_question_records (错题记录)
- id, user_id, question_id, wrong_count, last_wrong_answer, is_mastered

### notes (笔记)
- id, user_id, knowledge_point_id, question_id, flashcard_id, video_id, content, color

### videos (视频资源)
- id, user_id, title, file_url, duration, subject_ids_json, extracted_summary, transcript_text, status

### video_annotations (视频标注)
- id, user_id, video_id, timestamp, content
