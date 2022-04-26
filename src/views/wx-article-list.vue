<template>
	<div class="wap">
		<div class="head">
			<h1>我老婆是猪</h1>
		</div>
		<div class="content">
			<div class="list" v-for="(item, index) in list" :key="index">
				<el-image class="image" :src="item.cover_img"/>
				<span class="title" @click="openUrl(item.article_src)">{{item.title}}</span>
			</div>
			<div class="list" v-if="complete">没有更多了</div>
		</div>
	</div>
</template>

<script>
	import request from '../api/request.js'
	export default {
		data() {
			return {
				box: "",
				complete: false,
				loading: true,
				list: []
			};
		},
		mounted() {
			this.box = this.$el.querySelector(".content");
			// this.box.addEventListener("touchend", this.onTouch);
			this.getList();
		},
		methods: {
			onTouch() {
				if (this.list * 120 - this.box.scrollTop - this.box.offsetHeight) {
					if (this.list > 50) {
						this.complete = true;
					} else {
						this.list += 5;
					}
				}
			},
			getList() {
				request.get("/api/article_list").then(res => {
					this.list = res.data
					this.loading = false
				})
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
		}

		.content {
			width: 100vw;
			height: calc(100vh - 100px);
			background-color: rgb(224, 224, 224);
			overflow: scroll;

			&::-webkit-scrollbar {
				display: none;
			}

			.list {
				width: 98vw;
				height: 120px;
				margin: 0 auto;
				background-color: #ffffff;
				.image{
					width: 120px;
					height: 80px;
					float: right;
				}
				.title{
					width: calc(98vw - 125px);
					height: 80px;
					display: block;
					float: left;
				}
			}
		}
	}
</style>
