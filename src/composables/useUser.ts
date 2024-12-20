import { ref, computed } from 'vue'
import { useMemos } from './useMemos'

const { memos } = useMemos()
const selectedUser = ref<string>('')
/**
 * Composition function that returns a reactive reference to the currently
 * selected user, an array of unique users, and a function to select a user.
 *
 * @returns An object with the following properties:
 *   - `selectedUser`: A reactive reference to the currently selected user.
 *   - `uniqueUsers`: An array of unique user names.
 *   - `selectUser`: A function that takes a user name as an argument and
 *     sets the selected user to that name.
 */
export function useUser() {
  const uniqueUsers = computed(() => {
    const users = memos.value.map((memo) => memo.user)
    return Array.from(new Set(users))
  })
  console.log(uniqueUsers)

  const selectUser = (user: string) => {
    console.log(user)
    selectedUser.value = user
  }

  return {
    selectUser,
    uniqueUsers,
    selectedUser,
  }
}
