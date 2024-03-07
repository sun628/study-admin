import http from '@/utils/request';

export namespace MusicApi {
	export interface ReqLyric {
		id: number | string;
	}
	export interface ResLyric {
		lyric: string;
	}
	export interface ReqSongUrl {
		id: number | string;
		type: string;
	}
}
/**
 *
 * 获取音乐api接口集合
 * @method getAdminMenu 获取后端动态路由菜单(admin)
 * @method getTestMenu 获取后端动态路由菜单(test)
 */
export const getLyricApi = (params: MusicApi.ReqLyric) => {
	return http.get<MusicApi.ResLyric>(`/music_api/song/media`, params, { Loading: true });
};

// 获取歌曲url
export const getSongUrlApi = (params: MusicApi.ReqSongUrl) => {
	return http.request<{ song_url: string }>({
		url: '/song_api/netease/music/',
		method: 'get',
		params,
		Loading: true,
	});
};
