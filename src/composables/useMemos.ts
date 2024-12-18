import { ref } from 'vue'
import { getDocs, addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import type { Memo } from '../types'
const memos = ref<Memo[]>([])

export function useMemos() {
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

  const addMemo = async (newMemo: Memo) => {
    if (!newMemo.user || !newMemo.message) {
      console.error('User and message are required')
      return
    }

    try {
      const docRef = await addDoc(collection(db, 'memos'), {
        user: newMemo.user,
        message: newMemo.message,
      })

      memos.value.push({
        id: docRef.id,
        user: newMemo.user,
        message: newMemo.message,
        status: newMemo.status,
      })

      newMemo.user = ''
      newMemo.message = ''
    } catch (e) {
      console.error('Error adding memo:', e)
    }
  }

  return {
    memos,
    fetchMemos,
    addMemo,
  }
}
