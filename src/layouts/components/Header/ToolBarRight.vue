<template>
	<div class="tool-bar-ri">
		<div class="header-icon">
			<Audio />
			<AssemblySize id="assemblySize" />
			<SearchMenu id="searchMenu" />
			<ThemeSetting id="themeSetting" />
			<Message id="message" />
			<Fullscreen id="fullscreen" />
		</div>
		<span class="username">暖阳</span>
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
</script>

<style scoped lang="scss">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 30px;
	.header-icon {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 230px;
		margin-right: 22px;
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
