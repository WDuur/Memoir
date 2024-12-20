<script lang="ts" setup>
import { useUser } from '@/composables/useUser'

const { selectedUser, uniqueUsers, selectUser } = useUser()
</script>

<template>
  <div>
    <button @click="selectedUser = ''" :class="{ active: selectedUser === '' }">Show All</button>
    <button
      v-for="user in uniqueUsers"
      :key="user"
      @click="selectUser(user)"
      :class="{ active: selectedUser === user }"
    >
      <p>*{{ user }}*</p>
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
