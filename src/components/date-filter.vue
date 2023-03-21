<template>
	<div>
		<el-popover placement="bottom" :width="400" v-model:visible="visible" @before-enter="beforeEnter" @before-leave="beforeLeave">
			<template #reference>
				<el-icon :style="{'cursor': 'pointer', 'font-size': '16px', color: iconColor}" @click="visible = true">
					<Calendar></Calendar>
				</el-icon>
			</template>
			<el-date-picker v-model="date" value-format="YYYY-MM-DD hh:mm:ss" type="datetimerange" range-separator="到" start-placeholder="开始时间" end-placeholder="结束时间" />
			<div class="toolBar">
				<el-button class="cancel" @click="cancel" size="small">取消</el-button>
				<el-button class="submit" @click="submit" size="small" type="primary">确定</el-button>
			</div>
		</el-popover>
	</div>
</template>

<script>
	import {
		Calendar
	} from '@element-plus/icons-vue'
	export default {
		components: {
			Calendar
		},
		props: {
			dateDate: Array
		},
		data() {
			return {
				date: '',
				iconColor: '#000',
				visible: false
			}
		},
		mounted() {
			this.date = this.dateDate;
		},
		watch: {
			dateDate: {
				handler: function() {
					this.date = '';
					if (this.date.length) {
						this.iconColor = "#409EFF"
					} else {
						this.iconColor = "#000"
					}
				},
				deep: true
			}
		},
		methods: {
			beforeEnter() {
				this.$root.$el.addEventListener("click", this.hide)
			},
			beforeLeave() {
				this.$root.$el.removeEventListener("click", this.hide)
			},
			hide() {
				this.visible = false;
			},
			cancel() {
				
			},
			submit() {
				this.visible = false;
				this.$emit('update:dateDate', this.date);
				if (this.date.length) {
					this.iconColor = "#409EFF"
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.toolBar {
		width: 100%;
		margin-top: 15px;
		border-top: 1px solid #ccc;
		padding-top: 10px;

		.cancel {
			width: 80px;
			float: left;
		}

		.submit {
			width: 80px;
			float: right;
		}
	}
</style>
