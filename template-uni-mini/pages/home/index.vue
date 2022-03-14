<template>
	<view class="sg-page page-home">
		<view class="sg-flexbox wrap justify-between">
			<view class="item sg-flexbox justify-center align-center" v-for="(item,index) in list" :key="item.id" @click="jumpPage(item,index)">
				<view :class="['item-img',`item-${index}`]"></view>
			</view>
		</view>
	</view>
</template>

<script>
import { wxAuth,loginCode } from "@/api/login"
import {CARD_LIST} from "./home-enums.js"
import { mapState } from "vuex"
export default {
	data () {
		return {
			list: CARD_LIST
		}
	},
	computed: {
		...mapState({
			token: state => state.user.token,
			userInfo: state => state.user.userInfo
		})
	},
	onLoad () {
		// uni.showLoading({ mask:true })
		// setTimeout(() => {
		// 	uni.hideLoading();
		// },6000)
	},
	methods: {
		jumpPage(item,index) {
			// console.log("item:",item)
			// console.log("index:",index)
			// if (true) {
			// 	uni.navigateTo({ url })
			// 	return
			// }
			const token = this.token
			// const token = this.token || 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMTExMTExMTExMSIsI…EzjGjO4MMf4UQ4iF_Z9oQJ6ilaRwouiZP4MAVcRJs21utYutw'
			// console.log("token:",token)
			if (!token) {
				// console.log("没有登录:")
				// this.getWxAuth()
				const toUrl = `/pages-login/login/index?index=${index}&moduleName=home&type=${item.text}`
				uni.navigateTo({ url: toUrl })
				
			} else {
				// console.log("登录过:")
				// console.log("userInfo:",this.userInfo)
				const { preventionFillRoles } = this.userInfo
				if (index == 1 && (!preventionFillRoles || preventionFillRoles.indexOf('管理员') < 0)) {
					uni.showToast({
						title: '您当前没有操作此业务的权限!',
						icon: 'none',
					})
				} else {
					let url = ''
					if (!item.isWebUrl) {
						url = item.url
					} else {
						// console.log("跳转外链")
						url = `/pages/webview/webview?moduleName=home&type=${item.text}`
					}
					// console.log("外链-url:", url)
					uni.navigateTo({ url })
				}
				
			}
		},
		async getWxAuth() {
			try {	
				const wxRes = await wxAuth()
				const loginRes = await loginCode()
				console.log("wx-res:",wxRes)
				console.log("login-res:",loginRes)
			}catch(err) {
				console.log("err:",err)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.page-home {
	padding: 54rpx 54rpx 60rpx;
	
	.item {
		width: 300rpx;
		height: 200rpx;
		// margin-bottom: 40rpx;
		margin-bottom: 20rpx;
		
		.item-img {
			display: block;
			width: 100%;
			height: 100%;
			
			&.item-0 {
				background: url('@/static/images/home/home-1.png') no-repeat;
				background-size: 100% 100%;
			}
			&.item-1 {
				background: url('@/static/images/home/home-2.png') no-repeat;
				background-size: 100% 100%;
			}
			&.item-2 {
				background: url('@/static/images/home/home-3.png') no-repeat;
				background-size: 100% 100%;
			}
			&.item-3 {
				background: url('@/static/images/home/home-4.png') no-repeat;
				background-size: 100% 100%;
			}
			&.item-4 {
				background: url('@/static/images/home/home-5.png') no-repeat;
				background-size: 100% 100%;
			}
			&.item-5 {
				background: url('@/static/images/home/home-6.png') no-repeat;
				background-size: 100% 100%;
			}
			&.item-6 {
				background: url('@/static/images/home/home-7.png') no-repeat;
				background-size: 100% 100%;
			}
			&.item-7 {
				background: url('@/static/images/home/home-8.png') no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	
	// .item {
	// 	font-size: 28rpx;
	// 	color: rgb(0, 105, 205);
	// 	text-align: center;
	// 	line-height: 50rpx;
	// 	border: 1rpx solid rgb(0, 105, 205);
	// 	border-radius: 10rpx;
	// 	margin-bottom: 40rpx;
	// 	padding: 0 50rpx;
	// 	box-sizing: border-box;
	// }
}
</style>
