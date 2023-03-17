<template>
  <el-dropdown trigger="click">
    <el-button size="small" type="primary">
      <span>更多</span>
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="refresh">
          <el-icon><Refresh /></el-icon>
          <span>刷新</span>
        </el-dropdown-item>
        <el-dropdown-item @click="closeCurrentTab">
          <el-icon><Remove /></el-icon>
          <span>关闭当前</span>
        </el-dropdown-item>
        <el-dropdown-item @click="closeOtherTab">
          <el-icon><CircleClose /></el-icon>
          <span>关闭其它</span>
        </el-dropdown-item>
        <el-dropdown-item @click="closeAllTab">
          <el-icon><Delete /></el-icon>
          <span>关闭所有</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { TabsStore } from '@/store/modules/tabs';
import { HOME_URL } from '@/config';
import { ElMessage } from 'element-plus';

const tabStore = TabsStore();
const reload: Function = inject('refresh') as Function;

// refresh current page
const refresh = () => {
  ElMessage({ type: 'success', message: '刷新当前页面 🚀' });
  reload();
};

// Close Current
const closeCurrentTab = () => {
  if (tabStore.tabsMenuValue === HOME_URL) return;
  tabStore.removeTabs(tabStore.tabsMenuValue);
};

// Close Other
const closeOtherTab = () => {
  tabStore.closeMultipleTab(tabStore.tabsMenuValue);
};

// Close All
const closeAllTab = () => {
  tabStore.closeMultipleTab();
  tabStore.goHome();
};
</script>

<style scoped lang="scss">
@import '../index.scss';
</style>
