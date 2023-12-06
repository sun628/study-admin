<!-- 子组件 -->
<template>
	<el-input v-model="msg"></el-input>
</template>
<script setup>
const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
});
const emit = defineEmits(['update:modelValue']);
const msg = computed({
	// getter
	get() {
		return props.modelValue;
	},
	// setter
	set(newValue) {
		emit('update:modelValue', newValue);
	},
});
</script>
