<template>
	<h2>来自父组件的数据count：{{ count }}</h2>
	<el-button type="primary" @click="countAdd(count + 1)">通过emit触发点击事件</el-button>
	<doc>
		<div class="tip">
			<p>prop 是只读，不允许修改。通过emit事件通知父。</p>
		</div>
	</doc>
</template>
<script setup lang="ts">
interface prop {
	count: number;
}
withDefaults(defineProps<prop>(), {
	count: 0,
});
const emit = defineEmits(['update-count']);
const countAdd = (val: number) => {
	emit('update-count', val);
};
</script>
