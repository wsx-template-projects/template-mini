import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app.js'
import user from './modules/user.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 数据持久化
const vuexPersisted = new createPersistedState({
    storage: {
    	getItem: key => uni.getStorageSync(key),
        setItem: (key, value) => uni.setStorageSync(key, value),
        removeItem: key => uni.clearStorageSync(key)
    }
})

const store = new Vuex.Store({
    modules: {
		app,
    	user
    },
    plugins:[vuexPersisted]
})

export default store
