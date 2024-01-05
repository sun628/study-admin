type ProgressType = (value: number) => void;

type AnimationParams = {
	duration?: number;
	from?: number;
	to: number;
};

/**
 * @description 实现数字动画效果
 * @returns {Object} { start, stop }
 * @param {Function} start 开始动画
 * @param {Function} stop 停止动画
 * @param {Object} params 动画参数
 * @param {Number} params.duration 动画时长 默认600ms
 * @param {Number} params.from 动画开始值 默认0
 * @param {Number} params.to 动画结束值
 * @param {Function} onProgress 动画过程回调
 * @example
 * const { start, stop } = useDigitalAnimation();
 * start({ duration: 600, from: 0, to: 100 }, (value) => {
 *  console.log(value);
 * });
 **/
export function useDigitalAnimation() {
	let stop: (() => void) | null = null;

	function animateProgress({ duration = 600, from = 0, to }: AnimationParams, onProgress?: ProgressType) {
		if (to === undefined) {
			throw new Error('The "to" parameter is required');
		}
		const startTime = Date.now();
		let animationId: number | null = null;

		function _run() {
			const now = Date.now();
			const time = now - startTime;
			const progress = Math.min(1, time / duration);
			const value = from + (to - from) * progress;
			onProgress && onProgress(value);
			if (progress < 1) {
				animationId = requestAnimationFrame(_run);
			}
		}
		_run();

		return function stop() {
			if (animationId) {
				cancelAnimationFrame(animationId);
				animationId = null;
			}
		};
	}

	function startAnimation(params: AnimationParams, onProgress?: ProgressType) {
		stop = animateProgress(params, onProgress);
	}

	function stopAnimation() {
		stop && stop();
	}

	return { startAnimation, stopAnimation };
}
