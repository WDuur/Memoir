<script lang="ts" setup>
import { computed } from 'vue'
import MemoCard from '@/components/memoCard.vue'
import { useMemos } from '@/composables/useMemos'
import { useUser } from '@/composables/useUser'

const { memos } = useMemos()
const { selectedUser } = useUser()

const filteredMemos = computed(() => {
  const filtered = !selectedUser.value
    ? memos.value
    : memos.value.filter((memo) => memo.user === selectedUser.value)

  return filtered.sort((a, b) => {
    if (a.status === 'open' && b.status !== 'open') return -1
    if (a.status !== 'open' && b.status === 'open') return 1
    return 0
  })
})
</script>

<template>
  <transition-group name="fade" tag="ul" class="memo-card__container">
    <li v-for="memo in filteredMemos" :key="memo.id" class="memo-card__card">
      <MemoCard :memo="memo" />
    </li>
  </transition-group>
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

.fade-enter-active,
.fade-leave-active {
  transition:
    transform 0.5s,
    opacity 0.3s;
}

.fade-enter-from {
  transform: translateY(30px);
  opacity: 0;
}

.fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.fade-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
