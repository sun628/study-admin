<template>
	<div class="login-container">
		<SwitchDark class="dark" />
		<div class="login-box">
			<div class="login-left">
				<img src="@/assets/images/login_left0.png" alt="login" />
			</div>
			<div class="login-form">
				<div class="login-warp-one"></div>
				<div class="login-warp-two"></div>
				<div class="login-warp">
					<div class="login-logo">
						<img class="login-icon" src="@/assets/images/logo.webp" alt="" />
						<h2 class="logo-text">暖阳</h2>
					</div>
					<LoginForm />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
import SwitchDark from '@/components/switch-dark/index.vue';
import LoginForm from './components/LoginForm.vue';
defineOptions({
	name: 'Login',
});
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
