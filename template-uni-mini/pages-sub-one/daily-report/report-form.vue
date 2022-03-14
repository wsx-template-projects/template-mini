<template>
  <view class="page-report-form">
    <view class="main">
		<uni-forms 
			class="pagr-form"
			ref="formRef"
			:modelValue="formData" 
			:rules="rules"
		>	
			<!-- 人员基本信息 -->
			<view class="form-group sg-flexbox v">
				<text class="form-group--title">基本信息</text>
				<view class="form-group--content grey-bg">		
					<uni-forms-item label="姓名" name="userName">
						<uni-easyinput
							class="grey-txt"
							v-model="formData.userName" 
							clearable 
							disabled 
							:inputBorder="false"
							placeholderStyle="color: #ccc"
							placeholder="请输入姓名" 
						/>		
					</uni-forms-item>
					<uni-forms-item label="联系电话" name="userPhone">
						<uni-easyinput 
							class="grey-txt"
							v-model="formData.userPhone" 
							clearable 
							disabled 
							:inputBorder="false"
							placeholderStyle="color: #ccc"
							placeholder="请输入联系电话" 
						/>		
					</uni-forms-item>
					<uni-forms-item label="所在单位" name="deptName">
						<uni-easyinput 
							v-model="formData.deptName" 
							clearable 
							disabled 
							placeholder="请输入所在单位" 
						/>		
					<!-- 	<uni-data-picker
							v-model="formData.deptName" 
							:localdata="deptOptions" 
							:inputBorder="false"
							placeholder="请选择所在单位"
							@change="handleDeptName"
						></uni-data-picker> -->
					</uni-forms-item>
					<uni-forms-item label="所在部门" name="orgName" v-if="formData.orgName">
						<uni-easyinput 
							v-model="formData.orgName" 
							clearable 
							disabled 
							placeholderStyle="color: #999"
							placeholder="请选择所在部门"
							v-if="isNotOrg"
						/>		
					</uni-forms-item>
					
					<!-- <uni-forms-item label="所在部门" name="orgName">
						<uni-easyinput 
							v-model="formData.orgName" 
							clearable 
							disabled 
							placeholderStyle="color: #999"
							placeholder="请选择所在部门"
							v-if="isNotOrg"
						/>		
						<uni-data-picker
							v-model="formData.orgName" 
							:localdata="orgOptions"
							:readonly="isNotOrg"
							placeholder="请选择所在部门"
							v-if="!isNotOrg"
						></uni-data-picker>
					</uni-forms-item> -->
					
					<uni-forms-item class="group-last-item" label="家庭地址" name="address">
						<uni-easyinput 
							v-model="formData.address" 
							type="textarea" 
							clearable 
							autoHeight
							placeholder="请输入家庭地址" 
						/>
					</uni-forms-item>
				</view>
			</view>
			
			<!-- 办公场地 -->
			<view class="form-group sg-flexbox v">
				<text class="form-group--title">办公场地</text>
				<view class="grey-bg">	
					<uni-forms-item
						:class="{'group-last-item': !formData.officePlace || formData.officePlace > 0 }"
						class="form-group--content check-block label-width-auto" 
						name="officePlace"
					>
						<uni-data-checkbox 
							v-model="formData.officePlace" 
							:localdata="placeRadioOptions" 
							@change="handleOfficePlace"
						></uni-data-checkbox>
					</uni-forms-item>
					
					<uni-forms-item 
						class="form-group--content check-block label-width-auto group-last-item" 
						name="officePlaceOther" 
						v-if="formData.officePlace == '0'"
					>
						<uni-easyinput
							v-model="formData.officePlaceOther" 
							clearable 
							placeholder="请输入其它办公场地" 
						/>		
					</uni-forms-item>
				</view>
			</view>
			
			<!-- 今日体温 -->
			<view class="form-group sg-flexbox v">
				<text class="form-group--title">今日体温</text>
				<uni-forms-item class="form-group--content label-width-auto check-block group-last-item pd-32" name="temperature">
				    <uni-data-checkbox 
						v-model="formData.temperature" 
						:localdata="todayTemperatureRadioOptions"
					></uni-data-checkbox>
				</uni-forms-item>
			</view>
			
			<!-- 疫苗接种情况 -->
			<view class="form-group sg-flexbox v">
				<text class="form-group--title">疫苗接种情况</text>
				<view class="grey-bg">		
					<uni-forms-item 
						:class="{'group-last-item': !formData.inoculationCount || formData.inoculationCount == '0'}"
						class="form-group--content" 
						label="打了几针" 
						name="inoculationCount"
					>
						<uni-easyinput 
							v-model="formData.inoculationCount"
							type="number"
							clearable 
							placeholder="请输入"
							@blur="handleBlurInoculationCount"
						/>		
					</uni-forms-item>
					
					<uni-forms-item 
						:class="{'group-last-item': formData.inoculationCount > 0}"
						class="form-group--content" 
						label="最后一针时间" 
						name="inoculationLastTime" 
						v-if="formData.inoculationCount > 0"
					>
						<!-- type = date/daterange/datetime/timestamp/range/datetimerange -->
						<uni-datetime-picker
							type="date"
							:value="formData.inoculationLastTime"
						/>
					</uni-forms-item>
				</view>
			</view>
			
			<!-- 当前健康码状态 -->
			<view class="form-group sg-flexbox v">
				<text class="form-group--title">当前健康码状态</text>
				<uni-forms-item class="form-group--content label-width-auto group-last-item pd-32" name="healthStatus">
				    <uni-data-checkbox 
						v-model="formData.healthStatus" 
						:localdata="codeStatuRadioOptions"
						@change="handleHealthStatus"
					></uni-data-checkbox>
				</uni-forms-item>
			</view>
			
			<!-- 上一码状态 -->
			<view class="form-group sg-flexbox v" v-if="formData.healthStatus != '1' && formData.healthStatus != '4'">
				<text class="form-group--title">上一码状态</text>
				<uni-forms-item class="form-group--content pd-32" name="previousYardStatus">
				    <uni-data-checkbox 
						v-model="formData.previousYardStatus" 
						:localdata="prevStatusRadioOptions"
						@change="handlePreviousYardStatus"
					></uni-data-checkbox>
				</uni-forms-item>
				<view class="grey-bg" v-if="formData.previousYardStatus && formData.previousYardStatus != '1'">		
					<uni-forms-item class="form-group--content" name="previousYardReason">
						<uni-easyinput
							v-model="formData.previousYardReason"
							type="textarea"
							clearable 
							placeholder="请输入原因" 
						/>		
					</uni-forms-item>
					<uni-forms-item class="form-group--content" label="开始时间" name="previousYardStartTime">
						<uni-datetime-picker
							type="date"
							:value="formData.previousYardStartTime"
						/>
					</uni-forms-item>
					<uni-forms-item class="form-group--content" label="结束时间" name="previousYardEndTime">
						<uni-datetime-picker
							type="date"
							:value="formData.previousYardEndTime"
						/>
					</uni-forms-item>
				</view>
			</view>
			
			<!-- 自2021年12月1日以来已做核酸检测次数 -->
			<view class="form-group sg-flexbox v">
				<text class="form-group--title">自2021年12月1日以来已做核酸检测次数</text>
				<uni-forms-item class="form-group--content grey-bg group-last-item" label="检测次数" name="detectionCount">
					<uni-easyinput 
						v-model="formData.detectionCount" 
						clearable 
						type="number"
						placeholder="请输入检测次数" 
						@blur="handleBlurDetectionCount"
					/>		
				</uni-forms-item>
			</view>
			
			<view v-show="formData.detectionCount > 0">		
				<!-- 最近1次核酸检测情况 -->
				<view class="form-group">
					<text class="form-group--title">最近1次核酸检测情况</text>
					<view class="grey-bg">
						<uni-forms-item class="form-group--content" label="检测时间" name="nucleicCheckTime">
							<!-- type = date/daterange/datetime/timestamp/range/datetimerange -->
							<uni-datetime-picker
								type="date"
								:value="formData.nucleicCheckTime"
							/>
						</uni-forms-item>
						<uni-forms-item class="form-group--content" label="检测结果" name="nucleicCheckResult">
							<uni-data-picker
								v-model="formData.nucleicCheckResult" 
								:localdata="checkResultOptions" 
								placeholder="请选择检测结果"
							></uni-data-picker>
						
						<!-- 	<uni-combox 
								v-model="formData.nucleicCheckResult" 
								:candidates="checkResultOptions" 
								placeholder="请选择检测结果"
							></uni-combox> -->
						</uni-forms-item>
						<uni-forms-item class="form-group--content group-last-item" label="结果上传" name="nucleicCheckFile">
							<my-upload-file
								ref="nucleicCheckFileRef" 
								v-model="formData.nucleicCheckFile" 
								:limit="1"
							></my-upload-file>
						</uni-forms-item>
					</view>
				</view>
			</view>
			
			<!-- 是否确诊病例 -->
			<view class="form-group sg-flexbox v">
				<text class="form-group--title">是否确诊病例</text>
				<uni-forms-item class="form-group--content label-width-auto group-last-item pd-32" name="isDiagnosis">
				    <uni-data-checkbox 
						v-model="formData.isDiagnosis" 
						:localdata="isConfirmRadioOptions" 
						@change="handleIsConfirm"
					></uni-data-checkbox>
				</uni-forms-item>
			</view>
			
			<!-- 是否属于管控人员 -->
			<view class="form-group sg-flexbox v">
				<text class="form-group--title">是否属于管控人员</text>
				<view class="grey-bg">	
					<uni-forms-item 
						class="form-group--content check-block label-width-auto"
						name="isControlUser"
					>
						<uni-data-checkbox 
							v-model="formData.isControlUser" 
							:multiple="true"
							:localdata="controlCheckOptions" 
							@change="handleIsControlUser"
						></uni-data-checkbox>
					</uni-forms-item>
					<view class="form-group--other" v-if="formData.isControlUser.length > 0 && !formData.isControlUser.includes('10')">
						<uni-forms-item class="form-group--content" label="情况说明" name="isControlUserExplain">
							<uni-easyinput 
								v-model="formData.isControlUserExplain" 
								clearable 
								autoHeight 
								type="textarea" 
								placeholder="请输入具体情况说明（包含管控原因、发生时间、健康码情况等）如：家住XXX，因丈夫同事为确诊病例，丈夫被确定为密接，健康码红码，xx年xx月xx日xx时xx分社区要求集中隔离医学观察，当晚健康码变红码。" 
							/>
						</uni-forms-item>
						<uni-forms-item class="form-group--content" label="现状" name="isControlUserFeedback">
							<uni-easyinput 
								v-model="formData.isControlUserFeedback" 
								clearable 
								autoHeight
								type="textarea" 
								placeholder="请输入现状及街道意见说明。如：目前集中隔离医学观察，无症状，红码。"
							/>
						</uni-forms-item>
					</view>
				</view>
				
			</view>
			
			<!-- 管控状态 -->
			<view class="form-group sg-flexbox v">
				<text class="form-group--title">管控状态</text>
				<view class="grey-bg">
					<uni-forms-item
						:class="{'group-last-item': formData.controlStatus == '4'}"
						class="form-group--content check-block label-width-auto" 
						name="controlStatus"
					>
						<uni-data-checkbox 
							v-model="formData.controlStatus" 
							:localdata="controlRadioOptions"
							@change="handleControlStatus"
						></uni-data-checkbox>
					</uni-forms-item>
					
					<view class="form-group--other" v-show="formData.controlStatus != '4'">
						<uni-forms-item class="form-group--content" label="管控地点" name="controlAdress">
							<uni-easyinput 
								v-model="formData.controlAdress" 
								clearable 
								autoHeight 
								type="textarea" 
								placeholder="请输入管控地点" 
							/>
						</uni-forms-item>
						
						<uni-forms-item class="form-group--content" label="开始时间" name="controlStartTime">
							<uni-datetime-picker
								type="date"
								:value="formData.controlStartTime"
							/>
						</uni-forms-item>
						<uni-forms-item
							:class="{'group-last-item': formData.controlStatus != '1'}"
							class="form-group--content" 
							label="结束时间" 
							name="controlEndTime"
						>
							<uni-datetime-picker
								type="date"
								:value="formData.controlEndTime"
							/>
						</uni-forms-item>
						<uni-forms-item class="form-group--content group-last-item" label="结束隔离通知书" name="controlFile"  v-show="formData.controlStatus == '1'">
							<my-upload-file
								ref="controlFileRef" 
								v-model="formData.controlFile" 
								:limit="1"
							></my-upload-file>
						</uni-forms-item>
					</view>
				</view>
			</view>
		</uni-forms>
		<view class="page-footer">
			<button class="submit-btn" type="primary" @click="onSubmit">提交</button>
		</view>
    </view>
	<view class="page-fab" @click="jumpPage">
		<text>上</text>
		<text>报</text>
		<text>记</text>
		<text>录</text>
	</view>
  </view>
</template>

<script>
import MyUploadFile from "@/components/global/my-upload-file" 
import { mapState } from "vuex"
import {
	PLACE_RADIO_OPTIONS, // 办公场地
	TODAY_TEMPERATURE_RADIO_OPTIONS, // 今日体温
	CODE_STATU_RADIO_OPTIONS, // 上一码状态
	IS_CONFIRM_RADIO_OPTIONS, // 是否确诊病例
	CHECK_RESULT_OPTIONS, // 核酸检测结果
	CONTROL_RADIO_OPTIONS, // 是否属于管控人员
	CONTROL_CHECK_OPTIONS, // 管控状态
} from "./enums/index.js"
import { saveDailyReport, getReportShowData } from "@/api/daily-report"
import tools from "@/utils/tools.js"
import dataTools from "@/scripts/utils/data-dispose-tools.js"
export default {
	components: { MyUploadFile },
	data() {
		return {
			// 所在单位
			deptOptions: [],
			isNotOrg: true, // 部门是否不存在
			// 所在部门
			orgOptions: [],
			
			// 核酸检测结果
			checkResultOptions: [...CHECK_RESULT_OPTIONS],
			// 是否属于管控人员
			controlRadioOptions: [...CONTROL_RADIO_OPTIONS],
			// 上一码状态
			prevStatusRadioOptions: [...CODE_STATU_RADIO_OPTIONS],
			// 管控状态
			controlCheckOptions: [...CONTROL_CHECK_OPTIONS],
			// 表单数据
			formData:{
				userName:'', // 姓名
				userPhone: '', // 联系电话
				deptName: '', // 单位名称
				orgName: '',// 部门名称
				address: '', // 家庭地址
				
				officePlace: '', // 办公场地（金汇大厦；天目山院区；下沙院区；其它）
				officePlaceOther: '', // 办公场地 其它
				temperature: '1', // 今日体温（正常；异常）
				inoculationCount: '', // 接种针数
				inoculationLastTime: '', // 接种最后一针时间 "yyyy-MM-dd"
				healthStatus: '1', // 当前健康码状态（绿码；黄码；红码）
				
				previousYardStatus: '', // 上一码状态
				previousYardReason: '', // 上一码状态原因 
				previousYardStartTime: '', // 上一码开始时间 "yyyy-MM-dd"
				previousYardEndTime: '', // 上一码结束时间 "yyyy-MM-dd"
				
				detectionCount: '', // 检测次数
				nucleicCheckTime: '', // 最近一次检测时间 "yyyy-MM-dd"
				nucleicCheckResult: '', // 最近一次检测结果 
				nucleicCheckFile: [], // 最近一次检测结果文件
				
				isDiagnosis: '2', // 是否确诊病例（是，否）
				
				isControlUser: [], // 是否属于管控人员
				isControlUserExplain: '', // 管控人员具体情况说明
				isControlUserFeedback: '', // 管控人员现状说明
				
				controlStatus: '4', // 管控状态（集中隔离医学观察；居家健康观察；日常健康检测；居家办公；无管控）
				controlAdress: '', // 管控地址
				controlStartTime: '', // 管控开始时间 "yyyy-MM-dd"	
				controlEndTime: '', // 管控结束时间 "yyyy-MM-dd"
				controlFile: [], // 解除隔离通知书
				directlyUnder: '', // 机关处室 
			},
			baseRules: {
				deptName: {
					rules: [{required: true, errorMessage: '请选择所在单位'}]
				},
				// orgName: {
				// 	rules: [{required: true, errorMessage: '请选择所在部门'}]
				// },
				address: {
					rules: [{required: true, errorMessage: '请输入家庭地址'}]
				},
				officePlace: {
					rules: [{required: true, errorMessage: '请选择办公场地'}]
				},
				temperature: {
					rules: [{required: true, errorMessage: '请选择对应选项'}]
				},
				inoculationCount: {
					rules: [{required: true, errorMessage: '请输入'}]
				},
				healthStatus: {
					rules: [{required: true, errorMessage: '请选择对应选项'}]
				},
				detectionCount: {
					rules: [{required: true, errorMessage: '请输入检测次数'}]
				},
				isDiagnosis: {
					rules: [{required: true, errorMessage: '请选择对应选项'}]
				},
				isControlUser: {
					rules: [{required: true, errorMessage: '请选择对应选项'}]
				},
				controlStatus: {
					rules: [{required: true, errorMessage: '请选择对应选项'}]
				},
				 
			}
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		}),
		// TODO: 办公场地校验
		officePlaceRules () {
			let rules = {}
			if (this.formData.officePlace == '0') {
				rules = {
					officePlaceOther: {
						rules: [{required: true, errorMessage: '请输入其它办公场地'}]
					}
				}
			}
			return rules
		},
		// todo 疫苗接种输入值大于1,校验时间，否则不校验
		inoculationCountRules () {
			let rules = {}
			if (this.formData.inoculationCount > 0) {
				rules = {
					inoculationLastTime: {
						rules: [{required: true, errorMessage: '请选择日期'}]
					},
				}
			}
			return rules
		},
		// 健康码状态（绿码或者橙码不校验）
		healthStatusRules () {
			let rules = {}
			if (this.formData.healthStatus != '1' || this.formData.healthStatus != '4') {
				rules = {
					previousYardStatus: {
						rules: [{required: true, errorMessage: '请选择对应选项'}]
					},
				}
			}
			return rules
		},
		// 上一码状态 - 校验规则
		previousYardStatusRules () {
			let rules = {}
			if (this.formData.previousYardStatus && this.formData.previousYardStatus != '1') {
				rules = {
					previousYardReason: {
						rules: [{required: true, errorMessage: '请输入原因'}]
					},
					previousYardStartTime: {
						rules: [{required: true, errorMessage: '请选择日期'}]
					},
					previousYardEndTime: {
						rules: [{required: true, errorMessage: '请选择日期'}]
					},
				}
			}
			return rules
		},
		// 最近1次核酸检测情况 - 校验规则
		nucleicCheckRules () {
			let rules = {}
			if (this.formData.detectionCount > 0) {
				rules = {
					nucleicCheckTime: { rules: [{required: true, errorMessage: '请选择日期'}] },
					nucleicCheckResult: { rules: [{required: true, errorMessage: '请选择检测结果'}] },
					nucleicCheckFile: { rules: [{required: true, errorMessage: '请上传文件'}] },
				}
			}
			// console.log("最近1次核酸检测情况-rules:",rules)
			return rules
		},
		// 是否属于管控人员 - 校验规则
		isControlUserRules () {
			let rules = {}
			if (this.formData.isControlUser.length > 0 && !this.formData.isControlUser.includes('10')) {
				rules = {
					isControlUserExplain: {
						rules: [{required: true, errorMessage: '请输入具体情况说明'}]
					},
					isControlUserFeedback: {
						rules: [{required: true, errorMessage: '请输入街道意见说明'}]
					},
				}
			}
			return rules
		},
		// 管控状态 - 校验规则
		controlStatusRules () {
			let rules = {}
			if (this.formData.controlStatus != '4') {
				rules = {
					controlAdress: {
						rules: [{required: true, errorMessage: '请输入管控地点'}]
					},
					controlStartTime: {
						rules: [{required: true, errorMessage: '请选择日期'}]
					},
					controlEndTime: {
						rules: [{required: true, errorMessage: '请选择日期'}]
					},
				}
			}
			if (this.formData.controlStatus == '1') {
				rules = {
					...rules,
					controlFile: {
						rules: [{required: true, errorMessage: '请上传文件'}]
					}
				}
			}
			return rules
		},
		rules () {
			const rules = {
				...this.baseRules,
				...this.officePlaceRules,
				...this.inoculationCountRules,
				...this.healthStatusRules,
				...this.previousYardStatusRules,
				...this.nucleicCheckRules,
				...this.isControlUserRules,
				...this.controlStatusRules,
			}
			// console.log("total-rules:", rules)
			return rules
		},
		// 办公场地
		placeRadioOptions () {
			return [...PLACE_RADIO_OPTIONS]
		},
		// 今日体温
		todayTemperatureRadioOptions () {
			return [...TODAY_TEMPERATURE_RADIO_OPTIONS]
		},
		// 当前健康码状态
		codeStatuRadioOptions () {
			return [...CODE_STATU_RADIO_OPTIONS]
		},
		// 是否确诊病例
		isConfirmRadioOptions () {
			return [...IS_CONFIRM_RADIO_OPTIONS]
		},
	},
	watch: {
		formData: {
			handler(newV,oldV) {
				// console.log("newV",newV,'oldV:',oldV)
			},
			deep: true
		}
	},
	onLoad() {
		// console.log("userInfo:",this.userInfo)
		this.formData.userName = this.userInfo.userName || ''
		this.formData.userPhone = this.userInfo.userPhone || ''
		this.formData.deptName = this.userInfo.departmentName ||''
		// todo 部门可能为空，因此不做校验
		this.formData.orgName = this.userInfo.orgName ||''
		this.formData.address = this.userInfo.address || ''
		// this.getDeptOptions()
		this.getFormDetailsData() 
	},
	methods: {
		async getFormDetailsData () {
			const params = {
				userName: this.userInfo.userName,
				userPhone: this.userInfo.userPhone
			}
			const res = await getReportShowData(params)
			// console.log("res:",res)
			if (!res.data) return
			const data = res.data
			const {
				officePlace, // 办公地址
				temperature, // 今日温度
				healthStatus, // 健康码状态
				previousYardStatus, // 上一码状态
				nucleicCheckResult, // 最近1次检测状态
				isDiagnosis, // 是否确诊病例
				isControlUser, // 是否属于管控人员
				// controlStatus, // 管控状态
				controlFile,  // 解除隔离通知书 controlFile[0].uploadData
				nucleicCheckFile, // 最近一次检测结果 nucleicCheckFile[0].uploadData
				...other			
			} = data
			
			let otherFields = {
				officePlace: this.handleFieldsReverseTransform(this.placeRadioOptions,officePlace), 
				temperature: this.handleFieldsReverseTransform(this.todayTemperatureRadioOptions,temperature), 
				healthStatus: this.handleFieldsReverseTransform(this.codeStatuRadioOptions,healthStatus), 
				previousYardStatus: this.handleFieldsReverseTransform(this.prevStatusRadioOptions,previousYardStatus), 
				nucleicCheckResult: this.handleFieldsReverseTransform(this.checkResultOptions,nucleicCheckResult), 
				isDiagnosis: this.handleFieldsReverseTransform(this.isConfirmRadioOptions,isDiagnosis), 
				isControlUser: isControlUser.split(","), 
				// isControlUser: this.handleFieldsReverseTransform(this.controlCheckOptions,isControlUser, false), 
				// controlStatus: this.handleFieldsReverseTransform(this.controlRadioOptions,controlStatus) 
			}
			// console.log("other-fields:",otherFields)
			this.formData = { ...other, ...otherFields }
			// console.log("nucleicCheckFile:",nucleicCheckFile)
			if (nucleicCheckFile && nucleicCheckFile != 'undefined') {
				let newFile = tools.previewImage(nucleicCheckFile)
				// 文件回显
				this.$refs.nucleicCheckFileRef.handleFileShow(newFile)
			}
			if (controlFile && controlFile != 'undefined') {
				let newFile = tools.previewImage(controlFile)
				this.$refs.controlFileRef.handleFileShow(newFile)
			}
			// console.log("form-data:",this.formData)
			this.controlCheckOptions = this.setControlCheckOptions(this.controlCheckOptions,this.formData.isControlUser)
			if (this.formData.previousYardStatus) {
				// 设置上一码状态option: prevStatusRadioOptions
				const temp = {
					source: this.codeStatuRadioOptions,
					attr: 'value',
					value: [this.formData.healthStatus, '4'],
					isReverse: true
				}
				this.prevStatusRadioOptions = dataTools.filterArray(temp)
			}
		},
		// 获取/改变 单位相关数据, 已经废弃
		getDeptOptions () {
			const options = this.userInfo.departOrgList
			if (options && options.length) {		
				this.deptOptions = options.map(item => {
					const temp = {
						...item,
						text: item.value
					}
					if (temp.children.length) {
						temp.children = temp.children.map(c => ({
							...c,
							text: c.value
						}))
					}
					return temp
				})
				// console.log("dept:",this.deptOptions)
			}
		},
		jumpPage() {
			uni.navigateTo({
				url: '/pages-sub-one/daily-report/report-record'
			})
		},
		// 改变单位
		handleDeptName(data) {
			// console.log("data:",data.detail.value)
			const currText = data.detail.value[0]?.text
			// console.log("curr-text:",currText)
			const list = this.deptOptions.filter(item => currText === item.text)
			if (list.length) {
				const children = list[0].children
				this.isNotOrg = !children?.length 
				this.formData.orgName = this.isNotOrg ? '无' : ''
				this.orgOptions = children.map(item => ({
					...item,
					text: item.value
				}))
			}
		},
		// 办公地址
		handleOfficePlace (data) {
			if (data.detail.value != '0') {
				// 非其它，需清空 officePlaceOther
				this.formData.officePlaceOther = ''
			}
		},
		// 打了几针@blur事件
		handleBlurInoculationCount (data) {
			// console.log("change-data:",data)
			// todo 将 字符串:'01' 转化成 数字:1
			this.formData.inoculationCount = +data.detail.value
		},
		// 检测次数@blur事件
		handleBlurDetectionCount (data) {
			// console.log("change-data:",data)
			// todo 将 字符串:'01' 转化成 数字:1
			this.formData.detectionCount = +data.detail.value
		},
		// 当前健康码状态
		handleHealthStatus(data) {
			// console.log("health-status-change:",data.detail)
			// 选择绿码不需要改变 prevStatusRadioOptions
			if (data.detail.value == '1' || data.detail.value == '4') return
			const params = {
				source: this.codeStatuRadioOptions,
				attr: 'value',
				value: [data.detail.value, '4'],
				isReverse: true
			}
			this.prevStatusRadioOptions = dataTools.filterArray(params)
			this.formData.previousYardStatus = ''
		},
		// 上一码状态
		handlePreviousYardStatus(data) {
			// console.log("prev-status-change:",data)
		},
		// 是否确诊病例
		handleIsConfirm(data) {
			// console.log("is-confirm-change:",data)
		},
		// 是否属于管控人员
		handleIsControlUser(data) {
			// console.log("data:",data.detail)
			const value = data.detail.value
			this.controlCheckOptions = this.setControlCheckOptions(this.controlCheckOptions,value)
		},
		// 管控状态
		handleControlStatus(data) {
			// console.log("data:",data.detail)
		},
		async onSubmit () {
			try {				
				const formRes = await this.handleSubmitValid()
				console.log("formRes:",formRes)
				uni.showModal({
					title: '确认操作',
					content: '是否确认提交',
					success: res => {
						if (res.confirm) {
							// console.log("form-data:",this.formData)
							const {
								officePlace, // 办公地址
								temperature, // 今日温度
								healthStatus, // 健康码状态
								previousYardStatus, // 上一码状态
								nucleicCheckResult, // 最近1次检测状态
								isDiagnosis, // 是否确诊病例
								isControlUser, // 是否属于管控人员
								// controlStatus, // 管控状态
								controlFile,  // 解除隔离通知书 controlFile[0].uploadData
								nucleicCheckFile, // 最近一次检测结果 nucleicCheckFile[0].uploadData
								...other
							} = formRes
							// console.log("form-data:",formRes)
							let otherFields = {
								officePlace: this.handleFieldsTransform(this.placeRadioOptions,officePlace), 
								temperature: this.handleFieldsTransform(this.todayTemperatureRadioOptions,temperature), 
								healthStatus: this.handleFieldsTransform(this.codeStatuRadioOptions,healthStatus), 
								previousYardStatus: this.handleFieldsTransform(this.prevStatusRadioOptions,previousYardStatus), 
								nucleicCheckResult: this.handleFieldsTransform(this.checkResultOptions,nucleicCheckResult), 
								isDiagnosis: this.handleFieldsTransform(this.isConfirmRadioOptions,isDiagnosis), 
								isControlUser: isControlUser.join(','), 
								// isControlUser: this.handleFieldsTransform(this.controlCheckOptions,isControlUser), 
								// controlStatus: this.handleFieldsTransform(this.controlRadioOptions,controlStatus) 
							}
							// console.log("otherFields:",otherFields)
							let params = {
								...otherFields,
								...other
							}
							if (controlFile && controlFile.length) {
								const {prefix, url} = controlFile[0].uploadData
								params.controlFile = `${url}`
							}
							if (nucleicCheckFile && nucleicCheckFile.length) {
								const {prefix, url} = nucleicCheckFile[0].uploadData
								params.nucleicCheckFile = `${url}`
							}
							// console.log("params:",params)
							saveDailyReport(params).then(res =>{
								uni.showToast({
									title: '提交成功',
									icon: 'success'
								})
								uni.navigateTo({
									url: '/pages-sub-one/daily-report/report-success'
								})
							}).catch(err =>{
								console.log("数据保存失败:",err)
							})
						}
					}
				});
			} catch(err) {
				console.log("err:",err)
			}
		},
		/**
		 * 根据相关状态清空当前的数据
		 * */
		handleParamsData (data) {
			let result = { ...data }
			// 办公场地
			if (result.officePlace != '0') {
				result.officePlaceOther = ''
			}
			// 疫苗接种情况
			if (result.inoculationCount == 0) {
				result.inoculationLastTime = ''
			}
			// 当前健康码状态
			if (result.healthStatus == '1' ) {
				if (result.previousYardStatus) {
					result.previousYardStatus = ''
					result.previousYardReason = ''
					result.previousYardStartTime = ''
					result.previousYardEndTime = ''	
				}
			} else {
				// 上一码状态
				if (result.previousYardStatus == '1') {
					result.previousYardReason = ''
					result.previousYardStartTime = ''
					result.previousYardEndTime = ''		
				}
			}
			// 最近1次核酸检测情况
			if (result.detectionCount == 0) {
				result.nucleicCheckTime = ''
				result.nucleicCheckResult = ''
				result.nucleicCheckFile = ''
			}
			// 管控状态
			if (result.controlStatus == '4') {
				result.controlAdress = ''
				result.controlStartTime = ''
				result.controlEndTime = ''
			}
			if (result.controlStatus != '1') {
				result.controlFile = ''
			}
			return result
		},
		handleSubmitValid () {
			console.log("formData:",this.formData)
			return new Promise((resolve,reject) => {
				this.$refs.formRef.validate().then(res => {
					res = this.handleParamsData(res)
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		},
		/**
		 * 字段转换 数字转文字
		 * @param {array} source 数据源
		 * @param {array} values 当前选中的数据
		 * @return {string}
		 * */
		handleFieldsTransform (source,value) {
			// console.log("source:",source, 'value',value)
			if (!Array.isArray(source) || !value || value.lenght == 0 ) return ''
			const filterArr = source.filter(item => value.includes(item.value) || value == item.value)
			// console.log("filterArr:",filterArr)
			const result = filterArr.reduce((prev,curr) => {
				return prev.concat(curr.text)
			},[])
			return result.join(',')
		},
		/**
		 * 字段逆转换 文字转数字
		 * @param {array} source 数据源
		 * @param {array} values 当前选中的数据
		 * @param {boolean} isReturnString 是否返回字符串，默认为true
		 * @return {string | array}
		 * */
		handleFieldsReverseTransform (source, value, isReturnString = true) {
			// console.log("source:",source, 'value',value)
			if (!Array.isArray(source) || !value || value.lenght == 0 ) return ''
			value = value.split(",")
			const filterArr = source.filter(item => value.includes(item.text) || value == item.text)
			// console.log("filterArr:",filterArr)
			const result = filterArr.reduce((prev,curr) => {
				return prev.concat(curr.value)
			},[])
			return isReturnString ? result.join(',') : result
		},
		/**
		 * 设置是否属于管控人员options
		 * @param {array} source 数据源
		 * @param {array} values 当前选中的数据
		 * */
		setControlCheckOptions (source,values) {
			let result = []
			if (!values.length) {
				result = source.map((item,index) => ({
					...item,
					disabled: false
				}))
				return result
			}
			// 是否选择了，我是正常人员
			const isHas = values.includes('10')
			result = result = source.map((item,index) => {
				let temp = { ...item}
				if (isHas) {
					temp.disabled = source.length - 1 !== index
				} else {
					temp.disabled = source.length - 1 === index
				}
				return temp
			})
			return result
		}
	},
};
</script>

<style lang="scss" scoped>
.page-report-form {
	background: #fff;
	font-size: 28rpx;
	color: rgb(16, 16, 16);
	padding: 20rpx 20rpx 20rpx;
	
	.grey-bg {
		background: #f6f6f6;
		border-radius: 8rpx;
		padding: 44rpx 32rpx;
	}
	
	.pd-32 {
		padding: 0 32rpx;
	}
	
	.page-footer {
		
	}
	
	.page-fab {
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
	
	button {
		background: #1989fa;
	}
	
}
.form-group {
	line-height: 56rpx;
	margin-bottom: 40rpx;
	
	.form-group--title {
		font-weight: 700;
		padding-bottom: 20rpx;
		
		&:before {
			display: line-block;
			content: '*';
			color: red;
		}
	}
	
	.form-group--content {
		
		.grey-txt {
			color: #ccc;
		}
		
		.other-place {
			margin-bottom: 0;
		}
		
		&.check-block {
			/deep/ .uni-data-checklist {			
				.checklist-group {
					display: flex;
					flex-direction: column;
					
					.checklist-box {
						margin: 16rpx 10rpx 16rpx 0;
					}
				}
			}
		}
	}
	
	.group-last-item {
		/deep/ .uni-forms-item__inner {
			padding-bottom: 0;
			margin-bottom:0;
		}
	}
		
	/deep/ .uni-forms-item {
		// font-size: 48rpx;
		// padding: 0 30rpx 0 40rpx;
		
		.uni-forms-item__label {
			// width: 160rpx !important;
		}
		
		.uni-forms-item__content {
			
			.input-value {
				background: #fff;
			}
			
			.input-value-border {
				border: none;
				
			}
			
			.is-input-border {
				border: none;
			}
		}
		
		.uni-forms-item__inner {
			
		}
		
		.uni-error-message {
			bottom: -38rpx;
		}
		
		.uni-easyinput {
			overflow: hidden;
			background: #fff;
			border: 1rpx solid #ccc;
			border-radius: 8rpx;
			
			.is-disabled {
				color: #999;
			}
			
			.uni-easyinput__content {
				background: #fff !important;
				
				&.is-textarea {
					background: #fff;
				}	
				
				.uni-easyinput__content-textarea {
					font-size: 28rpx;
					line-height: 32rpx;
					padding: 20rpx;
				}
			}
		}
		
		.uni-date {
			overflow: hidden;
			border: 1rpx solid #ccc;
			border-radius: 8rpx;
			
			.uni-date-x--border {
				border: none;
			}
		}
		
		.uni-data-tree {
			
			.input-value-border {
				border-color: #ccc;
			}
		}
		
		.uni-date__x-input {
			font-size: 28rpx;
		}
		
		.selected-area {
			color: #999;
			padding-left: 5px;
		}
	}
}


/deep/ .uni-data-checklist .checklist-group .checklist-box .checklist-content .checklist-text {
	font-size: 28rpx;
}

/deep/ .uni-forms-item__label .label-text {
	font-size: 28rpx;
}
</style>
