import { computed, onBeforeMount } from 'vue';
import { getLightColor, getDarkColor } from '@/utils/theme/tool';
import { useGlobalStore } from '@/store/modules/global';
import { DEFAULT_PRIMARY } from '@/config';
import { ElMessage } from 'element-plus';

/**
 * @description 切换主题
 * */
export const useTheme = () => {
	const globalStore = useGlobalStore();
	const themeConfig = computed(() => globalStore.themeConfig);

	// 使用暗黑主题
	const useDark = (isDark = false) => {
		globalStore.setThemeConfig({ ...themeConfig.value, isDark });
		if (isDark) {
			document.documentElement.setAttribute('class', 'dark');
		} else {
			document.documentElement.setAttribute('class', '');
		}
	};

	// 切换暗黑模式
	const switchDark = () => {
		const html = document.documentElement as HTMLElement;
		if (themeConfig.value.isDark) html.setAttribute('class', 'dark');
		else html.setAttribute('class', '');
	};

	// 修改主题颜色
	const changePrimary = (val: string | null) => {
		if (!val) {
			val = DEFAULT_PRIMARY;
			ElMessage({ type: 'success', message: `主题颜色已重置为 ${DEFAULT_PRIMARY}` });
		}
		globalStore.setThemeConfig({ ...themeConfig.value, primary: val });
		// 颜色加深
		document.documentElement.style.setProperty('--el-color-primary-dark-2', `${getDarkColor(themeConfig.value.primary, 0.1)}`);
		document.documentElement.style.setProperty('--el-color-primary', themeConfig.value.primary);
		// 颜色变浅
		for (let i = 1; i <= 9; i++) {
			document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, `${getLightColor(themeConfig.value.primary, i / 10)}`);
		}
	};

	// 灰色和弱色切换
	const changeGreyOrWeak = (value: string | number | boolean, type: string) => {
		const body = document.body as HTMLElement;
		if (!value) return body.setAttribute('style', '');
		if (type === 'grey') body.setAttribute('style', 'filter: grayscale(1)');
		if (type === 'weak') body.setAttribute('style', 'filter: invert(80%)');
		const propName = type == 'grey' ? 'isWeak' : 'isGrey';
		globalStore.setThemeConfig({ ...themeConfig.value, [propName]: false });
	};

	onBeforeMount(() => {
		switchDark();
		changePrimary(themeConfig.value.primary);
		if (themeConfig.value.isGrey) changeGreyOrWeak(true, 'grey');
		if (themeConfig.value.isWeak) changeGreyOrWeak(true, 'weak');
	});

	return {
		useDark,
		switchDark,
		changePrimary,
		changeGreyOrWeak,
	};
};
