// 公共 - api （例如:上传等）
import request from "@/utils/request.js"

/**
 * 文件上传
 */
export const uploadFile = params => {
	return request({
		url: '/zwfw/common/upload',
		method: 'post',
		data: params
	})
}