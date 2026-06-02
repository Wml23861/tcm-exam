<template>
  <button
    :class="['bookmark-btn', { 'bookmark-btn--active': isBookmarked }]"
    :title="isBookmarked ? '取消收藏' : '添加收藏'"
    @click.stop="toggle"
  >
    <span class="bookmark-icon">{{ isBookmarked ? '&#x2605;' : '&#x2606;' }}</span>
    <span v-if="showLabel" class="bookmark-label">{{ isBookmarked ? '已收藏' : '收藏' }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface BookmarkEntry {
  id: string
  type: string
  itemId: string
  subjectId: string
  title: string
  navigatePath: string
  createdAt: number
}

const props = defineProps<{
  itemType: 'knowledge-point' | 'question' | 'section' | 'chapter'
  itemId: string
  subjectId: string
  /** 收藏项的标题，用于在收藏列表中显示 */
  title?: string
  /** 导航路径 */
  navigatePath?: string
  /** 是否显示文字标签 */
  showLabel?: boolean
}>()

const emit = defineEmits<{
  bookmark: [entry: BookmarkEntry]
  unbookmark: [itemId: string]
}>()

const BOOKMARKS_KEY = 'bookmarks'

const isBookmarked = ref(false)

function getBookmarks(): BookmarkEntry[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY)
    return raw ? JSON.parse(raw) as BookmarkEntry[] : []
  } catch { return [] }
}

function saveBookmarks(bookmarks: BookmarkEntry[]) {
  try { localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks)) } catch { /* ignore */ }
}

function checkBookmarked() {
  const bookmarks = getBookmarks()
  isBookmarked.value = bookmarks.some(b => b.itemId === props.itemId && b.type === props.itemType)
}

function toggle() {
  const bookmarks = getBookmarks()
  const existingIdx = bookmarks.findIndex(b => b.itemId === props.itemId && b.type === props.itemType)

  if (existingIdx >= 0) {
    bookmarks.splice(existingIdx, 1)
    isBookmarked.value = false
    emit('unbookmark', props.itemId)
  } else {
    const entry: BookmarkEntry = {
      id: `${props.itemType}-${props.itemId}`,
      type: props.itemType,
      itemId: props.itemId,
      subjectId: props.subjectId,
      title: props.title || '',
      navigatePath: props.navigatePath || '',
      createdAt: Date.now(),
    }
    bookmarks.unshift(entry)
    isBookmarked.value = true
    emit('bookmark', entry)
  }

  saveBookmarks(bookmarks)
}

checkBookmarked()

watch(() => props.itemId, () => {
  checkBookmarked()
})
</script>

<style scoped>
.bookmark-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border: 1px solid var(--tcm-border);
  background: var(--tcm-bg-base);
  border-radius: var(--tcm-radius-md);
  cursor: pointer;
  font-family: var(--tcm-font-family);
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-secondary);
  transition: all var(--tcm-transition-fast);
  user-select: none;
}

.bookmark-btn:hover {
  border-color: var(--tcm-gold-500);
  color: var(--tcm-gold-500);
}

.bookmark-btn--active {
  border-color: var(--tcm-gold-500);
  background: #FFF8E1;
  color: var(--tcm-gold-500);
}

.bookmark-btn--active:hover {
  background: #FFECB3;
}

.bookmark-icon {
  font-size: 16px;
  line-height: 1;
}

.bookmark-label {
  font-size: var(--tcm-font-xs);
}
</style>
