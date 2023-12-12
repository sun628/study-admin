<template>
	<div class="statistic-animate">
		<el-row class="mb-3">
			<el-button type="primary" @click="start">开始</el-button>
			<el-button type="primary" @click="stop">停止</el-button>
		</el-row>
		<h2>数字动画：{{ num }}</h2>
		<highlight :code="code"></highlight>
	</div>
</template>

<script setup lang="ts">
import code from './02.数字动画.vue?raw';
let num = ref(33847);
// 推荐使用的方式，明确定义参数和返回类型
type ProgressType = (value: number) => void;

/**
 * @description 实现数字动画效果
 * @param {number} duration  动画持续时间
 * @param {number} from  动画开始值
 * @param {number} to  动画结束值
 * @param {ProgressType} onProgress  动画过程中的回调函数
 * @returns {() => void} 返回一个清除动画的函数
 **/
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

// 示例用法
function start() {
	const next_num = num.value + 568;
	stopAnimation = animateProgress(600, num.value, next_num, (value) => {
		num.value = Math.floor(value);
	});
}

function stop() {
	stopAnimation && stopAnimation();
}
</script>

<style scoped lang="scss"></style>
