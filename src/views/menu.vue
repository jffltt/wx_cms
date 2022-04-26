<template>
	<div v-bind="$attrs">
		<el-menu active-text-color="#404be6" class="el-menu-vertical-demo" default-active="2" router>
			<el-menu-item route="home" index="0">
				<el-icon>
					<icon-menu />
				</el-icon>
				<span>Navigator Two</span>
			</el-menu-item>
			<el-menu-item route="about" index="1">
				<el-icon>
					<document />
				</el-icon>
				<span>Navigator Three</span>
			</el-menu-item>
			<el-menu-item route="setting" index="2">
				<el-icon>
					<setting />
				</el-icon>
				<span>Navigator Four</span>
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
	.el-menu-vertical-demo{
		border: none;
	}
</style>
