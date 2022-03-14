<template>
  <view class="sg-page page-login">
    <view class="login-bg sg-flexbox justify-center">
      <image class="bg" :src="loginBg" />
    </view>

    <view class="group-desc sg-flexbox align-start">
      <image class="icon-error" :src="iconError" alt="" />
      <text class="group-desc--txt sg-m-l-6">
        本疫情防控数字化应用仅限浙江省市场监督管理局及其直属单位内部使用，请先登录。
      </text>
    </view>

    <view class="page-form">
      <uni-forms class="pagr-form" :modelValue="formData">
        <uni-forms-item name="userName">
          <view class="label">手机号码</view>
          <view class="field-item sg-flexbox align-center">
            <uni-easyinput
              class="sg-flex-1"
              v-model="formData.phone"
              :inputBorder="false"
              placeholder="请输入手机号"
            ></uni-easyinput>
          </view>
        </uni-forms-item>
        <!-- <uni-forms-item name="userName">
					<view class="field-item sg-flexbox align-center">
						<uni-easyinput class="sg-flex-1" v-model="formData.validCode" :inputBorder="false" placeholder="请输入验证码"></uni-easyinput>
						<button class="" size="mini" type="primary" @click="sendCode">{{btnTxt}}</button>
					</view>
				</uni-forms-item> -->
      </uni-forms>
      <button type="primary" @click="onSubmit">登录</button>

      <!-- <form class="form-group" @submit="onSubmit" @reset="onReset">
				<view class="uni-form-item uni-column">
					<view class="label">手机号码</view>
					<view class="field-item sg-flexbox align-center">
						<uni-easyinput class="sg-flex-1" v-model="formData.phone" :inputBorder="false" placeholder="请输入手机号"></uni-easyinput>
					</view>
					<view class="field-item sg-flexbox align-center">
						<uni-easyinput class="sg-flex-1" v-model="formData.validCode" :inputBorder="false" placeholder="请输入验证码"></uni-easyinput>
						<button class="" size="mini" type="primary" @click="sendCode">{{btnTxt}}</button>
					</view>
				</view>

				<view class="uni-btn-v">
					<button type="primary" form-type="submit">登录</button>
				</view>
			</form> -->
    </view>

    <!-- 	<view class="tip-txt">
			*本疫情防控数字化应用仅限浙江省市场监督管理局及其直属单位内部使用，请先登录。
		</view> -->

    <!-- <view class="web-link" @click="jumpPage">
			外来人员进入办公场所 【申请入口】
		</view> -->
  </view>
</template>

<script>
import { validCellphone } from "@/utils/validate";
import LOGIN_BG from "@/static/images/login_bg.png";
import ICON_ERROR from "@/static/svg/icon-error.svg";
import { CARD_LIST } from "../assets/js/enums.js";
import { sendCode, login } from "@/api/login";
export default {
  data() {
    return {
      isStartTime: false,
      count: 60,
      timer: null,
      formData: {
        phone: "",
        validCode: "",
      },
      loginBg: LOGIN_BG,
      iconError: ICON_ERROR,
      queryData: {},
    };
  },
  computed: {
    btnTxt() {
      return this.isStartTime ? this.count + "s" : "获取验证码";
    },
  },
  onLoad(option) {
    // console.log("option:",option)
	
    this.queryData = option;
    this.$store.commit("SET_USER_INFO", {});
  },
  onUnload() {
    // console.log('页面销毁了')
    // console.log("timer:",this.timer)
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    async sendCode() {
      if (this.isStartTime) return;
      const { phone } = this.formData;
      // console.log("phone:",phone)
      if (!phone || !validCellphone(phone)) {
        uni.showToast({
          title: "手机号不对",
          icon: "none",
        });
        return;
      }
      const params = { phone };
      const res = await sendCode(params);
      // console.log("res:",res)
      this.isStartTime = true;
      this.timer = setInterval(() => {
        this.count--;
        if (this.count < 0) {
          this.isStartTime = false;
          this.count = 60;
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },

    async onSubmit(e) {
      // console.log("submit",e);
      // console.log("fromData:",this.formData)
      let formdata = e.detail.value;
      const { phone, validCode } = this.formData;
      if (!phone || !validCellphone(phone)) {
        uni.showToast({
          title: "手机号不对",
          icon: "none",
        });
        return;
      }
      // if (!validCode) {
      // 	uni.showToast({
      // 		title: '验证码不能为空',
      // 		icon: 'none'
      // 	})
      // 	return
      // }
      const params = { phone: this.formData.phone };
      // const params = { ...this.formData }
      // console.log("params:",params)
      const currItem = CARD_LIST[this.queryData.index];
      if(currItem.text == '进场申请'){
        let url = `/pages/webview/webview?moduleName=home&type=${currItem.text}`;
        this.$store.commit('SET_USER_INFO',{userPhone:this.formData.phone})
        uni.redirectTo({ url });
      }
      else{
        this.$store.dispatch("login", params).then((res) => {
          // console.log("login-res:",res)
          const { preventionFillRoles } = res.epidemicAppletUserResponse;
          // console.log("roles:", preventionFillRoles)
          // console.log("currItem:",currItem)
          let url = "";
          if (!currItem.isWebUrl) {
            url = currItem.url;
          } else {
            // console.log("跳转外链")
            url = `/pages/webview/webview?moduleName=home&type=${currItem.text}`;
          }
          // console.log("url:", url)
          if (
            currItem.text === "部门填报管理" &&
            (!preventionFillRoles || preventionFillRoles.indexOf("管理员") < 0)
          ) {
            uni.showToast({
              title: "您当前没有操作此业务的权限!",
              icon: "none",
              success: () => {
                setTimeout(() => {
                  uni.navigateBack({ delta: 1 });
                }, 1500);
              },
            });
          } else {
            uni.redirectTo({ url });
          }
        });
      }
    },
    onReset(e) {
      // console.log("清空数据", e);
    },
    jumpPage() {
      let url = "/pages/webview/webview?moduleName=login&type=申请入口";
      uni.navigateTo({ url });
    },
  },
};
</script>

<style lang="scss" scoped>
.page-login {
  font-size: 24rpx;
  padding: 20rpx 30rpx 100rpx;

  .login-bg {
    margin-bottom: 20rpx;

    .bg {
      width: 460rpx;
      min-height: 480rpx;
    }
  }

  .group-desc {
    line-height: 44rpx;
    color: #404956;
    margin-bottom: 60rpx;

    .icon-error {
      width: 36rpx;
      height: 36rpx;
      margin-right: 10rpx;
      margin-top: 8rpx;
    }
  }

  .page-form {
    margin-bottom: 56rpx;

    .field-item {
      border-bottom: 1px solid #ccc;
      padding-bottom: 10rpx;

      uni-button {
        width: 200rpx;
        padding: 0;
      }

      button {
        width: 200rpx;
        padding: 0;
      }
    }

    .label {
      display: block;
      color: #404956;
      margin-bottom: 20rpx;

      &::before {
        display: inline;
        content: "*";
        color: red;
      }
    }

    .code-btn {
      width: 98rpx;
    }

    .field-item {
      margin-bottom: 40rpx;
    }
  }

  .tip-txt {
    font-size: 28rpx;
    color: #f86e21;
    padding: 40rpx 0 40rpx 0;
  }

  .web-link {
    // position: fixed;
    // bottom: 50rpx;
    // left: 0;
    // right: 0;
    height: 44rpx;
    font-size: 28rpx;
    color: rgba(0, 105, 205, 100);
    text-align: center;
  }

  button {
    background: #1989fa;
  }
}
</style>
