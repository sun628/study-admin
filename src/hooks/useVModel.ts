import { computed, WritableComputedRef } from 'vue';

// 定义 Props 和 Emitter 的类型
type PropsType = Record<string, any>;
type EmitterType<Props extends PropsType> = <PropName extends keyof Props>(event: `update:${PropName & string}`, ...args: any[]) => void;

/**
 * @description 自定义 Vue 组合式 API 函数，用于创建 v-model 绑定。
 * @param {PropsType} props - 组件的 props 对象。
 * @param {keyof Props & string} propName - 用于 v-model 绑定的 prop 名称。
 * @param {EmitterType<Props>} emitter - 触发更新事件的 emitter 函数。
 * @returns {WritableComputedRef<Props[keyof Props]>} 表示 v-model 绑定的可写计算引用。
 **/
export function useVModel<Props extends PropsType>(
	props: Props,
	propName: keyof Props & string,
	emitter: EmitterType<Props>
): WritableComputedRef<Props[keyof Props]> {
	// 更新事件处理函数
	const handleUpdate = (): void => {
		emitter(`update:${propName}`, props[propName]);
	};

	// 创建 Proxy 的辅助函数
	const createProxyImpl = (obj: any): any => {
		return new Proxy(obj, {
			get(target, key) {
				const targetValue = Reflect.get(target, key);
				return typeof targetValue === 'object' ? createProxyImpl(targetValue) : targetValue;
			},
			set(target, key, newValue) {
				const res = Reflect.set(target, key, newValue);
				handleUpdate();
				return res;
			},
		});
	};

	// 返回一个计算属性
	return computed({
		get(): Props[keyof Props] {
			return createProxyImpl(props[propName]);
		},
		set(newValue: Props[keyof Props]): void {
			emitter(`update:${propName}`, newValue);
		},
	});
}
