const page = import.meta.glob('./**', { eager: true });

export default {
	keepAlive: true,
	requiresAuth: true,
	title: '01.介绍',
	key: '/vue3/01',
};
