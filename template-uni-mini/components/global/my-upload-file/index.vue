<!--
	上传文件 - 组件
-->
<template>
	<view class="components-upload-file">
		<uni-file-picker
			ref="uploadRef"
		    v-model="fileList" 
		    fileMediatype="image" 
		    mode="grid" 
			:limit="limit"
			:image-styles="imageStyles"
			:list-styles="listStyles"
		    @select="handleSelect" 
		    @progress="handleProgress" 
		    @success="handleSuccess" 
		    @fail="handleFail"
			@delete="handleDelete"
		/>
	</view>
</template>

<script>
import config from "@/config"
import tools from "@/utils/tools.js"
import { validFileSize } from "@/utils/validate.js"
export default {
	data () {
		return {
			imageStyles:{
				width:120,
				height:120,
				border:{
					color:"#e5e5e5;",
					width:1,
					style:'sloid',
					radius:'4px'
				}
			},
			listStyles:{
				// 是否显示边框
				border: true,
				// 是否显示分隔线
				dividline: true,
				// 线条样式
				borderStyle: {
					width:1,
					color:'blue',
					radius:2
				}
			}
		}
	},
	props: {
		value: {
			type: Array,
			default () {
				return []
			}
		},
		limit: {
			type: Number,
			default: 1
		},
		// 是否需要记录上传相关
		isNeedRecordUpload: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		fileList: {
			get () {
				return this.value
			},
			set(val) {
				// console.log("set-val",val)
				this.$emit('input',val)
			}
		}
	},
	watch: {
		fileList: {
			handler(newV,oldV) {
				// console.log("newV",newV,'oldV:',oldV)
			},
			deep: true
		}
	},
	onLoad () {},
	methods: {
		/**
		 * 处理文件回显
		 * 例如：http://115.238.48.67:8000/file/getFile?fileUrl=http://zqt-test.oss-cn-hangzhou.aliyuncs.com/a64e37bc3046f7a5f5760c7450723420.jp
		 * @param {string | array} fileData 需要回显的文件
		 * */
		handleFileShow(fileData) {
			// console.log("fileData:",fileData)
			let result = []
			if (Array.isArray(fileData)) {
				result = fileData.map(file => {
					const temp = {
						url: file,
						uuid: tools.createUniqueString(),
						uploadData: { prefix: '', url: '' }
					}
					if (file.indexOf("?fileUrl=")) {
						const urls = file.split("?fileUrl=")
						temp.uploadData.prefix = urls.length > 1 ? `${urls[0]}?` : ''
						temp.uploadData.url = urls.length > 1 ? urls[1] : urls[0]
					} else {
						temp.url = file
					}
					return temp
				})
			} else {
				const temp = {
					url: fileData,
					uuid: tools.createUniqueString(),
					uploadData: { prefix: '', url: '' }
				}
				if (fileData.indexOf("?fileUrl=")) {
					const urls = fileData.split("?fileUrl=")
					temp.uploadData.prefix = urls.length > 1 ? `${urls[0]}?` : ''
					temp.uploadData.url = urls.length > 1 ? urls[1] : urls[0]
				} else {
					temp.url = fileData
				}
				result = [temp]
			}
			this.fileList = result
		},
		syncFileList (list) {
			const fileList = list || this.fileList
			this.fileList = this.$refs.uploadRef.files.map((file,index) =>{
				return {
					...file,
					...fileList[index],
					id: tools.createUniqueString()
				}
			})
		},
		// 获取上传状态
		handleSelect(e){
			console.log('选择文件:',e,e.tempFiles[0].file)
			const file = e.tempFiles[0].file
			if (validFileSize(file, 20)) {
				return
			}
			const uploadTask = uni.uploadFile({
				url: `${config.base_url}/zwfw/common/upload`,
				filePath: e.tempFilePaths[0],
				name: 'file',
				formData: {},
				success: (fileRes) => {
					// console.log("fileRes:",fileRes)
					// console.log("fileRes:",JSON.parse(fileRes.data))
					const res = JSON.parse(fileRes.data)
					// console.log("res:",res)
					const currData = {uploadData: res.data}
					this.fileList.push(currData)
					// console.log("fileList:",this.fileList)
					this.syncFileList()
					this.$emit('success',currData)
					uni.showToast({
						title: '文件上传成功',
						icon: 'success'
					})
				},
				fail: (err) => {
					console.log("err:",err)
					uni.showToast({
						title: '文件上传失败',
						icon: 'error'
					})
					this.$refs.uploadRef.files = this.$refs.uploadRef.files.filter(item => item.uuid !== e.tempFiles[0].uuid)
				}
			})
			
			if (this.isNeedRecordUpload) {
				uploadTask.onProgressUpdate((res) => {
					console.log('上传进度' + res.progress);
					console.log('已经上传的数据长度' + res.totalBytesSent);
					console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
					// 测试条件，取消上传任务。
					if (res.progress > 50) {
						// uploadTask.abort();
					}
				});
			}
		},
		// 获取上传进度
		handleProgress(e){
			console.log('上传进度:',e)
		},
		// 上传成功
		handleSuccess(e){
			console.log('上传成功:',e)
		},
		// 上传失败
		handleFail(e){
			console.log('上传失败:',e)
		},
		// 文件删除
		handleDelete(e){
			console.log('文件删除:',e)
			// console.log("file-333:",this.fileList)
			this.fileList = this.fileList.filter(item => e.tempFile.id !== item.id)
			this.$emit('delete',e.tempFile)
		},
		// 暂时用不上
		handleUpload () {
			uni.chooseImage({
			    count: 6, //默认9
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album'], //从相册选择
			    success: function (res) {
					console.log("res",res)
			        console.log(JSON.stringify(res.tempFilePaths));
					
					const uploadTask = uni.uploadFile({
						url: `${config.base_url}/zwfw/common/upload`,
						filePath: res.tempFilePaths[0],
						name: 'file',
						formData: {},
						success: (fileRes) => {
							console.log("fileRes:",fileRes.data)
							uni.showToast({
								title: '文件上传成功',
								icon: 'success'
							})
						}
					})
					
					if (this.isNeedRecordUpload) {
						uploadTask.onProgressUpdate((res) => {
							console.log('上传进度' + res.progress);
							console.log('已经上传的数据长度' + res.totalBytesSent);
							console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
							// 测试条件，取消上传任务。
							if (res.progress > 50) {
								// uploadTask.abort();
							}
						});
					}
					
			    }
			});
		}
	}
}
</script>

<style lang="scss" scoped>
// .components-upload-file {
// 	/deep/ .icon-add {
// 		font-size: 28px;
// 		color: #8c939d;
// 		background: #e5e5e5;
// 	}
// }
/deep/ .uni-file-picker {
	.icon-add {
		font-size: 28px;
		color: #8c939d;
		background: #e5e5e5;
	}
}
</style>
