<template>
  <view class="daily-report-record-view" @click="jumpPage">
    <text>上</text>
	<text>报</text>
	<text>记</text>
	<text>录</text>
  	</view>
</template>

<script>
export default {
    components:{},
	data () {
		return {
			
		}
	},
	computed: {},
	onLoad () {},
	methods: {
    jumpPage(){
      uni.navigateTo({
				url: '/pages-sub-one/daily-report/report-record'
			})
    }
  },
}
</script>

<style scoped lang="scss">
  .daily-report-record-view{
    position: fixed;
		right: 0;
		top: 300rpx;
		display: flex;
		flex-direction: column;
		width: 80rpx;
		background: rgb(0, 105, 205);
		color: #fff;
		text-align: center;
		padding: 20rpx 0;
		box-sizing: border-box;
		border-radius: 80rpx;
  }
</style>
