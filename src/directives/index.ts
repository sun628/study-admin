import { App, Directive } from 'vue';
import copy from './modules/copy';
import waterMarker from './modules/waterMarker';
import draggable from './modules/draggable';
import debounce from './modules/debounce';
import throttle from './modules/throttle';

const directivesList: Record<string, Directive> = {
	// Custom directives
	copy,
	waterMarker,
	draggable,
	debounce,
	throttle,
};

const directives = {
	install: function (app: App<Element>) {
		Object.keys(directivesList).forEach((key) => {
			// 注册所有自定义指令
			app.directive(key, directivesList[key]);
		});
	},
};

export default directives;
