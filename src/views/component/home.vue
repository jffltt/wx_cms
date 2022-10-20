<template>
	<div v-bind="$attrs">
		<div class="toolBar">
			<el-button class="tool-item" size="small" type="primary" @click="activeClassBox">批量归类</el-button>
			<el-button class="tool-item" size="small" auto-insert-space type="primary" @click="activeClassBox">导出excel</el-button>
		</div>
		<el-table :data="list" height="76vh" v-loading="loading" stripe border @selection-change="selecteArticle" ref="articleTabel">
			<el-table-column type="selection" width="55" align="center" fixed="left" />
			<el-table-column width="600">
				<template #header>
					<span class="label">标题</span>
					<StringFilter class="label-icon" v-model:keyWord = "search.title"></StringFilter>
				</template>
				<template #default="{row}">
					<el-tooltip effect="light" :content="row.title" placement="top">
						<span class="label-text">{{row.title}}</span>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column width="200">
				<template #header>
					<span class="label">分类</span>
					<ListFilter class="label-icon" :list="classList" v-model:checkList = "search.classList"></ListFilter>
				</template>
				<template #default="{ row }">
					<span>{{ columnMap[row.article_class_id] }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="sort" label="排序权重" width="150" align="center"></el-table-column>
			<el-table-column width="200">
				<template #header>
					<span class="label">发布日期</span>
					<DateFilter class="label-icon" v-model:dateDate = "search.date"></DateFilter>
				</template>
				<template #default="{ row }">
					<span>{{row.reg_date}}</span>
				</template>
			</el-table-column>
			<el-table-column width="600">
				<template #header>
					<span class="label">文章链接</span>
					<StringFilter class="label-icon"></StringFilter>
				</template>
				<template #default="{row}">
					<span class="label-text">{{row.article_src}}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="150px" fixed="right" align="center">
				<template #header>
					<span style="margin-right: 10px;">操作</span>
					<el-tag style="cursor: pointer;" @click="search={classList: []}">清除赛选</el-tag>
				</template>
				<template #default="{ row }">
					<el-button type="success" @click="view(row)" size="small">浏览</el-button>
					<el-button type="primary" @click="activeClassBox(row)" size="small">归类</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination class="el-pagination" background :page-size="size" layout="total, jumper, pager, next" :total="total" @current-change="changePage" />
		</div>
		<Classified v-if="confirmClassShow" :classList="classList" @confirm="confirmClassified" @cancel="cancleClassified"></Classified>
	</div>
</template>

<script>
	import request from "../../api/request.js";
	import StringFilter from "../../components/string-filter.vue";
	import ListFilter from "../../components/list-filter.vue";
	import DateFilter from "../../components/date-filter.vue";
	import Classified from "../../components/classified.vue";
	export default {
		components: {
			StringFilter,
			ListFilter,
			DateFilter,
			Classified
		},
		data() {
			return {
				list: [],
				page: 1,
				size: 20,
				total: 0,
				loading: true,
				columnMap: {},
				classList: [],
				search: {
					classList: []
				},
				checkedList: [],
				confirmClassShow: false,

				currentClassId: 0,
			};
		},
		created() {
			this.getArticleTypes().then((res) => {
				if (res === "success") {
					this.getList();
				}
			});
		},
		watch: {
			search: {
				handler: function() {
                    this.page = 1;
					this.getList();
				},
				deep: true
			}
		},
		methods: {
			getList() {
				request.get("/wx/ClumnList",{
					params: {
						params: {
							page: this.page,
							size: 20
						},
						condition: this.search
					}
				}).then((res) => {
					this.list = res.data.data;
					this.total = res.data.count;
					this.loading = false;
				});
			},

			getArticleTypes() {
				return new Promise((resolve, reject) => {
					request
						.get("/wx/ArticleClassList")
						.then((res) => {
							this.classList = res.data;
							res.data.forEach((val) => {
								this.columnMap[val.id] = val.clumn_name;
							});
							resolve("success");
						})
						.catch(() => {
							this.$message.warning("获取分类失败");
							reject("error");
						});
				});
			},
			view(row) {
				window.open(row.article_src);
			},
			changePage(page) {
				this.loading = true;
				this.page = page;
				this.getList();
			},

			selecteArticle(data) {
                this.checkedList = data;
			},

			activeClassBox(row = {}) {
				if(row?.id){
					this.checkedList = [row]
				}
				if(!this.checkedList.length) {
					this.$message.warning("请选择要归类的文章");
				} else {
					this.confirmClassShow = true;
				}
			},

			cancleClassified() {
                this.checkedList = [];
				this.$refs.articleTabel.clearSelection();
				this.confirmClassShow = false;
			},

			confirmClassified(classId){
				let params = {
					classId: classId,
					ids: [],
				}
				this.checkedList.map(item => {
					params.ids.push(item.id);
				})
                
				request.post("/wx/updateArticle", {params: params}).then(() => {
					this.$message.success("设置栏目分类成功");
					this.page = 1;
					this.getList();
					this.confirmClassShow = false;
				})
			}
		},
	};
</script>

<style lang="less" scoped>
	.toolBar {
		width: 100%;
		height: 45px;
		background-color: rgb(233, 233, 233);
		line-height: 45px;

		.tool-item {
			margin-left: 10px;
		}
	}

	.pagination {
		height: 45px;
		float: right;
		margin-top: 5px;
	}
	.label{
		margin-top: 5px;
		float: left;
	}
	.label-icon{
		margin-top: 5px;
		float: right;
	}
	.label-text{
		width: 100%;
		word-wrap: break-word; /*强制换行*/
		overflow: hidden; /*超出隐藏*/
		text-overflow: ellipsis;/*隐藏后添加省略号*/
		white-space: nowrap;/*强制不换行*/
	}
</style>
