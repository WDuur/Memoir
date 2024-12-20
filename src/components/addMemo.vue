<script setup lang="ts">
import { ref } from 'vue'

import { useMemos } from '@/composables/useMemos'

import type { Memo } from '@/types'

const { addMemo } = useMemos()

const newMemo = ref<Memo>({ user: '', message: '', status: '' })
</script>

<template>
  <form @submit.prevent="addMemo(newMemo)">
    <input v-model="newMemo.user" type="text" placeholder="User ID" required />
    <textarea v-model="newMemo.message" placeholder="Message" required></textarea>
    <button type="submit">Add Memo</button>
  </form>
</template>

<style lang="scss" scoped></style>
