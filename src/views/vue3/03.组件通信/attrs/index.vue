<template>
	<el-row>
		<doc title="父组件" class="flex-1"></doc>
		<el-divider>
			<el-icon><star-filled /></el-icon>
		</el-divider>
		<child ref="childRef" class="attr-child" :msg="msg">
			<div>插槽div</div>
		</child>
	</el-row>
</template>

<script setup lang="ts">
import child from './child.vue';

let msg = '我是父组件的msg';
</script>

<style scoped lang="scss"></style>
