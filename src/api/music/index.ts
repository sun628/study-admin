import request from '@/utils/request';

/**
 *
 * （不建议写成 request.post(xxx)，因为这样 post 时，无法 params 与 data 同时传参）
 * 获取音乐api接口集合
 * @method getAdminMenu 获取后端动态路由菜单(admin)
 * @method getTestMenu 获取后端动态路由菜单(test)
 */
export function useMusicApi() {
	return {
		getsongListApi: (id?: number) => {
			return request({
				url: `/music_api/song/lyric?id=${id}&lv=1&kv=1&tv=-1`,
				method: 'get',
			});
		},
	};
}
