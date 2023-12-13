<template>
	<div class="digital-scroll">
		<el-row class="flex-center mb-3">
			<el-col :span="12" class="digital-container flex-center mb-3">
				<!-- 数字翻页 -->
				<div v-for="column in digitals" :key="column" class="digital-column flex-center">
					<div class="scrollList flex-center">
						<div v-for="(num, index) in digitalScrollList" :key="index">{{ num }}</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row class="flex-center mb-3">
			<el-col class="flex-center flex-nowrap" :span="12">
				<span class="whitespace-nowrap">输入数字：</span>
				<el-input v-model.number="numberVal" />
				<el-button type="primary" @click="start">开始</el-button>
			</el-col>
		</el-row>
		<Highlight :code="code"></Highlight>
	</div>
</template>

<script setup lang="ts">
import code from './03.数字翻页.vue?raw';
const numberVal = ref(0);
const scrollListEle = ref<NodeListOf<HTMLElement> | null>();

/**
 * @description 通过传入一个数字，实现返回一个从0到length-1的数组
 * @param {number} length  数组长度
 * @returns {Array<number>} 返回一个从0到length-1的数组
 **/
const getDigitals = (length: number) => {
	return Array.from({ length }).map((_, index) => index);
};

// 生成一个长度为6的数组，包含0-5的数字 [0, 1, 2, 3, 4, 5]
const digitals = getDigitals(6);

// 生成一个长度为20的数组，包含0-9的数字，重复两次 [0,1,...,9, 0,1,...,9]
const digitalScrollList = getDigitals(10).concat(getDigitals(10));

onMounted(() => {
	scrollListEle.value = document.querySelectorAll('.scrollList');
});

/**
 * @description 滚动数字
 * @param {number} index  滚动数字的索引
 * @param {number} num  滚动数字的值
 * @returns {void}
 */
const scrollNum = (index: number, num: number) => {
	let top = -num * 40;
	scrollListEle.value![index].style.top = top + 'px';
};

/**
 * @description 检查数字是否发生变化
 * @param {number} lap  0:不翻转，10：翻转一圈
 * @returns {void}
 */
const checkNumChange = (lap = 0) => {
	if (!scrollListEle.value) return;
	let numberStr = numberVal.value.toString().padStart(6, '0');
	for (let i = 0; i < digitals.length; i++) {
		scrollNum(i, +numberStr[i] + lap);
	}
};

let lap_flag = true;
const start = () => {
	// 当手动点击开始按钮时，自动翻转一圈到原本数字
	const lap = lap_flag ? 10 : 0;
	lap_flag = !lap_flag;
	checkNumChange(lap);
};

watch(
	() => numberVal.value,
	() => {
		checkNumChange();
	}
);
</script>

<style scope lang="scss">
.digital-scroll {
	.digital-container {
		background-color: #020b44;
	}
	.digital-column {
		width: 30px;
		height: 40px;
		margin: 10px 5px;
		border: 2px solid #00a2ff;
		border-radius: 5%;
		background-color: #0b2160;
		color: #00f5ff;
		font-size: 25px;
		position: relative;
		overflow: hidden;
		.scrollList {
			flex-direction: column;
			position: absolute;
			transition: 1.5s;
			top: 0px;
			> div {
				width: 30px;
				height: 40px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
</style>
