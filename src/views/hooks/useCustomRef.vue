<template>
	<div>
		<h2>自定义防抖Ref：</h2>
		<el-input v-model="text1" placeholder="Please input" />
		<h2>自定义节流Ref:</h2>
		<el-input v-model="text2" placeholder="Please input" />
	</div>
</template>

<script setup lang="ts">
import { useDebouncedRef, useThrottledRef } from '@/hooks/useCustomRef';

const text1 = useDebouncedRef('hello');

const text2 = useThrottledRef('hello', 300);
</script>
