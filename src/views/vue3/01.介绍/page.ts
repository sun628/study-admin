const page = import.meta.glob('./**', { eager: true });

console.log(page, 2222);

export default {
	keepAlive: true,
	requiresAuth: true,
	title: '01.介绍',
	key: '/vue3/01',
};
