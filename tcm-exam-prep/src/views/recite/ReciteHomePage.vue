<template>
  <div class="page-recite">
    <h1 class="page-title">背诵辅助</h1>
    <p class="page-subtitle">利用碎片时间，反复记忆核心考点。选择合适的背诵模式开始吧。</p>

    <div class="mode-grid">
      <div class="mode-card" @click="goTo('formula-songs')">
        <div class="mode-icon mode-icon--songs">
          <span class="icon-text">歌</span>
        </div>
        <h3 class="mode-title">方歌背诵</h3>
        <p class="mode-desc">
          经典方剂歌诀，含组成与主治。逐行渐进式展示，辅助理解记忆。
        </p>
        <div class="mode-meta">
          <TcmTag type="key" size="sm">方剂学</TcmTag>
          <TcmTag type="memorize" size="sm">歌诀</TcmTag>
        </div>
        <div class="mode-arrow">&#x2192;</div>
      </div>

      <div class="mode-card" @click="goTo('herb-properties')">
        <div class="mode-icon mode-icon--herbs">
          <span class="icon-text">药</span>
        </div>
        <h3 class="mode-title">药性背诵</h3>
        <p class="mode-desc">
          常用中药的性味归经、功效主治。按分类筛选，卡片式翻转记忆。
        </p>
        <div class="mode-meta">
          <TcmTag type="key" size="sm">中药学</TcmTag>
          <TcmTag type="memorize" size="sm">性味</TcmTag>
        </div>
        <div class="mode-arrow">&#x2192;</div>
      </div>

      <div class="mode-card" @click="goTo('acupoints')">
        <div class="mode-icon mode-icon--acupoints">
          <span class="icon-text">穴</span>
        </div>
        <h3 class="mode-title">穴位背诵</h3>
        <p class="mode-desc">
          经络腧穴定位、归经与主治。重点穴位全覆盖，助你精准掌握。
        </p>
        <div class="mode-meta">
          <TcmTag type="key" size="sm">针灸学</TcmTag>
          <TcmTag type="memorize" size="sm">定位</TcmTag>
        </div>
        <div class="mode-arrow">&#x2192;</div>
      </div>
    </div>

    <TcmCard title="背诵小贴士" class="tips-card">
      <ul class="tips-list">
        <li>方歌建议每天背诵 1-2 首，反复吟诵直至脱口而出。</li>
        <li>药性背诵可采用分类对比法，将同类药物放在一起比较记忆。</li>
        <li>穴位背诵建议配合人体图示，定位与主治结合记忆。</li>
        <li>艾宾浩斯遗忘曲线提醒：学后 1 天、3 天、7 天及时复习。</li>
      </ul>
    </TcmCard>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import TcmCard from '@/components/ui/TcmCard.vue'
import TcmTag from '@/components/ui/TcmTag.vue'

const router = useRouter()

function goTo(name: string): void {
  router.push({ name })
}
</script>

<style scoped>
.page-recite {
  max-width: 900px;
  margin: 0 auto;
}

.page-title {
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-2xl);
  color: var(--tcm-text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: var(--tcm-font-base);
  color: var(--tcm-text-secondary);
  margin-bottom: 24px;
}

/* ===== 模式卡片 ===== */
.mode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.mode-card {
  position: relative;
  background: var(--tcm-bg-surface);
  border: 1px solid var(--tcm-border-light);
  border-radius: var(--tcm-radius-lg);
  padding: 24px;
  cursor: pointer;
  transition: all var(--tcm-transition-normal);
  box-shadow: var(--tcm-shadow-sm);
  overflow: hidden;
}

.mode-card:hover {
  box-shadow: var(--tcm-shadow-lg);
  transform: translateY(-3px);
  border-color: var(--tcm-primary-300);
}

.mode-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.mode-icon--songs {
  background: #FDF0ED;
  border: 2px solid var(--tcm-primary-300);
}

.mode-icon--herbs {
  background: #E8F5E9;
  border: 2px solid var(--tcm-jade-300);
}

.mode-icon--acupoints {
  background: #FFF8E1;
  border: 2px solid var(--tcm-gold-300);
}

.icon-text {
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-2xl);
  color: var(--tcm-text-primary);
}

.mode-title {
  font-size: var(--tcm-font-lg);
  font-weight: 600;
  color: var(--tcm-text-primary);
  margin: 0 0 8px 0;
  font-family: var(--tcm-font-decorative);
}

.mode-desc {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-secondary);
  line-height: var(--tcm-leading-relaxed);
  margin: 0 0 12px 0;
}

.mode-meta {
  display: flex;
  gap: 6px;
}

.mode-arrow {
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: var(--tcm-font-xl);
  color: var(--tcm-text-disabled);
  transition: all var(--tcm-transition-fast);
}

.mode-card:hover .mode-arrow {
  color: var(--tcm-primary-500);
  transform: translateX(4px);
}

/* ===== 小贴士 ===== */
.tips-card {
  margin-bottom: 32px;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-secondary);
  line-height: var(--tcm-leading-relaxed);
}

.tips-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--tcm-primary-300);
}

.tips-list li:last-child {
  margin-bottom: 0;
}
</style>
