/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
import type { Directive, DirectiveBinding } from 'vue';
import { ElMessage } from 'element-plus';
interface ElType extends HTMLElement {
	copyData: string | number;
	__handleClick__: any;
}
const copy: Directive = {
	mounted(el: ElType, binding: DirectiveBinding) {
		//获取代码片段
		const code = el.querySelector('code.hljs');
		//给code添加复制按钮
		if (code) {
			code.innerHTML = `<button title="Copy Code" class="copy">复制</button><span class="code">${code.innerHTML}</span>`;
			//获取复制按钮
			const copyBtn = el.querySelector('.copy') as ElType;
			copyBtn.copyData = binding.value;
			//给复制按钮添加点击事件
			copyBtn.addEventListener('click', handleClick);
		}

		// el.copyData = binding.value;
		// el.addEventListener('click', handleClick);
	},
	updated(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value;
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener('click', el.__handleClick__);
	},
};

function handleClick(this: any) {
	const input = document.createElement('input');
	input.value = this.copyData.toLocaleString();
	document.body.appendChild(input);
	input.select();
	document.execCommand('Copy');
	document.body.removeChild(input);
	this.innerHTML = '复制成功';
	setTimeout(() => {
		this.innerHTML = '复制';
	}, 1500);
	ElMessage({
		type: 'success',
		message: '复制成功',
	});
}

export default copy;
