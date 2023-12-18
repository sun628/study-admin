<template>
	<el-card>
		<doc title="数字动画效果">
			<Highlight :code="DigitalAnimationCode" :auto="false" />
		</doc>
	</el-card>
</template>
<script setup lang="ts">
import DigitalAnimationCode from '@/hooks/useDigitalAnimation?raw';
</script>

<style scoped lang="scss"></style>
