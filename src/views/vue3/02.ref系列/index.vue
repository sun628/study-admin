<template>
	<el-row class="flex justify-center">
		<el-col :span="16">
			<el-card>
				<doc id="ref的使用" title="ref的使用">
					<div class="tip">
						<p>接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 .value property，指向该内部值。</p>
						<p><font color="red">注意被ref包装之后需要.value 来进行赋值</font></p>
					</div>
					<highlight :code="refCode" />
				</doc>
				<doc id="shallowRef的使用" title="shallowRef的使用">
					<div class="tip">
						<p>和ref()不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的。</p>
						<p>
							如果你使用shallowRef来包装一个含有对象或数组的值的对象，那么你需要手动地为这些对象或数组创建响应式，并且当这些对象或数组发生变化时，你需要手动地通知依赖于此shallowRef的视图进行更新。
						</p>
					</div>
					<highlight :code="shallowRefCode" />
					<p class="tip">
						TIP：<font>shallowRef()</font>
						常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。但代价是，我们现在必须将所有深层级对象视为不可变的，并且只能通过替换整个根状态来触发更新：
					</p>
					<highlight :code="shallowRefCode1" />
				</doc>
			</el-card>
		</el-col>
		<el-col :span="4" class="ml-10">
			<el-card class="box-card">
				<div v-for="(item, index) in list" :key="index" class="text item" @click="scrollToRef(item.name)">{{ 'List item ' + item.name }}</div>
			</el-card>
		</el-col>
	</el-row>
</template>
<script setup lang="ts">
import { refCode, shallowRefCode, shallowRefCode1 } from './code';
const list = [
	{ id: 1, name: 'ref的使用' },
	{ id: 2, name: 'shallowRef的使用' },
	{ id: 3, name: '王五' },
];
const scrollToRef = (refName: string) => {
	const element = document.getElementById(refName);
	element?.scrollIntoView({ behavior: 'smooth' });
};
</script>
