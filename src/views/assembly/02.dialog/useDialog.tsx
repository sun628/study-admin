import { ElButton } from 'element-plus';

const MessageBox = {
	props: {
		title: String,
		msg: {
			type: String,
			default: 'Are you sure?',
			required: true,
		},
	},
	render(ctx) {
		const { $props, $emit } = ctx;
		console.log('🚀 ~ render ~  $props:', $props);
		return (
			// margin:auto; 使其居中
			// <div class="modal  bg-green-400">
			<div class="modal bg-white m-auto p-3 w-xl">
				<div class="modal-title">
					<h2>{$props.title}</h2>
				</div>
				<div class="modal-content">
					<p>{$props.msg}</p>
				</div>
				<div class="footer flex-center">
					<ElButton type="primary" onClick={$emit('onClick')}>
						关闭
					</ElButton>
				</div>
			</div>
		);
	},
};

export default function useDialog(content, clickHandler) {
	const app = createApp(MessageBox, {
		...content,
		onclick() {
			clickHandler &&
				clickHandler(() => {
					app.unmount();
					div.remove();
				});
		},
	});
	const div = document.createElement('div');
	// 给div加类名
	div.className = 'modal-mask w-full h-full bg-black bg-opacity-50 pos-fixed top-0 left-0 z-50 flex justify-center items-center';
	document.body.appendChild(div);
	app.mount(div);
}
