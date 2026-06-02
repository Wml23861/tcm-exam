<template>
  <div class="page-songs">
    <div class="page-header">
      <button class="back-btn" @click="$router.push({ name: 'recite-home' })">
        &larr; 返回
      </button>
      <h1 class="page-title">方歌背诵</h1>
      <p class="page-subtitle">经典方剂歌诀，逐行渐进式展示，辅助理解记忆</p>
    </div>

    <!-- 显示模式切换 -->
    <div class="mode-toggle">
      <button
        :class="['toggle-btn', { 'is-active': revealMode === 'line' }]"
        @click="revealMode = 'line'"
      >
        逐行显示
      </button>
      <button
        :class="['toggle-btn', { 'is-active': revealMode === 'all' }]"
        @click="revealMode = 'all'"
      >
        全部显示
      </button>
    </div>

    <!-- 方剂卡片列表 -->
    <div class="songs-list">
      <div
        v-for="(formula, index) in formulas"
        :key="index"
        class="song-card"
        :class="{ 'is-revealed': revealedMap[index] }"
      >
        <div class="song-name-row" @click="toggleReveal(index)">
          <h3 class="song-name">{{ formula.name }}</h3>
          <span class="song-source">《{{ formula.source }}》</span>
          <span class="reveal-icon">{{ revealedMap[index] ? '&#x25BC;' : '&#x25B6;' }}</span>
        </div>

        <div v-if="revealedMap[index]" class="song-detail">
          <!-- 逐行显示模式下逐行展示 -->
          <template v-if="revealMode === 'line'">
            <div
              v-for="(line, li) in displayLines[index] ?? []"
              :key="li"
              class="song-line"
            >
              <p class="song-verse">{{ line.verse }}</p>
              <p v-if="line.pinyin" class="song-pinyin">{{ line.pinyin }}</p>
            </div>
          </template>

          <!-- 全部显示模式 -->
          <template v-else>
            <div class="song-lyrics">
              <p
                v-for="(line, li) in formula.lines"
                :key="li"
                class="song-verse"
              >
                {{ line.verse }}
              </p>
            </div>
          </template>

          <TcmDivider />

          <div class="song-info">
            <div class="info-row">
              <span class="info-label">组成</span>
              <span class="info-value">{{ formula.composition }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">功效</span>
              <span class="info-value">{{ formula.effect }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">主治</span>
              <span class="info-value">{{ formula.indication }}</span>
            </div>
          </div>

          <div class="song-categories">
            <TcmTag
              v-for="cat in formula.categories"
              :key="cat"
              type="default"
              size="sm"
            >
              {{ cat }}
            </TcmTag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import TcmCard from '@/components/ui/TcmCard.vue'
import TcmTag from '@/components/ui/TcmTag.vue'
import TcmDivider from '@/components/ui/TcmDivider.vue'

const revealMode = ref<'line' | 'all'>('line')
const revealedMap = reactive<Record<number, boolean>>({})

interface FormulaLine {
  verse: string
  pinyin?: string
}

interface FormulaSong {
  name: string
  source: string
  lines: FormulaLine[]
  composition: string
  effect: string
  indication: string
  categories: string[]
}

// 展示用的分行数据（逐行模式）
const displayLines = reactive<Record<number, FormulaLine[]>>({})

const formulas: FormulaSong[] = [
  {
    name: '麻黄汤',
    source: '伤寒论',
    lines: [
      { verse: '麻黄汤中用桂枝，', pinyin: 'má huáng tāng zhōng yòng guì zhī,' },
      { verse: '杏仁甘草四般施，', pinyin: 'xìng rén gān cǎo sì bān shī,' },
      { verse: '发热恶寒头项痛，', pinyin: 'fā rè wù hán tóu xiàng tòng,' },
      { verse: '伤寒服此汗淋漓。', pinyin: 'shāng hán fú cǐ hàn lín lí.' },
    ],
    composition: '麻黄、桂枝、杏仁、甘草',
    effect: '发汗解表，宣肺平喘',
    indication: '外感风寒表实证。恶寒发热，头身疼痛，无汗而喘，舌苔薄白，脉浮紧。',
    categories: ['解表剂', '辛温解表'],
  },
  {
    name: '桂枝汤',
    source: '伤寒论',
    lines: [
      { verse: '桂枝汤治太阳风，', pinyin: 'guì zhī tāng zhì tài yáng fēng,' },
      { verse: '芍药甘草姜枣同，', pinyin: 'sháo yào gān cǎo jiāng zǎo tóng,' },
      { verse: '解肌发表调营卫，', pinyin: 'jiě jī fā biǎo tiáo yíng wèi,' },
      { verse: '汗出恶风此方功。', pinyin: 'hàn chū wù fēng cǐ fāng gōng.' },
    ],
    composition: '桂枝、芍药、甘草、生姜、大枣',
    effect: '解肌发表，调和营卫',
    indication: '外感风寒表虚证。头痛发热，汗出恶风，鼻鸣干呕，苔白不渴，脉浮缓或浮弱。',
    categories: ['解表剂', '辛温解表'],
  },
  {
    name: '小柴胡汤',
    source: '伤寒论',
    lines: [
      { verse: '小柴胡汤和解供，', pinyin: 'xiǎo chái hú tāng hé jiě gōng,' },
      { verse: '半夏人参甘草从，', pinyin: 'bàn xià rén shēn gān cǎo cóng,' },
      { verse: '更用黄芩加姜枣，', pinyin: 'gèng yòng huáng qín jiā jiāng zǎo,' },
      { verse: '少阳百病此为宗。', pinyin: 'shào yáng bǎi bìng cǐ wéi zōng.' },
    ],
    composition: '柴胡、黄芩、半夏、人参、甘草、生姜、大枣',
    effect: '和解少阳',
    indication: '伤寒少阳证。往来寒热，胸胁苦满，默默不欲饮食，心烦喜呕，口苦，咽干，目眩，舌苔薄白，脉弦。',
    categories: ['和解剂', '和解少阳'],
  },
  {
    name: '四君子汤',
    source: '太平惠民和剂局方',
    lines: [
      { verse: '四君子汤中和义，', pinyin: 'sì jūn zǐ tāng zhōng hé yì,' },
      { verse: '参术茯苓甘草比，', pinyin: 'shēn zhú fú líng gān cǎo bǐ,' },
      { verse: '益以夏陈名六君，', pinyin: 'yì yǐ xià chén míng liù jūn,' },
      { verse: '祛痰补气阳虚饵。', pinyin: 'qū tán bǔ qì yáng xū ěr.' },
    ],
    composition: '人参、白术、茯苓、甘草',
    effect: '益气健脾',
    indication: '脾胃气虚证。面色萎白，语声低微，气短乏力，食少便溏，舌淡苔白，脉虚弱。',
    categories: ['补益剂', '补气'],
  },
  {
    name: '四物汤',
    source: '太平惠民和剂局方',
    lines: [
      { verse: '四物地芍与归芎，', pinyin: 'sì wù dì sháo yǔ guī xiōng,' },
      { verse: '血家百病此方通，', pinyin: 'xuè jiā bǎi bìng cǐ fāng tōng,' },
      { verse: '八珍合入四君子，', pinyin: 'bā zhēn hé rù sì jūn zǐ,' },
      { verse: '气血双补功独崇。', pinyin: 'qì xuè shuāng bǔ gōng dú chóng.' },
    ],
    composition: '当归、川芎、白芍、熟地黄',
    effect: '补血调血',
    indication: '营血虚滞证。头晕目眩，心悸失眠，面色无华，妇人月经不调，量少或经闭不行，脐腹作痛，舌淡，脉细弦或细涩。',
    categories: ['补益剂', '补血'],
  },
]

function toggleReveal(index: number): void {
  if (revealedMap[index]) {
    revealedMap[index] = false
    delete displayLines[index]
  } else {
    revealedMap[index] = true
    // 逐行模式下初始只显示第一行
    if (revealMode.value === 'line') {
      displayLines[index] = [formulas[index].lines[0]]
    }
  }
}
</script>

<style scoped>
.page-songs {
  max-width: 750px;
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

/* ===== 模式切换 ===== */
.mode-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.toggle-btn {
  padding: 6px 16px;
  border: 1px solid var(--tcm-border);
  border-radius: var(--tcm-radius-md);
  background: var(--tcm-bg-base);
  color: var(--tcm-text-secondary);
  font-size: var(--tcm-font-sm);
  font-family: var(--tcm-font-family);
  cursor: pointer;
  transition: all var(--tcm-transition-fast);
}

.toggle-btn.is-active {
  border-color: var(--tcm-primary-500);
  background: var(--tcm-primary-50);
  color: var(--tcm-primary-700);
  font-weight: 600;
}

/* ===== 方剂卡片 ===== */
.songs-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 40px;
}

.song-card {
  background: var(--tcm-bg-surface);
  border: 1px solid var(--tcm-border-light);
  border-radius: var(--tcm-radius-lg);
  padding: 0;
  overflow: hidden;
  box-shadow: var(--tcm-shadow-sm);
  transition: all var(--tcm-transition-normal);
}

.song-card:hover {
  box-shadow: var(--tcm-shadow-md);
}

.song-card.is-revealed {
  border-color: var(--tcm-primary-300);
}

.song-name-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px;
  cursor: pointer;
  user-select: none;
}

.song-name {
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-lg);
  font-weight: 700;
  color: var(--tcm-text-primary);
  margin: 0;
}

.song-source {
  font-size: var(--tcm-font-xs);
  color: var(--tcm-text-disabled);
  font-style: italic;
}

.reveal-icon {
  margin-left: auto;
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-disabled);
}

.song-detail {
  padding: 0 20px 20px;
}

.song-line {
  padding: 12px 16px;
  background: var(--tcm-bg-base);
  border-radius: var(--tcm-radius-md);
  margin-bottom: 8px;
  border-left: 3px solid var(--tcm-primary-300);
}

.song-verse {
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-lg);
  color: var(--tcm-text-primary);
  line-height: var(--tcm-leading-relaxed);
  margin: 0;
}

.song-pinyin {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-disabled);
  margin: 4px 0 0 0;
  font-style: italic;
}

.song-lyrics {
  padding: 16px;
  background: var(--tcm-bg-base);
  border-radius: var(--tcm-radius-md);
  margin-bottom: 8px;
}

.song-info {
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  margin-bottom: 6px;
  font-size: var(--tcm-font-sm);
}

.info-label {
  flex-shrink: 0;
  width: 40px;
  font-weight: 600;
  color: var(--tcm-primary-500);
}

.info-value {
  color: var(--tcm-text-secondary);
  line-height: var(--tcm-leading-relaxed);
  flex: 1;
}

.song-categories {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
</style>
