<template>
	<div class="cover">
		<div class="wap">
			<div v-for="(item, index) in list" :key="index"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		props: {
			classList: Array
		},
		mounted() {
			this.list = [...this.classList()]
		}
	}
</script>

<style lang="less" scoped>
	.cover{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,0.3);
		z-index: 5;
		.wap{
			width: 340px;
			height: 600px;
			background-color: #fff;
			margin: calc(50vh - 300px) auto;
		}
	}
</style>