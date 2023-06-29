export const refCode = `<!-- 1. 我们给子组件绑定ref -->
<template>
   <child ref="childRef" />
</template>
<!-- 2.在stepup中声明 -->
<script setup lang="ts">
  import child from './child.vue';
  const childRef: Ref<InstanceType<typeof child> | null> = ref(null);
</script>`;

export const refCode1 = `// 3. 调用子组件实例的openDialog方法
const openChildDialog = () => {
	childRef.value?.openDialog();
};
`;

export const childRefCode = `let dialogVisible = ref(false);

const openDialog = () => {
	dialogVisible.value = true;
};

// 4.子组件需要把方法暴露出去,因为在setup的组件中是默认关闭的。
defineExpose({
	openDialog,
});`;
