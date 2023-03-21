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
}

export type AssemblySizeProp = '' | 'large' | 'default' | 'small';
/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: AssemblySizeProp;
	// language: string;
	themeConfig: ThemeConfigProp;
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
