export const code1 = `<input v-model="searchText" />`;
export const code2 = `<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>`;

export const code3 = `<CustomInput
  :model-value="searchText"
  @update:model-value="newValue => searchText = newValue"
/>`;

export const code4 = `<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>`;

export const code5 = `<CustomInput v-model="searchText" />`;

export const computedCode = `<!-- customInput -->
<template>
	<el-input v-model="msg"></el-input>
</template>
<script setup>
import { computed } from 'vue';

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
`;

export const code6 = ` // 父组件
<MyComponent v-model:title="bookTitle" />

<!-- MyComponent.vue -->
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>`;

export const defineModelCode = `<!-- 子组件 -->
<template>
  <el-input v-model="msg"></el-input>
</template>
<script setup>
import { defineModel } from 'vue';
const msg = defineModel();
</script>

`;

export const defineModelCode2 = `// vite.config.ts
export function createVitePlugins() {
	return [
		vue({
			script: {
				// 开启 defineModel
				defineModel: true,
			},
		}),
    // ...其他配置
  ]
}`;
