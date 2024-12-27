<script lang="ts" setup>
import { computed } from 'vue'
import type { Memo } from '@/types'
import { useMemos } from '@/composables/useMemos'

const props = defineProps<{ memo: Memo }>()

const { updateMemoStatus } = useMemos()

const status = computed(() => props.memo.status || 'open')
</script>
<template>
  <div
    :class="['card', { 'card--open': status === 'open', 'card--idle': status === 'idle' }]"
    class="card"
  >
    <div class="card-header">
      <h5 class="card-title">{{ memo.user }}</h5>
      {{ memo.id }}
      <div class="card-header__close" v-if="memo.id" @click="updateMemoStatus(memo.id)"></div>
    </div>
    <span :class="['card-message', { 'card-message--idle': status === 'idle' }]">{{
      memo.message
    }}</span>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply flex flex-col  p-4 pb-10;
  @apply w-full bg-white border border-gray-200 rounded-lg shadow-md hover:dark:bg-gray-600 dark:bg-gray-800 dark:border-gray-700;
  @apply h-full;

  &--idle {
    @apply opacity-40;
  }
  &-header {
    @apply flex justify-between;
    &__close {
      @apply bg-yellow-600 w-5 h-5 text-black text-lg font-medium me-2 px-2.5 py-0.5 rounded-full;
      @apply cursor-pointer;
    }
  }

  &-title {
    @apply mb-1 text-xl font-medium text-gray-900 dark:text-white;
  }
  &-message {
    @apply text-lg text-gray-500 dark:text-gray-400 overflow-hidden;

    &--idle {
      @apply line-through;
    }
  }
}
</style>
