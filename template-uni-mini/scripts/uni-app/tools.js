/**
 * uni-app常用方法集合
 */

/**
 * @params { array } images 预览图片的数组
 * @params { number } currIndex 当前预览图的下标
 */
export function previewImage(images,currIndex) {
	// console.log("currIndex:",currIndex)
	// console.log("images:",images)
	uni.previewImage({
		current: currIndex,
		urls: images
	})
}