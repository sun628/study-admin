# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## 介绍

1. 关于 electron
   项目使用了 electron,需要配置一下环境变量，否则下载会很缓慢,如果需要关闭,需注释掉 vite.config.ts 相关配置
   1. yarn 方式 yarn config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
   2. npm 方式 npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/

## 安装

npm install | yarn (推荐使用 yarn)
