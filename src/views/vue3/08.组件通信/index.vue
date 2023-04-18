<template>
	<el-row class="h-full">
		<doc title="vue3组件通信的实现方式" class="flex-1">
			<el-collapse v-model="activeName" accordion @change="handleChange">
				<el-collapse-item v-for="(item, index) in components" :key="index" :title="`${index + 1}.${item.title}`" class="tip" :name="item.title">
					<div class="p-1 tip">{{ item.tip }}</div>

					<highlight v-if="item.code" :code="item.code"></highlight>
				</el-collapse-item>
			</el-collapse>
		</doc>
		<el-drawer v-model="drawerVisible" :show-close="false" :modal="false" modal-class="my-drawer">
			<template #header="{ close, titleId, titleClass }">
				<h4 :id="titleId" :class="titleClass">{{ activeName }}</h4>
				<el-button type="danger" @click="close">
					<el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
					Close
				</el-button>
			</template>
			<keep-alive>
				<component :is="currentComponent"></component>
			</keep-alive>
		</el-drawer>
	</el-row>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, shallowRef, markRaw, defineAsyncComponent } from 'vue';
import type { CollapseModelValue } from 'element-plus';
import { CircleCloseFilled } from '@element-plus/icons-vue';
import { PropsEmitsCode, VModelCode } from './code';

const drawerVisible = ref(false);
// import A from './父子组件通信/index.vue';
const A = defineAsyncComponent(() => import('./props-emit/index.vue'));
const B = defineAsyncComponent(() => import('./v-model/index.vue'));
const E = defineAsyncComponent(() => import('./refs/index.vue'));
//定义一个动态组件数组
const currentComponent = shallowRef(); //动态组件的名称
const activeName = ref();

const components = reactive([
	{
		title: 'props/$emit',
		tip: '通过props从父组件向子组件传递数据，子组件通过 $emit 事件向父组件传递数据。',
		componet: markRaw(A),
		code: PropsEmitsCode,
	},
	{
		title: 'v-model',
		tip: `在vue2中,我们要想实现一个自定义的非表单组件的双向绑定，需要通过xxxx.sync的这种语法来实现。
    但是在vue3这个指令已经被废除了，而是统一使用v-model这个指令。（其实是一个语法糖 通过props 和 emit组合而成的）`,
		componet: markRaw(B),
		code: VModelCode,
	},
	{
		title: 'refs',
		tip: `使用API选项时，我们可以通过this.$refs.name获取指定的元素或组件，但在组合API中不行。
    如果我们想通过ref获取，需要定义一个同名的Ref对象，在组件挂载后可以访问。`,
		componet: markRaw(E),
	},
	{
		title: 'provide/Inject',
		tip: '通过provide和inject创建一个父组件和所有子孙组件之间的依赖注入关系。',
		componet: markRaw(A),
	},
	{
		title: '$attrs/$listeners',
		tip: `父组件可以通过v-bind="$attrs"将所有未被prop所识别的属性传递给子组件，然后子组件可以使用$vbind ="$attrs"来自动将这些属性绑定到相应的子组件元素上。
    同时，父组件也可以通过v-on="$listeners"将它的所有事件监听器绑定在子组件的根元素上。`,
		componet: markRaw(A),
	},
	{
		title: 'eventBus',
		componet: markRaw(A),
	},
	{
		title: 'vuex/pinia',
		componet: markRaw(A),
	},
]);

//切换组件
const handleChange = (val: CollapseModelValue) => {
	const obj = components.find((item) => item.title === val);
	currentComponent.value = obj?.componet;
	drawerVisible.value = true;
};

onMounted(() => {
	currentComponent.value = components[0].componet;
});
</script>

<style scoped lang="scss">
:deep(.el-collapse-item__header) {
	background-color: transparent;
}
:deep(.el-collapse-item__wrap) {
	border-radius: 8px;
	.el-collapse-item__content {
		padding: 0px;
		.tip {
			white-space: pre-line;
			text-align: left;
			margin: 0;
			line-height: 24px;
		}
		pre {
			margin: 0;
		}
	}
}
:deep(.my-drawer) {
	position: static !important;
	width: 50%;
	.el-drawer {
		width: 100% !important;
		position: static;
	}
	.el-drawer__title {
		font-size: 2rem;
		color: var(--el-text-color-primary);
	}
	.el-drawer__header {
		margin: 0;
	}
}
</style>
