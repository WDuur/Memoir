<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useMemos } from '@/composables/useMemos'
import { useUser } from '@/composables/useUser'

import MemoCard from '@/components/memoCard.vue'
import AddMemo from '@/components/addMemo.vue'
import FilterMemoUsers from '@/components/filterMemoUsers.vue'

const { memos, fetchMemos } = useMemos()
const { selectedUser } = useUser()

// Computed property for filtering memos
const filteredMemos = computed(() => {
  if (!selectedUser.value) return memos.value
  return memos.value.filter((memo) => memo.user === selectedUser.value)
})

onMounted(fetchMemos)
</script>

<template>
  <div>
    <h1>Memos</h1>
    <FilterMemoUsers />

    <!-- Filter Buttons 
    <div>
      <button @click="selectedUser = ''" :class="{ active: selectedUser === '' }">Show All</button>
      <button
        v-for="user in uniqueUsers"
        :key="user"
        @click="selectUser(user)"
        :class="{ active: selectedUser === user }"
      >
        {{ user }}
      </button>
    </div> -->

    <!-- Memo List -->
    <ul class="flex flex-wrap w-screens gap-2">
      <li v-for="memo in filteredMemos" :key="memo.id" class="w-full md:w-52">
        <MemoCard :memo="memo" />
      </li>
    </ul>

    <AddMemo />
  </div>
</template>

<style>
/* Add styles for active buttons */
button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #e0e0e0;
  cursor: pointer;
}

button.active {
  background-color: #007bff;
  color: white;
}

form {
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}
</style>
