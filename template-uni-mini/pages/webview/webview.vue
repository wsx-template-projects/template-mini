<template>
	<view class="page-webview">
		<web-view :src="srcUrl"></web-view>
	</view>
</template>

<script>
import configObj from "./config_url/index.js"
import tools from "@/utils/tools.js"
import { mapState } from "vuex"
export default {
	data () {
		return {
			srcUrl: ''
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo
		})
	},
	onLoad (option) {
		// console.log("option:",option)
		// console.log("userInfo:",this.userInfo)
		const { departOrgList, ...other } = this.userInfo
		const queryStr = tools.objToUrlParams(other)
		const url = configObj.getWebUrl(option.moduleName,option.type)
		this.srcUrl = `${url}&platform=wx&${queryStr}`
		// console.log("src-url:",this.srcUrl)
	},
	methods: {}
}
</script>

<style>
</style>
