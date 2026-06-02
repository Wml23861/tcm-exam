<template>
  <div class="compare-table-wrapper">
    <table class="compare-table">
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            :class="{
              'compare-table__th': true,
              'compare-table__th--highlight': index === highlightColumn,
            }"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
          :class="{
            'compare-table__row': true,
            'compare-table__row--alt': rowIndex % 2 === 1,
          }"
        >
          <td
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            :class="{
              'compare-table__td': true,
              'compare-table__td--highlight': colIndex === highlightColumn,
              'compare-table__td--label': colIndex === 0,
            }"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  headers: string[]
  rows: string[][]
  highlightColumn?: number
}>()
</script>

<style scoped>
.compare-table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--tcm-border);
  border-radius: var(--tcm-radius-lg);
  box-shadow: var(--tcm-shadow-sm);
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--tcm-font-sm);
  line-height: var(--tcm-leading-relaxed);
  min-width: 600px;
}

.compare-table__th {
  padding: 14px 16px;
  background: var(--tcm-primary-500);
  color: #fff;
  font-family: var(--tcm-font-decorative);
  font-size: var(--tcm-font-md);
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
}

.compare-table__th--highlight {
  background: var(--tcm-gold-500);
}

.compare-table__td {
  padding: 12px 16px;
  border-top: 1px solid var(--tcm-border-light);
  color: var(--tcm-text-primary);
  vertical-align: top;
}

.compare-table__td--label {
  font-weight: 600;
  color: var(--tcm-text-secondary);
  background: var(--tcm-bg-base);
  white-space: nowrap;
  min-width: 80px;
}

.compare-table__td--highlight {
  background: rgba(184, 134, 11, 0.06);
  border-left: 2px solid var(--tcm-gold-300);
}

.compare-table__row--alt {
  background: rgba(250, 243, 227, 0.5);
}

.compare-table__row:hover {
  background: rgba(192, 57, 43, 0.04);
}

@media (max-width: 768px) {
  .compare-table {
    font-size: var(--tcm-font-xs);
  }

  .compare-table__th {
    padding: 10px 12px;
    font-size: var(--tcm-font-sm);
  }

  .compare-table__td {
    padding: 8px 12px;
  }
}
</style>
