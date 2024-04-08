import MvTable from './MvTable.vue';
import type { ComponentExposed } from '@/hooks/useCompRef';

export default MvTable;

export type MvTableInstance = ComponentExposed<typeof MvTable>;

export * from './type';

export { MvTable };
