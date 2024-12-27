<script lang="ts" setup>
import { useUser } from '@/composables/useUser'
import { onMounted } from 'vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const { selectedUser, uniqueUsers, selectUser, fetchUsers } = useUser()
onMounted(fetchUsers)
</script>

<template>
  <div class="spamio-fliter">
    <button
      v-for="user in uniqueUsers"
      :key="user"
      @click="selectUser(user)"
      :class="{ active: selectedUser === user }"
    >
      <span class="spamio-fliter__user">{{ user }}</span>
    </button>
    <button v-if="selectedUser" @click="selectedUser = ''">
      <IconPlus class="spamio-fliter__user--all" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.spamio-fliter {
  @apply flex gap-2;
  &__user {
    @apply bg-gray-100 text-gray-800 text-lg text-base font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-800 dark:text-gray-300;

    &--all {
      @apply text-gray-400;
      @apply cursor-pointer;
      @apply hover:text-gray-800;
      @apply transition-colors;
      @apply w-8 h-8;
      @apply rotate-45;
    }
  }
}
</style>
