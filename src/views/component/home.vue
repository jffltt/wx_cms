<template>
	<div>
		<el-table :data="list" height="80vh" v-loading = "loading">
			<el-table-column prop="title" label="标题" min-width="300"></el-table-column>
			<el-table-column prop="reg_date" label="发布日期"></el-table-column>
			<el-table-column label="分类">
				<template #default="{row}">
					<span>{{columnMap[row.article_class_id]}}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template #header>
					<button>5234</button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import request from '../../api/request.js'
	export default {
		data() {
			return {
				list: [],
				loading: true,
				columnMap: {}
			}
		},
		created() {
			this.getArticleTypes().then(res => {
				if(res === 'success') {
					this.getList()
				}
			})
		},
		methods: {
			getList() {
				request.get("/api/article_list").then(res => {
					this.list = res.data
					this.loading = false
				})
			},
			
			getArticleTypes() {
				return new Promise((resolve, reject) => {
					request.get('/api/article_types').then(res => {
						res.data.forEach(val => {
							this.columnMap[val.id] = val.clumn_name
						})
						resolve('success')
					}).catch(() => {
						this.$message.warning("获取分类失败")
						reject('error')
					})
				})
			}
		}
	}
</script>

<style>
</style>