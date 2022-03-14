<template>
	<view class="report-success">
		<record-view />
		<back-home />
		<view class="success-container">
			<image src="../../static/images/icon-success.png" mode="widthFix" class="success_img"></image>
			<view class="success-text">提交成功</view>
			<view class="success-tips">已完成每日疫情数据的提交</view>
		</view>
	</view>
</template>

<script>
import recordView from './components/record-view'
import backHome from "./components/back-home"
export default {
    components:{recordView,backHome},
	data () {
		return {
			
		}
	},
	computed: {},
	onLoad () {},
	methods: {},
}
</script>

<style scoped lang="scss">
.report-success{
	position: relative;
	.success-container{
		text-align: center;
		.success_img{
			margin-top: 300rpx;
			width: 120rpx;
		}
		.success-text{
			margin-top: 40rpx;
			font-size: 40rpx;
			color: #404956;
		}
		.success-tips{
			margin-top: 20rpx;
			font-size: 28rpx;
			color: #808DA1;
		}
	}
	
}
</style>
