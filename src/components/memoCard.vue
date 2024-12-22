<script lang="ts" setup>
import type { Memo } from '@/types'
import IconClose from './icons/IconClose.vue'

defineProps<{ memo: Memo }>()
</script>
<template>
  <div class="card">
    <h5 class="card-title">{{ memo.user }}</h5>
    <IconClose />
    <span class="card-message">{{ memo.message }}</span>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply flex flex-col  p-4 pb-10;
  @apply w-full bg-white border border-gray-200 rounded-lg shadow-md hover:dark:bg-gray-600 dark:bg-gray-800 dark:border-gray-700;
  @apply h-full;
}

.card-title {
  @apply mb-1 text-xl font-medium text-gray-900 dark:text-white;
}

.card-message {
  @apply text-lg text-gray-500 dark:text-gray-400;
}
</style>
