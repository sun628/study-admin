<template>
	<el-card>
		<doc title="文件下载">
			<Highlight :code="DownLoadCode" :auto="false" />
		</doc>
	</el-card>
</template>
<script setup lang="ts">
import DownLoadCode from '@/hooks/useDownload?raw';
</script>

<style scoped lang="scss"></style>
