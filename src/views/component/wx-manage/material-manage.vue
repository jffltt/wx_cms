<template>
	<div>
		<div class="page-top">
			<el-button  type="primary" :icon="Edit">添加</el-button>
		</div>
		<div class="page-content">
			<el-table :data="list">
				<el-table-column label="ID" prop="id"></el-table-column>
				<el-table-column label="预览"></el-table-column>
				<el-table-column label="链接"></el-table-column>
				<el-table-column label="操作" width="260px" fixed="right" align="center">
					<template #default>
						<el-button size="small" type="primary">查看</el-button>
						<el-button size="small">删除</el-button>
						<el-button size="small">复制url</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return{
				list: [1,1,1,1,1,1,1]
			}
		}
	}
</script>

<style lang="less" scoped>
</style>