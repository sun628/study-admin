<template>
	<div class="custom-form">
		<el-input v-model="form.name"></el-input>
		<el-input v-model.number="form.age"></el-input>
		<el-input v-model="form.sex"></el-input>
	</div>
</template>

<script setup lang="ts">
import { useVModel } from '@/hooks/useVModel';
// import { useVModel } from '@vueuse/core';

export type FormProps = {
	name: string;
	age: number;
	sex: string;
};

// 声明 props 类型
const props = defineProps({
	modelValue: {
		type: Object as PropType<FormProps>,
		default: () => {
			return {
				name: '', // 默认值为字符串
				age: 0, // 默认值为数字
				sex: 'ss', // 默认值为字符串
			};
		},
	},
});

const emit = defineEmits(['update:modelValue']);
// 使用 useVModel 创建响应式引用
const form = useVModel(props, 'modelValue', emit);
form.value.name = '张四';
form.value.age = 222;
</script>
<style lang="scss" scoped>
.custom-form {
	.el-input {
		margin-bottom: 5px;
	}
}
</style>
