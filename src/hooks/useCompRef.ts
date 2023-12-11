import { ref } from 'vue';

/**
 * @description 用于获取组件实例类型
 * @param {T} 组件类型
 * @example
 * import { ElForm } from 'element-plus';
 * const compRef = useCompRef(ElForm);
 * compRef.value.xxx();
 * @returns {Ref<InstanceType<T>>} 组件实例
 **/
export function useCompRef<T extends abstract new (...args: any) => any>(_comp: T) {
	return ref<InstanceType<T>>();
}
