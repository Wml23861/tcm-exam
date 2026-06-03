<template>
  <div class="ai-teacher">
    <!-- 左侧：历史会话 -->
    <aside class="ai-sidebar">
      <div class="sidebar-header">
        <span class="sidebar-icon">&#x262F;</span>
        <span>对话记录</span>
      </div>
      <button class="new-chat-btn" @click="startNewChat">
        <span class="new-chat-icon">+</span> 新会话
      </button>
      <div class="conversation-list">
        <div
          v-for="conv in conversations"
          :key="conv.id"
          :class="['conv-item', { active: conv.id === activeConvId }]"
          @click="switchConversation(conv.id)"
        >
          <div class="conv-title">{{ conv.title || '新的对话' }}</div>
          <div class="conv-date">{{ formatConvDate(conv.updatedAt) }}</div>
          <button class="conv-delete" @click.stop="deleteConv(conv.id)" title="删除">&#x2715;</button>
        </div>
        <div v-if="conversations.length === 0" class="conv-empty">
          暂无对话记录
        </div>
      </div>
    </aside>

    <!-- 右侧：聊天区域 -->
    <main class="ai-main">
      <!-- 顶部标题 -->
      <header class="ai-header">
        <div class="header-left">
          <span class="header-avatar">&#x1F9D1;&#x200D;&#x1F3EB;</span>
          <div>
            <h1 class="header-title">岐黄先生</h1>
            <p class="header-subtitle">AI 中医老师 · 随时解答你的疑问</p>
          </div>
        </div>
      </header>

      <!-- 消息列表 -->
      <div class="chat-area" ref="chatArea">
        <div v-if="messages.length === 0" class="welcome-screen">
          <div class="welcome-icon">&#x262F;</div>
          <h2>岐黄先生在此</h2>
          <p>我是你的 AI 中医老师，可以为你解答任何中医学习问题</p>
          <div class="welcome-suggestions">
            <button
              v-for="q in suggestedQuestions"
              :key="q"
              class="suggestion-btn"
              @click="sendMessage(q)"
            >{{ q }}</button>
          </div>
        </div>

        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          :class="['message', msg.role === 'user' ? 'message-user' : 'message-ai']"
        >
          <div class="message-avatar" v-if="msg.role === 'ai'">
            <span class="ai-mini-avatar">&#x1F9D1;&#x200D;&#x1F3EB;</span>
          </div>
          <div class="message-bubble" :class="msg.role">
            <div class="message-content" v-html="renderMessage(msg.content)"></div>
            <div class="message-time">{{ msg.time }}</div>
          </div>
          <div class="message-avatar" v-if="msg.role === 'user'">
            <span class="user-mini-avatar">&#x1F468;</span>
          </div>
        </div>

        <div v-if="isLoading" class="message message-ai">
          <div class="message-avatar">
            <span class="ai-mini-avatar">&#x1F9D1;&#x200D;&#x1F3EB;</span>
          </div>
          <div class="message-bubble ai typing">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      </div>

      <!-- 输入区 -->
      <div class="chat-input-area">
        <div class="input-wrapper">
          <textarea
            v-model="inputText"
            class="chat-input"
            placeholder="向岐黄先生提问... 例如：四逆汤和理中汤的区别？"
            rows="1"
            @keydown.enter.exact.prevent="handleSend"
            @input="autoResize"
            :disabled="isLoading"
          ></textarea>
          <button
            class="send-btn"
            :disabled="!inputText.trim() || isLoading"
            @click="handleSend"
            title="发送"
          >
            <span v-if="!isLoading">&#x2191;</span>
            <span v-else class="send-spinner"></span>
          </button>
        </div>
        <p class="input-hint">
          Enter 发送 · AI 回答仅供参考，重要知识请以教材为准
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import { apiPost } from '@/utils/api-client'

interface Message {
  role: 'user' | 'ai'
  content: string
  time: string
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: number
  updatedAt: number
}

const STORAGE_KEY = 'tcm_ai_conversations'
const ACTIVE_KEY = 'tcm_ai_active_conv'

const md = new MarkdownIt({ html: false, breaks: true, linkify: true })

const conversations = ref<Conversation[]>([])
const activeConvId = ref<string>('')
const messages = ref<Message[]>([])
const inputText = ref('')
const isLoading = ref(false)
const chatArea = ref<HTMLElement | null>(null)

const suggestedQuestions = [
  '四逆汤和理中汤有什么区别？',
  '麻黄汤的组成和主治是什么？',
  '什么是阴阳学说？举例说明。',
  '如何理解"同病异治"和"异病同治"？',
  '黄芩、黄连、黄柏的鉴别要点？',
]

function renderMessage(content: string): string {
  return md.render(content)
}

function loadConversations(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    conversations.value = raw ? JSON.parse(raw) : []
    // Sort newest first
    conversations.value.sort((a, b) => b.updatedAt - a.updatedAt)
  } catch {
    conversations.value = []
  }
}

function saveConversations(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations.value))
  } catch {
    // localStorage full, silently fail
  }
}

function getActiveConv(): Conversation | undefined {
  return conversations.value.find(c => c.id === activeConvId.value)
}

function startNewChat(): void {
  activeConvId.value = ''
  messages.value = []
  inputText.value = ''
  try { localStorage.removeItem(ACTIVE_KEY) } catch {}
}

function switchConversation(id: string): void {
  const conv = conversations.value.find(c => c.id === id)
  if (conv) {
    activeConvId.value = id
    messages.value = [...conv.messages]
    try { localStorage.setItem(ACTIVE_KEY, id) } catch {}
    nextTick(() => scrollToBottom())
  }
}

function deleteConv(id: string): void {
  conversations.value = conversations.value.filter(c => c.id !== id)
  saveConversations()
  if (activeConvId.value === id) {
    startNewChat()
  }
}

function ensureConv(): string {
  if (activeConvId.value) {
    const conv = getActiveConv()
    if (conv) return conv.id
  }
  const id = 'conv_' + Date.now().toString(36)
  activeConvId.value = id
  try { localStorage.setItem(ACTIVE_KEY, id) } catch {}
  return id
}

async function sendMessage(text?: string): Promise<void> {
  const msg = (text || inputText.value).trim()
  if (!msg || isLoading.value) return

  // Add user message
  const userMsg: Message = {
    role: 'user',
    content: msg,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
  }
  messages.value.push(userMsg)
  inputText.value = ''
  nextTick(() => scrollToBottom())

  // Ensure conversation exists
  const convId = ensureConv()
  let conv = conversations.value.find(c => c.id === convId)
  if (!conv) {
    conv = {
      id: convId,
      title: msg.slice(0, 30) + (msg.length > 30 ? '...' : ''),
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    conversations.value.unshift(conv)
  }
  conv.messages = [...messages.value]
  conv.title = messages.value.find(m => m.role === 'user')?.content.slice(0, 30) || '新的对话'
  conv.updatedAt = Date.now()
  saveConversations()

  // Get AI response
  isLoading.value = true
  try {
    const history = messages.value.slice(0, -1).map(m => ({
      role: m.role === 'ai' ? 'assistant' : 'user',
      content: m.content,
    }))

    const data = await apiPost<{ reply: string }>('/api/ai/chat', {
      message: msg,
      history,
    })

    const aiMsg: Message = {
      role: 'ai',
      content: data.reply,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }
    messages.value.push(aiMsg)

    // Update conversation
    conv.messages = [...messages.value]
    conv.updatedAt = Date.now()
    saveConversations()

    nextTick(() => scrollToBottom())
  } catch (e) {
    const errMsg: Message = {
      role: 'ai',
      content: '抱歉，岐黄先生暂时无法回答。请检查 AI 配置或稍后再试。',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }
    messages.value.push(errMsg)
    conv.messages = [...messages.value]
    conv.updatedAt = Date.now()
    saveConversations()
  } finally {
    isLoading.value = false
    nextTick(() => scrollToBottom())
  }
}

function handleSend(): void {
  sendMessage()
}

function autoResize(e: Event): void {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}

function scrollToBottom(): void {
  nextTick(() => {
    if (chatArea.value) {
      chatArea.value.scrollTop = chatArea.value.scrollHeight
    }
  })
}

function formatConvDate(ts: number): string {
  const d = new Date(ts)
  const now = new Date()
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }
  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

onMounted(() => {
  loadConversations()
  const savedId = (() => { try { return localStorage.getItem(ACTIVE_KEY) } catch { return null } })()
  if (savedId && conversations.value.find(c => c.id === savedId)) {
    switchConversation(savedId)
  }
})
</script>

<style scoped>
.ai-teacher {
  display: flex;
  height: calc(100vh - 56px);
  background: var(--tcm-bg-base);
}

/* ===== 左侧边栏 ===== */
.ai-sidebar {
  width: 260px;
  min-width: 260px;
  border-right: 1px solid var(--tcm-border-light);
  background: #F7F1E8;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 16px 12px;
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-lg);
  color: var(--tcm-primary-700);
  font-weight: 600;
}

.sidebar-icon {
  font-size: 22px;
  color: var(--tcm-primary-500);
}

.new-chat-btn {
  margin: 8px 12px 12px;
  padding: 10px;
  border: 1px dashed var(--tcm-primary-300);
  border-radius: var(--tcm-radius-md);
  background: #FDF0ED;
  color: var(--tcm-primary-500);
  font-size: var(--tcm-font-sm);
  cursor: pointer;
  transition: all var(--tcm-transition-fast);
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.new-chat-btn:hover {
  background: var(--tcm-primary-50);
  border-color: var(--tcm-primary-500);
}

.new-chat-icon {
  font-size: 16px;
  font-weight: 700;
}

.conversation-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 8px;
}

.conv-item {
  padding: 10px 12px;
  border-radius: var(--tcm-radius-md);
  cursor: pointer;
  position: relative;
  transition: background var(--tcm-transition-fast);
  margin-bottom: 2px;
}

.conv-item:hover {
  background: #EDE0D0;
}

.conv-item.active {
  background: #E8D5C0;
}

.conv-title {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 20px;
}

.conv-date {
  font-size: 11px;
  color: var(--tcm-text-disabled);
  margin-top: 2px;
}

.conv-delete {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: var(--tcm-text-disabled);
  cursor: pointer;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  display: none;
}

.conv-item:hover .conv-delete {
  display: block;
}

.conv-delete:hover {
  color: var(--tcm-error);
  background: #FFEBEE;
}

.conv-empty {
  text-align: center;
  color: var(--tcm-text-disabled);
  font-size: var(--tcm-font-sm);
  padding: 32px 16px;
}

/* ===== 右侧主区域 ===== */
.ai-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.ai-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--tcm-border-light);
  background: var(--tcm-bg-elevated);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-avatar {
  font-size: 36px;
}

.header-title {
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-xl);
  color: var(--tcm-primary-700);
  margin: 0;
}

.header-subtitle {
  font-size: var(--tcm-font-xs);
  color: var(--tcm-text-secondary);
  margin: 2px 0 0;
}

/* ===== 聊天区域 ===== */
.chat-area {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(192, 57, 43, 0.02) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(184, 134, 11, 0.02) 0%, transparent 50%),
    var(--tcm-bg-base);
}

/* ===== 欢迎页 ===== */
.welcome-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
}

.welcome-icon {
  font-size: 64px;
  margin-bottom: 16px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.welcome-screen h2 {
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-2xl);
  color: var(--tcm-primary-700);
  margin: 0 0 8px;
}

.welcome-screen p {
  color: var(--tcm-text-secondary);
  margin: 0 0 24px;
}

.welcome-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  max-width: 500px;
}

.suggestion-btn {
  padding: 8px 16px;
  border: 1px solid var(--tcm-border);
  border-radius: 20px;
  background: var(--tcm-bg-surface);
  color: var(--tcm-text-primary);
  font-size: var(--tcm-font-sm);
  cursor: pointer;
  transition: all var(--tcm-transition-fast);
  font-family: inherit;
}

.suggestion-btn:hover {
  border-color: var(--tcm-primary-300);
  background: #FDF0ED;
  color: var(--tcm-primary-500);
}

/* ===== 消息 ===== */
.message {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  max-width: 800px;
}

.message-user {
  margin-left: auto;
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-mini-avatar {
  font-size: 28px;
}

.user-mini-avatar {
  font-size: 24px;
  background: var(--tcm-bg-surface);
  border-radius: 50%;
  padding: 4px;
}

.message-bubble {
  padding: 12px 18px;
  border-radius: var(--tcm-radius-lg);
  max-width: 90%;
  position: relative;
}

.message-bubble.user {
  background: #FDF0ED;
  border: 1px solid #F5C1B6;
  color: var(--tcm-text-primary);
}

.message-bubble.ai {
  background: var(--tcm-bg-elevated);
  border: 1px solid var(--tcm-border-light);
  box-shadow: var(--tcm-shadow-sm);
}

.message-content {
  font-size: var(--tcm-font-base);
  line-height: 1.8;
  color: var(--tcm-text-primary);
}

.message-content :deep(h2) { font-size: var(--tcm-font-lg); margin: 12px 0 6px; color: var(--tcm-primary-700); }
.message-content :deep(h3) { font-size: var(--tcm-font-md); margin: 10px 0 4px; color: var(--tcm-text-primary); }
.message-content :deep(p) { margin: 6px 0; }
.message-content :deep(ul), .message-content :deep(ol) { padding-left: 20px; margin: 8px 0; }
.message-content :deep(li) { margin: 4px 0; }
.message-content :deep(table) { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: var(--tcm-font-sm); }
.message-content :deep(th) { background: #FDF0ED; padding: 8px 12px; border: 1px solid var(--tcm-border); text-align: left; font-weight: 600; }
.message-content :deep(td) { padding: 8px 12px; border: 1px solid var(--tcm-border-light); }
.message-content :deep(strong) { color: var(--tcm-primary-700); }
.message-content :deep(code) { background: var(--tcm-bg-surface); padding: 2px 6px; border-radius: 3px; font-size: 0.9em; }
.message-content :deep(blockquote) { border-left: 3px solid var(--tcm-gold-500); padding: 4px 12px; margin: 8px 0; background: #FFF8E1; border-radius: 0 4px 4px 0; }

.message-time {
  font-size: 11px;
  color: var(--tcm-text-disabled);
  margin-top: 4px;
  text-align: right;
}

/* ===== 输入中动画 ===== */
.message-bubble.typing {
  padding: 16px 24px;
  display: flex;
  gap: 6px;
  align-items: center;
}

.typing-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tcm-text-disabled);
  animation: typingBounce 1.4s infinite both;
}

.typing-dot:nth-child(1) { animation-delay: 0s; }
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-6px); opacity: 1; }
}

/* ===== 输入区 ===== */
.chat-input-area {
  padding: 16px 24px;
  border-top: 1px solid var(--tcm-border-light);
  background: var(--tcm-bg-elevated);
}

.input-wrapper {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  max-width: 800px;
  margin: 0 auto;
}

.chat-input {
  flex: 1;
  padding: 10px 16px;
  border: 2px solid var(--tcm-border);
  border-radius: var(--tcm-radius-lg);
  font-size: var(--tcm-font-base);
  font-family: inherit;
  background: var(--tcm-bg-base);
  color: var(--tcm-text-primary);
  resize: none;
  outline: none;
  min-height: 44px;
  max-height: 120px;
  transition: border-color var(--tcm-transition-fast);
}

.chat-input:focus {
  border-color: var(--tcm-primary-500);
}

.chat-input:disabled {
  opacity: 0.6;
}

.send-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: var(--tcm-radius-md);
  background: var(--tcm-primary-500);
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--tcm-transition-fast);
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: var(--tcm-primary-700);
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

.send-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.input-hint {
  text-align: center;
  font-size: 11px;
  color: var(--tcm-text-disabled);
  margin: 8px 0 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* 响应式 */
@media (max-width: 768px) {
  .ai-sidebar { display: none; }
  .chat-area { padding: 12px; }
  .chat-input-area { padding: 12px; }
  .message { max-width: 100%; }
}
</style>
