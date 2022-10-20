<template>
	<div v-bind="$attrs">
		<el-menu active-text-color="#409EFF" class="el-menu-vertical-demo" default-active="0" router>
			<el-menu-item route="home" index="0">
				<el-icon>
					<icon-menu />
				</el-icon>
				<span>文章列表</span>
			</el-menu-item>
			<el-menu-item route="wechat_account" index="1">
				<el-icon>
					<setting />
				</el-icon>
				<span>公众号管理</span>
			</el-menu-item>
			<el-menu-item route="about" index="2">
				<el-icon>
					<document />
				</el-icon>
				<span>自定义菜单</span>
			</el-menu-item>
			<el-menu-item route="site_manage" index="3">
				<el-icon>
					<setting />
				</el-icon>
				<span>网站内容管理</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	import {
		Document,
		Menu as IconMenu,
		Setting,
	} from '@element-plus/icons-vue';
	export default {
		components: {
			Document,
			IconMenu,
			Setting
		},
		data() {
			return {

			}
		}
	}
</script>
<style lang="less" scoped>
	.el-menu-vertical-demo {
		border: none;
	}
</style>
