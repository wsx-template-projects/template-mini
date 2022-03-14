// 请求模块
import config from "../config/index.js";

// console.log("config:",config)

const REQUEST_URLS = {
  login: "login",
};

// 检查token是否存在
export const checkToken = async () => {
  let token = uni.getStorageSync("minitoken");
  // console.log("token:",token)
  if (!token) {
    // token不存在，创建token
    let param = {
      url: "createToken",
      data: config.miniApp,
    };
    const res = await request(param);
    uni.setStorageSync("minitoken", res.data);
  }
};

// 检查session是否存在
export const checkStatus = () => {
  let session = uni.getStorageSync("minisession");
  // console.log("session:",session)
  if (!session) {
    // session不存在，跳转到登录页面
    uni.reLaunch({
      url: "/pages/login/index",
    });
    return false;
  }
  return true;
};

// 发送请求
export const request = (options) => {
  // console.log("option:",option)
  // 遮罩
  uni.showLoading({
    mask: true,
  });
  return new Promise((resolve, reject) => {
    uni.request({
      url: config.base_url + REQUEST_URLS[options.url],
      method: options.method || "POST",
      data: options.data || {},
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        token: uni.getStorageSync("minitoken"),
        session: uni.getStorageSync("minisession"),
      },
      success(res) {
        uni.hideLoading();
        if (res.data) {
          let code = res.data.code;
          let msg = res.data.msg;
          if (code == "00") {
            resolve(res.data);
          } else if (code == "01" || code == "11") {
            if (msg) {
              showToast(msg, "none");
            } else {
              showToast("网络崩溃，请重试", "none");
            }
          } else if (code == "12") {
            // token过期，刷新token
            resolve(refreshToken(options));
          } else if (code == "13" || code == "14") {
            // session过期，返回登录页面
            uni.reLaunch({
              url: "/pagesA/login/login",
            });
          }
        } else {
          showToast("网络崩溃，请重试", "none");
          reject();
        }
      },
      fail(err) {
        uni.hideLoading();
        showToast("网络崩溃，请重试", "none");
        reject(err);
      },
      complete() {
        uni.stopPullDownRefresh();
      },
    });
  });
};

// 刷新token
const refreshToken = async (options) => {
  let token = uni.getStorageSync("minitoken");
  let param = {
    url: "refreshToken",
    data: config.miniApp,
  };
  param.data.token = token;
  const res = await request(param);
  uni.setStorageSync("minitoken", res.data);
  // 重新发起请求
  const resdata = await request(options);
  return resdata;
};

// 微信登录凭证
export const wxLogin = (provider = "weixin") => {
  // 遮罩
  uni.showLoading({
    mask: true,
  });
  return new Promise((resolve, reject) => {
    uni.login({
      provider,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
      complete() {
        uni.hideLoading();
      },
    });
  });
};

// 提示框
export const showToast = (msg, icon) => {
  uni.showToast({
    title: msg,
    icon: icon,
    mask: true,
    duration: 2000,
  });
};
