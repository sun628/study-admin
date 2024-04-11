// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
	shortcuts: [
		// ...
	],
	theme: {
		colors: {
			// ...
		},
	},

	presets: [presetUno(), presetAttributify()],
	// transformers: [transformerDirectives(), transformerVariantGroup()],
	rules: [
		// ...custom rules
		['pointer', { cursor: 'pointer' }],
		['flex-center', { display: 'flex', 'align-items': 'center', 'justify-content': 'center' }],
		['flex-column', { display: 'flex', 'flex-direction': 'column' }],
		['flex-between', { display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }],
		['content-box', { display: 'flex', 'flex-direction': 'column', 'align-items': 'center', height: '100%' }],
		['bg-cover', { 'background-size': 'cover', 'background-position': 'center', 'background-repeat': 'no-repeat' }],
		['m-auto', { margin: 'auto' }],
	],
});
