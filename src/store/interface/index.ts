import { DeviceType } from '@/enums';
/* themeConfigProp */
export interface ThemeConfigProp {
	layout: string;
	primary: string;
	isDark: boolean;
	isGrey: boolean;
	isWeak: boolean;
	breadcrumb: boolean;
	tabs: boolean;
	footer: boolean;
	audio: boolean;
}

export type AssemblySizeProp = '' | 'large' | 'default' | 'small';
/* GlobalState */
export interface GlobalState {
	assemblySize: AssemblySizeProp;
	// language: string;
	themeConfig: ThemeConfigProp;
	device: `${DeviceType}`;
}

/* UserState */
export interface UserState {
	token: string;
	userInfo: { username: string };
}

/* TabsState */
export interface TabsState {
	tabsMenuValue: string;
	tabsMenuList: TabsOptions[];
}
/* MenuState */
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}
