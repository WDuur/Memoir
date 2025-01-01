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
  <form class="add-memo" @submit.prevent="addMemo(newMemo)">
    <div class="add-memo__popup">
      <input
        class="add-memo__user"
        v-model="newMemo.user"
        type="text"
        placeholder="User ID"
        required
        hidden
      />
      <textarea
        v-if="newMemo.user.length > 0"
        class="add-memo__message"
        v-model="newMemo.message"
        :placeholder="`Message for ${selectedUser}`"
        row="4"
        required
      ></textarea>
      <div class="add-memo__controls">
        <button class="add-memo__controls-btn" type="submit">Add Memo</button>
        <button class="add-memo__controls-btn-cancel" type="submit">Cancel</button>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.add-memo {
  @apply flex flex-col gap-2 w-full items-center;

  &__popup {
    @apply w-full md:w-1/2 rounded-tl-2xl rounded-tr-2xl;
    @apply border border-gray-200 bg-gray-50 p-5 md:p-10;
  }
  &__controls {
    @apply flex gap-2 justify-between;
    &-btn {
      @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
      &-cancel {
        @apply bg-gray-700 hover:bg-gray-800  text-white font-bold py-2 px-4 rounded;
      }
    }
  }
  &__user {
    @apply w-full p-2 mb-2 border border-gray-200 rounded-md text-black;
  }
  &__message {
    @apply w-full p-2 mb-2  h-36 border border-gray-200 rounded-md text-black;
  }
}
</style>
