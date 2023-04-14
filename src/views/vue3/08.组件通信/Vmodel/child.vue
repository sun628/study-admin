<template>
	<div>
		<p>来自父组件的msg：(props里用modelValue接收)</p>
		<el-button type="primary">{{ modelValue }}</el-button>
	</div>
</template>
<script setup lang="ts">
interface prop {
	modelValue: string;
}

withDefaults(defineProps<prop>(), {
	modelValue: '不听不听~',
});
</script>
