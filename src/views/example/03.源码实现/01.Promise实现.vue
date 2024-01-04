<template>
	<div class="MyPromise">
		<el-card header="Promise关键问题">
			<doc>
				<h2>1.如何改变Promise的状态？</h2>
				<tip>
					<p>(1) resolve(value): 如果当前是 pending 就会变为 fulfilled</p>
					<p>(2) reject(reason): 如果当前是 pending 就会变为 rejected</p>
					<p>(3) 抛出异常: 如果当前是 pending 就会变为 rejected</p>
				</tip>
				<h2>2.一个Promise 指定（then回调）多个成功/失败回调函数，都会调用吗？</h2>
				<tip>
					<p>当Promise 改变为对应状态时 都会调用</p>
				</tip>
				<h2>3.改变Promise状态和指定回调函数谁先谁后？</h2>
				<tip>
					<p>
						(1) 都有可能，正常情况下是先指定回调再改变状态，但也可以先改变状态再<span class="text-primary">指定回调</span>
						(异步的情况下，先等待异步执行再指定resolve/reject)
					</p>
					<p>(2) 如何先改变状态再指定回调？</p>
					<p class="pl-4">① 在执行器中直接调用 resolve()/reject()</p>
					<p class="pl-4">② 延迟更长时间才调用 then()</p>
				</tip>
				<h2>4.Promise.then()返回新的 Promise 的结果状态由什么决定？</h2>
				<tip>
					<p>(1) 如果抛出异常，新的promise变为rejected,reason 为抛出的异常</p>
					<p>(2) 如果返回的是非 promise 的任意值,新的 Promise 的结果就会变为新 Promise 的结果</p>
					<p>(3) 如果返回的是另一个新 Promise,此 Promise 的结果就会成为新 Promise 的结果</p>
				</tip>
				<h2>5.Promise 如何串连多个操作任务？</h2>
				<tip>
					<p>(1) 在每个回调函数中 return 一个新的 promise 对象</p>
					<p>(2) 通过.then的链式调用串连多个同步/异步任务</p>
				</tip>
				<h2>6.Promise 异常穿透？</h2>
				<tip>
					<p>(1) 当使用 promise 的.then 链式调用时，可以在最后指定失败的回调</p>
					<p>(2) 前面任何操作出了异常，都会传到最后失败的回调中处理</p>
				</tip>
				<h2>7.中断 Promise 链？</h2>
				<tip>
					<p>(1) 当使用 promise 的.then 链式调用时，中间中断，不再调用后面的回调函数</p>
					<p>(2) 在回调函数中返回一个 pending 状态的 promise 对象</p>
					<p>==> 有且只有一种方式: <span class="text-primary">return new Promise(()=>{})</span></p>
					<p></p>
				</tip>
			</doc>
		</el-card>
		<el-card header="Promise实现">
			<div class="promise__code">
				<Highlight :code="MyPromiseCode" />
			</div>
			<el-form ref="ElForm"></el-form>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import MyPromise from '@/core/MyPromise';
import MyPromiseCode from '@/core/MyPromise?raw';
defineOptions({
	name: 'Promise',
});

// const p = new MyPromise<number>((resolve, reject) => {
// 	setTimeout(() => {
// 		console.log(1);
// 		resolve(3);
// 	}, 0);
// })
// 	.then((res) => {
// 		console.log('p--res2', res);
// 	})
// 	.catch((error) => {
// 		console.log('catch--error2', error);
// 	});

// setTimeout(() => {
// 	console.log(1);
// }, 0);

// MyPromise.resolve().then(() => console.log(0));
// 假设的异步操作
// function asyncCleanup() {
// 	return new MyPromise<number>((resolve) => {
// 		setTimeout(() => {
// 			console.log('异步清理完成');
// 			resolve(333);
// 		}, 2000);
// 	});
// }
// new MyPromise((resolve) => resolve('成功')).finally(asyncCleanup).then((value) => console.log(value));

// MyPromise.all([1, 2, 3, asyncCleanup()]).then((res) => console.log('all', res));
// MyPromise.all([1, 2, 3, MyPromise.reject(444)])
// 	.then((res) => console.log('all', res))
// 	.catch((err) => console.log('all-err', err));

// MyPromise.race([asyncCleanup(), MyPromise.reject(444), 22])
// 	.then((res) => {
// 		console.log('res', res);
// 	})
// 	.catch((err) => console.log('err', err));

// const p = new Promise((resolve, reject) => {
// 	console.log(1);
// 	throw new Error('error');
// })
// 	.then((res) => {
// 		console.log('p--res2', res);
// 	})
// 	.catch((error) => {
// 		console.log('catch--error2', error);
// 	});

// 中断 Promise 链
// const ss = new MyPromise((resolve, reject) => {
// 	setTimeout(() => {
// 		console.log(1);
// 		resolve(3);
// 	}, 0);
// })
// 	.then((res) => {
// 		console.log('p--res2', res);
// 		// return new MyPromise(() => {});
// 	})
// 	.then((res) => {
// 		console.log('p--res3', res);
// 	})
// 	.catch((error) => {
// 		console.log('catch--error2', error);
// 	});
</script>

<style scoped lang="scss"></style>
