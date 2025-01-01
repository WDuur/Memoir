<script lang="ts" setup>
import IconPlus from '../components/icons/IconPlus.vue'
import { useMemos } from '@/composables/useMemos'

const { showMemosRead } = useMemos()
</script>

<template>
  <div class="spemio_header">
    <img src="../assets/logo.png" alt="logo" class="spemio_header__logo" />
    <div class="spemio_header__actions">
      <input
        type="checkbox"
        class="peer sr-only opacity-0"
        id="toggle-read-messages"
        name="toggle"
        @click="showMemosRead(($event.target as HTMLInputElement).checked)"
      />
      <label for="toggle-read-messages" class="spemio_header__disable">
        <span class="sr-only">Enable</span>
      </label>
      <RouterLink to="/members"><IconPlus class="spemio_header__icon" /></RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spemio_header {
  @apply bg-gray-700  dark:bg-gray-800;
  @apply flex flex-row justify-around items-center gap-4 w-full;
  @apply text-gray-400;
  @apply sticky top-0 z-10;
  &__logo {
    @apply p-2;
  }
  h1 {
    @apply text-6xl  text-gray-600;
    & span {
      @apply text-xl text-gray-400;
    }
  }
  &__actions {
    @apply flex gap-4 items-center;
  }

  &__icon {
    @apply text-4xl text-gray-400;
    @apply cursor-pointer;
    @apply hover:text-gray-200;
    @apply transition-colors;
    @apply w-5 h-5;
  }
  &__disable {
    @apply relative flex h-6 w-11 cursor-pointer items-center rounded-full;
    @apply bg-gray-400 px-0.5 outline-gray-400 transition-colors;
    @apply before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300;
    @apply peer-checked:bg-gray-600 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2;
    @apply peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-gray-600;
  }
}
</style>
