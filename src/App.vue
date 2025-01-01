<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/appHeader.vue'
import AddMemo from '@/components/addMemo.vue'
import FilterMemoUsers from '@/components/filterMemoUsers.vue'

import { useMemos } from '@/composables/useMemos'
import { useUser } from '@/composables/useUser'

const { fetchMemos } = useMemos()
const { selectedUser } = useUser()

onMounted(fetchMemos)
</script>

<template>
  <div class="memoir">
    <AppHeader />

    <FilterMemoUsers class="memoir__filter" />

    <RouterView />
  </div>
  <Transition>
    <AddMemo v-if="selectedUser" class="memoir__add" />
  </Transition>
</template>

<style lang="scss" scoped>
.memoir {
  @apply flex flex-col items-center gap-4;

  &__header {
    @apply flex items-center w-screen justify-center text-6xl text-gray-800;
  }
  &__add {
    @apply fixed bottom-0 z-10;
  }
}
.v-enter-active,
.v-leave-active {
  transition: 0.6s ease;
  @apply fixed bottom-0 z-10;
}

.v-enter-from,
.v-leave-to {
  bottom: -400px;
  @apply fixed  z-10;
}
</style>
