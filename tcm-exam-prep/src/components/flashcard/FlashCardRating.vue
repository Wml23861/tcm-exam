<template>
  <div class="rating-section">
    <p class="rating-title">你对这张卡的掌握程度？</p>
    <div class="rating-bar">
      <button class="rating-btn rating-btn--again" @click="$emit('rate', 1)">
        <span class="rating-emoji">&#128532;</span>
        <span class="rating-label">忘记了</span>
        <span class="rating-hint">1天内再复习</span>
      </button>
      <button class="rating-btn rating-btn--hard" @click="$emit('rate', 3)">
        <span class="rating-emoji">&#128528;</span>
        <span class="rating-label">有点难</span>
        <span class="rating-hint">近期再巩固</span>
      </button>
      <button class="rating-btn rating-btn--good" @click="$emit('rate', 4)">
        <span class="rating-emoji">&#128578;</span>
        <span class="rating-label">还不错</span>
        <span class="rating-hint">正常间隔</span>
      </button>
      <button class="rating-btn rating-btn--easy" @click="$emit('rate', 5)">
        <span class="rating-emoji">&#128526;</span>
        <span class="rating-label">太简单</span>
        <span class="rating-hint">拉长间隔</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ rate: [quality: number] }>()
</script>

<style scoped>
.rating-section {
  text-align: center;
  margin-top: 36px;
}

.rating-title {
  font-size: 14px;
  color: #999;
  margin-bottom: 18px;
  user-select: none;
}

.rating-bar {
  display: flex;
  gap: 14px;
  justify-content: center;
}

.rating-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 22px;
  border: 2px solid #e8dcc8;
  border-radius: 14px;
  background: #fffdf7;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 85px;
  user-select: none;
}

.rating-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.rating-btn:active {
  transform: translateY(-1px);
}

.rating-btn--again { border-color: #e8dcc8; }
.rating-btn--again:hover {
  border-color: #e57373;
  background: #fff5f5;
  box-shadow: 0 4px 16px rgba(229, 57, 53, 0.12);
}

.rating-btn--hard { border-color: #e8dcc8; }
.rating-btn--hard:hover {
  border-color: #ffb74d;
  background: #fffaf3;
  box-shadow: 0 4px 16px rgba(245, 124, 0, 0.12);
}

.rating-btn--good { border-color: #e8dcc8; }
.rating-btn--good:hover {
  border-color: #81c784;
  background: #f5faf5;
  box-shadow: 0 4px 16px rgba(67, 160, 71, 0.12);
}

.rating-btn--easy { border-color: #e8dcc8; }
.rating-btn--easy:hover {
  border-color: #64b5f6;
  background: #f5f9ff;
  box-shadow: 0 4px 16px rgba(30, 136, 229, 0.12);
}

.rating-emoji {
  font-size: 24px;
  line-height: 1;
}

.rating-label {
  font-weight: 600;
  font-size: 15px;
  color: #3d3027;
}

.rating-hint {
  font-size: 11px;
  color: #bbb;
}
</style>
