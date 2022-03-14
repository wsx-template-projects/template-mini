<template>
  <view class="daily-report-record-header">
    <view class="info-item">
      <text class="item-label">当前单位及部门：</text>
      <text class="sg-flex-1" v-text="info.entName"></text>
    </view>
    <view class="info-item" v-if="from == 'reportRecord'">
      <text class="item-label">上报人：</text>
      <text class="sg-flex-1" v-text="info.name"></text>
    </view>
    <view class="info-item sg-flexbox align-center" v-if="from == 'dataStatistics'">
      <text class="item-label">上报日期：</text>
      <view class="sg-flex-1">
        <uni-datetime-picker
            type="date"
            :value="reportDate"
            :end="endDate"
            @change="changeDate"
            return-type="yyyy-MM-dd"
            :clear-icon="false"
        />
      </view>
    </view>
    <view class="info-item info-tab" v-if="from == 'dataStatistics'">
      <view 
        :class="['item-tab',activeTab == 'committed' ? 'active' : ''] "
        @click="changeTab('committed')"
      >
        <text class="item-text">已提交({{statistics.committed}})</text>
      </view>
      <view 
        :class="['item-tab',activeTab == 'uncommitted' ? 'active' : '']" 
        @click="changeTab('uncommitted')"
      >
        <text class="item-text">未提交({{statistics.uncommitted}})</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {formatDate} from '@/uni_modules/uni-dateformat/components/uni-dateformat/date-format.js'
  export default {
    props:{
      info:{
        type:Object,
        default:()=>{}
      },
      statistics:{
        type:Object,
        default:()=>{}
      },
      from:{
        type:String,
        default:''
      },
    },
    data() {
      return {
        reportDate:formatDate(new Date(),'yyyy-MM-dd'),
        endDate:formatDate(new Date(),'yyyy-MM-dd'),
        activeTab:'committed',//已提交-committed 未提交-uncommitted
      }
    },
	watch: {
		info: {
			handler(newV,oldV) {
				// console.log("new:",newV,"old:",oldV)
			}
		}
	},
    methods: {
      // 选择上报日期
      changeDate(val){
        this.$emit('changeDate', val)
      },
      
      // tab栏切换
      changeTab(val){
        if(this.activeTab == val){
          return
        }
        this.activeTab = val
        this.$emit('changeTab', this.activeTab)
      }
    }
  }
</script>

<style scoped lang="scss">
.daily-report-record-header{
  background-color: #ffffff;
  margin-bottom: 20rpx;
  padding: 0 30rpx;
  color: #333333;
  font-size: 28rpx;
  .info-item{
    display: flex;
    padding: 20rpx 0;
    border-bottom: 2rpx solid #dddddd;
    .item-label{
      color: #999999;
    }
    &.info-tab{
      padding: 0;
      .item-tab{
        width: 50%;
        text-align: center;
        .item-text{
            display: inline-block;
            padding: 20rpx 0;
            border-bottom: 4rpx solid #ffffff;
        }
        &.active{
          .item-text{
            border-bottom-color: #1890FF;
          }
        }
      }
    }
    &:nth-last-child(1){
      border-bottom: 0;
    }
  }
}
</style>
