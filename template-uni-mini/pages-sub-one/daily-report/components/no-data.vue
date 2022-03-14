<template>
  <view class="daily-report-nodata">
    <image src="../../../static/images/no-data.png" mode="widthFix" class="nodata_img"></image>
    <view>抱歉，暂无数据</view>
  </view>
</template>

<script>
</script>

<style scoped lang="scss">
  .daily-report-nodata{
    text-align: center;
    margin: 200rpx auto 100rpx;
    color: #666666;
    font-size: 28rpx;
    line-height: 60rpx;
    .nodata_img{
      width: 150rpx;
    }
  }
</style>
