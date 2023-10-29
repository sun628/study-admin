import path from 'path';
import { defineConfig } from 'vite';
import { loadEnv } from 'vite';
import { createVitePlugins } from './src/plugins/index';
const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig(({ command, mode }) => {
	const root = process.cwd();
	const env = loadEnv(mode, root);

	return {
		plugins: createVitePlugins(),
		resolve: {
			alias: {
				'@/': `${pathSrc}/`,
			},
		},
		publicDir: 'public', //将public目录下的文件复制到dist目录
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "@/styles/element/index.scss" as *; @use "@/styles/media.scss" as *;',
				},
			},
		},
		base: './',
		server: {
			port: 3000, // 服务端口号
			// open: true, // 服务启动时是否自动打开浏览器
			cors: true, // 允许跨域
			proxy: {
				// '/api': {
				// 	target: env.VITE_BASE_API,
				// 	changeOrigin: true,
				// 	secure: false, // 如果是https接口，需要配置这个参数
				// 	rewrite: (path) => path.replace(/^\/api/, ''),
				// },
				'/music_api': {
					target: 'http://music.163.com/',
					changeOrigin: true,
					secure: false, // 如果是https接口，需要配置这个参数
					rewrite: (path) => path.replace(/^\/music_api/, '/api'),
				},
			},
		},
		build: {
			publicPath: './',
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
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
					manualChunks(id) {
						if (id.includes('node_modules')) {
							return id.toString().split('node_modules/')[1].split('/')[0].toString(); //静态资源分拆打包
						}
					},
				},
			},
		},
	};
});
