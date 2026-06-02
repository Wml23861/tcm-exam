<template>
  <div class="page-acupoints">
    <div class="page-header">
      <button class="back-btn" @click="$router.push({ name: 'recite-home' })">
        &larr; 返回
      </button>
      <h1 class="page-title">穴位背诵</h1>
      <p class="page-subtitle">经络腧穴定位、归经与主治，重点穴位全覆盖</p>
    </div>

    <div class="acupoints-grid">
      <div
        v-for="(point, index) in acupoints"
        :key="index"
        class="acupoint-card"
        :class="{ 'is-revealed': revealedMap[index] }"
      >
        <div class="acupoint-front" @click="toggleReveal(index)">
          <div class="point-code">{{ point.code }}</div>
          <h3 class="point-name">{{ point.name }}</h3>
          <p class="point-meridian-badge">{{ point.meridian }}</p>
          <p class="reveal-hint">{{ revealedMap[index] ? '点击收起' : '点击查看详情' }}</p>
        </div>

        <div v-if="revealedMap[index]" class="acupoint-detail">
          <div class="detail-section">
            <h4 class="detail-label">定位</h4>
            <p class="detail-text">{{ point.location }}</p>
          </div>

          <div class="detail-section">
            <h4 class="detail-label">归经</h4>
            <p class="detail-text">{{ point.meridian }}</p>
          </div>

          <div class="detail-section">
            <h4 class="detail-label">主治</h4>
            <p class="detail-text">{{ point.indication }}</p>
          </div>

          <div v-if="point.technique" class="detail-section">
            <h4 class="detail-label">操作</h4>
            <p class="detail-text">{{ point.technique }}</p>
          </div>

          <div class="detail-tags">
            <TcmTag
              v-for="tag in point.tags"
              :key="tag"
              type="default"
              size="sm"
            >
              {{ tag }}
            </TcmTag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import TcmCard from '@/components/ui/TcmCard.vue'
import TcmTag from '@/components/ui/TcmTag.vue'

const revealedMap = reactive<Record<number, boolean>>({})

interface Acupoint {
  name: string
  code: string
  meridian: string
  location: string
  indication: string
  technique?: string
  tags: string[]
}

const acupoints: Acupoint[] = [
  {
    name: '合谷',
    code: 'LI4',
    meridian: '手阳明大肠经',
    location: '在手背，第1、2掌骨间，当第二掌骨桡侧的中点处。',
    indication: '头痛、齿痛、目赤肿痛、咽喉肿痛、面瘫、口眼歪斜、热病无汗、多汗、经闭、滞产。',
    technique: '直刺0.5-1寸，可灸。孕妇不宜针刺。',
    tags: ['原穴', '四总穴'],
  },
  {
    name: '足三里',
    code: 'ST36',
    meridian: '足阳明胃经',
    location: '在小腿外侧，犊鼻下3寸，犊鼻与解溪连线上。',
    indication: '胃痛、呕吐、腹胀、泄泻、便秘、虚劳羸瘦、下肢痿痹、心悸、失眠、癫狂。',
    technique: '直刺1-2寸，可灸。强壮保健要穴。',
    tags: ['合穴', '四总穴', '保健要穴'],
  },
  {
    name: '三阴交',
    code: 'SP6',
    meridian: '足太阴脾经',
    location: '在小腿内侧，内踝尖上3寸，胫骨内侧缘后方。',
    indication: '月经不调、崩漏、带下、不孕、滞产、遗精、阳痿、遗尿、失眠、眩晕。',
    technique: '直刺1-1.5寸，可灸。孕妇禁针。',
    tags: ['交会穴', '妇科要穴'],
  },
  {
    name: '太冲',
    code: 'LR3',
    meridian: '足厥阴肝经',
    location: '在足背，第1、2跖骨间，跖骨底结合部前方凹陷中。',
    indication: '头痛、眩晕、目赤肿痛、胁痛、呃逆、月经不调、痛经、小儿惊风、癫狂痫。',
    technique: '直刺0.5-1寸，可灸。',
    tags: ['输穴', '原穴'],
  },
  {
    name: '内关',
    code: 'PC6',
    meridian: '手厥阴心包经',
    location: '在前臂掌侧，腕横纹上2寸，掌长肌腱与桡侧腕屈肌腱之间。',
    indication: '心痛、心悸、胸闷、胃痛、呕吐、呃逆、失眠、眩晕、肘臂挛痛。',
    technique: '直刺0.5-1寸，可灸。',
    tags: ['络穴', '八脉交会穴'],
  },
  {
    name: '列缺',
    code: 'LU7',
    meridian: '手太阴肺经',
    location: '在前臂桡侧缘，桡骨茎突上方，腕横纹上1.5寸。',
    indication: '咳嗽、气喘、咽喉肿痛、头痛、项强、口眼歪斜、齿痛。',
    technique: '向上斜刺0.3-0.5寸，可灸。',
    tags: ['络穴', '八脉交会穴', '四总穴'],
  },
  {
    name: '委中',
    code: 'BL40',
    meridian: '足太阳膀胱经',
    location: '在膝后区，腘横纹中点。',
    indication: '腰痛、下肢痿痹、腹痛、吐泻、小便不利、遗尿、丹毒。',
    technique: '直刺1-1.5寸，或用三棱针点刺腘静脉出血。',
    tags: ['合穴', '四总穴'],
  },
  {
    name: '百会',
    code: 'GV20',
    meridian: '督脉',
    location: '在头部，前发际正中直上5寸。简易取穴：两耳尖连线中点。',
    indication: '头痛、眩晕、中风失语、癫狂、脱肛、阴挺、不寐。',
    technique: '平刺0.5-0.8寸，可灸。',
    tags: ['交会穴'],
  },
]

function toggleReveal(index: number): void {
  revealedMap[index] = !revealedMap[index]
}
</script>

<style scoped>
.page-acupoints {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
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

/* ===== 穴位卡片网格 ===== */
.acupoints-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  padding-bottom: 40px;
}

.acupoint-card {
  background: var(--tcm-bg-surface);
  border: 1px solid var(--tcm-border-light);
  border-radius: var(--tcm-radius-lg);
  overflow: hidden;
  box-shadow: var(--tcm-shadow-sm);
  transition: all var(--tcm-transition-normal);
}

.acupoint-card.is-revealed {
  border-color: var(--tcm-gold-300);
  box-shadow: var(--tcm-shadow-md);
}

.acupoint-front {
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: background var(--tcm-transition-fast);
}

.acupoint-front:hover {
  background: var(--tcm-bg-base);
}

.point-code {
  font-family: var(--tcm-font-mono);
  font-size: var(--tcm-font-sm);
  font-weight: 600;
  color: var(--tcm-gold-500);
  background: #FFF8E1;
  display: inline-block;
  padding: 2px 10px;
  border-radius: var(--tcm-radius-sm);
  margin-bottom: 12px;
}

.point-name {
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-2xl);
  color: var(--tcm-text-primary);
  margin: 0 0 6px 0;
}

.point-meridian-badge {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-secondary);
  margin: 0 0 12px 0;
}

.reveal-hint {
  font-size: var(--tcm-font-xs);
  color: var(--tcm-text-disabled);
  margin: 0;
}

/* ===== 详情展开 ===== */
.acupoint-detail {
  padding: 0 20px 20px;
  border-top: 1px solid var(--tcm-border-light);
}

.detail-section {
  margin-top: 14px;
}

.detail-label {
  font-size: var(--tcm-font-xs);
  font-weight: 600;
  color: var(--tcm-gold-500);
  margin: 0 0 4px 0;
}

.detail-text {
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-secondary);
  line-height: var(--tcm-leading-relaxed);
  margin: 0;
}

.detail-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 14px;
}

@media (max-width: 600px) {
  .acupoints-grid {
    grid-template-columns: 1fr;
  }
}
</style>
