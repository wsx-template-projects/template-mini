<template>
	<view class="container">
		
		<!-- <view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link> -->
		
		<button type="primary" size="mini" @click="jumpPage('/home/index')">首页</button>
		<button type="primary" size="mini" @click="jumpPage('/login/index')">登录页</button>
		<button type="primary" size="mini" @click="jumpPage('/daily-report/report-form')">上报表单</button>
		<button type="primary" size="mini" @click="jumpPage('/daily-report/report-record')">上报记录</button>
		<button type="primary" size="mini" @click="jumpPage('/daily-report/report-details')">上报详情</button>
		<button type="primary" size="mini" @click="jumpPage('/daily-report/data-statistics')">上报统计</button>
		<button type="primary" size="mini" @click="jumpPage('/webview/webview')">打开webview</button>
		<button type="primary" size="mini" @click="jumpPage('/page-demo/demo-form')">demo-form</button>
		<button type="primary" size="mini" @click="jumpPage('/page-demo/demo-diy-form')">demo-diy-form</button>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			jumpPage(path) {
				const url = `/pages${path}`
				// console.log("url:",url)
				uni.navigateTo({url})
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
