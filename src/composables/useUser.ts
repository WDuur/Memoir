import { ref, computed } from 'vue'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useMemos } from './useMemos'
import type { Member } from '../types'

const { memos } = useMemos()
const selectedUser = ref<string>('')
const members = ref<Member[]>([])

export function useUser() {
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'members'))
      console.log(querySnapshot)
      members.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Member),
      }))
      console.log('Fetched users:', members.value)
    } catch (e) {
      console.error('Error fetching members:', e)
    }
  }

  const uniqueUsers = computed(() => {
    const users = memos.value.map((memo) => memo.user)
    return Array.from(new Set(users))
  })
  console.log('unique susers', uniqueUsers)

  const selectUser = (user: string) => {
    console.log(user)
    selectedUser.value = user
  }

  return {
    selectUser,
    fetchUsers,
    uniqueUsers,
    selectedUser,
  }
}
