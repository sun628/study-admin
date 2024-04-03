export const toRefImpl = `export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue?: T[K]
): ToRef<T[K]> {
  const val = object[key]
  return isRef(val)
    ? val
    : (new ObjectRefImpl(object, key, defaultValue) as any)
}

// ObjectRefImpl 创建一个类ref 对象
class ObjectRefImpl<T extends object, K extends keyof T> {
  public readonly __v_isRef = true
 
  constructor(
    private readonly _object: T,
    private readonly _key: K,
    private readonly _defaultValue?: T[K]
  ) {}
 
  get value() {
    const val = this._object[this._key]
    return val === undefined ? (this._defaultValue as T[K]) : val
  }
 
  set value(newVal) {
    this._object[this._key] = newVal
  }
}`;

export const toRefsImpl = `export type ToRefs<T = any> = {
  [K in keyof T]: ToRef<T[K]>
}
export function toRefs<T extends object>(object: T): ToRefs<T> {
  if (__DEV__ && !isProxy(object)) {
    console.warn('toRefs() expects a reactive object but received a plain one.')
  }
  const ret: any = isArray(object) ? new Array(object.length) : {}
  for (const key in object) {
    ret[key] = toRef(object, key)
  }
  return ret
}`;

export const toValueImpl = `function toValue<T>(source: T | Ref<T> | (() => T)): T`;
