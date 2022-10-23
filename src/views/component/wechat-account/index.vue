<template>
	<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
		<el-tab-pane label="素材管理" name="material">
			<MaterialManage v-if="activeName === 'material'"></MaterialManage>
		</el-tab-pane>
		<el-tab-pane label="草稿管理" name="draft">
			<DraftManage v-if="activeName === 'draft'"></DraftManage>
		</el-tab-pane>
		<el-tab-pane label="已发布文章" name="publishArticle">
			<PublishArticle v-if="activeName === 'publishArticle'"></PublishArticle>
		</el-tab-pane>
		<el-tab-pane label="自定义菜单" name="custommenu">
			<menu-manage v-if="activeName === 'custommenu'"></menu-manage>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	import MaterialManage from './material-manage.vue';
	import DraftManage from './draft-manage.vue';
	import PublishArticle from './publish-article.vue';
	import MenuManage from './menu-manage.vue';
	export default {
		components: {MaterialManage, DraftManage, PublishArticle, MenuManage },
		data() {
			return {
				activeName: "material"
			}
		},
		methods: {
			handleClick() {
				
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
