// 每日上报 - api
import request from "@/utils/request"

/**
 * 保存每日上报信息
 * @param {string} params.userName 姓名
 * @param {string} params.userPhone 联系电话
 * @param {string} params.deptName 单位名称
 * @param {string} params.orgName 部门名称
 * @param {string} params.address 家庭地址
 * @param {string} params.officePlace 办公场地（金汇大厦；天目山院区；下沙院区；其它）
 * @param {string} params.temperature; 今日体温（正常；异常）
 * @param {string} params.inoculationCount; 接种针数
 * @param {string} params.inoculationLastTime; 接种最后一针时间 "yyyy-MM-dd"
 * @param {string} params.healthStatus; 当前健康码状态（绿码；黄码；红码）
 * @param {string} params.detectionCount; 检测次数
 * @param {string} params.previousYardReason; 上一码状态原因
 * @param {string} params.previousYardStartTime; 上一码开始时间 "yyyy-MM-dd"
 * @param {string} params.previousYardEndTime; 上一码结束时间 "yyyy-MM-dd"
 * @param {string} params.nucleicCheckTime; 最近一次检测时间 "yyyy-MM-dd"
 * @param {string} params.nucleicCheckResult; 最近一次检测结果 
 * @param {string} params.nucleicCheckFile; 最近一次检测结果文件
 * @param {string} params.isDiagnosis; 是否确诊病例（是，否）
 * @param {string} params.isControlUser; 是否属于管控人员
 * @param {string} params.controlStatus; 管控状态（集中隔离医学观察；居家健康观察；日常健康检测；居家办公；无管控）
 * @param {string} params.controlAddress; 管控地址
 * @param {string} params.controlStartTime; 管控开始时间 "yyyy-MM-dd"
 * @param {string} params.controlEndTime; 管控结束时间 "yyyy-MM-dd"
 * @param {string} params.controlFile; 解除隔离通知书
 * @param {string} params.createTime; 创建时间 "yyyy-MM-dd HH:mm:ss"
 * @param {string} params.directlyUnder; 机关处室 
 */
export const saveDailyReport = params => {
	return request({
		url: '/zwfw/epidemicDailyReport/saveDailyReport',
		method: 'post',
		data: params
	})	
}

/**
 * 上报数据回显，获取上一次最新的数据
 * @param {string} params.userName 用户名
 * @param {string} params.userPhone 手机号
 */
export const getReportShowData = params => {
	return request({
		url: `/zwfw/epidemicDailyReport/getRecord`,
		method: 'get',
		data: params
	})	
}

/**
 * 获取上报详情
 * @param {string} params.id 上报详情id
 */
export const getReportDetail = params => {
	return request({
		url: '/zwfw/epidemicDailyReport/getDailyReportViewById',
		method: 'get',
		data: params
	})	
}

/**
 * 获取上报记录
 * @param {string} params.pageNum 页码
 * @param {string} params.pageSize 每页条数
 */
export const getReportRecordData = params => {
	const {userName, userPhone,...other} = params
	return request({
		url: `/zwfw/epidemicDailyReport/getMyDailyReportRecord?userName=${userName}&userPhone=${userPhone}`,
		method: 'post',
		data: other
	})	
}

/**
 * 获取上报统计数量
 * @param {string} params.pageNum 页码
 * @param {string} params.pageSize 每页条数
 */
export const getReportRecordCountData = params => {
	const {role, searchName,uploadDate,deptName,...other} = params
	return request({
		url: `/zwfw/epidemicStatistics/getDailyReportCount?role=${role}&searchName=${searchName}&uploadDate=${uploadDate}&deptName=${deptName}`,
		data: other
	})	
}


const reportApi = {
	report: '/zwfw/epidemicStatistics/getDailyReportTotal',
	not_report: '/zwfw/epidemicStatistics/getDailyReportNotCommit'
}

/**
 * 获取上报统计 
 * @param {string} params.pageNum 页数
 * @param {string} params.pageSize 每页条数
 * @param {string} params.role 人员角色(0：部门管理员、1：单位管理员)
 * @param {string} params.searchName 机构名称（部门管理员传部门名称，单位管理员传单位名称）
 * @param {string} params.uploadDate 上报时间
 */
export const getDataStatisticsList = params => {
	const {type,role, searchName,uploadDate,deptName,...other} = params
	const apiUrl = reportApi[type]
	return request({
		url: `${apiUrl}?role=${role}&searchName=${searchName}&uploadDate=${uploadDate}&deptName=${deptName}`,
		method: 'post',
		data: other
	})	
}