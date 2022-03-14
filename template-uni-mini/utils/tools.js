// 工具模块


  /**
   * 将字节转换成友好格式，如Bytes，KB，MB
   *
   * @param {string} bytes
   * @returns {*}
   * @example
   *
   * bytesToSize(10000)
   * // => 9.8 KB
   */
  function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB'];
    if (bytes === 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  }

/**
 * 数字存储大小格式化
 * @param {number} num 存储大小 单位：Byte
 * @param {number} digits 保留几位小数
 * @return {string} 2MB
 */
function toStorage(num, digits) {
    digits = digits || 2
    if (num < 1024) {
        return num + 'B'
    }
    num = (num * 1000) / 1024
    const si = [
        { value: 1e18, symbol: 'E' },
        { value: 1e15, symbol: 'P' },
        { value: 1e12, symbol: 'T' },
        { value: 1e9, symbol: 'G' },
        { value: 1e6, symbol: 'M' },
        { value: 1e3, symbol: 'K' },
    ]
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (
                (num / (si[i].value * 1.024)).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
                si[i].symbol +
                'B'
            )
        }
    }
}

/**
 * 对象参数序列化
 * @param {object} obj 对象参数
 * @return {string} a=1&b=2&c=3
 */
function objToUrlParams(obj) {
    let str = ''
    Object.keys(obj).forEach(v => {
        if (obj[v] !== undefined) {
            str += `${encodeURIComponent(v)}=${encodeURIComponent(obj[v])}&`
        }
    })
    return str.slice(0, -1)
}

/**
 * 获取地址参数
 * @param {string} url 指定地址，默认取当前页地址
 * @return {string} { a: 1, b: 2, c: 3 }
 */
function getQueryObject(url) {
    url = url || window.location.href
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
}

/**
 * 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
function createUniqueString() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
}

/**
 * 字段转换 状态数字转文字，状态数字单个值可以为number、string、boolean
 * @param {array} source 数据源
 * @param {array | string} values 当前选中的数据，若数据为字符串，需要使用逗号隔开
 * @param {string} numAttrName 需要转换的属性名，默认为 value
 * @param {array} textAttrName 转换后的属性名，默认为 text
 * @return {string}
 * */
function numTransformText (source,values,numAttrName = 'value', textAttrName = 'text') {
	// console.log("source:",source, 'values',values)
	if (!Array.isArray(source) || !values || values.lenght == 0 ) return ''
	if (!Array.isArray(values)) {
		values = values.split(',')
	}
	const filterArr = source.filter(item => values.includes(item[numAttrName]) || values == item[textAttrName])
	// console.log("filterArr:",filterArr)
	const result = filterArr.reduce((prev,curr) => {
		return prev.concat(curr[textAttrName])
	},[])
	// console.log("result :>> ",result)
	return result.join(',')
}

/**
 * 时间选择框，开始/结束时间
 * @param {string} type start:开始时间 end:结束时间 
 */
function getFieldDate(type) {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;
	return `${year}-${month}-${day}`;
}



// ===========如下暂时不用=============

function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	let hour = parseInt(time / 3600)
	time = time % 3600
	let minute = parseInt(time / 60)
	time = time % 60
	let second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
let dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		let humanize = '';
		for (let key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		let date = this.parse(dateStr)
		let diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		let _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		let a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

import config from '../config/index'
function previewImage(url){
	let file = url.split('?fileUrl=')
	let newFile = file.length > 1 ? file[1] : file[0]
	return `${config.base_url}/file/getFile?fileUrl=${newFile}`
}

export default {
	// 字节存储格式化
	bytesToSize,
	// 数字存储格式化大小
	toStorage,
	// 对象参数序列化
	objToUrlParams,
	// 获取地址栏参数
	getQueryObject,
	// 创建唯一的字符串
	createUniqueString,
	// 字段值转化，状态数值转文本
	numTransformText,
	// 时间选择框，开始/结束时间
	getFieldDate,
	//
	formatTime,
	//
	formatLocation,
	//
	dateUtils,
	// 图片加前缀
	previewImage
}



