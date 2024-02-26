/**
 * @method v-copy
 * @description 复制某个值至剪贴板
 * @param {string | number} value - 需要复制的值
 * @example  <div v-copy="value"></div>
 *
 */
import type { Directive, DirectiveBinding } from 'vue';
import { ElMessage } from 'element-plus';
interface ElType extends HTMLElement {
	copyData: string | number;
	__handleClick__: (event: MouseEvent) => void;
}
const copy: Directive = {
	mounted(el: ElType, binding: DirectiveBinding) {
		//获取代码片段 判断是否有highlight
		const hljs = el.querySelector('code.hljs');
		//给highlight添加复制按钮
		if (hljs) {
			hljs.innerHTML = `<button title="Copy Code" class="copy">复制</button><span class="code">${hljs.innerHTML}</span>`;
			//获取复制按钮
			const copyBtn = el.querySelector('.copy') as ElType;
			copyBtn.copyData = binding.value;
			//给复制按钮添加点击事件
			copyBtn.addEventListener('click', handleClick);
		} else {
			el.copyData = binding.value;
			el.addEventListener('click', handleClick);
		}
	},
	updated(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value;
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener('click', el.__handleClick__);
	},
};

function handleClick(this: ElType) {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(this.copyData.toLocaleString());
		// .then(() => {
		// 	this.innerHTML = '复制成功';
		// });
	} else {
		const input = document.createElement('input');
		input.value = this.copyData.toLocaleString();
		document.body.appendChild(input);
		input.select();
		document.execCommand('Copy');
		document.body.removeChild(input);
		// this.innerHTML = '复制成功';
	}
	setTimeout(() => {
		this.innerHTML = '复制';
	}, 1500);
	ElMessage({
		type: 'success',
		message: '复制成功',
	});
}

export default copy;
