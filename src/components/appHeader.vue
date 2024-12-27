<script lang="ts" setup>
import IconPlus from '../components/icons/IconPlus.vue'
</script>
<template>
  <div class="pemio_header">
    <h1 class="">SPEM<span>.io</span></h1>
    <div>
      <RouterLink to="/members"><IconPlus class="pemio_header__icon" /></RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pemio_header {
  @apply bg-gray-700  dark:bg-gray-800;
  @apply flex flex-row justify-around items-center gap-4 w-full;
  @apply text-gray-400;
  @apply sticky top-0 z-10;

  h1 {
    @apply text-6xl  text-gray-600;
    & span {
      @apply text-xl text-gray-400;
    }
  }

  &__icon {
    @apply text-4xl text-gray-400;
    @apply cursor-pointer;
    @apply hover:text-gray-200;
    @apply transition-colors;
    @apply w-10 h-10;
  }
}
</style>
