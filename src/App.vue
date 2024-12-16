<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebase' // Import your Firebase configuration

import { useMemos } from './composables/useMemos'

import type { Memo } from './types'

const { memos, fetchMemos } = useMemos()

// interface Memo {
//   id?: string
//   user: string
//   message: string
//   status: string
// }

// const memos = ref<Memo[]>([])
const newMemo = ref<Memo>({ user: '', message: '', status: '' })
const selectedUser = ref<string>('')

// Fetch memos from Firestore
// const fetchMemos = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, 'memos'))
//     memos.value = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...(doc.data() as Memo),
//     }))
//   } catch (e) {
//     console.error('Error fetching memos:', e)
//   }
// }

// Add a new memo to Firestore
const addMemo = async () => {
  if (!newMemo.value.user || !newMemo.value.message) {
    console.error('User and message are required')
    return
  }

  try {
    const docRef = await addDoc(collection(db, 'memos'), {
      user: newMemo.value.user,
      message: newMemo.value.message,
    })
    console.log('Memo added with ID:', docRef.id)

    // Add the new memo to the list locally
    memos.value.push({
      id: docRef.id,
      user: newMemo.value.user,
      message: newMemo.value.message,
      status: newMemo.value.status,
    })

    // Reset the form
    newMemo.value.user = ''
    newMemo.value.message = ''
  } catch (e) {
    console.error('Error adding memo:', e)
  }
}

// Computed property for filtering memos
const filteredMemos = computed(() => {
  if (!selectedUser.value) return memos.value
  return memos.value.filter((memo) => memo.user === selectedUser.value)
})

// Computed property to get unique users
const uniqueUsers = computed(() => {
  const users = memos.value.map((memo) => memo.user)
  return Array.from(new Set(users))
})

// Fetch memos when the component is mounted
onMounted(fetchMemos)
</script>

<template>
  <div>
    <h1>Memos</h1>

    <!-- Filter Buttons -->
    <div>
      <button @click="selectedUser = ''" :class="{ active: selectedUser === '' }">Show All</button>
      <button
        v-for="user in uniqueUsers"
        :key="user"
        @click="selectedUser = user"
        :class="{ active: selectedUser === user }"
      >
        User {{ user }}
      </button>
    </div>

    <!-- Form to Add Memo -->
    <form @submit.prevent="addMemo">
      <input v-model="newMemo.user" type="text" placeholder="User ID" required />
      <textarea v-model="newMemo.message" placeholder="Message" required></textarea>
      <button type="submit">Add Memo</button>
    </form>

    <!-- Memo List -->
    <ul>
      <li v-for="memo in filteredMemos" :key="memo.id">
        {{ memo.status }} | <strong>User {{ memo.user }}:</strong> {{ memo.message }}
      </li>
    </ul>
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
