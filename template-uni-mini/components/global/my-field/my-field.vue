<!-- 
	自定义 input - 组件
 -->
<template>  
    <view class="item-field uni-form-item uni-column" :class="{'field--block': isBlock}">
		<view class="item-field--label" :style="{width: labelWidth}" v-if="label">	
			<label class="">{{labelTxt}}</label>
		</view>
		<view class="item-field--content sg-flex-1">	
			<input 
				class="field-text"
				:class="{'is-disabled': disabled}"
				:type="type"
				:name="name"
				:value="value"
				:disabled="disabled"
				:placeholder="placeholder" 
				@input="onInput"
				 v-if="isInputEl"
			/>
			<textarea 
				class="field-textarea" 
				:placeholder-style="placeholderStyle" 
				:disabled="disabled"
				:placeholder="placeholder"
				v-if="isTextareaEl"
			/>
			
			<!-- radio-group -->
			<radio-group class="field-radio-group" @change="radioChange" v-if="isRadioGroupEl">
				<label 
					class="radio-item sg-flexbox align-center" 
					v-for="(item, index) in options" 
					:key="item.value"
				>
					<view>
						<radio :value="item.value" :checked="item.value == defaultChecked" />
					</view>
					<view>{{item.name}}</view>
					
					<view class="slot-box">	
						<slot :item="item" :index="index"  />
					</view>
				</label>
			</radio-group>
			
			<!-- check-group -->
			<checkbox-group class="field-check-group" @change="checkboxChange" v-if="isCheckGroupEl">
				<label
					class="check-item sg-flexbox align-center"
					v-for="item in options"
					:key="item.name"
				>
					<view>
					  <checkbox :value="item.value" :checked="item.checked"></checkbox>
					</view>
					<view>{{ item.name }}</view>
				</label>
			</checkbox-group>
			
			<picker 
				mode="date" 
				:value="date" 
				:start="dateOptions[0]" 
				:end="dateOptions[1]" 
				@change="changePickerDate"
				v-if="isPickerDateEl"
			>
				<view class="uni-input">{{date}}</view>
			</picker>
		</view>
    </view>  
</template>  

<script>  
import tools from "@/utils/tools.js"
export default {  
	name: 'MyField',  
	behaviors: ['uni://form-field'],
	data () {
		return {
			date: tools.getFieldDate({
				format: true
			})
		}
	},
	props: {
		label: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'text'
		},
		name: {
			type: String,
			default: 'test'
		},
		placeholder: {
			type: String,
			default: ''
		},
		placeholderStyle: {
			type: String,
			default: 'color: #ccc'
		},
		// 默认为 160rpx
		labelWidth:{
			type: String,
			default: '160rpx'
		},
		isBlock: {
			type: Boolean,
			default: false
		},
		// 是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		defaultChecked: {
			type: String,
			default: ''
		},
		// {value: '', name: ''}
		options: {
			type: Array,
			default () {
				return []
			}
		},
		dateOptions: {
			type: Array,
			default () {
				return [tools.getFieldDate('start'),tools.getFieldDate('end')]
			}
		}
	},
	computed: {
		labelTxt() {
			return this.label
		},
		isInputEl () {
			return this.type == 'text'
		},
		isTextareaEl () {
			return this.type == 'textarea'
		},
		isRadioGroupEl () {
			return this.type == 'radio'
		},
		isCheckGroupEl () {
			return this.type == 'check'
		},
		isPickerDateEl () {
			return this.type == 'picker-date'
		}
	},
	methods: {  
		 changePickerDate: function(e) {
			this.date = e.target.value
			console.log("curr-date-value:",e.target.value)
			this.$emit('input', e.target.value)  
		},
		onInput(e) {
			console.log("inputVal:",e.detail.value)
			this.$emit('input', e.detail.value)  
		},
		radioChange: function(e) {
			let currVal = ""
			for (let i = 0; i < this.options.length; i++) {
				if (this.options[i].value === e.detail.value) {
					currVal = e.detail.value
					break;
				}
			}
			console.log("curr-input-value:", currVal)
			this.$emit('input', currVal) 
		},
		checkboxChange(e) {
		  console.log("check-el:",e);
		  let checked = e.target.value;
		  console.log("checked-value:", checked)
		  let changed = {};
		  for (let i = 0; i < this.options.length; i++) {
			if (checked.indexOf(this.options[i].name) !== -1) {
			  changed["options[" + i + "].checked"] = true;
			} else {
			  changed["options[" + i + "].checked"] = false;
			}
		  }
		},
	}  
}  
</script>  

<style lang="scss" scoped>
$disabledColor: #b5b5b5;
.item-field {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
	
	&.field--block {
		display: block;
	}
	
	.item-field--label {
		// width: 160rpx;
		color: rgb(130, 128, 128);
	}
	.field-text {
		height: 60rpx;
		font-size: 24rpx;
		border: 1rpx solid #999;
		border-radius: 6rpx;
		padding-left: 10rpx;
		
		&.is-disabled {
			color: $disabledColor;
			border-color: $disabledColor;
		}
	}
	
	.field-textarea {
		width: 100%;
		height: 200rpx;
		font-size: 24rpx;
		border: 1rpx solid #ccc;
		border-radius: 10rpx;
		padding: 20rpx 0 0 20rpx;
	}	
	
	.field-radio-group {
		.radio-item {
			padding: 10rpx 0;
			
			.slot-box {
				margin-left: 40rpx;
			}
		}
	}
	
	.field-check-group {
		.check-item {
			padding: 10rpx 0;
		}
	}

}
</style>