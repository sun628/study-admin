<template>
	<div class="tool-bar-ri">
		<el-dropdown v-if="deviceType === 'mobile'" class="mr-5" trigger="click">
			<el-button type="primary" class="el-dropdown-link">
				<span>工具栏</span>
				<el-icon class="el-icon--right">
					<arrow-down />
				</el-icon>
			</el-button>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>Action 1</el-dropdown-item>
					<el-dropdown-item>Action 2</el-dropdown-item>
					<el-dropdown-item>Action 3</el-dropdown-item>
					<el-dropdown-item>Action 4</el-dropdown-item>
					<el-dropdown-item>Action 5</el-dropdown-item>
					<el-dropdown-item><span class="username">暖阳</span></el-dropdown-item>
					<el-dropdown-item><Fullscreen id="fullscreen" /></el-dropdown-item>
					<el-dropdown-item><Message id="message" /></el-dropdown-item>
					<el-dropdown-item><ThemeSetting id="themeSetting" /></el-dropdown-item>
					<el-dropdown-item><SearchMenu id="searchMenu" /></el-dropdown-item>
					<el-dropdown-item><AssemblySize id="assemblySize" /></el-dropdown-item>
					<el-dropdown-item><Audio id="Audio" /></el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>

		<el-space v-else class="header-icon" :size="20">
			<Audio id="Audio" />
			<AssemblySize id="assemblySize" />
			<SearchMenu id="searchMenu" />
			<ThemeSetting id="themeSetting" />
			<Message id="message" />
			<Fullscreen id="fullscreen" />
			<span class="username">暖阳</span>
		</el-space>
		<Avatar />
	</div>
</template>

<script setup lang="ts">
import SearchMenu from './components/SearchMenu.vue';
import Fullscreen from './components/Fullscreen.vue';
import Message from './components/Message.vue';
import ThemeSetting from './components/ThemeSetting.vue';
import AssemblySize from './components/AssemblySize.vue';
import Avatar from './components/Avatar.vue';
import Audio from './components/Audio.vue';
import { useDeviceType } from '@/hooks/useDeviceType';
const { deviceType } = useDeviceType();
</script>

<style scoped lang="scss">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	.header-icon {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.username {
		margin: 0 20px 0 0;
		font-size: 15px;
	}
	:deep(.toolBar-icon) {
		color: var(--el-color-primary) !important;
	}
}
</style>
