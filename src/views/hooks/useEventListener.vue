<template>
	<el-card>
		<doc title="添加事件监听器">
			<p class="tip">当使用原生 JavaScript 或第三方库手动添加了事件监听器（例如，通过 addEventListener），确保在组件销毁时手动移除它们。</p>
			<h3>例如：</h3>
			<Highlight :code="code1" />
			<p class="tip">我们可以把它移到一个外部函数中去，并返回需要暴露的状态。和在组件中一样，你也可以在组合式函数中使用所有的组合式 API</p>
			<Highlight :code="code2" />
			<p class="tip">如下所示</p>
			<Highlight :code="code3" />
			<Highlight :code="eventCode" />
		</doc>
	</el-card>
</template>
<script setup lang="ts">
import eventCode from '@/hooks/useEvent?raw';
const code1 = `onMounted(() => {
	window.addEventListener('scroll', scrollHander, true);
});
onUnmounted(() => {
	window.removeEventListener('scroll', scrollHander, true);
});`;

const code2 = `// useEvent.ts
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // 如果你想的话，
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}`;

const code3 = `import { useEventListener } from '@/hooks/useEvent';
const scrollHander = () => {
	console.log('scroll');
};
useEventListener(window, 'scroll', scrollHander, true);`;
</script>

<style scoped lang="scss"></style>
