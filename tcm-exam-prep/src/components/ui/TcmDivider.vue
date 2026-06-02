<template>
  <div :class="['tcm-divider', `tcm-divider--${direction}`]">
    <div class="tcm-divider-line"></div>
    <span v-if="$slots.default" class="tcm-divider-text">
      <slot />
    </span>
    <div class="tcm-divider-line"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  direction: {
    type: String as () => 'horizontal' | 'vertical',
    default: 'horizontal',
  },
})
</script>

<style scoped>
.tcm-divider {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tcm-divider--horizontal {
  width: 100%;
  margin: 16px 0;
}

.tcm-divider--vertical {
  flex-direction: column;
  height: 100%;
  margin: 0 8px;
}

.tcm-divider-line {
  flex: 1;
  border: none;
  border-top: 1px solid var(--tcm-border-light);
}

.tcm-divider--vertical .tcm-divider-line {
  border-top: none;
  border-left: 1px solid var(--tcm-border-light);
}

.tcm-divider-text {
  color: var(--tcm-text-disabled);
  font-size: var(--tcm-font-sm);
  font-family: var(--tcm-font-decorative);
}
</style>
