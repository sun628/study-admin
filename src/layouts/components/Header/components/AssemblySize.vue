<template>
	<el-dropdown trigger="click" @command="setAssemblySize">
		<i :class="'iconfont icon-contentright'" class="toolBar-icon"></i>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="item in assemblySizeList" :key="item" :disabled="assemblySize === item" :command="item">
					{{ assemblySizeListCh[item] }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useGlobalStore } from '@/store/modules/global';
import { AssemblySizeProp } from '@/store/interface';

const globalStore = useGlobalStore();
const assemblySize = computed(() => globalStore.assemblySize);

const assemblySizeListCh = reactive<{ [key: string]: any }>({
	default: '默认',
	large: '大型',
	small: '小型',
});

const assemblySizeList = reactive<string[]>(['default', 'large', 'small']);

const setAssemblySize = (item: AssemblySizeProp) => {
	if (assemblySize.value === item) return;
	globalStore.setAssemblySizeSize(item);
};
</script>
