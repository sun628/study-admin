<template>
	<div class="digital-scroll">
		<el-row class="digital-container flex-center">
			<div v-for="column in digitals" :key="column" class="digital-column flex-center">
				<div class="scrollList flex-center">
					<div v-for="(num, index) in digitalScrollList" :key="index">{{ num }}</div>
				</div>
			</div>
		</el-row>
		<el-row class="mt-2">
			<el-input v-model.number="numberVal" />
		</el-row>
	</div>
</template>

<script setup lang="ts">
const numberVal = ref(0);
const scrollListEle = ref<NodeListOf<HTMLElement> | null>(null);

//  通过传入一个数字，实现返回一个从0开始的数组
const getDigitals = (length: number) => {
	return Array.from({ length }).map((_, index) => index);
};
const digitals = getDigitals(6);
const digitalScrollList = getDigitals(10);

onMounted(() => {
	scrollListEle.value = document.querySelectorAll('.scrollList');
});

const scrollNum = (index: number, num: number) => {
	let top = -num * 40;
	if (!scrollListEle.value) return;
	scrollListEle.value[index].style.top = top + 'px';
};

const checkNumChange = () => {
	let numberStr = numberVal.value.toString().padStart(6, '0');
	for (let i = 0; i < digitals.length; i++) {
		scrollNum(i, +numberStr[i]);
	}
};

watch(() => numberVal.value, checkNumChange);
</script>

<style scope lang="scss">
.digital-scroll {
	width: 500px;

	.digital-container {
		background-color: #020b44;
	}
	.digital-column {
		width: 30px;
		height: 40px;
		margin: 10px 5px;
		border: 2px solid #5d708f;
		border-radius: 5%;
		background-color: #0b2160;
		color: #e49449;
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
