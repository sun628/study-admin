<template>
	<!-- 数字滚动 -->
	<div class="digital-scroll">
		<div v-for="column in digitals" :key="column" class="digital-column flex-center" :style="{ height: `${colHeight}px` }">
			<div class="scroll-list">
				<div v-for="(num, index) in digitalsList" :key="index" class="scoll-item" :style="{ height: `${colHeight}px` }">{{ num }}</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
/**
 * @description 通过传入一个数字，实现返回一个从0到length-1的数组
 * @param {number} length  数组长度
 * @returns {Array<number>} 返回一个从0到length-1的数组
 **/
export var getDigitals = (length: number = 10) => {
	return Array.from({ length }).map((_, index) => index);
};
</script>

<script setup lang="ts">
defineOptions({
	name: 'DigitalScroll',
});

export type DigitalScrollProp = {
	value: number;
	colHeight?: number;
	count?: number;
	digitalsList?: Array<number>;
	loop?: boolean;
};

const props = withDefaults(defineProps<DigitalScrollProp>(), {
	value: 0, // 数字
	colHeight: 40, // 每个数字的高度
	count: 6, // 数字位数
	loop: false, // 是否循环滚动
	digitalsList: () => [], // 获取数字列表
});

const { colHeight } = toRefs(props);

// 计算属性来处理 digitalsList
const digitalsList = computed(() => {
	let { digitalsList } = props;

	// 如果 digitalsList 为空,则默认生成从0-9的数组
	if (digitalsList.length === 0) {
		digitalsList = getDigitals(10);
	}

	// 如果 loop 为 true，则重复列表,用于循环滚动
	if (props.loop) {
		return [...digitalsList, ...digitalsList];
	}

	return digitalsList;
});

watch(
	() => props.value,
	() => {
		checkNumChange();
	}
);

// 生成一个长度为count的数组，包含0-5的数字 [0, 1, 2, 3, 4, 5]
const digitals = getDigitals(props.count);

const scrollListEle = ref<NodeListOf<HTMLElement> | null>();

onMounted(() => {
	scrollListEle.value = document.querySelectorAll('.scroll-list');
});

/**
 * @description 滚动数字
 * @param {number} index  滚动数字的索引
 * @param {number} num  滚动数字的值
 * @returns {void}
 */
const scrollNum = (index: number, num: number) => {
	let top = -num * colHeight.value; // 滚动的距离
	scrollListEle.value![index].style.top = top + 'px';
};

/**
 * @description 检查数字是否发生变化
 * @param {number} lap  0:不翻转，10：翻转一圈; 一组是0-9,翻转一圈就是10
 * @returns {void}
 */
const checkNumChange = (lap = 0) => {
	if (!scrollListEle.value) return;
	let numberStr = props.value.toString().padStart(props.count, '0');
	for (let i = 0; i < digitals.length; i++) {
		scrollNum(i, +numberStr[i] + lap);
	}
};

// 当手动点击开始按钮时，自动翻转一圈到原本数字
let lap_flag = true;

// 开始滚动
const start = () => {
	const lap = lap_flag ? 10 : 0; // 0:不翻转，10：翻转一圈(0-9)
	lap_flag = !lap_flag;
	checkNumChange(lap);
};
defineExpose({
	start,
});
</script>

<style scoped lang="scss">
.digital-scroll {
	display: flex;

	.digital-column {
		width: 30px;
		height: 40px;
		margin: 10px 5px;
		border: 2px solid #00a2ff;
		border-radius: 5%;
		color: #00f5ff;
		font-size: 25px;
		position: relative;
		overflow: hidden;
		.scroll-list {
			flex-direction: column;
			position: absolute;
			transition: 1.5s;
			top: 0px;
			display: flex;
			justify-content: center;
			align-items: center;
			.scoll-item {
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
