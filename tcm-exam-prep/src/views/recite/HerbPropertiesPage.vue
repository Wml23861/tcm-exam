<template>
  <div class="page-herbs">
    <div class="page-header">
      <button class="back-btn" @click="$router.push({ name: 'recite-home' })">
        &larr; 返回
      </button>
      <h1 class="page-title">药性背诵</h1>
      <p class="page-subtitle">常用中药性味归经、功效主治，分类记忆更高效</p>
    </div>

    <!-- 分类筛选 -->
    <div class="category-filters">
      <button
        :class="['filter-btn', { 'is-active': activeCategory === '' }]"
        @click="activeCategory = ''"
      >
        全部
      </button>
      <button
        v-for="cat in categories"
        :key="cat"
        :class="['filter-btn', { 'is-active': activeCategory === cat }]"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- 草药卡片列表 -->
    <div class="herbs-grid">
      <div
        v-for="(herb, index) in filteredHerbs"
        :key="index"
        class="herb-card"
        :class="{ 'is-flipped': flippedMap[index] }"
        @click="toggleFlip(index)"
      >
        <div class="herb-card-inner">
          <!-- 正面：名称 -->
          <div class="herb-front">
            <div class="herb-name-area">
              <span class="herb-pinyin">{{ herb.pinyin }}</span>
              <h3 class="herb-name">{{ herb.name }}</h3>
            </div>
            <div class="herb-front-cats">
              <TcmTag
                v-for="cat in herb.categories"
                :key="cat"
                type="default"
                size="sm"
              >
                {{ cat }}
              </TcmTag>
            </div>
            <p class="herb-front-hint">点击查看药性</p>
          </div>

          <!-- 背面：详细信息 -->
          <div class="herb-back">
            <h3 class="herb-back-name">{{ herb.name }}</h3>

            <div class="herb-property">
              <span class="prop-label">性味</span>
              <span class="prop-value">{{ herb.property }}</span>
            </div>

            <div class="herb-property">
              <span class="prop-label">归经</span>
              <span class="prop-value">{{ herb.meridian }}</span>
            </div>

            <div class="herb-property">
              <span class="prop-label">功效</span>
              <span class="prop-value">{{ herb.effect }}</span>
            </div>

            <div class="herb-property">
              <span class="prop-label">主治</span>
              <span class="prop-value">{{ herb.indication }}</span>
            </div>

            <div class="herb-back-cats">
              <TcmTag
                v-for="cat in herb.categories"
                :key="cat"
                type="key"
                size="sm"
              >
                {{ cat }}
              </TcmTag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TcmEmpty v-if="filteredHerbs.length === 0" description="该分类下暂无草药数据" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import TcmCard from '@/components/ui/TcmCard.vue'
import TcmTag from '@/components/ui/TcmTag.vue'
import TcmEmpty from '@/components/ui/TcmEmpty.vue'

const activeCategory = ref('')
const flippedMap = reactive<Record<number, boolean>>({})

interface Herb {
  name: string
  pinyin: string
  property: string
  meridian: string
  effect: string
  indication: string
  categories: string[]
}

const herbs: Herb[] = [
  {
    name: '麻黄',
    pinyin: 'má huáng',
    property: '辛、微苦，温',
    meridian: '肺、膀胱经',
    effect: '发汗解表，宣肺平喘，利水消肿',
    indication: '风寒感冒，胸闷喘咳，风水浮肿。',
    categories: ['解表药', '辛温解表'],
  },
  {
    name: '桂枝',
    pinyin: 'guì zhī',
    property: '辛、甘，温',
    meridian: '心、肺、膀胱经',
    effect: '发汗解肌，温通经脉，助阳化气',
    indication: '风寒感冒，脘腹冷痛，血寒经闭，关节痹痛，水肿，心悸。',
    categories: ['解表药', '辛温解表'],
  },
  {
    name: '柴胡',
    pinyin: 'chái hú',
    property: '苦、辛，微寒',
    meridian: '肝、胆经',
    effect: '疏散退热，疏肝解郁，升举阳气',
    indication: '感冒发热，寒热往来，胸胁胀痛，月经不调，子宫脱垂，脱肛。',
    categories: ['解表药', '辛凉解表'],
  },
  {
    name: '黄连',
    pinyin: 'huáng lián',
    property: '苦，寒',
    meridian: '心、脾、胃、肝、胆、大肠经',
    effect: '清热燥湿，泻火解毒',
    indication: '湿热痞满，呕吐吞酸，泻痢，黄疸，高热神昏，心火亢盛，心烦不寐。',
    categories: ['清热药', '清热燥湿'],
  },
  {
    name: '黄芪',
    pinyin: 'huáng qí',
    property: '甘，微温',
    meridian: '脾、肺经',
    effect: '补气升阳，固表止汗，利水消肿，托疮生肌',
    indication: '气虚乏力，食少便溏，中气下陷，久泻脱肛，便血崩漏，表虚自汗。',
    categories: ['补虚药', '补气'],
  },
  {
    name: '当归',
    pinyin: 'dāng guī',
    property: '甘、辛，温',
    meridian: '肝、心、脾经',
    effect: '补血活血，调经止痛，润肠通便',
    indication: '血虚萎黄，眩晕心悸，月经不调，经闭痛经，虚寒腹痛，肠燥便秘。',
    categories: ['补虚药', '补血'],
  },
  {
    name: '茯苓',
    pinyin: 'fú líng',
    property: '甘、淡，平',
    meridian: '心、肺、脾、肾经',
    effect: '利水渗湿，健脾宁心',
    indication: '水肿尿少，痰饮眩悸，脾虚食少，便溏泄泻，心神不安，惊悸失眠。',
    categories: ['利水渗湿药'],
  },
  {
    name: '陈皮',
    pinyin: 'chén pí',
    property: '辛、苦，温',
    meridian: '脾、肺经',
    effect: '理气健脾，燥湿化痰',
    indication: '脘腹胀满，食少吐泻，咳嗽痰多。',
    categories: ['理气药'],
  },
]

const categories = computed(() => {
  const catSet = new Set<string>()
  herbs.forEach(h => h.categories.forEach(c => catSet.add(c)))
  return Array.from(catSet)
})

const filteredHerbs = computed(() => {
  if (!activeCategory.value) return herbs
  return herbs.filter(h => h.categories.includes(activeCategory.value))
})

function toggleFlip(index: number): void {
  flippedMap[index] = !flippedMap[index]
}
</script>

<style scoped>
.page-herbs {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 20px;
}

.back-btn {
  background: none;
  border: none;
  color: var(--tcm-primary-500);
  font-size: var(--tcm-font-sm);
  font-family: var(--tcm-font-family);
  cursor: pointer;
  padding: 0;
  margin-bottom: 8px;
  display: inline-block;
}

.back-btn:hover {
  color: var(--tcm-primary-700);
}

.page-title {
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-2xl);
  color: var(--tcm-text-primary);
  margin-bottom: 6px;
}

.page-subtitle {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-secondary);
  margin: 0;
}

/* ===== 分类筛选 ===== */
.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.filter-btn {
  padding: 6px 14px;
  border: 1px solid var(--tcm-border);
  border-radius: var(--tcm-radius-md);
  background: var(--tcm-bg-base);
  color: var(--tcm-text-secondary);
  font-size: var(--tcm-font-sm);
  font-family: var(--tcm-font-family);
  cursor: pointer;
  transition: all var(--tcm-transition-fast);
}

.filter-btn:hover {
  border-color: var(--tcm-primary-300);
}

.filter-btn.is-active {
  border-color: var(--tcm-jade-500);
  background: #E8F5E9;
  color: var(--tcm-jade-500);
  font-weight: 600;
}

/* ===== 草药卡片 ===== */
.herbs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  padding-bottom: 40px;
}

.herb-card {
  height: 280px;
  perspective: 800px;
  cursor: pointer;
}

.herb-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
}

.herb-card.is-flipped .herb-card-inner {
  transform: rotateY(180deg);
}

.herb-front,
.herb-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: var(--tcm-radius-lg);
  border: 1px solid var(--tcm-border-light);
  background: var(--tcm-bg-surface);
  box-shadow: var(--tcm-shadow-sm);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.herb-back {
  transform: rotateY(180deg);
  padding: 20px;
  overflow-y: auto;
}

/* ===== 正面 ===== */
.herb-front {
  padding: 24px;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.herb-name-area {
  margin-bottom: 16px;
}

.herb-pinyin {
  display: block;
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-disabled);
  font-style: italic;
  margin-bottom: 6px;
}

.herb-name {
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-3xl);
  color: var(--tcm-text-primary);
  margin: 0;
}

.herb-front-cats {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 16px;
}

.herb-front-hint {
  font-size: var(--tcm-font-xs);
  color: var(--tcm-text-disabled);
  margin: 0;
}

/* ===== 背面 ===== */
.herb-back-name {
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-xl);
  color: var(--tcm-text-primary);
  margin: 0 0 12px 0;
  text-align: center;
}

.herb-property {
  margin-bottom: 8px;
}

.prop-label {
  display: block;
  font-size: var(--tcm-font-xs);
  font-weight: 600;
  color: var(--tcm-jade-500);
  margin-bottom: 2px;
}

.prop-value {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-secondary);
  line-height: var(--tcm-leading-relaxed);
}

.herb-back-cats {
  margin-top: auto;
  padding-top: 8px;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

@media (max-width: 600px) {
  .herbs-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  .herb-card {
    height: 240px;
  }
}
</style>
