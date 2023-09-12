import http from '@/utils/request';

export namespace MusicApi {
	export interface ReqLyric {
		id: number | string;
	}
	export interface ResLyric {
		lyric: string;
	}
}
/**
 *
 * 获取音乐api接口集合
 * @method getAdminMenu 获取后端动态路由菜单(admin)
 * @method getTestMenu 获取后端动态路由菜单(test)
 */
export const getLyricApi = (params: MusicApi.ReqLyric) => {
	return http.get<MusicApi.ResLyric>(`/music_api/song/media`, params);
};
