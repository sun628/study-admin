<template>
	<div class="custom-form">
		<el-input v-model="form.name"></el-input>
		<el-input v-model.number="form.age"></el-input>
		<el-input v-model="form.sex"></el-input>
	</div>
</template>

<script setup lang="ts">
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
				sex: '', // 默认值为字符串
			};
		},
	},
});

const emit = defineEmits(['update:modelValue']);

const form = computed({
	get() {
		return new Proxy(props.modelValue, {
			get(target, key) {
				return Reflect.get(target, key);
			},
			set(target, key, value) {
				emit('update:modelValue', {
					...target,
					[key]: value,
				});
				return true;
			},
		});
	},
	set(newValue) {
		emit('update:modelValue', newValue);
	},
});
</script>
<style lang="scss" scoped>
.custom-form {
	.el-input {
		margin-bottom: 5px;
	}
}
</style>
