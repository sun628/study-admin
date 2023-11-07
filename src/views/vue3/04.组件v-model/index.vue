<template>
	<el-row class="h-full">
		<doc title="组件 v-model">
			<p>v-model 可以在组件上使用以实现双向绑定。</p>
			<p>首先让我们回忆一下 v-model 在原生元素上的用法：</p>
			<Highlight :code="code1" />
		</doc>
		<doc title="单向数据流">
			<div class="tip">
				<p>
					所有的 props 都遵循着<HighFont class="font-bold">单向绑定</HighFont>原则，props
					因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。
				</p>
				<p>这避免了子组件意外修改父组件的状态的情况，不然应用的数据流将很容易变得混乱而难以理解。</p>
			</div>
		</doc>
	</el-row>
</template>

<script setup lang="ts">
import Font from '@/components/docs/Font.vue';
const code1 = `<input v-model="searchText" />`;
</script>

<style scoped lang="scss"></style>
