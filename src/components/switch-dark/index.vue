<template>
	<el-switch
		v-model="themeConfig.isDark"
		inline-prompt
		active-color="#0a0a0a"
		inactive-color="#dcdfe6"
		:active-icon="Sunny"
		:inactive-icon="Moon"
		@change="onAddDarkChange"
	/>
</template>

<script setup lang="ts" name="switchDark">
import { computed } from 'vue';
import { useGlobalStore } from '@/store/modules/global';
import { Sunny, Moon } from '@element-plus/icons-vue';
import { useTheme } from '@/hooks/useTheme';

defineOptions({
	name: 'SwitchDark',
});
const globalStore = useGlobalStore();

const { switchDark } = useTheme();

const themeConfig = computed(() => globalStore.themeConfig);

const onAddDarkChange = () => {
	switchDark();
};
</script>
