<template>
	<div class="tip custom-block">
		<p v-if="title" class="custom-block-title">
			<slot name="header">
				<span>{{ titleText }}</span>
			</slot>
		</p>
		<p>
			<slot></slot>
		</p>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'Tip',
});

export type TipProps = {
	title?: boolean | string;
};

const prop = withDefaults(defineProps<TipProps>(), {
	title: false,
});
const { title } = toRefs(prop);
// 判断title是否为boolean类型并且不为空，如果是则返回'TIP'，否则返回title
const titleText = computed(() => {
	return typeof title.value === 'boolean' && title.value ? 'TIP' : title.value;
});
</script>

<style scoped lang="scss">
.custom-block.tip {
	padding: 8px 16px;
	background-color: var(--block-tip-bg-color);
	border-radius: 4px;
	border-left: 5px solid var(--el-color-primary);
	margin: 20px 0;
	p {
		margin: 1rem 0;
		line-height: 1.7;
		&:first-child {
			margin-top: 0;
		}
		&:last-child {
			margin-bottom: 0;
		}
		&:not(.custom-block-title) {
			font-size: 0.9rem;
		}
	}
	.custom-block-title {
		font-weight: 700;
	}
}
</style>
