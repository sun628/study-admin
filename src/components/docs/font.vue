<template>
  <span :style="{ color: color }">
    <slot></slot>
  </span>
</template>
<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
span {
  color: var(--el-color-primary);
}
</style>
