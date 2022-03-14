// 登录相关 - api
import config from "@/config"
import request from "@/utils/request"

/**
 * 发送验证码
 * @param {string} params.phone 手机号码
 */
export const sendCode = params => {
	return request({
		url: '/zwfw/epidemicStatistics/sendCodeByPhone',
		method: 'get',
		data: params
	})	
}

/**
 * 根据手机号登录
 * @param {string} params.phone 登录手机号
 * @param {string} params.validCode 验证码 (验证码已去掉)
 */
export const login = params => {
	return request({
		url: '/zwfw/epidemicStatistics/getAppletUserByPhone',
		method: 'post',
		data: params
	})	
}


/**
 * 刷新token  ==> 测试还没有调试，有问题
 */
export const refreshToken = async (options)=>{
  let token = uni.getStorageSync('minitoken');
  let param = {
    url:'refreshToken',
    data:config.miniApp,
  }
  param.data.token = token;
  const res = await request(param);
  uni.setStorageSync('minitoken',res.data);
  // 重新发起请求
  const resdata = await request(options);
  return resdata;
}



/**
 * 微信授权
 */
export const wxAuth = () => {
	return new Promise((resolve,reject) => {
		uni.getUserProfile({
			desc:'weixin',   
			success: res => {
				uni.showToast({title:"授权成功",icon:"none"});
				resolve(res)
			},
			fail: err =>{
				uni.showToast({title:"微信登录授权失败",icon:"none"});
				reject(err)
			}
		})
	})
}

/**
 * 登陆，获取code
 */
export const loginCode = () => {
	// 遮罩
	uni.showLoading({
	  mask:true
	})
	return new Promise((resolve,reject) => {
		uni.login({
			success(res) {
				console.log('获取code成功',res)
				resolve(res)
			},
			fail(err) {
				conosle.log("获取code失败:",err)
				reject(err)
			},
			complete: () => {
				uni.hideLoading()
			}
		})  
	})
}