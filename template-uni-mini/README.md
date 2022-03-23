# epidemic-control-mini

疫情防控小程序

## 技术栈

uni-app + uni-ui

### 项目的相关配置

```bash

# 关注 manifest.json 文件


# 路由配置
pages.json 为路由配置文件

```

### 小程序相关配置 (./config/index.js)

```js
/**
 * 环境变量，测试环境: dev 正式环境: prod
 * 上传正式包前请先修改环境变量值
 */
const ENV = "prod";

/**
 * 小程序相关配置
 * @param {string} base_url 接口前缀
 * @param {string} web_domain 外链域名
 */
const MINI_CONFIG = {
  dev: {
    // base_url: 'http://192.168.5.224:8080', // 后端本地接口前缀
    // base_url: 'http://192.168.1.197:8000' // 测试服接口前缀
    base_url: "https://hxusert.natapp4.cc", // 测试服接口前缀 （http://192.168.1.197:8000映射到该域名）
    // web_domain: 'http://192.168.2.57:8080' // 测试
    web_domain: "http://192.168.1.147:3840", // 测试
  },
  prod: {
    base_url: "https://sbfl.zjamr.zj.gov.cn", // 生产环境
    web_domain: "https://sbfl.zjamr.zj.gov.cn", // 正式
  },
};

const config = {
  env: ENV,
  appId: "wx1c2580645f7e014b",
  ...MINI_CONFIG[ENV],
};

export default config;
```

### 发布部署

| 环境   | 分支    | 备注 | 其它 |
| ------ | ------- | ---- | ---- |
| 本地   | develop |      |      |
| 体验服 | develop |      |      |
| 正式服 | master  |      |      |

### 主要的插件

| 名称   | 版本   | 备注 |
| ------ | ------ | ---- |
| 插件一 | 版本号 |      |
| 插件二 | 版本号 |      |

### 文档地址

[产品原型](http://115.238.48.67:7680/app/vhEudmSbr56n5eX3upedDT#screen=sky2k52jpegqb40)

[接口文档](http://115.238.48.67:8080/swagger-ui.html#/)

### h5 外链

- 域名/ip

```bash

测试：http://zql-wx-mobile.fat1.icinfo.co （通过蜻蜓发布生成的测试域名）

正式：https://sbfl.zjamr.zj.gov.cn

```

- 相关参数

```bash

# 平台标识
platform = wx/android/ios  (wx:微信小程序，android:安卓客户端，ios:ios客户端)

# 用户信息
测试：directlyUnder=%E7%9B%B4%E5%B1%9E%E5%8D%95%E4%BD%8D&departmentName=%E6%95%B0%E5%AA%92%E4%B8%AD%E5%BF%83&orgName=%E7%BB%BC%E5%90%88%E5%8A%9E%E5%85%AC%E5%AE%A4&userName=%E8%94%A1%E4%BD%B3%E5%A3%B0&userPhone=11111111117&returnApprovalRoles=%E7%94%B3%E8%AF%B7%E5%8F%91%E8%B5%B7%E4%BA%BA&personnelReportRoles=%E4%B8%8A%E6%8A%A5%E4%BA%BA&accessApprovalRoles=%E5%AE%A1%E6%89%B9%E4%BA%BA&preventionFillRoles=&placeName=null&placeCode=null&address=null
正式：directlyUnder=%E7%9B%B4%E5%B1%9E%E5%8D%95%E4%BD%8D&departmentName=%E6%95%B0%E5%AA%92%E4%B8%AD%E5%BF%83&orgName=&userName=%E7%8E%8B%E7%91%9E%E9%98%B3&userPhone=17329620525&returnApprovalRoles=null&personnelReportRoles=null&accessApprovalRoles=null&preventionFillRoles=%E5%8D%95%E4%BD%8D%E7%AE%A1%E7%90%86%E5%91%98&placeName=null&placeCode=null&address=null

```

- 外链地址

```bash

# 测试
返岗申请：/control-relieve?taskType=1

返岗审批：/control-relieve?taskType=2

个人紧急情况上报：/report-process/report-type?taskType=apply

个人紧急情况上报审批：/report-process?taskType=audit

进场申请：/admission-apply?taskType=apply

进场审批：/admission-apply?taskType=audit

# 正式
返岗申请：/zql-wx-mobile/control-relieve?taskType=1

返岗审批：/zql-wx-mobile/control-relieve?taskType=2

个人紧急情况上报：/zql-wx-mobile/report-process/report-type?taskType=apply

个人紧急情况上报审批：/zql-wx-mobile/report-process?taskType=audit

进场申请：/zql-wx-mobile/admission-apply?taskType=apply

进场审批：/zql-wx-mobile/admission-apply?taskType=audit

```

- 最终访问的地址

```bash

域名 + 外链地址 + & + 平台标识 + & + 用户信息

```

- 示例

```bash

# 测试
返岗申请：http://zql-wx-mobile.fat1.icinfo.co/control-relieve?taskType=1&platform=wx&directlyUnder=%E7%9B%B4%E5%B1%9E%E5%8D%95%E4%BD%8D&departmentName=%E6%95%B0%E5%AA%92%E4%B8%AD%E5%BF%83&orgName=%E7%BB%BC%E5%90%88%E5%8A%9E%E5%85%AC%E5%AE%A4&userName=%E8%94%A1%E4%BD%B3%E5%A3%B0&userPhone=11111111117&returnApprovalRoles=%E7%94%B3%E8%AF%B7%E5%8F%91%E8%B5%B7%E4%BA%BA&personnelReportRoles=%E4%B8%8A%E6%8A%A5%E4%BA%BA&accessApprovalRoles=%E5%AE%A1%E6%89%B9%E4%BA%BA&preventionFillRoles=&placeName=null&placeCode=null&address=null

# 正式
返岗申请：https://sbfl.zjamr.zj.gov.cn/zql-wx-mobile/control-relieve?taskType=1&platform=wx&directlyUnder=%E7%9B%B4%E5%B1%9E%E5%8D%95%E4%BD%8D&departmentName=%E6%95%B0%E5%AA%92%E4%B8%AD%E5%BF%83&orgName=&userName=%E7%8E%8B%E7%91%9E%E9%98%B3&userPhone=17329620525&returnApprovalRoles=null&personnelReportRoles=null&accessApprovalRoles=null&preventionFillRoles=%E5%8D%95%E4%BD%8D%E7%AE%A1%E7%90%86%E5%91%98&placeName=null&placeCode=null&address=null

```

### 开发踩坑

```bash

# 坑点一 （svg图标的使用）
解决方式：svg图标最好用在线地址

# 坑点二 （修改css样式不生效）
解决方式：先查看一下，HBuilderX 是否在 3.1.0 版本以上！，uni-ui只在 3.1.0以上版本生效

# 坑点三 （修改文件保存后，编译成功，微信开发者工具预览报错）
解决方式：尝试关闭微信开发者工具，再点击编辑器: 运行-运行到小程序模拟器，再次查看，尤其是配置文件修改后，一般都会报错

# 坑点四 vuex 小程序每次进入都会执行removeItem方法，导致数据存储不下来
解决方式：暂时把removeItem后面的函数写为一个空函数

```

### 发布

发布二维码截图给小程序管理员

### rpx 和 px 换算

```bash

rpx是微信小程序中css的尺寸单位，可以根据屏幕宽度进行自适配。

规定屏幕宽度为750px，譬如iphone6，屏幕宽度为375px，共有750个物理像素，则1rpx = 0.5px。

设备rpx换算px：屏幕宽度/750，px换算成rpx:750/屏幕宽度；

iPhone5 1rpx = 0.42px 　　     1px = 2.34px ；

iPhone6 1rpx = 0.5px 　　　　1px = 2rpx ；

iPhone6s 1rpx = 0.552px 　　 1px = 1.81rpx；

参考地址：https://www.jianshu.com/p/50ea4804f786

```

### 注意

```bash

# 编辑器相关
HBuilderX必须在 3.1.0 版本以上！，因为扩展组件 uni-ui 只在 3.1.0 以上版本生效

# 注意、注意、注意
上传正式版本前请前往 config/index.js 修改环境变量值（dev/prod）

# 修改项目级相关的地址 (例如：接口前缀，环境变量，外链域名等)
前往 config/index.js 查看/修改

# 新增/修改 外链地址
前往 pages/webview/config_url/index.js 查看/修改

```

### 目录介绍

├─.hbuilderx
├─api
├─common
├─components
│ ├─global
│ │ ├─my-field
│ │ ├─my-form
│ │ └─my-upload-file
│ └─uni-section
├─config
├─pages
│ ├─home
│ ├─index
│ └─webview
│ └─config_url
├─pages-demo
│ └─page-demo
│ └─enums
├─pages-login
│ ├─assets
│ │ └─js
│ ├─login
│ └─user-auth
├─pages-sub-one
│ └─daily-report
│ ├─components
│ └─enums
├─router
├─static
│ ├─image
│ ├─images
│ │ └─home
│ └─svg
├─store
│ └─modules
├─styles
├─utils

### 作者列表

- 前端：xxx
- 后端：xxx
- 产品：xxx
- 设计师：xxx
- 项目经理：xxx

### 项目模板地址

```bash
# gitlab地址
git@gitlab.icinfo.co:fed/uni-mini-template.git

```
