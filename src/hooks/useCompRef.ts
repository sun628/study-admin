import { DefineComponent, ref } from 'vue';

/**
 * @description 用于获取组件实例类型
 * @param {T} 组件类型
 * @example
 * import { ElForm } from 'element-plus';
 * const compRef = CompRef(ElForm);
 * compRef.value.xxx();
 * @returns {Ref<InstanceType<typeof T>>} 组件实例
 **/
export function CompRef<T extends abstract new (...args: any) => any>(_comp: T) {
	return ref<InstanceType<T>>();
}

/**
 * @description 从 Vue 组件中提取出暴露的实例类型,这个实例类型包含 expose 方法的第一个参数的类型和 Vue 组件实例的类型。
 * @param {T} 组件类型 (如: ElForm)
 * @example
 * import { ElForm } from 'element-plus';
 * const compRef = ComponentExposed(typeof ElForm);
 * compRef.value.xxx();
 **/
export type ComponentExposed<T> = T extends new (...args: any[]) => infer R
	? R
	: T extends (...args: any[]) => infer R
		? R extends { __ctx?: infer K }
			? Exclude<K, void> extends { expose: (...args: infer K) => void }
				? K[0] & InstanceType<DefineComponent>
				: any
			: any
		: any;
