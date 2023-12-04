<template>
	<div>
		<el-input v-model="form.name"></el-input>
		<el-input v-model="form.age"></el-input>
		<el-input v-model="form.sex"></el-input>
	</div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
	modelValue: {
		type: Object,
		default: () => {},
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
