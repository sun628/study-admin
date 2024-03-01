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
		['pink', { color: 'pink' }],
		['pointer', { cursor: 'pointer' }],
		['flex-center', { display: 'flex', 'align-items': 'center', 'justify-content': 'center' }],
		['flex-column', { display: 'flex', 'flex-direction': 'column' }],
		['content-box', { display: 'flex', 'flex-direction': 'column', 'align-items': 'center', height: '100%' }],
	],
});
