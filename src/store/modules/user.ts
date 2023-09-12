import { defineStore } from 'pinia';
import { UserState } from '@/store/interface';
import piniaPersistConfig from '@/config/piniaPersist';

export const useUserStore = defineStore({
	id: 'UserState',
	state: (): UserState => ({
		token: '',
		userInfo: { name: 'Geeker' },
	}),
	getters: {},
	actions: {
		// Set Token
		setToken(token: string) {
			this.token = token;
		},
		// Set setUserInfo
		setUserInfo(userInfo: UserState['userInfo']) {
			this.userInfo = userInfo;
		},
	},
	persist: piniaPersistConfig('UserState'),
});
