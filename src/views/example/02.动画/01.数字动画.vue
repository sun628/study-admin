<template>
	<div class="statistic-animate">
		<el-row class="mb-3">
			<el-button type="primary" @click="start">开始</el-button>
			<el-button type="primary" @click="stopAnimation">停止</el-button>
		</el-row>
		<el-input v-model.number="num" class="mr-4" />
		<h2>数字动画：{{ num }}</h2>
		<router-link to="/hooks/useDigitalAnimation"><el-link type="primary">源码见hooks/useDigitalAnimation</el-link></router-link>
		<highlight :code="code"></highlight>
	</div>
</template>

<script setup lang="ts">
import code from './01.数字动画.vue?raw';
import { useDigitalAnimation } from '@/hooks/useDigitalAnimation';
let num = ref(33);

const { startAnimation, stopAnimation } = useDigitalAnimation();

function start() {
	const animationParams = {
		to: num.value,
	};

	startAnimation(animationParams, (value) => {
		num.value = Math.floor(value);
	});
}
</script>

<style scoped lang="scss"></style>
