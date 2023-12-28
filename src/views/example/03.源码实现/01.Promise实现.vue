<template>
	<el-card header="Promise实现">
		<div class="promise__code">
			<Highlight :code="MyPromiseCode" />
		</div>
	</el-card>
</template>

<script setup lang="ts">
import MyPromise from '@/core/MyPromise';
import MyPromiseCode from '@/core/MyPromise?raw';
defineOptions({
	name: 'Promise',
});

const p = new MyPromise<number>((resolve, reject) => {
	setTimeout(() => {
		console.log(1);
		resolve(3);
	}, 0);
})
	.then((res) => {
		console.log('p--res2', res);
	})
	.catch((error) => {
		console.log('catch--error2', error);
	});

// 假设的异步操作
function asyncCleanup() {
	return new MyPromise<void>((resolve) => {
		setTimeout(() => {
			console.log('异步清理完成');
			resolve();
		}, 1000);
	});
}
new MyPromise((resolve) => resolve('成功')).finally(asyncCleanup).then((value) => console.log(value));

setTimeout(() => {
	console.log(1);
}, 0);
MyPromise.resolve().then(() => console.log(0));
</script>

<style scoped lang="scss"></style>
