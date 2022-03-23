<template>
	<view class="sg-page">
		<!-- <view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link> -->
		<!-- 页面级 -->	
		<view class="group">
			<view>
				<text class="group-title">页面级</text>
				<view>		
					<button 
						class="group-btn" 
						type="primary" 
						size="mini" 
						@click="jumpPage(item)" 
						v-for="item in groupOneList" 
						:key="item.id"
					>{{item.text}}</button>
				</view>
			</view>
		</view>
		
		<!-- 功能级 -->
		<view class="group">
			<view>
				<text class="group-title">功能级</text>
				<view>		
					<button
						class="group-btn" 
						type="primary" 
						size="mini" 
						@click="jumpPage(item)" 
						v-for="item in groupTwoList" 
						:key="item.id"
					>{{item.text}}</button>
				</view>
			</view>
		</view>
		<!-- 其它 -->
		<view class="group">
			<view>
				<text class="group-title">其它</text>
				<view>		
					<button
						class="group-btn" 
						type="primary" 
						size="mini" 
						@click="jumpPage(item)" 
						v-for="item in groupThreeList" 
						:key="item.id"
					>{{item.text}}</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import { 
	ENUM_PAGE_LIST,
	ENUM_FUNCTION_LIST,
	ENUM_OTHER_LIST
} from "./enums.js"
export default {
	data() {
		return {
			href: 'https://uniapp.dcloud.io/component/README?id=uniui'
		}
	},
	computed: {
		groupOneList () {
			return ENUM_PAGE_LIST
		},
		groupTwoList () {
			return ENUM_FUNCTION_LIST
		},
		groupThreeList () {
			return ENUM_OTHER_LIST
		},
	},
	methods: {
		jumpPage(item) {
			console.log("item :>>",item)
			uni.navigateTo({url: item.url})
		}
	}
}
</script>

<style lang="scss" scoped>
.group {
	margin-bottom: 20rpx;
	
	.group-title {
		display: block;
		font-size: 32rpx;
		font-weight: 600;
		line-height: 32rpx;
		margin-bottom: 20rpx;
	}
	
	.group-btn {
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		// overflow: visible;
	}
}

</style>
