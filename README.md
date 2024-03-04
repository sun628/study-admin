# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## 安装

npm install pnpm -g

pnpm install

pnpm dev




# 代码提交类型指南

- **提交格式：**
git commit -m <type>[optional scope]: <description> //注意冒号后面有空格
- type：提交的改动类型（如新增、修改、更新等）
- optional scope：标识此次提交主要涉及到代码中哪个模块
- description：一句话描述此次提交的主要内容


- **类型：**

- `feat`：新增功能。当我们引入新的功能时使用此类型。
```
git commit -m 'feat: 增加xxx功能'
```

- `fix`：修复bug。用于修正项目中的bug。
```
git commit -m 'fix: 修复xxx功能'
```

- `style`：不影响程序逻辑的代码修改。这包括修改空白字符、补全缺失的分号等。
```
git commit -m 'style: 调整格式，优化阅读体验'
```

- `refactor`：重构代码。这意味着既没有新增功能，也没有修复bug的代码重构。
```
git commit -m 'refactor: 代码结构调整'
```

- `docs`：文档更新。用于描述对文档的添加或修改。
```
git commit -m 'docs: 更新README文档'
```

- `test`：增加测试。当我们为代码添加新的测试或修改现有测试时使用。
```
git commit -m 'test: 添加新的单元测试'
```

- `chore`：构建过程或辅助工具的变动。这通常指的是对构建流程或辅助工具做出的改变。
```
git commit -m 'chore: 更新构建脚本'
```

请按照以上指南进行代码提交，以确保我们的项目管理更加规范和高效。


- **commit：**
```text
# 提交代码（提交前会自动执行 lint:lint-staged 命令）
npm run commit
```
