<template>
	<el-card>
		<doc title="useVModel">
			<Tip>
				<p>1.用于组件 v-model 通信</p>
				<p class="flex-center">
					2.等价于 vueuse 中工具函数<Tag data="useVModel" />，使用方式一样
					<el-link type="primary" href="https://vueuse.org/core/useVModel/" target="_blank" class="ml-2">链接地址</el-link>
				</p>
			</Tip>
			<h2>例</h2>
			<Highlight :code="code" />
			<h2>源代码</h2>
			<Highlight :code="useVModelCode" :auto="false" />
		</doc>
	</el-card>
</template>
<script setup lang="ts">
import useVModelCode from '@/hooks/useVModel?raw';

const code =
	`<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)
</` + `script>`;
</script>
<style scoped lang="scss"></style>
