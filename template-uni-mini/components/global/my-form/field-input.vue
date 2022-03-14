<template>
	<view class="components-field-input">
		<uni-easyinput v-model="currValue" v-bind="bindAttr" />
	</view>
</template>

<script>
// 参考链接: https://uniapp.dcloud.io/component/uniui/uni-easyinput
// input属性
const ATTR_ENUMS = {
	type: 'type', // 输入框的类型（默认text），类型：String (值：text/textarea/password/number/idcard/digit)
	clearable: 'clearable', // 是否显示右侧清空内容的图标控件(输入框有内容且不禁用时显示)，点击可清空输入框内容，类型：Boolean
	placeholder: 'placeholder', // 输入框的提示文字，类型：String
	disabled: 'disabled', // 是否不可输入，类型：Boolean
	maxlength: 'maxlength', // 最大输入长度，设置为 -1 的时候不限制最大长度，类型：Number
	autoHeight: 'autoHeight', // 是否自动增高输入区域，type为textarea时有效，类型：Boolean
	prefixIcon: 'prefixIcon', // 输入框头部图标，类型：String
	suffixIcon: 'suffixIcon', // 输入框尾部图标，类型：String
	inputBorder: 'inputBorder', // 是否显示input输入框的边框，类型：Boolean
	focus: 'focus', // 是否自动获得焦点，类型：Boolean
	placeholderStyle: 'placeholderStyle', // placeholder的样式(内联样式，字符串)，如"color: #ddd"，类型：String
	clearSize: 'clearSize', // 清除图标的大小，单位px，类型：Number
	passwordIcon: 'passwordIcon', // type=password 时，是否显示小眼睛图标，类型：Boolean
	styles: 'styles', // 样式自定义，类型：Object (值：{color: #333, disableColor: #eee, borderColor: #e5e5e5})
	confirmType: 'confirmType', // 设置键盘右下角按钮的文字，仅在type="text"时生效，类型：String (值：send/search/next/go/done)
	trim: 'trim' // 是否自动去除空格，传入类型为 Boolean 时，自动去除前后空格，类型：Boolean (值：both/left/right/all/none)
}
// input事件
const EVENT_ENUMS = {
	'@input': '@input', // 输入框内容发生变化时触发
	'@focus': '@focus', // 输入框获得焦点时触发
	'@blur': '@blur', // 输入框失去焦点时触发	
	'@confirm': '@confirm', // 点击完成按钮时触发
	'@iconClick': '@iconClick', // 点击图标时触发 (返回值：prefix/suffix)
}
export default {
	data () {
		return {
			defaultAttr: {
				type: 'text',
				clearable: true,
				placeholder: '请输入',
				disabled: false
			}
		}
	},
	props: {
		value: {
			type: [String | Number]
		},
		attr: {
			type: Object,
			default () {
				return {}
			}
		}
	},
	computed: {
		bindAttr () {
			console.log("field-input-bind-attr :>> ",{ ...this.defaultAttr, ...this.attr })
			return { ...this.defaultAttr, ...this.attr }
		},
		currValue: {
			get() {
				return this.value
			},
			set(val) {
				this.$emit('input',val)
			}
		}
	},
	onLoad () {},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped></style>
