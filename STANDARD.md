# 项目规范文档 📚

## 一、项目文件、组件命名规范

> **完全采用 Vue 官方推荐的风格指南，请务必查看 💢**
>
> **Link（v3）：** https://cn.vuejs.org/style-guide/
>
> **Link（v2）：** https://v2.cn.vuejs.org/v2/style-guide/#

## 二、代码格式化工具（Prettier）

### 1、下载安装 prettier：

```text
npm install prettier
```

### 2、安装 Vscode 插件（Prettier）：

### 3、配置 Prettier：

```javascript
// @see: https://www.prettier.cn

module.exports = {
	// 超过最大值换行
	printWidth: 130,
	// 缩进字节数
	tabWidth: 2,
	// 使用制表符而不是空格缩进行
	useTabs: true,
	// 结尾不用分号(true有，false没有)
	semi: true,
	// 使用单引号(true单双引号，false双引号)
	singleQuote: false,
	// 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
	quoteProps: "as-needed",
	// 在对象，数组括号与文字之间加空格 "{ foo: bar }"
	bracketSpacing: true,
	// 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
	trailingComma: "none",
	// 在JSX中使用单引号而不是双引号
	jsxSingleQuote: false,
	//  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 ,always：不省略括号
	arrowParens: "avoid",
	// 如果文件顶部已经有一个 doclock，这个选项将新建一行注释，并打上@format标记。
	insertPragma: false,
	// 指定要使用的解析器，不需要写文件开头的 @prettier
	requirePragma: false,
	// 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
	proseWrap: "preserve",
	// 在html中空格是否是敏感的 "css" - 遵守CSS显示属性的默认值， "strict" - 空格被认为是敏感的 ，"ignore" - 空格被认为是不敏感的
	htmlWhitespaceSensitivity: "css",
	// 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
	endOfLine: "auto",
	// 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
	rangeStart: 0,
	rangeEnd: Infinity,
	// Vue文件脚本和样式标签缩进
	vueIndentScriptAndStyle: false
};
```

## 三、代码规范工具（ESLint）

### 1、安装 ESLint 相关插件：

```text
npm install eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```

|               依赖               |                               作用描述                               |
| :------------------------------: | :------------------------------------------------------------------: |
|              eslint              |                            ESLint 核心库                             |
|      eslint-config-prettier      |               关掉所有和 Prettier 冲突的 ESLint 的配置               |
|      eslint-plugin-prettier      |         将 Prettier 的 rules 以插件的形式加入到 ESLint 里面          |
|        eslint-plugin-vue         |                      为 Vue 使用 ESlint 的插件                       |
| @typescript-eslint/eslint-plugin |      ESLint 插件，包含了各类定义好的检测 TypeScript 代码的规范       |
|    @typescript-eslint/parser     | ESLint 的解析器，用于解析 TypeScript，从而检查和规范 TypeScript 代码 |

### 2、安装 Vscode 插件（ESLint、TSLint）：

- **ESLint：**


### 3、配置 ESLint：

```javascript
// @see: http://eslint.cn

module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'eslint:recommended', // 使用推荐的eslint
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended', // 使用插件支持vue3
		'plugin:vue/vue3-essential',
		//1.继承.prettierrc.js文件规则2.开启rules的 "prettier/prettier": "error"3.eslint fix的同时执行prettier格式化
		'plugin:prettier/recommended',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'moudule',
		parser: '@typescript-eslint/parser',
	},
	plugins: ['vue'],
	globals: {
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefaults: 'readonly',
		defineOptions: 'readonly',
	},

	overrides: [
		{
			files: ['*.vue'],
			parserOptions: {
				parser: '@typescript-eslint/parser',
				ecmaVersion: 2021,
			},
			extends: ['plugin:vue/vue3-recommended', 'plugin:vue/vue3-essential'],
			rules: {
				// vue (https://eslint.vuejs.org/rules)
				'vue/html-indent': ['error', 'tab'], // enforce tabs in template
				indent: ['error', 'tab'], // enforce tabs in script and js files
				'vue/component-definition-name-casing': ['error', 'PascalCase'], // enforce component definition name casing in template
				'vue/html-self-closing': 'off', // 添加组件命名忽略规则 vue官方默认规则是多单词驼峰来进行组件命名
				'vue/script-setup-uses-vars': 'warn', // 防止<script setup>使用的变量<template>被标记为未使用，此规则仅在启用该no-unused-vars规则时有效。
				'vue/v-slot-style': 'error', // 强制执行 v-slot 指令样式
				'vue/one-component-per-file': 'off', // 强制每个组件都应该在自己的文件中
				'vue/html-closing-bracket-newline': 'off', // 在标签的右括号之前要求或禁止换行
				'vue/max-attributes-per-line': 'off', // 强制每行的最大属性数
				'vue/multiline-html-element-content-newline': 'off', // 在多行元素的内容之前和之后需要换行符
				'vue/singleline-html-element-content-newline': 'off', // 在单行元素的内容之前和之后需要换行符
				'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
				'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
			},
		},
	],
	rules: {
		'no-console': 'off', //生产模式不允许使用log
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', //生产默认不允许使用debugger
		'no-undef': 'off', // 禁止使用未声明的变量
		'no-var': 'warn', // 要求使用 let 或 const 而不是 var
		'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行
		'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
		'prefer-const': 'off', // 此规则旨在标记使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
		'no-irregular-whitespace': 'off', // 禁止不规则的空白
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 禁止定义未使用的变量,忽略下划线开头的变量
		'@typescript-eslint/explicit-module-boundary-types': 'off', // 要求导出函数和类的公共类方法的显式返回和参数类型
		'@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
		'@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'off', // 禁止在可选链表达式上使用非空断言
		'@typescript-eslint/ban-ts-comment': ['off', { 'ts-ignore': false }], // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
		'@typescript-eslint/no-namespace': 'off', // 禁止使用命名空间
	},
};
```

## 四、EditorConfig 配置

### 1、简介

> **EditorConfig** 帮助开发人员在 **不同的编辑器** 和 **IDE** 之间定义和维护一致的编码样式。

### 2、安装 VsCode 插件（EditorConfig ）：


### 3、配置 EditorConfig：

```javascript
# http://editorconfig.org
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
end_of_line = lf # 控制换行类型(lf | cr | crlf)
insert_final_newline = true # 始终在文件末尾插入一个新行
indent_style = tab # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
max_line_length = 130 # 最大行长度

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off # 关闭最大行长度限制
trim_trailing_whitespace = false # 关闭末尾空格修剪
```

## 五、Git 流程规范配置

|              依赖               |                                    作用描述                                    |
| :-----------------------------: | :----------------------------------------------------------------------------: |
|              husky              |           操作 **git** 钩子的工具（在 **git xx** 之前执行某些命令）            |
|           lint-staged           |  在提交之前进行 **eslint** 校验，并使用 **prettier** 格式化本地暂存区的代码，  |
|         @commitlint/cli         |             校验 **git commit** 信息是否符合规范，保证团队的一致性             |
| @commitlint/config-conventional |                             **Anglar** 的提交规范                              |
|           commitizen            | 基于 **Node.js** 的 **git commit** 命令行工具，生成标准化的 **commit message** |
|             cz-git              |    一款工程性更强，轻量级，高度自定义，标准输出格式的 **commitize** 适配器     |

### 1、husky（操作 git 钩子的工具）：

> **安装：**

```text
# https://typicode.github.io/husky/get-started.html
pnpm i husky -D

```

> **使用（为了添加.husky 文件夹）：**

```text
pnpm exec husky init
```

### 2、 lint-staged（本地暂存代码检查工具）

> **安装：**

```text
npm install lint-staged --D
```

> **添加 ESlint Hook（在.husky 文件夹下添加 pre-commit 文件）：**
>
> **作用：通过钩子函数，判断提交的代码是否符合规范，并使用 prettier 格式化代码**

```text
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint:lint-staged

```

> 新增 **lint-staged.config.js** 文件：

```text
module.exports = {
	"*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
	"{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
	"package.json": ["prettier --write"],
	"*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
	"*.{scss,less,styl,html}": ["stylelint --fix", "prettier --write"],
	"*.md": ["prettier --write"]
};
```

### 3、commitlint（commit 信息校验工具，不符合则报错）

> **安装：**

```text
npm i @commitlint/cli @commitlint/config-conventional -D
```

> **配置命令（在.husky 文件夹下添加 commit-msg 文件）：**

```text
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx commitlint --edit "$1"
```

### 4、commitizen（基于 Node.js 的 git commit 命令行工具，生成标准化的 message）

```text
// 安装 commitizen，如此一来可以快速使用 cz 或 git cz 命令进行启动。
npm install commitizen -D
```

### 5、cz-git

> **指定提交文字规范，一款工程性更强，高度自定义，标准输出格式的 commitizen 适配器**
> **需要全局安装**
```text
npm install cz-git -g
```

> **配置 package.json：**

```text
"config": {
  "commitizen": {
    "path": "node_modules/cz-git"
  }
}
```

> **新建 commitlint.config.js 文件：**

```javascript
// @see: https://cz-git.qbenben.com/zh/guide
/** @type {import('cz-git').UserConfig} */

module.exports = {
	ignores: [commit => commit.includes("init")],
	extends: ["@commitlint/config-conventional"],
	rules: {
		// @see: https://commitlint.js.org/#/reference-rules
		"body-leading-blank": [2, "always"],
		"footer-leading-blank": [1, "always"],
		"header-max-length": [2, "always", 108],
		"subject-empty": [2, "never"],
		"type-empty": [2, "never"],
		"subject-case": [0],
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"fix",
				"docs",
				"style",
				"refactor",
				"perf",
				"test",
				"build",
				"ci",
				"chore",
				"revert",
				"wip",
				"workflow",
				"types",
				"release"
			]
		]
	},
	prompt: {
		messages: {
			type: "Select the type of change that you're committing:",
			scope: "Denote the SCOPE of this change (optional):",
			customScope: "Denote the SCOPE of this change:",
			subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
			body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
			breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
			footerPrefixsSelect: "Select the ISSUES type of changeList by this change (optional):",
			customFooterPrefixs: "Input ISSUES prefix:",
			footer: "List any ISSUES by this change. E.g.: #31, #34:\n",
			confirmCommit: "Are you sure you want to proceed with the commit above?"
			// 中文版
			// type: "选择你要提交的类型 :",
			// scope: "选择一个提交范围（可选）:",
			// customScope: "请输入自定义的提交范围 :",
			// subject: "填写简短精炼的变更描述 :\n",
			// body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
			// breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
			// footerPrefixsSelect: "选择关联issue前缀（可选）:",
			// customFooterPrefixs: "输入自定义issue前缀 :",
			// footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
			// confirmCommit: "是否提交或修改commit ?"
		},
		types: [
			{
				value: "feat",
				name: "feat:     🚀  A new feature",
				emoji: "🚀"
			},
			{
				value: "fix",
				name: "fix:      🧩  A bug fix",
				emoji: "🧩"
			},
			{
				value: "docs",
				name: "docs:     📚  Documentation only changes",
				emoji: "📚"
			},
			{
				value: "style",
				name: "style:    🎨  Changes that do not affect the meaning of the code",
				emoji: "🎨"
			},
			{
				value: "refactor",
				name: "refactor: ♻️   A code change that neither fixes a bug nor adds a feature",
				emoji: "♻️"
			},
			{
				value: "perf",
				name: "perf:     ⚡️  A code change that improves performance",
				emoji: "⚡️"
			},
			{
				value: "test",
				name: "test:     ✅  Adding missing tests or correcting existing tests",
				emoji: "✅"
			},
			{
				value: "build",
				name: "build:    📦️   Changes that affect the build system or external dependencies",
				emoji: "📦️"
			},
			{
				value: "ci",
				name: "ci:       🎡  Changes to our CI configuration files and scripts",
				emoji: "🎡"
			},
			{
				value: "chore",
				name: "chore:    🔨  Other changes that don't modify src or test files",
				emoji: "🔨"
			},
			{
				value: "revert",
				name: "revert:   ⏪️  Reverts a previous commit",
				emoji: "⏪️"
			}
			// 中文版
			// { value: "特性", name: "特性:   🚀  新增功能", emoji: "🚀" },
			// { value: "修复", name: "修复:   🧩  修复缺陷", emoji: "🧩" },
			// { value: "文档", name: "文档:   📚  文档变更", emoji: "📚" },
			// { value: "格式", name: "格式:   🎨  代码格式（不影响功能，例如空格、分号等格式修正）", emoji: "🎨" },
			// { value: "重构", name: "重构:   ♻️  代码重构（不包括 bug 修复、功能新增）", emoji: "♻️" },
			// { value: "性能", name: "性能:   ⚡️  性能优化", emoji: "⚡️" },
			// { value: "测试", name: "测试:   ✅  添加疏漏测试或已有测试改动", emoji: "✅" },
			// { value: "构建", name: "构建:   📦️  构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）", emoji: "📦️" },
			// { value: "集成", name: "集成:   🎡  修改 CI 配置、脚本", emoji: "🎡" },
			// { value: "回退", name: "回退:   ⏪️  回滚 commit", emoji: "⏪️" },
			// { value: "其他", name: "其他:   🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）", emoji: "🔨" }
		],
		useEmoji: true,
		themeColorCode: "",
		scopes: [],
		allowCustomScopes: true,
		allowEmptyScopes: true,
		customScopesAlign: "bottom",
		customScopesAlias: "custom",
		emptyScopesAlias: "empty",
		upperCaseSubject: false,
		allowBreakingChanges: ["feat", "fix"],
		breaklineNumber: 100,
		breaklineChar: "|",
		skipQuestions: [],
		issuePrefixs: [{ value: "closed", name: "closed:   ISSUES has been processed" }],
		customIssuePrefixsAlign: "top",
		emptyIssuePrefixsAlias: "skip",
		customIssuePrefixsAlias: "custom",
		allowCustomIssuePrefixs: true,
		allowEmptyIssuePrefixs: true,
		confirmColorize: true,
		maxHeaderLength: Infinity,
		maxSubjectLength: Infinity,
		minSubjectLength: 0,
		scopeOverrides: undefined,
		defaultBody: "",
		defaultIssues: "",
		defaultScope: "",
		defaultSubject: ""
	}
};
```
- **commit：**
```text
# 提交代码（提交前会自动执行 lint:lint-staged 命令）
npm run commit
```

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

