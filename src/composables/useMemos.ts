import { ref } from 'vue'
import { getDocs, addDoc, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import type { Memo } from '../types'
const memos = ref<Memo[]>([])

export function useMemos() {
  const fetchMemos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'memos'))
      console.log(querySnapshot)
      memos.value = querySnapshot.docs.map((doc) => ({
        userId: doc.id, // Ensure the id is set correctly
        ...(doc.data() as Memo),
      }))

      console.log('Fetched memos:', memos.value)
    } catch (e) {
      console.error('Error fetching memos:', e)
    }
  }

  const addMemo = async (newMemo: Memo) => {
    const idNumber = ''
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
      console.log('memoDoc', memoDoc)
      const memo = memos.value.find((m) => m.userId === memoId)
      console.log('memo', memo)
      if (memo?.status === 'open') {
        setTimeout(async () => {
          await updateDoc(memoDoc, { status: 'idle' })
          memo.status = 'idle'
        }, 300)
      } else if (memo?.status === 'idle') {
        setTimeout(async () => {
          await updateDoc(memoDoc, { status: 'open' })
          memo.status = 'open'
        }, 300)
      }
    } catch (e) {
      console.error('Error updating memo status:', e)
    }
  }

  const deleteMemo = async (memoId: string) => {
    try {
      const memoDoc = doc(db, 'memos', memoId.toString())
      await deleteDoc(memoDoc)
      memos.value = memos.value.filter((m) => m.id !== memoId)
      console.log(`Memo ${memoId} deleted successfully.`)
    } catch (e) {
      console.error('Error deleting memo:', e)
    }
  }

  return {
    memos,
    fetchMemos,
    addMemo,
    updateMemoStatus,
    deleteMemo,
  }
}
