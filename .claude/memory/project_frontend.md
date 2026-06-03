---
name: 前端架构
description: Vue 3前端路由、页面结构、组件树、Store、布局系统
type: project
---

# 前端架构

## 入口与启动流程

1. `src/main.ts` → 创建Vue app + Pinia + Router
2. `src/App.vue` → 根组件:
   - 监听auth store状态
   - 登录后加载用户设置
   - 渲染 `<router-view>` + 全局过渡动画

## 路由结构 (Hash模式)

**公开路由**:
- `/login` → LoginPage
- `/register` → RegisterPage

**主布局 AppLayout** (需要认证):
- `/` → DashboardPage (仪表盘)
- `/subjects` → SubjectListPage (14科列表)
- `/subjects/:subjectId` → SubjectDetailPage (章节列表)
- `/subjects/:subjectId/chapters/:chapterId` → ChapterContentPage (小节+知识点)
- `/study` → StudyPage (学习模式)
- `/flashcards` → FlashcardListPage
- `/flashcards/review/:subjectId?` → FlashcardReviewPage (SM-2复习)
- `/practice` → PracticeSetupPage
- `/practice/session` → PracticeSessionPage
- `/practice/wrong` → WrongQuestionPage (错题本)
- `/analysis/wrong` → WrongAnalysisPage (错题分析)
- `/exam/setup` → MockExamSetupPage
- `/exam/:examId` → MockExamPage (限时模拟)
- `/exam/:examId/result` → ExamResultPage
- `/recite` → ReciteHomePage (背诵中心)
- `/recite/songs` → FormulaSongsPage (方歌)
- `/recite/herbs` → HerbPropertiesPage (中药属性)
- `/recite/acupoints` → AcupointsPage (穴位)
- `/videos` → VideoListPage
- `/videos/:videoId` → VideoPlayerPage
- `/stats` → StatsPage (学习统计)
- `/hotpoints` → HotPointsPage (热点预测)
- `/ai-teacher` → AiTeacherPage (AI老师)
- `/settings` → SettingsPage
- `/bookmarks` → BookmarkPage

**兜底**: `/:pathMatch(.*)*` → NotFoundPage

## Store 体系 (Pinia)

| Store | 用途 |
|-------|------|
| useAuthStore | 登录/注册/登出，JWT管理 |
| useFlashcardStore | 闪卡复习引擎 (SM-2) |
| useSettingsStore | 用户设置 (主题/目标/考试日期) |
| useSubjectStore | 科目/章节/小节/知识点 |

## 组件分类

**布局组件** (`components/layout/`):
- AppLayout (核心布局: Header+Sidebar+Content)
- AppHeader, AppSidebar (9个导航项，响应式)
- AppMobileNav, AppBreadcrumb, ContentContainer

**试题组件** (`components/question/`):
- QuestionCard, QuestionFilter, QuestionNavigator
- B1QuestionGroup (配伍题题组)

**闪卡组件** (`components/flashcard/`):
- FlashCard (翻转动画)
- FlashCardProgress, FlashCardRating

**通用组件** (`components/common/`):
- BookmarkButton, SearchPanel (Ctrl+K), PomodoroTimer, CompareTable

**背诵组件** (`components/recite/`):
- AcupointIllustration

**UI组件** (`components/ui/`):
- TcmBadge, TcmButton, TcmCard, TcmDivider, TcmEmpty, TcmProgress, TcmSkeleton, TcmTag, TcmToast

## 工具函数 (utils/)

| 文件 | 用途 |
|------|------|
| api-client.ts | HTTP客户端 (自动注入JWT) |
| sm2.ts | SM-2间隔重复算法实现 |
| exam-scoring.ts | 考试评分逻辑 |
| shuffle.ts | 数组随机打乱 |
| date.ts | 日期处理 |
| id-generator.ts | ID生成 |

## 页面关键特性

- **DashboardPage**: 学习统计卡片 + 每日目标 + 番茄钟 + 进度图表
- **AiTeacherPage**: ChatGPT式对话界面，左侧对话历史，右侧聊天区，Markdown渲染，建议问题
- **MockExamPage**: 限时考试，倒计时，自动交卷评分
- **FlashcardReviewPage**: SM-2算法驱动，翻转动画，前/后翻页
