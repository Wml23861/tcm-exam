<template>
  <div class="content-container">
    <AppBreadcrumb v-if="breadcrumbs.length" :items="breadcrumbs" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import AppBreadcrumb from './AppBreadcrumb.vue'

defineProps({
  breadcrumbs: {
    type: Array as () => { label: string; path?: string }[],
    default: () => [],
  },
})
</script>

<style scoped>
.content-container {
  width: 100%;
}
</style>
