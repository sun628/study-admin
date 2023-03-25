import { ElMessage } from 'element-plus';

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (code: number, msg: string): void => {
	switch (code) {
		case 400:
			ElMessage.error(msg || `请求参数错误`);
			break;
		case 401:
			ElMessage.error(msg || `授权未通过`);
			break;
		case 406:
			ElMessage.error(msg || `权限认证未通过`);
			break;
		case 500:
			ElMessage.error(msg || `服务器意外错误`);
			break;
		case 501:
			ElMessage.error(msg || `服务器不支持该请求功能`);
			break;
		default:
			ElMessage.error(msg || `后端接口${code}异常`);
			break;
	}
};
