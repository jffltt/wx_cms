<template>
	<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
		<el-tab-pane label="网站基本信息" name="info"></el-tab-pane>
		<el-tab-pane label="文章分类管理" name="articleclass"></el-tab-pane>
		<el-tab-pane label="文章管理" name="article">
			<article-manage v-if="activeName==='article'"></article-manage>
		</el-tab-pane>
		<el-tab-pane label="网站栏目管理" name="column"></el-tab-pane>
	</el-tabs>
</template>

<script>
	import ArticleManage from './article-manage.vue'
	export default {
		components: {ArticleManage},
		data() {
			return {
				activeName: "info"
			}
		},
		methods: {
			handleClick() {
				console.log(123)
			}
		}
	}
</script>

<style lang="less" scoped>
	.demo-tabs>.el-tabs__content {
		padding: 32px;
		color: #6b778c;
		font-size: 32px;
		font-weight: 600;
	}
</style>
