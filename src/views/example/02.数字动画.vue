<template>
	<div class="statistic-animate">
		<el-row class="mb-3">
			<el-button type="primary" @click="start">开始</el-button>
			<el-button type="primary" @click="stop">停止</el-button>
		</el-row>
		<h2>数字动画：{{ num }}</h2>
	</div>
</template>

<script setup lang="ts">
let num = ref(33847);

// 推荐使用的方式，明确定义参数和返回类型
type ProgressType = (value: number) => void;

// 实现数字动画效果
function animateProgress(duration: number, from: number, to: number, onProgress?: ProgressType) {
	const startTime = Date.now();

	let animationId: number | null = null;
	function _run() {
		const now = Date.now();
		const time = now - startTime;
		const progress = Math.min(1, time / duration);
		const value = from + (to - from) * progress;
		onProgress && onProgress(value);
		if (progress < 1) {
			animationId = requestAnimationFrame(_run); // 继续动画
		}
	}
	_run();

	// 返回一个清除动画的函数
	return function stopAnimation() {
		if (animationId) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}
	};
}

let stopAnimation: (() => void) | null = null;

function start() {
	const next_num = num.value + 568;

	// 示例用法
	stopAnimation = animateProgress(1000, 0, next_num, (value) => {
		console.log('stopAnimation=animateProgress ~ value:', value);
		num.value = Math.floor(value);
	});
}

function stop() {
	stopAnimation && stopAnimation();
}
</script>

<style scoped lang="scss"></style>
