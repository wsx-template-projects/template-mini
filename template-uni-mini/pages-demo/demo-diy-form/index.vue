<template>
  <view class="page-report-form">
    <view class="page-form">
      <form @submit="onSubmit" @reset="onReset">
        <!-- 基本人员信息 -->
        <view class="form-group">
        	<view class="form-group__title">人员基本信息</view>
			<view class="form-group__content">
				<my-field 
					class="" 
					v-model="formData.userName" 
					name="userName" 
					label="姓名" 
					placeholder="请输入姓名"
					disabled
				/>
				<my-field 
					class="" 
					v-model="formData.phone" 
					name="phone" 
					label="联系电话" 
					placeholder="请输入联系电话"
					disabled
				/>
				<my-field 
					class="" 
					v-model="formData.unitName" 
					name="unitName" 
					label="所在单位" 
					placeholder="请输入所在单位"
					disabled
				/>
				<my-field 
					class="" 
					v-model="formData.deptName" 
					name="deptName" 
					label="所在部门" 
					placeholder="请输入所在部门"
					disabled
				/>
				<my-field 
					class="" 
					v-model="formData.address" 
					type="textarea" 
					name="address" 
					:is-block="true" 
					label="家庭住址" 
					placeholder="请输入家庭住址" 
				/>
			</view>
        </view>
		
		<!-- 办公场地 -->
		<view class="form-group">
			<view class="form-group__title">办公场地</view>
			<view class="form-group__content">  
				<my-field v-model="formData.place" type="radio" :options="placeRadioOptions" @input="handlePlaceInput">
					<template v-slot="{item,index}">
						<my-field
							class="other-place" 
							v-model="placeOther" 
							type="text" 
							name="placeOther" 
							placeholder="请输入"
							v-if="item.name === '其它' && isShowPlaceOther"
						/>
					</template>
				</my-field>
			</view>
		</view>
		
		<!-- 今日体温 -->
		<view class="form-group">
			<view class="form-group__title">今日体温</view>
			<view class="form-group__content">  
				<my-field v-model="formData.todayTemperature" type="radio" :options="todayTemperatureRadioOptions"></my-field>
			</view>
		</view>
		
		<!-- 疫苗接种情况 -->
		<view class="form-group">
			<view class="form-group__title">疫苗接种情况</view>
			<view class="form-group__content">  
				<my-field 
					v-model="formData.inspectNumber" 
					type="text" 
					name="inspectNumber" 
					label="打了几针" 
					placeholder="请输入"
				></my-field>
				<my-field 
					v-model="formData.inspectNumber" 
					type="picker-date" 
					name="inspectNumber" 
					label="最后一针时间" 
					placeholder="请输入检测次数"
				></my-field>
			</view>
		</view>
		
		<!-- 当前健康码状态 -->
		<view class="form-group">
			<view class="form-group__title">当前健康码状态</view>
			<view class="form-group__content">  
				<my-field v-model="formData.codeStatu" type="radio" :options="codeStatuRadioOptions"></my-field>
			</view>
		</view>
		
		<!-- 自2021年12月1日以来已做核酸检测次数 -->
		<view class="form-group">
			<view class="form-group__title">自2021年12月1日以来已做核酸检测次数</view>
			<view class="form-group__content">  
				<my-field v-model="formData.inspectNumber" type="text" name="inspectNumber" label="检测次数" placeholder="请输入检测次数"></my-field>
			</view>
		</view>
		
		<!-- 是否确诊病例 -->
		<view class="form-group">
			<view class="form-group__title">是否确诊病例</view>
			<view class="form-group__content">  
				<my-field v-model="formData.isConfirm" type="radio" :options="isConfirmRadioOptions"></my-field>
			</view>
		</view>

        <!-- 是否属于管控人员 -->
        <view class="form-group">
			<view class="form-group__title">是否属于管控人员</view>
			<view class="form-group__content">  
				<my-field v-model="formData.controlPerson" type="check" :options="controlCheckOptions"></my-field>
			</view>
        </view>
        
		<!-- 管控状态 -->
		<view class="form-group">
			<view class="form-group__title">管控状态</view>
			<view class="form-group__content">	  
				<my-field v-model="formData.controlStatus" type="radio" :options="controlRadioOptions"></my-field>
			</view>
        </view>

        <!--  -->
        <view>
          <view class="uni-form-item uni-column">
            <label>管控地点</label>
            <view class="uni-textarea">
              <textarea
                placeholder-style="color:#ccc"
                placeholder="请输入管控地址"
              />
            </view>
          </view>
        </view>

        <view class="uni-btn-v">
          <button type="primary" form-type="submit">登录</button>
        </view>
      </form>
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
} from "../enums/index.js"
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
	.page-report-form {
		color: rgb(16, 16, 16);
		padding: 20rpx 20rpx 0;
	}
	.form-group {
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
</style>
