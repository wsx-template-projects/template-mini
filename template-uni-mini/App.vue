
<script>
export default {
	onLaunch: function() {
		// console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
		// console.log('App Launch')
	},
	onShow: function() {
		// console.log('App Show')
	},
	onHide: function() {
		// console.log('App Hide')
	},
	methods: {
		getLogin () {
			uni.login({
				success: function(res) {
					// conosle.log("weixin-res:",res)
					// if (res.code) {
					// 	appModel.login({
					// 		code: res.code
					// 	}).then(response => {
					// 		this.$store.dispatch('setUserInfo', response.data)
					// 		//这里存储了之后，等再进入小程序获取数据或其它的Api交互时，就可以带上放在header头中去向服务端发起请求
					// 		uni.setStorageSync('AuthTokens', response.data.token)
					// 		uni.login({
					// 			success(response) {
					// 				uni.setStorageSync('wxCode', response.code);
					// 			}
					// 		})
					// 	}).catch(errors => {
					// 		console.error(errors)
					// 	})
					// }
				},
				fail: function() {
					uni.showToast({
						title: '微信登录失败',
						icon: 'none'
					})
				}
			})	
		}
	}
}
</script>

<style lang="scss">
	// 导入 vant 样式文件 
	// @import '@/wxcomponents/vant/dist/common/index.wxss';
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
