import { ref } from 'vue'
import { getDocs, addDoc, collection, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import type { Memo } from '../types'
const memos = ref<Memo[]>([])

export function useMemos() {
  const fetchMemos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'memos'))
      console.log(querySnapshot)
      memos.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Memo),
      }))

      console.log('Fetched memos:', memos.value)
    } catch (e) {
      console.error('Error fetching memos:', e)
    }
  }

  const addMemo = async (newMemo: Memo) => {
    const idNumber = 'test'
    if (!newMemo.user || !newMemo.message) {
      console.error('User and message are required')
      return
    }

    try {
      await addDoc(collection(db, 'memos'), {
        id: idNumber,
        user: newMemo.user,
        message: newMemo.message,
        status: 'open',
        created: new Date(),
      })

      memos.value.push({
        id: idNumber,
        user: newMemo.user,
        message: newMemo.message,
        status: 'open',
        created: new Date(),
      })

      newMemo.user = ''
      newMemo.message = ''
    } catch (e) {
      console.error('Error adding memo:', e)
    }
  }

  const updateMemoStatus = async (memoId: string) => {
    try {
      const memoDoc = doc(db, 'memos', memoId.toString())

      await updateDoc(memoDoc, { status: 'idle' })
      const memo = memos.value.find((m) => m.id === memoId)
      if (memo?.status === 'open') {
        memo.status = 'idle'
      } else {
        if (memo) {
          memo.status = 'open'
        }
        console.warn(`Memo with id ${memoId} not found locally.`)
      }

      console.log(`Memo ${memoId} status updated to 'idle'.`)
    } catch (e) {
      console.error('Error updating memo status:', e)
    }
  }

  return {
    memos,
    fetchMemos,
    addMemo,
    updateMemoStatus,
  }
}
