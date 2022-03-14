<template>
	<view>
		<record-header 
			from="dataStatistics" 
			:info="info" 
			:statistics="statistics"
			@changeDate="changeDate"
			@changeTab="changeTab"
		/>
		<record-list from="dataStatistics" :load="loadList" ref="recordList" :searchTab="searchTab" @toDetail="handleJumpDetail"/>
	</view>
</template>

<script>
import recordHeader from './components/record-header'
import recordList from './components/record-list'
import {formatDate} from '@/uni_modules/uni-dateformat/components/uni-dateformat/date-format.js'
import {getDataStatisticsList, getReportRecordCountData} from "@/api/daily-report"
import { mapState } from "vuex"
export default {
    components:{ recordHeader, recordList },
	data () {
		return {
			info:{},
			statistics:{
			  committed:0,
			  uncommitted:0,
			},
			searchDate:formatDate(new Date(),'yyyy-MM-dd'),
			searchTab:'committed',
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		}),
	},
	onLoad () {
		this.searchInfo()
	},
	methods: {
		// 搜索企业信息
		searchInfo(){
			const { departmentName = '', userName = '', orgName = '' } = this.userInfo
			this.info = {
				entName: departmentName,
				name: userName
			}
		},
		handleJumpDetail(data) {
			// console.log("data:",data)
			const url = `/pages-sub-one/daily-report/report-details?id=${data.id}`
			uni.navigateTo({ url })
		},
		async loadList(val){
			// todo 此处的this指向子组件
			const _this = this.$parent
			// console.log("val:",val)
			// console.log("userInfo:",_this.$store.state.user.userInfo)
			const userInfo = _this.$store.state.user.userInfo
			const userRoleName = userInfo.preventionFillRoles
			const params = {
				type: '',
				role: '',
				searchName: '',
				uploadDate: _this.searchDate,
				...val
			}
			params.type = _this.searchTab === 'committed' ? 'report' : 'not_report'
			params.deptName = userInfo.departmentName
			if (userRoleName === '单位管理员') {
				params.role = '1'
				params.searchName = userInfo.departmentName
			} else {
				params.role = '0'
				params.searchName = userInfo.orgName
			}
			// console.log("params:",params)
			const res = await getDataStatisticsList(params)
			const recordRes = await getReportRecordCountData(params)
			// console.log("res:",res)
			// console.log("recordRes:",recordRes)
			_this.statistics = {
				committed: recordRes.data.commitCount,
				uncommitted: recordRes.data.notCommitCount,
			}
			let { data,recordsTotal } = res.data
			return {
				result: data || [],
				total: recordsTotal
			}
		},
		// tab栏改变
		changeTab(val){
			this.searchTab = val
			this.$refs.recordList.reload()
		},	  
		// 上报日期改变
		changeDate(val){
			this.searchDate = val
			this.$refs.recordList.reload()
		}
	},
    onPullDownRefresh(){
		this.$refs.recordList.reload()
    },
    onReachBottom(){
		this.$refs.recordList.loadList()
    }
}
</script>

<style scoped lang="scss"></style>
