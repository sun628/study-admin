<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" placeholder="用户名：admin / user">
				<template #prefix>
					<el-icon class="el-input__icon"><user /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input v-model="loginForm.password" type="password" placeholder="密码：123456" show-password autocomplete="new-password">
				<template #prefix>
					<el-icon class="el-input__icon"><lock /></el-icon>
				</template>
			</el-input>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)"> 重置 </el-button>
		<el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="login(loginFormRef)"> 登录 </el-button>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { CircleClose, UserFilled } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { useUserStore } from '@/store/modules/user';

import { TabsStore } from '@/store/modules/tabs';
import { getTimeState } from '@/utils/util';
import { HOME_URL } from '@/config';
import type { ElForm } from 'element-plus';
import { onKeyStroke } from '@vueuse/core';

const userStore = useUserStore();
const tabStore = TabsStore();

// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

// 登录表单数据
const loginForm = reactive({
	username: 'admin',
	password: '123456',
});

const loading = ref(false);
const router = useRouter();

// login
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (!valid) return;
		userStore.setToken('123456');
		loading.value = true;
		router.push({ path: HOME_URL });
		setTimeout(() => {
			ElNotification({
				title: getTimeState(),
				message: '欢迎登录 暖阳',
				type: 'success',
				duration: 3000,
			});
			loading.value = false;
		}, 1000);
		tabStore.closeMultipleTab();
	});
};
onKeyStroke('Enter', (e) => {
	e.preventDefault();
	login(loginFormRef.value);
});
// resetForm
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

onMounted(() => {
	// 监听enter事件（调用登录）
	document.onkeydown = (e: any) => {
		e = window.event || e;
		if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
			if (loading.value) return;
			login(loginFormRef.value);
		}
	};
});
</script>

<style scoped lang="scss">
@import '../index.scss';
</style>
