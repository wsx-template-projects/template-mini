import tools from "@/utils/tools.js"

const ROUTER_TYPE = {
	'navigate': 'navigateTo',
	'redirect': 'redirectTo',
	'switchTab': 'switchTab',
	'reLaunch': 'reLaunch', // 注意：字节跳动小程序与飞书小程序不支持
	'navigateBack': 'navigateBack',
	'exit': '', // 退出小程序，target="miniProgram"时生效，微信2.1.0+、百度2.5.2+、QQ1.4.7+
}

const compose = (f, g) => {
	return function (x,y) {
		return f(g(x,y))
	}
}


function func1 (query) {
	console.log("query:",query)
	return tools.ObjToUrlQuery(query)
} 

function func2 (path,search) {
	console.log("path:",path)
	console.log("search:",search)
	return `${path}?${search}`
} 

const middleFunc = compose(func1,func2)

// const push = ({path,query}) => {
// 	const url = middleFunc(path,query)
// 	console.log("url:",url)
// 	uni.navigateTo({ url })
// }

class Router {
	push({path,query}) {
		const url = middleFunc(path,query)
		console.log("url:",url)
		uni.navigateTo({ url })
	}
}

// const router = {
// 	push
// }

export default new Router()