<template>
	<el-row>
		<doc title="介绍">
			<p>Node.js® 是一个开源、跨平台的 JavaScript 运行时环境。</p>
			<h2>npm</h2>
			<p>
				npm（全称 Node Package Manager）是 Node.js 的包管理工具，它是一个基于命令行的工具，用于帮助开发者在自己的项目中安装、升级、移除和管理依赖项。
			</p>
			<h2 class="mt-3">npm 命令</h2>
			<el-card>
				<ul>
					<li v-for="(item, index) in npmCommands" :key="index" class="mb-2">
						{{ formatNumber(index + 1) }}. <el-tag class="ml-2" type="danger">{{ item.command }}</el-tag>
						<span>：{{ item.desc }}</span>
					</li>
				</ul>
			</el-card>
			<h2 class="mt-3">Package json</h2>
			<p>执行npm init 便可以初始化一个package.json</p>
			<el-card>
				<ul>
					<li v-for="(item, index) in projectInfo" :key="index" class="mb-2">
						{{ formatNumber(index + 1) }}. <el-tag class="ml-2" type="danger">{{ item.command }}</el-tag>
						<span>：{{ item.desc }}</span>
					</li>
				</ul>
			</el-card>
		</doc>
	</el-row>
</template>
<script setup lang="ts">
// 数字补0
function formatNumber(number: number) {
	return String(number).padStart(2, '0');
}
// npm命令列表
const npmCommands = [
	{
		command: 'npm init',
		desc: '初始化一个新的 npm 项目，创建 package.json 文件。',
	},
	{
		command: 'npm install',
		desc: '安装一个包或一组包，并且会在当前目录存放一个 node_modules。',
	},
	{
		command: 'npm install <package-name>',
		desc: '安装指定的包。',
	},
	{
		command: 'npm install <package-name> --save',
		desc: '安装指定的包，并将其添加到 package.json 文件中的依赖列表中。',
	},
	{
		command: 'npm install <package-name> --save-dev',
		desc: '安装指定的包，并将其添加到 package.json 文件中的开发依赖列表中。',
	},
	{
		command: 'npm install -g <package-name>',
		desc: '全局安装指定的包。',
	},
	{
		command: 'npm update <package-name>',
		desc: '更新指定的包。',
	},
	{
		command: 'npm uninstall <package-name>',
		desc: '卸载指定的包。',
	},
	{
		command: 'npm run <script-name>',
		desc: '执行 package.json 文件中定义的脚本命令。',
	},
	{
		command: 'npm search <keyword>',
		desc: '搜索 npm 库中包含指定关键字的包。',
	},
	{
		command: 'npm info <package-name>',
		desc: '查看指定包的详细信息。',
	},
	{
		command: 'npm list',
		desc: '列出当前项目中安装的所有包。',
	},
	{
		command: 'npm outdated',
		desc: '列出当前项目中需要更新的包。',
	},
	{
		command: 'npm audit',
		desc: '检查当前项目中的依赖项是否存在安全漏洞。',
	},
	{
		command: 'npm publish',
		desc: '发布自己开发的包到 npm 库中。',
	},
	{
		command: 'npm login',
		desc: '登录到 npm 账户。',
	},
	{
		command: 'npm logout',
		desc: '注销当前 npm 账户。',
	},
	{
		command: 'npm link',
		desc: '将本地模块链接到全局的 node_modules 目录下。',
	},
	{
		command: 'npm config list',
		desc: '列出所有的 npm 配置信息。执行该命令可以查看当前系统和用户级别的所有 npm 配置信息，以及当前项目的配置信息（如果在项目目录下执行该命令）。',
	},
	{
		command: 'npm get registry',
		desc: '获取当前 npm 配置中的 registry 配置项的值。registry 配置项用于指定 npm 包的下载地址，如果未指定，则默认使用 npm 官方的包注册表地址。',
	},
	{
		command: 'npm set registry <registry-url>',
		desc: '将 registry 配置项的值修改为指定的 <registry-url> 地址。',
	},
];

const projectInfo = [
	{ command: 'name', desc: '项目名称，必须是唯一的字符串，通常采用小写字母和连字符的组合。' },
	{ command: 'version', desc: '项目版本号，通常采用语义化版本号规范。' },
	{ command: 'description', desc: '项目描述。' },
	{ command: 'main', desc: '项目的主入口文件路径，通常是一个 JavaScript 文件。' },
	{ command: 'keywords', desc: '项目的关键字列表，方便他人搜索和发现该项目。' },
	{ command: 'author', desc: '项目作者的信息，包括姓名、邮箱、网址等。' },
	{ command: 'license', desc: '项目的许可证类型，可以是自定义的许可证类型或者常见的开源许可证（如 MIT、Apache 等）。' },
	{ command: 'dependencies', desc: '项目所依赖的包的列表，这些包会在项目运行时自动安装。' },
	{ command: 'devDependencies', desc: '项目开发过程中所需要的包的列表，这些包不会随项目一起发布，而是只在开发时使用。' },
	{ command: 'peerDependencies', desc: '项目的同级依赖，即项目所需要的模块被其他模块所依赖。' },
	{ command: 'scripts', desc: '定义了一些脚本命令，比如启动项目、运行测试等。' },
	{ command: 'repository', desc: '项目代码仓库的信息，包括类型、网址等。' },
	{ command: 'bugs', desc: '项目的 bug 报告地址。' },
	{ command: 'homepage', desc: '项目的官方网站地址或者文档地址。' },
];
</script>

<style scoped lang="scss"></style>
