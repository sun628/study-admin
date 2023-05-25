<template>
	<doc title="子组件">
		<div class="border p-1 bg-gray-200 mb-2">
			<span>来自父组件的数据：</span> <span>{{ childData }}</span>
		</div>
	</doc>
</template>
<script setup lang="ts">
import { inject } from 'vue';
let childData = inject('parentData');
</script>

<style scoped lang="scss"></style>
