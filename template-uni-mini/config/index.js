// console.log("ENV:",process.env)
// console.log("NODE_ENV:",process.env.NODE_ENV)

// const ENV = 'dev'

/**
 * 环境变量，测试环境: dev 正式环境: prod
 * 上传正式包前请先修改环境变量值
 */
const ENV_CONFIG = {
	VUE_APP_ENV: 'dev',
	IS_OPEN_MOCK: true
}


/**
 * 小程序相关配置
 * @param {string} base_url 接口前缀
 * @param {string} web_domain 外链域名
 */
const MINI_CONFIG = {
	dev: {
		// base_url: 'http://192.168.5.224:8080', // 后端本地接口前缀
		// base_url: 'http://192.168.1.197:8000' // 测试服接口前缀
		base_url: 'https://hxusert.natapp4.cc', // 测试服接口前缀 （http://192.168.1.197:8000映射到该域名）
		// web_domain: 'http://192.168.2.57:8080' // 测试
		web_domain: 'http://192.168.1.147:3840' // 测试
    	// web_domain: 'http://192.168.2.29:8080'
	},
	prod: {
		base_url: 'https://sbfl.zjamr.zj.gov.cn', // 生产环境
		web_domain: 'https://sbfl.zjamr.zj.gov.cn' // 正式
	}
}

const  config = {
	// env: ENV,
	appId: 'wx1c2580645f7e014b',
	...ENV_CONFIG,
	...MINI_CONFIG[ENV_CONFIG['VUE_APP_ENV']]
}

console.log("config_111:",config)

export default config 