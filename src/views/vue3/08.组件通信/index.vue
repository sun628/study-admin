<template>
	<el-row class="h-full">
		<el-col :span="12">
			<div class="m-full h-full border-r">我是父组件</div>
		</el-col>
		<el-col :span="12">
			<myChildren v-model="dataObj" />
		</el-col>
	</el-row>
</template>
<script setup lang="ts">
import myChildren from './myChildren.vue';
let dataObj = ref({
	inputValue: '',
});
</script>

<style scoped lang="scss"></style>
