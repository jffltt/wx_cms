<template>
	<div>
		<el-popover placement="bottom" :width="200" v-model:visible="visible" @before-enter="beforeEnter" @before-leave="beforeLeave">
			<template #reference>
				<el-icon :style="{'cursor': 'pointer', 'font-size': '16px', color: iconColor}" @click="visible = true">
					<Filter></Filter>
				</el-icon>
			</template>
			<el-checkbox-group v-model="checked" style="max-height: 300px; overflow-y: auto;">
				<div v-for="(item, index) in list" :key="index">
					<el-checkbox :label="item.id">{{item.column_name}}</el-checkbox>
				</div>
			</el-checkbox-group>
			<div class="toolBar">
				<el-button class="cancel" @click="cancel" size="small">取消</el-button>
				<el-button class="submit" @click="submit" size="small" type="primary">确定</el-button>
			</div>
		</el-popover>
	</div>
</template>

<script>
	import {
		Filter
	} from '@element-plus/icons-vue'
	export default {
		components: {
			Filter
		},
		props: {
			checkList: Array,
			list: Array
		},
		data() {
			return {
				checked: [],
				iconColor: '#000',
				visible: false
			}
		},
		methods: {
			beforeEnter() {
				this.$root.$el.addEventListener("mousedown", this.hide)
			},
			beforeLeave() {
				this.$root.$el.removeEventListener("mousedown", this.hide)
			},
			hide() {
				this.visible = false;
			},
			cancel() {
				this.search = '';
				this.visible = false;
				if(!this.checked.length) {
					this.iconColor = "#000"
				}
			},
			submit() {
				this.visible = false;
				this.$emit('update:checkList', this.checked);
				if(this.checked.length) {
					this.iconColor = "#409EFF"
				}
			}
		}
	}
</script>

<style lang="less" scoped>
    .toolBar{
		width: 100%;
		margin-top: 15px;
		border-top: 1px solid #ccc;
		padding-top: 10px;
		.cancel{
			width: 80px;
			float: left;
		}
		.submit{
			width: 80px;
			float: right;
		}
	}
</style>
