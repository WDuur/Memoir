<script lang="ts" setup>
import { computed } from 'vue'
import type { Memo } from '@/types'
import { useMemos } from '@/composables/useMemos'

const props = defineProps<{ memo: Memo }>()

const { updateMemoStatus, deleteMemo } = useMemos()

const status = computed(() => props.memo.status || 'open')
</script>
<template>
  <div
    :class="['card', { 'card--open': status === 'open', 'card--idle': status === 'idle' }]"
    class="card"
  >
    <div class="card-header">
      <h5 class="card-title">{{ memo.user }}</h5>

      <input
        v-if="memo.userId"
        type="checkbox"
        class="peer sr-only opacity-0"
        :id="`${memo.userId}-toggle`"
        name="toggle"
        :checked="status === 'open'"
        @click="updateMemoStatus(memo.userId)"
      />
      <label :for="`${memo.userId}-toggle`" class="card-header__disable">
        <span class="sr-only">Enable</span>
      </label>
      <div v-if="memo.status === 'idle' && memo.userId" @click="deleteMemo(memo.userId)">🔥</div>
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
    @apply opacity-30;
  }
  &-header {
    @apply flex justify-between;
    &__close {
      @apply bg-yellow-600 w-5 h-5 text-black text-lg font-medium me-2 px-2.5 py-0.5 rounded-full;
      @apply cursor-pointer;
    }
    &__disable {
      @apply relative flex h-6 w-11 cursor-pointer items-center rounded-full;
      @apply bg-gray-400 px-0.5 outline-gray-400 transition-colors;
      @apply before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300;
      @apply peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2;
      @apply peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500;
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
