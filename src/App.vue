<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/appHeader.vue'
import AddMemo from '@/components/addMemo.vue'
import FilterMemoUsers from '@/components/filterMemoUsers.vue'

import { useMemos } from '@/composables/useMemos'

const { fetchMemos } = useMemos()

onMounted(fetchMemos)
</script>

<template>
  <div class="memoir">
    <AppHeader />

    <FilterMemoUsers class="memoir__filter" />

    <RouterView />
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
