<template>
	<el-row>
		<el-col :span="16">
			<doc title="isRef">
				<div class="tip">判断一个值是不是ref响应式对象</div>
				<highlight :code="isRefCode" />
			</doc>
			<doc title="unref">
				<div class="tip">
					TIP:如果参数是 ref，则返回内部值，否则返回参数本身。这是 <font>val = isRef(val) ? val.value : val</font> 计算的一个语法糖。
				</div>
				<highlight :code="unrefCode" />
			</doc>
			<doc title="toRef">
				<div class="tip">
					<p>可以将值、refs 或 getters 规范化为 refs (3.3+)。</p>
					<p>也可以基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。</p>
				</div>
				<h3>规范化签名 (3.3+)：</h3>
				<highlight :code="toRefCode" />
				<h3>对象属性签名：</h3>
				<highlight :code="toRefCode1" />
				<p class="tip">TTP:如果原始对象是非响应式的就不会更新视图 数据是会变的</p>
				<h3>toRef源码解析</h3>
				<highlight :code="toRefCode1" />
				<p class="tip">如果是ref 对象直接返回 否则 调用 ObjectRefImpl 创建一个类ref 对象</p>
				<highlight :code="toRefType" />
			</doc>
		</el-col>
		<!-- 目录 -->
		<el-col :span="4" class="ml-10">
			<directory :data="directoryData" />
		</el-col>
	</el-row>
</template>
<script setup lang="ts">
import { isRefCode, unrefCode, toRefCode, toRefCode1 } from './code';
import { toRefType } from './type';
import directory from '@/components/directory/index.vue';

const directoryData = [{ label: 'isRefCode' }];
</script>

<style scoped lang="scss"></style>
