<template>
	<div class="child">
		<doc title="子组件">
			<el-button type="primary" @click="getParentData">获取父组件传的所有数据</el-button>
			<div class="border p-1 bg-gray-200 mb-2">
				<span>来自父组件的数据：</span> <span>{{ data }}</span>
			</div>
			<template v-for="(value, name) in $slots" :key="name" #[name]="slotData">
				<slot :name="name" v-bind="slotData || {}"></slot>
			</template>
		</doc>
		<highlight :code="code" />
	</div>
</template>
<script setup lang="ts">
const code = `// 也可以绑定在html标签上,用于组件封装
<div v-bind="$attrs"></div>

//包括插槽透传
<!-- 通过便利实现插槽透传 -->
   <template v-for="(value, name) in $slots" :key="name" #[name]="slotData">
			<slot :name="name" v-bind="slotData || {}"></slot>
	</template>
`;

const attrs = useAttrs();
const slots = useSlots();

// 孙组件的方法
let data = ref();
function getParentData() {
	data.value = attrs;
	console.log('attrs：', attrs);
	console.log('slots', slots);
}
</script>

<style scoped lang="scss">
.el-row {
	width: 100%;
}
</style>
