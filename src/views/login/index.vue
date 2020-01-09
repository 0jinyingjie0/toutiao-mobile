<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 表单 -->
    <ValidationObserver ref="form">
    <van-cell-group>
      <ValidationProvider name="手机号" rules="required|mobile" v-slot="{ errors }" immediate>
      <van-field v-model="userform.mobile"  placeholder="请输入手机号" clearable>
         <i class="icon icon-shouji" slot="left-icon"></i>
      </van-field>
      </ValidationProvider>

      <ValidationProvider name="验证码" rules="required|code" immediate>
      <van-field v-model="userform.code" placeholder="请输入验证码">
           <i class="icon icon-mima" slot="left-icon"></i>
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            slot="button"
            size="small"
            type="primary"
            round
            @click="showAndClose"
          >发送验证码</van-button>
      </van-field>
      </ValidationProvider>
    </van-cell-group>
    </ValidationObserver>

    <!-- 登录按钮 -->
    <div class="login-btn-box">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'

export default {
  data () {
    return {
      isCountDownShow: false,
      userform: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    // 验证码
    async showAndClose () {
      try {
        this.isCountDownShow = true
        const { mobile } = this.userform
        // 1. 验证手机号是否有效
        const validateResult = await validate(mobile, 'required|mobile', {
          name: '手机号'
        })

        if (!validateResult.valid) {
          console.log(validateResult)
          this.$toast(validateResult.errors[0])

          return
        }
        await getSmsCode(mobile)
      } catch (err) {
        // 关闭验证码显示
        this.isCountDownShow = false
        this.$toast.fail('登录失败，手机号输入有误错误')
      }
    },

    // 登录
    async onLogin () {
      // 表单验证
      const success = await this.$refs.form.validate()
      if (!success) {
        // 表单验证失败
        const errors = this.$refs.form.errors
        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0])
            // 找出第一个有错误的消息，给出提示并停止
            return
          }
        }
        // 获取错误信息给出轻提示
        return
      }
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        const { data } = await login(this.userform)
        // console.log('登录成功', res)
        this.$store.commit('setUser', data)
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败，手机或者验证码错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .login-btn-box {
    display: flex;
    .van-button {
      flex: 1;
      margin: 0 20px;
      box-sizing: border-box;
      font-size: 18px;
    }
  }
}
</style>
