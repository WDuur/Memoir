<script lang="ts" setup></script>
<template>
  <div class="pemio">
    <h1 class="pemio__header">PEM.io</h1>
    <div>
      <RouterLink to="/members">Members</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pemio {
  @apply flex flex-row  items-center gap-4;
  @apply text-gray-800;

  &__header {
    @apply text-6xl;
  }
}
</style>
