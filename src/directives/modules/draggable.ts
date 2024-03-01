/*
	需求：实现一个拖拽指令，可在父元素区域任意拖拽元素。

	思路：
		1、设置需要拖拽的元素为absolute，其父元素为relative。
		2、鼠标按下(onmousedown)时记录目标元素当前的 left 和 top 值。
		3、鼠标移动(onmousemove)时计算每次移动的横向距离和纵向距离的变化值，并改变元素的 left 和 top 值
		4、鼠标松开(onmouseup)时完成一次拖拽

	使用：在 Dom 上加上 v-draggable 即可
	<div class="dialog-model" v-draggable></div>
*/
import { Directive } from 'vue';

interface DraggableOptions {
	restrict?: boolean; // 新增配置项，用于控制是否限制移动区域
}

const draggable: Directive = {
	mounted(el: HTMLElement, binding) {
		const options: DraggableOptions = binding.value || {};
		const { restrict = true } = options; // 默认限制移动区域
		console.log('🚀 ~ mounted ~ restrict:', restrict);

		el.style.cursor = 'move';
		// el.style.position = 'absolute';

		el.onmousedown = function (e) {
			const parentNode = el.parentNode as HTMLElement;
			if (!parentNode) {
				console.warn("Draggable element's parent node is null.");
				return; // 提前退出，不执行拖动逻辑
			}
			const disX = e.pageX - el.offsetLeft;
			const disY = e.pageY - el.offsetTop;

			document.onmousemove = function (e) {
				let x = e.pageX - disX;
				let y = e.pageY - disY;

				if (restrict) {
					// 仅在限制区域移动时执行
					const maxX = parentNode.offsetWidth - el.offsetWidth;
					const maxY = parentNode.offsetHeight - el.offsetHeight;

					x = Math.max(0, Math.min(x, maxX));
					y = Math.max(0, Math.min(y, maxY));
				}

				el.style.left = `${x}px`;
				el.style.top = `${y}px`;
			};

			document.onmouseup = function () {
				document.onmousemove = document.onmouseup = null;
			};
		};
	},
	unmounted(el) {
		// 清理操作，移除事件监听
		el.onmousedown = null;
	},
};

export default draggable;
