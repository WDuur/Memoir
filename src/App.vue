<script setup lang="ts">
import { onMounted } from 'vue'

import MemoContainer from '@/components/memoContainer.vue'
import AddMemo from '@/components/addMemo.vue'
import FilterMemoUsers from '@/components/filterMemoUsers.vue'

import { useMemos } from '@/composables/useMemos'
const { fetchMemos } = useMemos()

onMounted(fetchMemos)
</script>

<template>
  <div class="memoir">
    <h1 class="memoir__header">MEMOIR</h1>

    <FilterMemoUsers class="memoir__filter" />

    <MemoContainer class="memoir__memos" />
  </div>
  <AddMemo class="memoir__add-memo" />
</template>

<style lang="scss" scoped>
.memoir {
  @apply flex flex-col h-screen items-center gap-4;

  &__header {
    @apply flex items-center w-screen justify-center text-6xl text-gray-800;
  }
}
</style>
