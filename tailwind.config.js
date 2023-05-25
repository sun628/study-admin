/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	plugins: [
		function ({ addBase }) {
			addBase({
				'.el-button': {
					'background-color': 'var(--el-button-bg-color,val(--el-color-white))',
				},
			});
		},
	],
	theme: {
		extend: {
			colors: {
				bg_color: 'var(--el-bg-color)',
				primary: 'var(--el-color-primary)',
				text_color_primary: 'var(--el-text-color-primary)',
				text_color_regular: 'var(--el-text-color-regular)',
			},
		},
	},
};
