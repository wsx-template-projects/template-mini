/**
 * 页面类型
 */
export const ENUM_PAGE_LIST = [
	{
		id: 'page-1',
		text:'首页',
		url: '/pages/home/index',
		isWebUrl: false
	},
	{
		id: 'page-2',
		text:'登录页',
		url: '/pages-login/login/index',
		isWebUrl: false
	},
	{
		id: 'page-3',
		text:'webview',
		url: '/pages/webview/webview',
		isWebUrl: false
	},
]

/**
 * 功能类型
 */
export const ENUM_FUNCTION_LIST = [
	{
		id: 'function-1',
		text:'上报表单',
		url: '/pages-sub-one/daily-report/report-form',
		isWebUrl: false
	},
	{
		id: 'function-2',
		text:'上报记录',
		url: '/pages-sub-one/daily-report/report-record',
		isWebUrl: false
	},
	{
		id: 'function-3',
		text:'上报详情',
		url: '/pages-sub-one/daily-report/report-details',
		isWebUrl: false
	},
	{
		id: 'function-4',
		text:'上报统计',
		url: '/pages-sub-one/daily-report/data-statistics',
		isWebUrl: false
	},
]

/**
 * 其它类型
 */
export const ENUM_OTHER_LIST = [
	{
		id: 'other-1',
		text:'demo-form',
		url: '/pages-demo/demo-form/index',
		isWebUrl: false
	},
	{
		id: 'other-2',
		text:'demo-diy-form',
		url: '/pages-demo/demo-diy-form/index',
		isWebUrl: false
	},
]




export const CARD_LIST = [
	{
		id: 1,
		text:'每日疫情上报',
		url: '/pages-sub-one/daily-report/report-form',
		imgUrl: '',
		isWebUrl: false
	},
	{
		id: 2,
		text:'部门填报管理',
		url: '/pages-sub-one/daily-report/data-statistics',
		imgUrl: '',
		isWebUrl: false
	},
	{
		id: 3,
		text:'返岗申请',
		url: '',
		imgUrl: '',
		isWebUrl: true
	},
	{
		id: 4,
		text:'返岗审批',
		url: '',
		imgUrl: '',
		isWebUrl: true
	},
	{
		id: 5,
		text:'个人紧急情况上报',
		url: '',
		imgUrl: '',
		isWebUrl: true
	},
	{
		id: 6,
		text:'个人紧急情况上报审批',
		url: '',
		imgUrl: '',
		isWebUrl: true
	},
	{
		id: 7,
		text:'进场申请',
		url: '',
		imgUrl: '',
		isWebUrl: true
	},
	{
		id: 8,
		text:'进场审批',
		url: '',
		imgUrl: '',
		isWebUrl: true
	}
]