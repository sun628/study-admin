<template>
  <el-config-provider :size="assemblySize" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { GlobalStore } from '@/store';
import Loading from '@/components/Loading/index.vue';
import { useTheme } from '@/hooks/useTheme';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
// 配置全局组件大小 (small/default(medium)/large)
const assemblySize = computed(() => globalStore.assemblySize);
const globalStore = GlobalStore();

// 使用主题
useTheme();
</script>
