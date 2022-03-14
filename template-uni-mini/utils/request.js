// 请求模块
import config from '@/config'
import store from "@/store"

// console.log("config:",config)
// console.log("store:",store)

// 提示框
const showToast = (msg,icon)=>{
  uni.showToast({
    title:msg,
    icon:icon,
    mask:true,
    duration:2000
  })
}

// 发送请求
const request = (options)=>{
	// console.log("option:",options)
	// 遮罩
	uni.showLoading({ mask:true })
	return new Promise((resolve,reject)=>{
		uni.request(
			{
				url:config.base_url + options.url,
				method:options.method || 'POST',
				data:options.data || {},
				header:{
					'Content-Type': 'application/json;charset=UTF-8',
					// 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
					'Authorization': 'Bearer ' + store.state.user.token,
					// 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMTExMTExMTExMSIsImV4cCI6MTY0MzE3MjgxMCwibG9naW5fdXNlcl9rZXkiOiIxMTExMTExMTExMSJ9.FLbK8L_Dwf82X9NWfmTg7_YAnbamRL3jYBI1lFUjR027xwZF6lMxmNOOE4az5Lhb78YOVuFiAH5OQf11qR1mqA',
					// 'session': store.state.user.session,
				},
				success(res){
					uni.hideLoading();
					if(res.data){
						let code = res.data.code;
						let message = res.data.message;
						if(code == 200) {
							resolve(res.data);
						} else if(code == '401' && message.indexOf('token无效')>-1){
							store.commit('REMOVE_INFO')
							showToast(message,'none');
							setTimeout(() => {
								uni.reLaunch({
									url: "/pages/home/index",
								});
							},1500)
						} else {
							showToast(message,'none');
							reject(res.data)
						}
					}else{
						showToast('网络走神了，请重试','none');
						reject();
					}
				},
				fail(err){
					uni.hideLoading();
					showToast('网络走神了，请重试','none');
					reject(err);
				},
				complete(){
					uni.stopPullDownRefresh();
				}
			}
		)
	})
}

export default request