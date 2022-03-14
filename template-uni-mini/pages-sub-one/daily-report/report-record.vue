<template>
	<view>
		<record-header from="reportRecord" :info="info"/>
		<record-list from="reportRecord" :load="loadList" ref="recordList" @toDetail="handleJumpDetail"/>
		<back-home />
	</view>
</template>

<script>
import recordHeader from './components/record-header'
import recordList from './components/record-list'
import backHome from "./components/back-home.vue"
import {getReportRecordData} from "@/api/daily-report"
import { mapState } from "vuex"
export default {
    components:{ recordHeader, recordList, backHome },
	data () {
		return {
			info:{
				entName:'',
				name: ''
			},
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	onLoad () {
		this.searchInfo()
	},
	methods: {	
		handleJumpDetail(data) {
			// console.log("data:",data)
			const url = `/pages-sub-one/daily-report/report-details?id=${data.id}`
			uni.navigateTo({ url })
		},
		// 搜索企业信息
		searchInfo(){
			const { departmentName = '', userName = '' } = this.userInfo
			this.info = {
				entName: departmentName,
				name: userName
			}
		},
		async loadList(val){
			// console.log("this:",this.$parent)
			const _this = this.$parent
			const params = {
				userName: _this.userInfo.userName || '',
				userPhone: _this.userInfo.userPhone || '',
				...val
			}
			// console.log("parmas:",params)
			const res = await getReportRecordData(params)
			// console.log("res:",res)
			let {data,recordsTotal} = res.data
			return {
				result: data || [],
				total: recordsTotal
			}
		},
	},
    onPullDownRefresh(){
      this.$refs.recordList.reload()
    },
    onReachBottom(){
      this.$refs.recordList.loadList()
    }
}
</script>

<style>
</style>
