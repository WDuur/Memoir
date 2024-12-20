<script lang="ts" setup>
import type { Memo } from '@/types'

defineProps<{ memo: Memo }>()
</script>
<template>
  <div
    class="w-full bg-white border border-gray-200 rounded-lg shadow-md hover:dark:bg-gray-600 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex flex-col items-center pb-10">
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ memo.user }}</h5>
      <span class="text-sm text-gray-500 dark:text-gray-400">{{ memo.message }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
