<template>
	<el-dropdown trigger="click">
		<div class="avatar">
			<img src="@/assets/images/avatar.gif" alt="avatar" />
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="openDialog('infoRef')">
					<el-icon><User /></el-icon>
					<span>个人信息</span>
				</el-dropdown-item>
				<el-dropdown-item @click="openDialog('passwordRef')">
					<el-icon><Edit /></el-icon>
					<span>修改密码</span>
				</el-dropdown-item>
				<el-dropdown-item divided @click="logout">
					<el-icon><SwitchButton /></el-icon>
					<span>退出登录</span>
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
	<!-- infoDialog -->
	<InfoDialog ref="infoRef"></InfoDialog>
	<!-- passwordDialog -->
	<PasswordDialog ref="passwordRef"></PasswordDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InfoDialog from './InfoDialog.vue';
import PasswordDialog from './PasswordDialog.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';

const router = useRouter();
const userStore = useUserStore();

// 退出登录
const logout = () => {
	ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(() => {
		router.push({ name: 'login' });
		userStore.setToken('');
		ElMessage({
			type: 'success',
			message: '退出登录成功！',
		});
	});
};

interface DialogExpose {
	openDialog: () => void;
}
const infoRef = ref<null | DialogExpose>(null);
const passwordRef = ref<null | DialogExpose>(null);
// 打开修改密码和个人信息弹窗
const openDialog = (refName: string) => {
	if (refName == 'infoRef') return infoRef.value?.openDialog();
	passwordRef.value?.openDialog();
};
</script>

<style scoped lang="scss">
.avatar {
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 50%;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
