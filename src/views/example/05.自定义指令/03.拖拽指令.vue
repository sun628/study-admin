<template>
	<div class="card h-full w-full items-center flex-column relative">
		<span class="text">拖拽指令 🍇🍇🍇🍓🍓🍓</span>
		<div v-draggable class="drag-box flex-center">我可以拖拽哦~</div>
		<teleport to="body">
			<div v-draggable="{ restrict: false }" class="drag-box flex-center">我可以拖拽哦~无边界</div>
		</teleport>
	</div>
</template>

<script setup lang="ts" name="dragDirect"></script>

<style scoped lang="scss">
.drag-box {
	position: absolute;
	top: 110px;
	width: 300px;
	height: 300px;
	font-size: 23px;
	font-weight: bold;
	color: rgb(46 127 138);
	background: #b8d2dd;
	border-radius: 50%;
	z-index: 1;
}
</style>
