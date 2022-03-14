<template>
  <view class="daily-report-record-list">
    <view v-if="noData">
      <no-data />
    </view>
    <view v-else>
      <view class="record-list">
        <view class="list-item" v-for="(item,i) in list" :key="i">
          <view v-text="from == 'dataStatistics' ? item.username : item.createTime" class="sg-flex-1 fs28"></view>
          <view class="no-detail fs28" v-if="searchTab == 'uncommitted'">
            --
          </view>
          <view class="item-detail" @click="toDetail(item)" v-else>
            <text class="fs28">查看详情</text>
            <image src="../../../static/images/right-arrow-icon.svg" mode="widthFix" class="right-arrow"></image>
          </view>
        </view>
      </view>
      <view class="bottom" v-if="finished">
        已经到底了
      </view>
    </view>
  </view>
</template>

<script>
  import noData from './no-data'
  export default {
    components:{noData},
    props:{
      from:{
        type:String,
        default:''
      },
      load:{
        type: Function,
        required: true,
        default() {
            return () => Promise.resolve({ result: [], total: 0 })
        },
      },
      searchTab:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        list:[],
        total:0,
        page:{
          pageNum:0,
          pageSize:20,
        },
        finished:false,
        firstLoaded: false, // 已首次加载
        noData:false,
      }
    },
    created(){
    },
	mounted () {
		this.loadList()
	},
    methods: {
      // 查看详情
      toDetail(item){
        this.$emit('toDetail', item)
      },
      
      // 请求
      requestHttp(clearList = false) {
        // console.log('requestHttp')
        this.firstLoaded = true
        return this.load(this.page).then(
            ({ result, total }) => {
                if (clearList) this.list = []
                this.list.push(...result)
                this.total = total
                this.finished = this.list.length >= total
                this.noData = this.total === 0
            },
        ).catch(err => {
			console.log("err:",err)
		})
      },
      
      loadList() {
        if(this.finished){
          return
        }else{
          this.page.pageNum++
          this.requestHttp()
        }
      },
      
      reload() {
        this.list = []
        this.noData = false // 无数据
        this.finished = false // 已加载最后一页
        this.firstLoaded = true
        this.page.pageNum = 0
        this.loadList()
      },
    },
  }
</script>

<style scoped lang="scss">
.daily-report-record-list{
  .record-list{
    background-color: #ffffff;
    padding: 0 30rpx;
    font-size: 28rpx;
    color: #333333;
  }
  .list-item{
    display: flex;
    padding: 30rpx 0;
    border-bottom: 2rpx solid #dddddd;
	.fs28{
		font-size: 28rpx;
	}
    .item-detail{
      color: #1890FF;
      display: flex;
      align-items: center;
      .right-arrow{
        width: 40rpx;
      }
    }
    .no-detail{
      color: #999999;
    }
    &:nth-last-child(1){
      border-bottom: 0;
    }
  }
  .bottom{
    text-align: center;
    font-size: 28rpx;
    color: #999999;
    padding: 30rpx 0;
  }
}
</style>
