/**
 * web外链相关配置
 */
import config from "@/config"

/**
 * 个人紧急情况上报 - 类型
 */
const APPLY_TYPES = [
    {
        type: 'QZBB',
        label: '确诊或疑似情况报备',
    },
    {
        type: 'MJBB',
        label: '密接或密接的密接情况报备',
    },
    {
        type: 'QTBB',
        label: '其它8类情况报备',
    },
]

/**
 * 外链 url
 */
const CONFIG_WEB_URLS = {
	// 外链测试地址
	dev: {
		home: {
			// 返岗申请
			'返岗申请':'/control-relieve?taskType=1',
			// 返岗审批
			'返岗审批':'/control-relieve?taskType=2',
			// 个人紧急情况上报
			'个人紧急情况上报': '/report-process/report-type?taskType=apply',
			// 个人紧急情况上报审批
			'个人紧急情况上报审批': '/report-process?taskType=audit',
			// 进场申请
			'进场申请': '/admission-apply?taskType=apply',
			// 进场审批
			'进场审批': '/admission-apply?taskType=audit',
			// 申请入口 (物业查看申请进场人员)
			'申请入口': '/admission-apply?taskType=other',
		}	
	},
	// 外链正式地址
	prod: {
		home: {
			// 返岗申请
			'返岗申请':'/zql-wx-mobile/control-relieve?taskType=1',
			// 返岗审批
			'返岗审批':'/zql-wx-mobile/control-relieve?taskType=2',
			// 个人紧急情况上报
			'个人紧急情况上报': '/zql-wx-mobile/report-process/report-type?taskType=apply',
			// 个人紧急情况上报审批
			'个人紧急情况上报审批': '/zql-wx-mobile/report-process?taskType=audit',
			// 进场申请
			'进场申请': '/zql-wx-mobile/admission-apply?taskType=apply',
			// 进场审批
			'进场审批': '/zql-wx-mobile/admission-apply?taskType=audit',
			// 申请入口 (物业查看申请进场人员)
			'申请入口': '/zql-wx-mobile/admission-apply?taskType=other',
		}
	}
}

const LINK_URLS = CONFIG_WEB_URLS[config.VUE_APP_ENV]

/**
 * 获取 web-url 
 * @param {string} moduleName 模块名 (外链所在的页面)
 * @param {string} type 外链类型
 */
function getWebUrl (moduleName,type,param) {
	const configData = LINK_URLS[moduleName]
	// console.log("config:",configData)
	if (!configData) {
		console.warn('外链所在的页面配置不存在，请前往 /pages/webview/config_url 查看一下')
		return
	}
	if (!configData[type]) {
		console.warn('外链类型不存在，请前往 /pages/webview/config_url 查看一下')
		return
	}
	// console.log("link-url:", `${config.web_domain}${configData[type]}`)
	return `${config.web_domain}${configData[type]}`
}

export default {
	// 获取外链URL
	getWebUrl
}