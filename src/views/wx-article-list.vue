<template>
	<div class="wap">
		<div class="head">
			<div class="company-info">
				<img class="logo" src="../../public/favicon.png" />
				<span class="company">镇江市行业老干部管理服务办公室</span>
			</div>
			<el-input class="search" v-model="search.title"></el-input>
		</div>
		<div class="content" v-loading="loading">
			<div class="list" v-for="(item, index) in list" :key="index">
				<el-image class="image" :src="item.cover_img" />
				<span class="title" @click="openUrl(item.url)">{{ item.title }}</span>
			</div>
			<div class="list-end" v-if="complete">
				<el-empty style="background-color: #fff;" :image-size="30" description="我是有底线的" />
			</div>
		</div>
	</div>
</template>

<script>
import { public_view } from '../api/public.js'
export default {
	data() {
		return {
			box: "",
			complete: false,
			loading: true,
			page: 1,
			size: 10,
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
		this.search.article_class = this.$route.query.id;
		this.box = this.$el.querySelector(".content");
		this.box.addEventListener("touchend", this.onTouch);
		this.getColumnName(this.search.article_class).then(res => {
			if (res === 'success') {
				this.getList();
			}
		})
	},
	methods: {
		getColumnName(clumn_id) {
			return new Promise((resolve, reject) => {
				public_view(`/wx_article_class/${clumn_id}/`)
					.then((res) => {
						console.log(res)
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
			if (this.list.length * 101 - this.box.scrollTop - this.box.offsetHeight < 200) {
				this.page += 1;
				this.getList();
			}
		},
		async getList() {
			this.loading = true;
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
