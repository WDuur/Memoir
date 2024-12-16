import { ref } from 'vue'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase'
import type { Memo } from '../types'

export function useMemos() {
  const memos = ref<Memo[]>([])

  const fetchMemos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'memos'))
      memos.value = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Memo),
      }))
    } catch (e) {
      console.error('Error fetching memos:', e)
    }
  }

  return {
    memos,
    fetchMemos,
  }
}
