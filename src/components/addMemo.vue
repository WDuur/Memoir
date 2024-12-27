<script setup lang="ts">
import { computed } from 'vue'

import { useMemos } from '@/composables/useMemos'
import { useUser } from '@/composables/useUser'

import type { Memo } from '@/types'

const { addMemo } = useMemos()
const { selectedUser } = useUser()

const newMemo = computed<Memo>(() => ({
  user: selectedUser.value,
  message: '',
  status: 'open',
  id: '',
  created: new Date(),
}))
</script>

<template>
  <form @submit.prevent="addMemo(newMemo)">
    <input
      class="add-memo__user"
      v-model="newMemo.user"
      type="text"
      placeholder="User ID"
      required
    />
    <textarea
      v-if="newMemo.user.length > 0"
      class="add-memo__message"
      v-model="newMemo.message"
      placeholder="Message"
      required
    ></textarea>
    <button type="submit">Add Memo</button>
  </form>
</template>

<style lang="scss" scoped>
.add-memo {
  &__user {
    @apply w-full p-2 mb-2 border border-gray-200 rounded-md text-black;
  }
  &__message {
    @apply w-full p-2 mb-2 border border-gray-200 rounded-md text-black;
  }
}
</style>
