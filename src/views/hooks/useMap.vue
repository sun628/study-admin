<template>
	<el-card>
		<Highlight :code="mapCode" :auto="false" />
	</el-card>
</template>
<script setup lang="ts">
import mapCode from '@/hooks/useMap?raw';
</script>

<style scoped lang="scss"></style>
