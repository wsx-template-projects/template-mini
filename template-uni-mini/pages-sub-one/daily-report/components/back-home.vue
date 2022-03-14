<template>
	<view class="daily-report-back-home">
		<image class="img" src="@/static/images/icon-home.png" @click="jumpPage"></image>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		onLoad () {
			console.log("onLoad")
		},
		methods: {
			jumpPage () {
				uni.navigateTo({
					url: '/pages/home/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.daily-report-back-home{
	.img {
		position: fixed;
		right: 0;
		bottom: 300rpx;
		width: 96rpx;
		height: 96rpx;
	}
}
</style>
