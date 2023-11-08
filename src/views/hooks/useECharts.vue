<template>
	<el-card>
		<doc title="使用ECharts(添加响应式)">
			<Highlight :code="EChartsCode" />
		</doc>
	</el-card>
</template>
<script setup lang="ts">
import EChartsCode from '@/hooks/useECharts?raw';
</script>

<style scoped lang="scss"></style>
