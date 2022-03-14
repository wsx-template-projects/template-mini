<template>
	<view class="page-report-details">
		<view class="group-box">
			<text class="group-box-title">基本信息</text>
			<view class="group-box-content">
				<view class="basic">
					<view class="content-item">
						<text class="label">上报人</text>
						<text class="text">{{ infoData.userName }}</text>
					</view>
					<view class="content-item">
						<text class="label">上报日期</text>
						<text class="text">{{ infoData.createTime }}</text>
					</view>
					<view class="content-item">
						<text class="label">联系电话</text>
						<text class="text">{{ infoData.userPhone }}</text>
					</view>
					<view class="content-item">
						<text class="label">所属单位</text>
						<text class="text">{{ infoData.deptName }}</text>
					</view>
					<view class="content-item" v-if="infoData.orgName">
						<text class="label">所属部门</text>
						<text class="text">{{ infoData.orgName }}</text>
					</view>
					<view class="content-item">
						<text class="label">家庭地址</text>
						<text class="text">{{ infoData.address }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="group-box">
			<text class="group-box-title">办公场地</text>
			<view class="group-box-content">
				<view class="content-item">
					<text class="label">办公场地</text>
					<text class="text" v-if="infoData.officePlace">
						{{ infoData.officePlace }}
					</text>
					<text class="text" v-if="infoData.officePlaceOther">
						{{ infoData.officePlaceOther }}
					</text>
				</view>
			</view>
		</view>
		<view class="group-box">
			<text class="group-box-title">今日体温</text>
			<view class="group-box-content">
				<view class="content-item">
					<text class="text">{{ infoData.temperature }}</text>
				</view>
			</view>
		</view>
		<view class="group-box">
			<text class="group-box-title">疫苗接种情况</text>
			<view class="group-box-content">
				<view class="content-item">
					<text class="label">打了几针</text>
					<text class="text">{{ infoData.inoculationCount }}</text>
				</view>
				<view class="content-item" v-if="infoData.inoculationLastTime">
					<text class="label middle-label">最后一针时间</text>
					<text class="text">{{ infoData.inoculationLastTime }}</text>
				</view>
			</view>
		</view>
		<view class="group-box">
			<text class="group-box-title">当前状态码状态</text>
			<view class="group-box-content">
				<view class="content-item">
					<text class="text">{{ infoData.healthStatus }}</text>
				</view>
			</view>
		</view>
		<view class="group-box" v-if="infoData.healthStatus !== '绿码'">
			<text class="group-box-title">上一码状态</text>
			<view class="group-box-content">
				<view class="content-item" >
					<text class="text">{{ infoData.previousYardStatus }}</text>
				</view>
				<view v-if="infoData.previousYardStatus && infoData.previousYardStatus !== '绿码'">		
					<view class="content-item">
						<text class="label">原因</text>
						<text class="text">{{ infoData.previousYardReason }}</text>
					</view>
					<view class="content-item">
						<text class="label">开始时间</text>
						<text class="text">{{ infoData.previousYardStartTime }}</text>
					</view>
					<view class="content-item">
						<text class="label">结束时间</text>
						<text class="text">{{ infoData.previousYardEndTime }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="group-box">
			<text class="group-box-title">自2021年12月1日以来已做核酸检测次数</text>
			<view class="group-box-content">
				<view class="content-item">
					<text class="label">检测次数</text>
					<text class="text">{{ infoData.detectionCount }}</text>
				</view>
			</view>
		</view>
		<view class="group-box" v-if="infoData.detectionCount > 0">
			<text class="group-box-title">最近1次核酸检测情况</text>
			<view class="group-box-content">
				<view class="content-item">
					<text class="label">检测时间</text>
					<text class="text">{{ infoData.nucleicCheckTime }}</text>
				</view>
				<view class="content-item">
					<text class="label">检测结果</text>
					<text class="text">{{ infoData.nucleicCheckResult }}</text>
				</view>
				<view class="content-item sg-flexbox" v-if="infoData.nucleicCheckFile">
					<text class="label middle-label">检测结果上传</text>
					<view>
						<image 
							class="file-box" 
							mode="aspectFit" 
							:src="showImage(infoData.nucleicCheckFile)"  
							@tap="handlePreviewImage(infoData.nucleicCheckFile)"
						></image>
					</view>
				</view>
			</view>
		</view>
		<view class="group-box">
			<text class="group-box-title">是否确诊病例</text>
			<view class="group-box-content">
				<view class="content-item">
					<text class="text">{{ infoData.isDiagnosis }}</text>
				</view>
			</view>
		</view>
		<view class="group-box">
			<text class="group-box-title">是否属于管控人员</text>
			<view class="group-box-content">
				<view class="content-item">
					<text class="text">{{ infoData.isControlUser }}</text>
				</view>
				
				<view v-if="infoData.isControlUserExplain && infoData.isControlUserFeedback">
					<view class="content-item">
						<text class="label">情况说明</text>
						<text class="text">{{ infoData.isControlUserExplain }}</text>
					</view>
					<view class="content-item">
						<text class="label">现状</text>
						<text class="text">{{ infoData.isControlUserFeedback }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="group-box">
			<text class="group-box-title">管控状态</text>
			<view class="group-box-content">
				<view class="content-item">
					<text class="text">{{ infoData.controlStatus }}</text>
				</view>
				<view v-if="infoData.controlStatus !== '无管控'">	
					<view class="content-item">
						<text class="label">管控地点</text>
						<text class="text">{{ infoData.controlAdress }}</text>
					</view>
					<view class="content-item">
						<text class="label">开始时间</text>
						<text class="text">{{ infoData.controlStartTime }}</text>
					</view>
					<view class="content-item">
						<text class="label">结束时间</text>
						<text class="text">{{ infoData.controlEndTime }}</text>
					</view>
					<view class="content-item sg-flexbox" v-if="infoData.controlFile">
						<text class="label large-label">结束隔离通知书</text>
						<view v-if="infoData.controlFile">
							<image class="file-box" mode="aspectFit" :src="showImage(infoData.controlFile)" @tap="handlePreviewImage(infoData.controlFile)"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<back-home />
	</view>
</template>

<script>
import backHome from "./components/back-home.vue"
import { getReportDetail } from "@/api/daily-report"
import { 
	CONTROL_CHECK_OPTIONS,
	CONTROL_RADIO_OPTIONS ,
} from "./enums/index.js" 
import dataTools from "@/scripts/utils/data-dispose-tools.js"
import { previewImage } from "@/scripts/uni-app/tools.js"
import tools from "@/utils/tools.js"
export default {
	components: { backHome },
	data () {
		return {
			infoData: {}
		}
	},
	onLoad (options) {
		// console.log("options:",options)
		
		this.getData(options.id)
	},
	methods: {
		showImage(image){
			let newFile = tools.previewImage(image)
			return newFile
		},

		// 图片预览 
		handlePreviewImage(image) {
			let newFile = tools.previewImage(image)
			previewImage([newFile],0)
		},
		async getData (id) {
			const { data } = await getReportDetail({ id })
			// console.log("data:",data)
			this.infoData = data
			const filterKeys = {
				targetKey: 'value',
				resultKey: 'text'
			}
			if (data.controlStatus) {
				const temp = {
					source: CONTROL_RADIO_OPTIONS,
					value: data.controlStatus,
					...filterKeys
				}
				this.infoData.controlStatus = dataTools.fieldTransform(temp)
			}
			if (data.isControlUser) {
				const temp = {
					source: CONTROL_CHECK_OPTIONS,
					value: data.isControlUser,
					...filterKeys
				}
				this.infoData.isControlUser = dataTools.fieldTransform(temp)
			}
			// console.log("infoData:",this.infoData)
		}
	}
}
</script>

<style lang="scss" scoped>
.page-report-details {
	background: #f2f2f2;
	font-size: 32rpx;
	color: rgb(21, 21, 21);
	line-height: 96rpx;
	// padding: 20rpx;
	
	.group-box {
		background: #fff;
		margin-bottom: 8rpx;
		padding: 0 20rpx;
		
		.group-box-title {
			display: block;
			width: 100%;
			font-size: 32rpx;
			font-weight: 700;
			border-bottom: 1rpx solid #f2f2f2;
			margin-bottom: 10rpx;
		}
		
		.group-box-content {
			
			.content-item {
				border-bottom: 1rpx solid #f2f2f2;
			}
			
			.content-item:last-child {
				border-bottom: none;
			}
			
			.label {
				display: inline-block;
				width: 160rpx;
				color: #666;
				
				&:after {
					display: inline-block;
					content: '：'
				}
				
				&.middle-label {
					width: 230rpx;
				}
				
				&.large-label {
					width: 260rpx;
				}
			}
			.text {
				color: #000;
			}
			
			.file-box {
				width: 200rpx;
				height: 200rpx;
				padding-top: 20rpx;
			}
		}
	}
}
</style>
