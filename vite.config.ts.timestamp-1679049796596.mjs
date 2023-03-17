// vite.config.ts
import path from "path";
import { defineConfig } from "file:///C:/Users/Adminstrator/Desktop/project/study-app/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Adminstrator/Desktop/project/study-app/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///C:/Users/Adminstrator/Desktop/project/study-app/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/Adminstrator/Desktop/project/study-app/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///C:/Users/Adminstrator/Desktop/project/study-app/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { loadEnv } from "file:///C:/Users/Adminstrator/Desktop/project/study-app/node_modules/vite/dist/node/index.js";
import { createSvgIconsPlugin } from "file:///C:/Users/Adminstrator/Desktop/project/study-app/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\Adminstrator\\Desktop\\project\\study-app";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig(({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router"],
        // 自动导入vue和vue-router相关函数
        dts: "src/auto-imports.d.ts",
        // 生成 `auto-import.d.ts` 全局声明
        resolvers: [ElementPlusResolver()]
        //element-plus自动引入
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass"
          })
        ],
        dts: "src/components.d.ts"
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/svgIcons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]"
      })
      // visualizer({
      //   emitFile: true, //是否被触摸
      //   filename: 'visualizer.html', //生成分析网页文件名
      //   open: true, //在默认用户代理中打开生成的文件
      //   gzipSize: false, //从源代码中收集 gzip 大小并将其显示在图表中
      //   brotliSize: true, //从源代码中收集 brotli 大小并将其显示在图表中
      // }),
    ],
    resolve: {
      alias: {
        "@/": `${pathSrc}/`
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    base: "./",
    server: {
      port: 3e3,
      // 服务端口号
      open: true,
      // 服务启动时是否自动打开浏览器
      cors: true,
      // 允许跨域
      proxy: {
        "/api": {
          target: env.VITE_BASE_API,
          changeOrigin: true,
          secure: false,
          // 如果是https接口，需要配置这个参数
          rewrite: (path2) => path2.replace(/^\/api/, "")
        },
        "/music_api": {
          target: "https://music.163.com",
          changeOrigin: true,
          secure: false,
          // 如果是https接口，需要配置这个参数
          rewrite: (path2) => path2.replace(/^\/music_api/, "/api")
        }
      }
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
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
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pbnN0cmF0b3JcXFxcRGVza3RvcFxcXFxwcm9qZWN0XFxcXHN0dWR5LWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQWRtaW5zdHJhdG9yXFxcXERlc2t0b3BcXFxccHJvamVjdFxcXFxzdHVkeS1hcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0FkbWluc3RyYXRvci9EZXNrdG9wL3Byb2plY3Qvc3R1ZHktYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnOyAvL1x1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NXZ1ZVx1NTQ4Q3Z1ZS1yb3V0ZXJcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJzsgLy9cdTYyNTNcdTUzMDVcdTUyMDZcdTY3OTBcbmltcG9ydCB7IGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJztcbmNvbnN0IHBhdGhTcmMgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyk7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpO1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpO1xuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInXSwgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1dnVlXHU1NDhDdnVlLXJvdXRlclx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFxuICAgICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLCAvLyBcdTc1MUZcdTYyMTAgYGF1dG8taW1wb3J0LmQudHNgIFx1NTE2OFx1NUM0MFx1NThGMFx1NjYwRVxuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLCAvL2VsZW1lbnQtcGx1c1x1ODFFQVx1NTJBOFx1NUYxNVx1NTE2NVxuICAgICAgfSksXG4gICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcih7XG4gICAgICAgICAgICBpbXBvcnRTdHlsZTogJ3Nhc3MnLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgICBkdHM6ICdzcmMvY29tcG9uZW50cy5kLnRzJyxcbiAgICAgIH0pLFxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvc3ZnSWNvbnMnKV0sXG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QXN5bWJvbElkXHU2ODNDXHU1RjBGXG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgICAgfSksXG4gICAgICAvLyB2aXN1YWxpemVyKHtcbiAgICAgIC8vICAgZW1pdEZpbGU6IHRydWUsIC8vXHU2NjJGXHU1NDI2XHU4OEFCXHU4OUU2XHU2NDc4XG4gICAgICAvLyAgIGZpbGVuYW1lOiAndmlzdWFsaXplci5odG1sJywgLy9cdTc1MUZcdTYyMTBcdTUyMDZcdTY3OTBcdTdGNTFcdTk4NzVcdTY1ODdcdTRFRjZcdTU0MERcbiAgICAgIC8vICAgb3BlbjogdHJ1ZSwgLy9cdTU3MjhcdTlFRDhcdThCQTRcdTc1MjhcdTYyMzdcdTRFRTNcdTc0MDZcdTRFMkRcdTYyNTNcdTVGMDBcdTc1MUZcdTYyMTBcdTc2ODRcdTY1ODdcdTRFRjZcbiAgICAgIC8vICAgZ3ppcFNpemU6IGZhbHNlLCAvL1x1NEVDRVx1NkU5MFx1NEVFM1x1NzgwMVx1NEUyRFx1NjUzNlx1OTZDNiBnemlwIFx1NTkyN1x1NUMwRlx1NUU3Nlx1NUMwNlx1NTE3Nlx1NjYzRVx1NzkzQVx1NTcyOFx1NTZGRVx1ODg2OFx1NEUyRFxuICAgICAgLy8gICBicm90bGlTaXplOiB0cnVlLCAvL1x1NEVDRVx1NkU5MFx1NEVFM1x1NzgwMVx1NEUyRFx1NjUzNlx1OTZDNiBicm90bGkgXHU1OTI3XHU1QzBGXHU1RTc2XHU1QzA2XHU1MTc2XHU2NjNFXHU3OTNBXHU1NzI4XHU1NkZFXHU4ODY4XHU0RTJEXG4gICAgICAvLyB9KSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdALyc6IGAke3BhdGhTcmN9L2AsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJAL3N0eWxlcy9lbGVtZW50L2luZGV4LnNjc3NcIiBhcyAqO2AsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgYmFzZTogJy4vJyxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDMwMDAsIC8vIFx1NjcwRFx1NTJBMVx1N0FFRlx1NTNFM1x1NTNGN1xuICAgICAgb3BlbjogdHJ1ZSwgLy8gXHU2NzBEXHU1MkExXHU1NDJGXHU1MkE4XHU2NUY2XHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU2RDRGXHU4OUM4XHU1NjY4XG4gICAgICBjb3JzOiB0cnVlLCAvLyBcdTUxNDFcdThCQjhcdThERThcdTU3REZcbiAgICAgIHByb3h5OiB7XG4gICAgICAgICcvYXBpJzoge1xuICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfQkFTRV9BUEksXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHNlY3VyZTogZmFsc2UsIC8vIFx1NTk4Mlx1Njc5Q1x1NjYyRmh0dHBzXHU2M0E1XHU1M0UzXHVGRjBDXHU5NzAwXHU4OTgxXHU5MTREXHU3RjZFXHU4RkQ5XHU0RTJBXHU1M0MyXHU2NTcwXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcbiAgICAgICAgfSxcbiAgICAgICAgJy9tdXNpY19hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9tdXNpYy4xNjMuY29tJyxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgc2VjdXJlOiBmYWxzZSwgLy8gXHU1OTgyXHU2NzlDXHU2NjJGaHR0cHNcdTYzQTVcdTUzRTNcdUZGMENcdTk3MDBcdTg5ODFcdTkxNERcdTdGNkVcdThGRDlcdTRFMkFcdTUzQzJcdTY1NzBcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvbXVzaWNfYXBpLywgJy9hcGknKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgICBtaW5pZnk6ICdlc2J1aWxkJyxcbiAgICAgIC8vIGVzYnVpbGQgXHU2MjUzXHU1MzA1XHU2NkY0XHU1RkVCXHVGRjBDXHU0RjQ2XHU2NjJGXHU0RTBEXHU4MEZEXHU1M0JCXHU5NjY0IGNvbnNvbGUubG9nXHVGRjBDdGVyc2VyXHU2MjUzXHU1MzA1XHU2MTYyXHVGRjBDXHU0RjQ2XHU4MEZEXHU1M0JCXHU5NjY0IGNvbnNvbGUubG9nXG4gICAgICAvLyBtaW5pZnk6IFwidGVyc2VyXCIsXG4gICAgICAvLyB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICAvLyBcdGNvbXByZXNzOiB7XG4gICAgICAvLyBcdFx0ZHJvcF9jb25zb2xlOiB2aXRlRW52LlZJVEVfRFJPUF9DT05TT0xFLFxuICAgICAgLy8gXHRcdGRyb3BfZGVidWdnZXI6IHRydWVcbiAgICAgIC8vIFx0fVxuICAgICAgLy8gfSxcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTUwMCxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgLy8gU3RhdGljIHJlc291cmNlIGNsYXNzaWZpY2F0aW9uIGFuZCBwYWNrYWdpbmdcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pO1xu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
