import {login} from "@/api/login"

// 用户相关
const state = {
	token: '',
	session: '',
	// 用户信息
	userInfo: {}
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_SESSION: (state, session) => {
		state.session = session
	},
	SET_USER_INFO: (state, userInfo) => {
		// console.log("userInfo:",userInfo)
		state.userInfo = userInfo
	},

	// token失效清空用户信息以及token
	REMOVE_INFO: (state) => {
		// console.log("userInfo:",userInfo)
		state.userInfo = {}
		state.token = ''
	}
}

const getters = {
	userInfo: state => state.userInfo
}

const actions = {
	login({commit},params) {
		return new Promise((resolve,reject) =>{
			login(params).then(res => {
				// console.log("login-res",res)
				const data = res.data
				commit('SET_TOKEN',data?.token)
				commit('SET_USER_INFO',data?.epidemicAppletUserResponse)
				resolve(data)
			}).catch(err => {
				reject(err)
			})
		})
	},
	 // 缓存用户信息
	setUserInfo({
		commit
	}, userInfo) {
		commit('SET_USER_INFO', userInfo)
	}
}


export default {
	state,
	mutations,
	getters,
	actions
}
