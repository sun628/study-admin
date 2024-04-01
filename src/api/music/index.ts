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
	return http.get<MusicApi.ResLyric>(`/song/media`, params, { server_name: 'music_server', loading: true });
};

// 获取歌曲url
export const getSongUrlApi = (params: MusicApi.ReqSongUrl) => {
	return http.request<{ song_url: string }>({
		url: '/api/netease/music/',
		method: 'get',
		params,
		loading: true,
		server_name: 'music_server',
	});
};
