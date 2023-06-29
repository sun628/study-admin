<template>
	<el-row class="h-full">
		<doc title="vue3组件通信的实现方式" class="flex-1">
			<div class="flex items-center">
				<h3 class="m-0">是否展示右边弹窗：</h3>
				<el-switch v-model="switchValue" />
			</div>
			<el-collapse v-model="activeName" accordion @change="handleChange">
				<el-collapse-item v-for="(item, index) in components" :key="index" :title="`${index + 1}.${item.title}`" class="tip" :name="item.title">
					<div v-if="item.tip" class="p-1 tip">{{ item.tip }}</div>
					<el-link v-if="item.link" :href="item.href" target="_blank" class="ml-3" type="primary">{{ item.link }}</el-link>
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

const drawerVisible = ref(true);
// import A from './父子组件通信/index.vue';
// const A = defineAsyncComponent(() => import('./props-emit/index.vue'));
import A from './props-emit/index.vue';
const B = defineAsyncComponent(() => import('./v-model/index.vue'));
const C = defineAsyncComponent(() => import('./refs/index.vue'));
const D = defineAsyncComponent(() => import('./provide-inject/index.vue'));
const E = defineAsyncComponent(() => import('./attrs/index.vue'));
const F = defineAsyncComponent(() => import('./mitt/index.vue'));
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
		componet: markRaw(C),
	},
	{
		title: 'provide/Inject',
		tip: `provide/inject是 Vue 中提供的一对 API。无论层级多深，API 都可以实现父组件到子组件的数据传递。
        （尽量使用 readonly 封装数据，避免子组件修改父组件传递的数据。）`,
		componet: markRaw(D),
	},
	{
		title: 'attrs',
		tip: `透传 Attributes 是指由父组件传入，且没有被子组件声明为 props 或是组件自定义事件的 attributes 和事件处理函数。
          默认情况下，若是单一根节点组件，$attrs 中的所有属性都是直接自动继承自组件的根元素。而多根节点组件则不会如此，同时你也可以通过配置 inheritAttrs 选项来显式地关闭该行为。`,
		componet: markRaw(E),
	},
	{
		title: 'mitt--(eventBus)',
		componet: markRaw(F),
		href: 'https://github.com/developit/mitt',
		link: 'mitt github地址',
	},
	{
		title: 'vuex/pinia',
		href: 'https://pinia.web3doc.top/',
		link: 'pinia中文文档',
	},
]);

let switchValue = ref(true);
//切换组件
const handleChange = (val: CollapseModelValue) => {
	const obj = components.find((item) => item.title === val);
	currentComponent.value = obj?.componet;
	if (switchValue.value) drawerVisible.value = true;
};

onMounted(() => {
	currentComponent.value = components[0].componet;
});
</script>

<style scoped lang="scss">
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
:deep(.el-collapse-item__header) {
	background-color: transparent;
	font-weight: 600;
	font-size: 18px;
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
</style>
