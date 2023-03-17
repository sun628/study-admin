<template>
  <div class="Layout-vertical">
    <el-container>
      <el-aside width="200px">
        <div class="menu" :style="{ width: isCollapse ? '65px' : '220px' }">
          <div class="logo flex-center">
            <img src="@/assets/vite.svg" alt="logo" />
            <span v-show="!isCollapse">天外来物</span>
          </div>
          <el-scrollbar>
            <el-menu
              :default-active="activeMenu"
              :collapse="isCollapse"
              active-text-color="#ffd04b"
              background-color="#191a20"
              text-color="#bdbdc0"
            >
              <SubMenu :menuList="menuList" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>

      <el-container>
        <el-header>
          <ToolBarLeft />
          <ToolBarRight />
        </el-header>
        <Main />
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { MenuStore } from '@/store/modules/menu';
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue';
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';
import Main from '@/layouts/components/Main/index.vue';
import SubMenu from '@/layouts/components/Menu/SubMenu.vue';
const route = useRoute();
const menuStore = MenuStore();
const activeMenu = computed(() => route.path);
const menuList = computed(() => menuStore.menuList);
const isCollapse = computed(() => menuStore.isCollapse);
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
