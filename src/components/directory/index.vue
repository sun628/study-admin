<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header font-bold text-xl">
				<slot name="header">
					<span>目录</span>
				</slot>
			</div>
		</template>
		<div v-for="(item, index) in data" :key="index" @click="scrollToView(item.label, item.link)">
			<span class="pointer leading-8" :class="{ active: activeName === item.label }">{{ index + 1 }}. {{ item.label }}</span>
		</div>
	</el-card>
</template>
<script setup lang="ts">
export type DirectoryProps = {
	data: { link?: string; label: string }[];
};
const props = withDefaults(defineProps<DirectoryProps>(), {
	data: () => [],
});
const { data } = toRefs(props);

const activeName = ref(data.value[0]?.label);

const scrollToView = (refName: string, link?: string) => {
	let element;
	if (link) {
		element = document.querySelector(`[link=${link}]`);
	} else {
		element = document.querySelector(`[title=${refName}]`);
	}
	element?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
	activeName.value = refName;
};
</script>

<style scoped lang="scss">
.box-card {
	position: sticky;
	top: 10px;
	.active {
		color: var(--el-color-primary);
	}
}
</style>
