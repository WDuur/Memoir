<script lang="ts" setup>
import { computed } from 'vue'
import MemoCard from '@/components/memoCard.vue'
import { useMemos } from '@/composables/useMemos'
import { useUser } from '@/composables/useUser'

const { memos } = useMemos()
const { selectedUser } = useUser()

const filteredMemos = computed(() => {
  if (!selectedUser.value) return memos.value
  return memos.value.filter((memo) => memo.user === selectedUser.value)
})
</script>

<template>
  <ul class="memo-card__container flex flex-wrap w-screens gap-2">
    <li v-for="memo in filteredMemos" :key="memo.id" class="memo-card__card">
      <MemoCard :memo="memo" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.memo-card {
  &__container {
    @apply flex flex-wrap justify-center w-screen gap-2;
  }
  &__card {
    @apply w-full md:w-96 h-60;
  }
}
</style>
