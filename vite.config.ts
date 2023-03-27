import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'; //自动导入vue和vue-router相关函数
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer'; //打包分析
import { loadEnv } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import eslintPlugin from 'vite-plugin-eslint';
import Electron from 'vite-plugin-electron';
const pathSrc = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const root = process.cwd();
	const env = loadEnv(mode, root);
	return {
		plugins: [
			vue(),
			eslintPlugin({
				include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
			}),
			Electron({
				entry: 'electron/index.ts', //启动electron的入口文件
			}),
			AutoImport({
				imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
				dts: 'src/auto-imports.d.ts', // 生成 `auto-import.d.ts` 全局声明
				resolvers: [ElementPlusResolver()], //element-plus自动引入
			}),
			Components({
				resolvers: [
					ElementPlusResolver({
						importStyle: 'sass',
					}),
				],
				dts: 'src/components.d.ts',
			}),
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [path.resolve(process.cwd(), 'src/assets/svgIcons')],
				// 指定symbolId格式
				symbolId: 'icon-[dir]-[name]',
			}),
			visualizer({
				emitFile: true, //是否被触摸
				filename: 'visualizer.html', //生成分析网页文件名
				open: true, //在默认用户代理中打开生成的文件
				gzipSize: false, //从源代码中收集 gzip 大小并将其显示在图表中
				brotliSize: true, //从源代码中收集 brotli 大小并将其显示在图表中
			}),
		],
		resolve: {
			alias: {
				'@/': `${pathSrc}/`,
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/styles/element/index.scss" as *;',
				},
			},
		},
		base: './',
		server: {
			port: 3000, // 服务端口号
			open: true, // 服务启动时是否自动打开浏览器
			cors: true, // 允许跨域
			proxy: {
				'/api': {
					target: env.VITE_BASE_API,
					changeOrigin: true,
					secure: false, // 如果是https接口，需要配置这个参数
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
				'/music_api': {
					target: 'https://music.163.com',
					changeOrigin: true,
					secure: false, // 如果是https接口，需要配置这个参数
					rewrite: (path) => path.replace(/^\/music_api/, '/api'),
				},
			},
		},
		build: {
			outDir: 'dist',
			minify: 'esbuild',
			// esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
			// minify: "terser",
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
				},
			},
		},
	};
});
