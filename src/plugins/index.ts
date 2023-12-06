import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'; //自动导入vue和vue-router相关函数
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer'; //打包分析
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import eslintPlugin from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

const _visualizer = visualizer({
	emitFile: true, //是否被触摸
	filename: 'visualizer.html', //生成分析网页文件名
	open: true, //在默认用户代理中打开生成的文件
	gzipSize: false, //从源代码中收集 gzip 大小并将其显示在图表中
	brotliSize: true, //从源代码中收集 brotli 大小并将其显示在图表中
});
const _PWA = VitePWA({
	registerType: 'autoUpdate',
	manifest: {
		name: 'study-admin',
		short_name: 'PWA',
		description: 'PWA应用',
		theme_color: '#ffffff',
		icons: [
			{
				src: '/logo.png',
				sizes: '317x317',
				type: 'image/png',
			},
			{
				src: '/logo.png',
				sizes: '317x317',
				type: 'image/png',
				purpose: 'any maskable',
			},
		],
	},
	workbox: {
		cacheId: 'vite-pwa',
		// 对所有匹配的静态资源进行缓存
		globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
	},
	// devOptions: {
	// 	enabled: true,
	// },
});

const lifecycle = process.env.npm_lifecycle_event; //获取当前运行的命令

export function createVitePlugins() {
	const root = process.cwd();
	return [
		vue({
			script: {
				// 开启 defineModel
				defineModel: true,
			},
		}),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
		Components({
			// Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
			// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
			// resolvers: [ElementPlusResolver()],
			dts: 'src/components.d.ts',
		}),
		AutoImport({
			imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
			dts: 'src/auto-imports.d.ts', // 生成 `auto-import.d.ts` 全局声明
			// resolvers: [ElementPlusResolver()], //element-plus自动引入
		}),
		createSvgIconsPlugin({
			iconDirs: [path.resolve(root, 'src/assets/svgIcons')], //指定symbolId格式
			symbolId: 'icon-[dir]-[name]', //指定需要缓存的图标文件夹
		}),
		lifecycle === 'build:pwa' ? _PWA : null, //是否开启PWA
		// 打包分析
		lifecycle === 'report' ? _visualizer : null,
	];
}
