<script lang="ts" setup>
import { useUser } from '@/composables/useUser'
import { onMounted } from 'vue'

const { selectedUser, uniqueUsers, selectUser, fetchUsers } = useUser()
onMounted(fetchUsers)
</script>

<template>
  <div>
    <button
      v-for="user in uniqueUsers"
      :key="user"
      @click="selectUser(user)"
      :class="{ active: selectedUser === user }"
    >
      <span class="memoir-fliter__user">{{ user }}</span>
    </button>
    <button @click="selectedUser = ''" :class="{ active: selectedUser === '' }">
      <span class="memoir-fliter__user--all">X</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.memoir-fliter {
  &__user {
    @apply bg-gray-100 text-gray-800 text-lg text-base font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-800 dark:text-gray-300;

    &--all {
      @apply bg-yellow-600 text-black text-lg text-base font-medium me-2 px-2.5 py-0.5 rounded-full;
    }
  }
}
</style>
