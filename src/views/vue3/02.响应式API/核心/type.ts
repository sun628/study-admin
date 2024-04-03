/**
 * 类型定义
 */
export const refType = `function ref<T>(value: T): Ref<UnwrapRef<T>>

interface Ref<T> {
  value: T
}`;

export const reactiveType = `function reactive<T extends object>(target: T): UnwrapNestedRefs<T>`;

export const computedType = `// 只读
function computed<T>(
  getter: () => T,
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可写的
function computed<T>(
  options: {
    get: () => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>`;

export const watchEffectType = `
function watchEffect(
  effect: (onCleanup: OnCleanup) => void,
  options?: WatchEffectOptions
): StopHandle

type OnCleanup = (cleanupFn: () => void) => void

interface WatchEffectOptions {
  flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

type StopHandle = () => void`;
