<template>
  <view class="page-demo-form">
    <view class="page-form">
		
		<uni-forms class="group-form" :modelValue="formData">
			<!-- field-input -->
		    <uni-forms-item class="form-item" label="input" name="name">
				<!-- 常规 -->
		        <uni-easyinput type="text" v-model="formData.name" placeholder="请输入" />
				<!-- 密码框 -->
				<uni-easyinput v-model="formData.name" type="password" placeholder="请输入" />
				<!-- 多行文本 -->
				<uni-easyinput type="textarea" v-model="formData.name" autoHeight placeholder="请输入" />
				<!-- 输入框尾部会显示清除按钮 -->
		        <uni-easyinput type="text" v-model="formData.name" clearable placeholder="请输入" />
				<!-- 输入框头部图标 -->
				<uni-easyinput prefixIcon="search" v-model="formData.name" placeholder="请输入" @iconClick="onClick" />
				<!-- 展示输入框尾部图标 -->
				<uni-easyinput suffixIcon="search"  v-model="formData.name" placeholder="请输入" @iconClick="onClick" />
				<!-- 禁用 -->
				<uni-easyinput v-model="formData.name" placeholder="请输入" disabled />
				<!-- 取消输入框的边框 -->
				<uni-easyinput :inputBorder="false" placeholder="请输入" />
		    </uni-forms-item>
			
			<!-- field-radio -->
			<uni-forms-item label="radio" name="radioVal">
			    <uni-data-checkbox v-model="formData.radioVal" :localdata="range" @change="change"></uni-data-checkbox>
			</uni-forms-item>
			
			<!-- field-checked -->
			<uni-forms-item label="checkbox" name="checkboxVal">
			    <uni-data-checkbox v-model="formData.checkboxVal" :multiple="true" :localdata="range" @change="change"></uni-data-checkbox>
			</uni-forms-item>
			
			<!-- field-select -->
			<uni-forms-item label="select" name="address">
			    <uni-combox :candidates="checkResultOptions" placeholder="请选择检测结果" v-model="formData.checkResult"></uni-combox>
			</uni-forms-item>
			
			<!-- field-datetime -->
			<uni-forms-item label="datetime" name="address">
				<!-- type = date/daterange/datetime/timestamp/range/datetimerange -->
			    <uni-datetime-picker
					type="date"
					:value="single"
					start="2021-3-20"
					end="2022-6-20"
					@change="change"
				/>
				<uni-datetime-picker
					type="range"
					:value="single"
					start="2021-3-20"
					end="2022-6-20"
					@change="change"
				/>
				<uni-datetime-picker
					type="daterange"
					:value="single"
					start="2021-3-20"
					end="2022-6-20"
					@change="change"
				/>
				<uni-datetime-picker
					type="timestamp"
					:value="single"
					start="2021-3-20"
					end="2022-6-20"
					@change="change"
				/>
				<uni-datetime-picker
					type="datetime"
					:value="single"
					start="2021-3-20"
					end="2022-6-20"
					@change="change"
				/>
				<uni-datetime-picker
					type="datetimerange"
					:value="single"
					start="2021-3-20"
					end="2022-6-20"
					@change="change"
				/>
			</uni-forms-item>
		</uni-forms>
		<view class="group-btns">
			<button type="primary" @click="onSubmit">提交</button>
		</view>
    </view>
  </view>
</template>

<script>
import MyField from "@/components/global/my-field/my-field.vue"
import {
	PLACE_RADIO_OPTIONS,
	TODAY_TEMPERATURE_RADIO_OPTIONS,
	CODE_STATU_RADIO_OPTIONS,
	IS_CONFIRM_RADIO_OPTIONS,
	CONTROL_RADIO_OPTIONS,
	CONTROL_CHECK_OPTIONS,
} from "./enums/index.js"
export default {
	components: {
		MyField
	},
	data() {
		return {
			isShowPlaceOther: false,
			placeOther: '',
			formData:{
				userName:'张明',
				phone: '13111111111',
				unitName: '所在单位-省知识产权保护中心',
				deptName: '所在部门-办公室',
				address: '',
				place: '',
				todayTemperature:'',
				codeStatu:'',
				inspectNumber: '',
				isConfirm: '',
				controlPerson: '',
				controlStatus: ''
			},
			checkResultOptions: [
				'阴性',
				'阳性'
			],
			range: [{"value": 0,"text": "篮球"    },{"value": 1,"text": "足球"},{"value": 2,"text": "游泳"}],
			single: "",
		};
	},
	computed: {
		// 办公场地
		placeRadioOptions () {
			return [...PLACE_RADIO_OPTIONS]
		},
		// 当前健康码状态
		todayTemperatureRadioOptions () {
			return [...TODAY_TEMPERATURE_RADIO_OPTIONS]
		},
		// 今日体温
		codeStatuRadioOptions () {
			return [...CODE_STATU_RADIO_OPTIONS]
		},
		// 是否确诊病例
		isConfirmRadioOptions () {
			return [...IS_CONFIRM_RADIO_OPTIONS]
		},
		// 是否属于管控人员
		controlRadioOptions () {
			return [...CONTROL_RADIO_OPTIONS]
		},
		// 管控状态
		controlCheckOptions () {
			return [...CONTROL_CHECK_OPTIONS]
		}
	},
	onLoad() {
		console.log("onLoad");
	},
	methods: {
		handlePlaceInput (data) {
			console.log("data:",data)
			this.placeOther = ''
			const currData = this.placeRadioOptions.find(item => item.value === data)
			// console.log("currData:",currData)
			this.isShowPlaceOther = currData?.name === '其它'
		}
	},
};
</script>

<style lang="scss" scoped>
.page-demo-form {
	color: rgb(16, 16, 16);
	padding: 20rpx 20rpx 0;
}

.group-form {
	font-size: 24rpx;
	line-height: 56rpx;
	margin-bottom: 20rpx;
	
	.form-group__title {
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}
	
	.form-group__content {
		padding: 0 40rpx;
		
		.other-place {
			margin-bottom: 0;
		}
	}
}

.group-btns {
	padding-bottom: 20rpx;
}
</style>
