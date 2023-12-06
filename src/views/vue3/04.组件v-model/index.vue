<template>
	<el-row class="h-full">
		<el-col :span="20">
			<doc title="组件 v-model">
				<p class="tip">v-model 可以在组件上使用以实现双向绑定。</p>
				<p>首先让我们回忆一下 v-model 在原生元素上的用法：</p>
				<Highlight :code="code1" />
				<p class="tip">实现原理 本质上是一颗语法糖，利用了 v-bind 和 input 事件。因此上面的代码其实等价于下面这段：</p>
				<Highlight :code="code2" />
				<p>而当使用在一个组件上时，v-model 会被展开为如下的形式：</p>
				<Highlight :code="code3" />
				<p>要让这个例子实际工作起来，<MvTag text="<CustomInput>" />组件内部需要做两件事：</p>
				<div class="tip">
					<p>1.将内部原生 <MvTag text="<input />" />元素的 value attribute 绑定到 modelValue prop</p>
					<p>2.当原生的 input 事件触发时，触发一个携带了新值的 update:modelValue 自定义事件</p>
				</div>
				<Highlight :code="code4" />
				<p>现在 v-model 可以在这个组件上正常工作了：</p>
				<Highlight :code="code5" />
			</doc>
			<doc title="v-model 的参数">
				<p>
					默认情况下，v-model 在组件上都是使用 modelValue 作为 prop，并以 update:modelValue 作为对应的事件。我们可以通过给 v-model
					指定一个参数来更改这些名字：
				</p>
				<Highlight :code="code6" />
			</doc>
			<doc title="组件 v-model 通信">
				<div class="tip">
					<p>1.父组件使用 v-model ，子组件可以通过 v-bind 和 input 事件实现组件通信</p>
					<p>2.那么子组件也可以直接使用v-model绑定父组件传过来的modelValue吗？</p>
					<p class="pl-3 text-primary">答案：不可以，因为会破坏单项数据流。</p>
				</div>
				<div class="tip">
					<h1>单向数据流</h1>
					<p>
						所有的 props 都遵循着<span class="text-primary font-bold">单向绑定</span>原则，props
						因父组件的更新而变化，而不会逆向传递,即子组件不能直接修改父组件传过来的 props。
					</p>
					<p>这避免了子组件意外修改父组件的状态的情况，不然应用的数据流将很容易变得混乱而难以理解。</p>
				</div>
			</doc>
			<doc title="computed 拦截prop">
				<p class="tip">通过computed实现，通过 get 获取父组件传过来的值，利用 set 更新触发emit事件</p>
				<Highlight :code="computedCode" />
				<el-divider>
					<el-icon><star-filled /></el-icon>
					<span>案例</span>
				</el-divider>
				<!-- 案例 -->
				<el-row class="flex items-center mb-2">
					<el-col class="flex">
						<h2>computed 拦截：</h2>
						<customInput v-model="msg" />
					</el-col>
					<el-col>
						<h2>父组件的msg值：<tag :data="msg" /></h2>
					</el-col>
				</el-row>
			</doc>
			<doc title="Proxy 代理对象">
				<Tip title>
					<p>使用computed拦截对象时，不会触发<code>computed</code>的<code>set</code>方法</p>
					<p>原因是：form.xxx = xxx时，并不会触发computed的set，只有form = xxx时，才会触发set</p>
				</Tip>
				<Highlight :code="customFormCode" />
				<el-divider>
					<el-icon><star-filled /></el-icon>
					<span>案例</span>
				</el-divider>
				<!-- 案例 -->
				<el-row class="flex items-center mb-2">
					<el-col class="flex">
						<div>
							<h2>案例 —— 代理对象：</h2>
							<h2>Proxy + computed：</h2>
						</div>
						<customForm v-model="form" />
					</el-col>
					<el-col class="flex items-center">
						<h2 class="mr-2">父组件的form对象：</h2>
						<tag v-for="(item, index) in form" :key="index" class="mr-2">
							{{ item }}
						</tag>
					</el-col>
				</el-row>
			</doc>
			<doc title="封装 useVModel hook">
				<Highlight :code="useVModelCode" />
			</doc>
			<div>
				<useVModelForm v-model="form" />
				<!-- useVModel -->
				<h2>测试 useVModel</h2>
				<tag v-for="(item, index) in form" :key="index" class="mr-2">
					{{ item }}
				</tag>
			</div>

			<doc title="其他">
				<Tip title>
					<p>
						等价于 vueuse 中工具函数<MvTag data="useVModel" />，使用方式一样
						<el-link type="primary" href="https://vueuse.org/core/useVModel/" target="_blank">链接地址</el-link>
					</p>
					<p>Vue 3.3 新特性</p>
				</Tip>
			</doc>
		</el-col>
		<el-col :span="4">
			<directory :data="directoryData" />
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import directory, { DirectoryData } from '@/components/directory/index.vue';
import MvTag from '@/components/mv-tag/index.vue';
import { code1, code2, code3, code4, code5, computedCode, code6 } from './code';
import customInput from './component/customInput.vue';
import customForm, { FormProps } from './component/customForm.vue';
import useVModelForm from './component/useVModelForm.vue';
import customFormCode from './component/customForm.vue?raw';
import useVModelCode from '@/hooks/useVModel?raw';

// type DirectoryData = InstanceType<typeof directory>['data'];
const directoryData = ref<DirectoryData>([
	{ label: '组件 v-model' },
	{ label: 'v-model 的参数' },
	{ label: '组件 v-model 通信' },
	{ label: 'computed 拦截prop' },
	{ label: 'Proxy 代理对象' },
	{ label: '封装 useVModel hook' },
]);

const msg = ref('hello');

const form = ref<FormProps>({
	name: '张三',
	age: 18,
	sex: '',
});

watch(form, (newValue) => {
	console.log(newValue);
});
</script>

<style scoped lang="scss">
h2 {
	white-space: nowrap;
	margin-bottom: 0;
}
:deep(.el-divider__text) {
	background-color: transparent;
}
</style>
