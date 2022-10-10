<template>
	<div class="home">
		<div class="header">


			<span class="company">镇江市行业老干部管理服务办公室</span>
			<el-dropdown class="lf-right">
				<span>Admin</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>个人中心</el-dropdown-item>
						<el-dropdown-item>修改密码</el-dropdown-item>


						<el-dropdown-item @click="exit" divided>退出</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<div class="wap">
			<Menu class="menu"></Menu>
			<div class="content">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
	import Menu from "./menu.vue";
	export default {
		components: {
			Menu
		},
		data() {
			return {
				circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
			}
		},
		methods: {
			exit() {
				localStorage.removeItem("account");
				this.$router.push("/login");
			}
		}
	}
</script>
<style scoped lang="less">
	.home {
		width: 100vw;
		height: 100vh;
		background-color: #ffffff;

		.header {
			width: 100vw;
			height: 45px;
			background-color: #000000;
			.company{
				display: inline;
				float: left;
				margin-left: 10px;
				line-height: 45px;
				color: #409EFF;
				font-size: 20px;
				font-weight: 800;
			}
			.lf-right{
				float: right;
				height: 30px;
				line-height: 30px;
				margin: 7.5px 10px;
				color: #ffffff;
				cursor: pointer;
			}
		}

		.wap {
			width: 100vw;
			height: calc(100vh - 45px);

			.menu {
				width: 210px;
				height: calc(100vh - 65px);
				background-color: #ffffff;
				padding: 0 5px;
				float: left;
				box-shadow: 0 0 5px 2px #dfdfdf;
				margin: 8px 5px;
			}

			.content {
				width: calc(100vw - 260px);
				height: calc(100vh - 85px);
				background-color: #fff;
				margin: 8px 5px;
				padding: 10px;
				box-shadow: 0 0 5px 2px #dfdfdf;
				float: left;
			}
		}
	}
	.example-showcase .el-dropdown-link {
		cursor: pointer;
		color: var(--el-color-primary);
		display: flex;
		align-items: center;
	}
</style>
