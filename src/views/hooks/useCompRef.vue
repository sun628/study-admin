<template>
	<el-card>
		<doc title="useCompRef">
			<Tip>用于获取组件实例类型 </Tip>
			<h2>例</h2>
			<Highlight :code="code" lang="xml" />
			<h2>源代码</h2>
			<Highlight :code="CompRefCode" :auto="false" />
			<ElForm ref="ElFormRef" />
		</doc>
	</el-card>
</template>
<script setup lang="ts">
import CompRefCode from '@/hooks/useCompRef?raw';
import { CompRef } from '@/hooks/useCompRef';
import { ElForm } from 'element-plus';

// const ElFormRef = ref<InstanceType<typeof ElForm>>();
const ElFormRef = CompRef(ElForm);

const code =
	`<template>
 <ElForm ref="ElFormRef" />
</template>

<script setup lang="ts">
  import { CompRef } from '@/hooks/useCompRef';
  import { ElForm } from 'element-plus';

  // const ElFormRef = ref<InstanceType<typeof ElForm>>();
  const ElFormRef = CompRef(ElForm);
</` + `script>`;
</script>

<style scoped lang="scss"></style>
