<template>
	<div class="wap">
		<div class="head">
			<div class="company-info">
				<img class="logo" src="../../public/favicon.png" />
				<span class="company">镇江市行业老干部管理服务办公室</span>
			</div>
			<el-input class="search" v-model="search.title"></el-input>
		</div>
		<div class="content" id="article-list">
			<div class="list" v-for="(item, index) in list" :key="index">
				<el-image class="image" :src="item.cover_img" />
				<span class="title" @click="openUrl(item.url)">{{ item.title }}</span>
			</div>
			<div class="list-end" v-if="complete">
				<el-empty style="background-color: #fff;" :image-size="30" description="我是有底线的" />
			</div>
			<div class="loading" v-if="loading">
				<el-icon size="30" class="is-loading loading-icon"><Loading></Loading></el-icon>
			</div>
		</div>
	</div>
</template>

<script>
import { public_view } from '../api/public.js'
import { Loading } from '@element-plus/icons-vue';
export default {
	components: {Loading},
	data() {
		return {
			box: "",
			complete: false,
			loading: true,
			page: 1,
			size: 8,
			list: [],
			search: {
				title: '',
				article_class: undefined,
			}
		};
	},
	watch: {
		search: {
			handler: function () {
				this.page = 1;
				this.list = [];
				this.complete = false;
				this.getList();
			},
			deep: true
		}
	},
	mounted() {
		const articleClass = this.$route.query.id;
		this.box = document.getElementById("article-list");
		this.box.addEventListener("touchend", this.onTouch);
		this.getColumnName(articleClass).then(res => {
			if (res === 'success') {
				this.search.article_class = articleClass;
			}
		})
	},
	methods: {
		getColumnName(clumn_id) {
			return new Promise((resolve, reject) => {
				public_view(`/wx_article_class/${clumn_id}/`)
					.then((res) => {
						document.title = res.data.column_name;
						resolve("success");
					})
					.catch(() => {
						this.$message.warning("获取分类失败");
						reject("error");
					});
			});
		},
		onTouch() {
			if (this.box.scrollHeight > this.box.offsetHeight && !this.complete) {
				if ((this.box.scrollHeight - this.box.scrollTop - this.box.offsetHeight) < 200) {
					this.loading = true;
					this.page += 1;
					this.getList();
				}
			}
		},
		async getList() {
			console.count()
			let params = {
				page: this.page,
				size: this.size,
				title: this.search.title,
				article_class: this.search.article_class,
			}
			try {
				let res = await public_view("wx_article", params);
				this.list = this.list.concat(res.data.results);
				this.loading = false;
			} catch {
				this.complete = true;
				this.loading = false;
			}

		},
		openUrl(url) {
			window.location.href = url
		}
	},
};
</script>

<style lang="less" scoped>
.wap {
	width: 100vw;
	height: 100vh;
	overflow: hidden;

	.head {
		width: 100vw;
		height: 100px;
		border-bottom: 1px solid #ccc;

		.company-info {
			width: 100%;
			height: 50px;
			line-height: 50px;

			.logo {
				width: 40px;
				height: 40px;
				border-radius: 20px;
				margin: 5px;
				float: left;
			}

			.company {
				float: left;
				margin: 5px;
				font-size: 18px;
			}
		}

		.search {
			height: 40px;
			width: 98%;
			margin: 0 1%;
		}
	}

	.content {
		width: 100vw;
		height: calc(100vh - 100px);
		background-color: rgb(255, 255, 255);
		overflow: scroll;

		.loading {
			position: fixed;
			width: 100vw;
			height: 100vh;
			background-color: rgba(158, 158, 158, 0.3);
			bottom: 0;
			left: 0;
			text-align: center;
			.loading-icon{
				margin-top: 48vh;
			}
		}

		&::-webkit-scrollbar {
			display: none;
		}

		.list {
			width: calc(98vw - 10px);
			;
			height: 90px;
			margin: 0 auto;
			border-bottom: 1px solid rgb(224, 224, 224);
			padding: 5px;
			background-color: #ffffff;

			.image {
				width: 120px;
				height: 90px;
				float: right;
			}

			.title {
				line-height: 40px;
				width: calc(98vw - 135px);
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2; // 多行在这里修改数字即可，这里显示2行
				overflow: hidden;
				-webkit-box-orient: vertical;
			}
		}
	}
}
</style>
