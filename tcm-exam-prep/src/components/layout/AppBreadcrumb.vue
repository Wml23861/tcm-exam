<template>
  <div class="app-breadcrumb" v-if="items.length > 0">
    <template v-for="(item, index) in items" :key="item.path || index">
      <router-link
        v-if="item.path && index < items.length - 1"
        :to="item.path"
        class="breadcrumb-link"
      >{{ item.label }}</router-link>
      <span v-else class="breadcrumb-current">{{ item.label }}</span>
      <span v-if="index < items.length - 1" class="breadcrumb-separator">/</span>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps({
  items: {
    type: Array as () => { label: string; path?: string }[],
    default: () => [],
  },
})
</script>

<style scoped>
.app-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  font-size: var(--tcm-font-sm);
  color: var(--tcm-text-disabled);
}

.breadcrumb-link {
  color: var(--tcm-text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--tcm-primary-500);
}

.breadcrumb-current {
  color: var(--tcm-text-primary);
  font-weight: 500;
}

.breadcrumb-separator {
  color: var(--tcm-border);
}
</style>
