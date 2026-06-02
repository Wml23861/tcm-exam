<template>
  <div class="page-not-found">
    <div class="not-found-icon">&#x7A7A;</div>
    <h1>页面不存在</h1>
    <p class="text-tcm-text-s">你访问的页面可能已被移除或不存在</p>
    <router-link to="/" class="not-found-link">返回首页</router-link>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.page-not-found { display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center; }
.not-found-icon { font-size:80px;font-family:var(--tcm-font-decorative);color:var(--tcm-border);margin-bottom:16px; }
h1 { font-family:var(--tcm-font-decorative);font-size:var(--tcm-font-2xl);color:var(--tcm-text-primary);margin-bottom:8px; }
.not-found-link { margin-top:24px;color:var(--tcm-primary-500);font-weight:500; }
</style>
