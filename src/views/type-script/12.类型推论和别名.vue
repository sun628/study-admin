<template>
	<el-card>
		<doc title="1.什么是类型推论">
			<p>TypeScript 的 TypeScript</p>
			<highlight :code="inferCode"></highlight>
		</doc>
	</el-card>
</template>
<script setup lang="ts">
const inferCode = `let name = 'string';
//let name: string='string'; //ts会自动推断出是string类型
`;
</script>

<style scoped lang="scss"></style>
