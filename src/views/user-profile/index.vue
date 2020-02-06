<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息" left-arrow right-text="保存" />

    <van-cell-group>
      <van-cell title="头像" is-link @click="onAvatarClick">
        <van-image round width="30" height="30" fit="cover" :src="user.photo" />
      </van-cell>
      <input type="file" hidden ref="file" @change="onFileChange" />
      <van-cell title="昵称" :value="user.name" is-link @click="isEditNameShow=true" />
      <van-cell title="性别" :value="user.gender===0?'男':'女'" is-link @click="isEditGenderShow = true" />
      <van-cell title="生日" :value="user.birthday" is-link @click="isEditBirthdayShow = true"/>
    </van-cell-group>

    <!-- 图片预览 -->
    <van-image-preview v-model="isPreviewShow" :images="images" @close="$refs.file.value=''">
      <van-nav-bar
        slot="cover"
        left-text="取消"
        right-text="确定"
        @click-left="isPreviewShow = false"
        @click-right="onUpdateAvatar"
      />
    </van-image-preview>

    <!-- 修改用户昵称 -->
    <van-popup v-model="isEditNameShow" position="bottom">
      <van-nav-bar
        title="昵称编辑"
        left-text="取消"
        right-text="确定"
        @click-left="isEditNameShow=false"
        @click-right="onUpdateName"
      />
      <div>
          <van-field
        :value="user.name"
        @input="inputName=$event"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入留言"
        show-word-limit
      />
      </div>

    </van-popup>
    <!--/修改用户昵称 -->

    <!-- 编辑用户性别 -->
    <van-action-sheet
      v-model="isEditGenderShow"
      :actions="actions"
      cancel-text="取消"
      @cancel="isEditGenderShow = false"
      @select="onGenderSelect"
    />
    <!-- /编辑用户性别 -->

    <!-- 编辑用户生日 -->
    <van-popup
      v-model="isEditBirthdayShow"
      position="bottom"
    >
      <van-datetime-picker
        :value="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="isEditBirthdayShow = false"
        @confirm="onUpdateBirthday"
      />
    </van-popup>
    <!-- /编辑用户生日 -->
  </div>
</template>

<script>
import {
  getUserProfile,
  updateUserPhoto,
  updateUserProfile
} from '@/api/user'
import moment from 'moment'
// import { ImagePreview } from 'vant'
export default {
  name: 'UserIndex',
  data () {
    return {
      user: {}, // 用户资料数据
      isPreviewShow: false,
      images: [],
      isEditNameShow: false,
      message: '',
      inputName: '',
      isEditGenderShow: false,
      actions: [
        // name 会显示出来，value 是我们自己添加的
        { name: '男', value: 1 },
        { name: '女', value: 0 }
      ],
      isEditBirthdayShow: false,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date()
      // currentDate: new Date()
    }
  },
  computed: {
    file () {
      return this.$refs['file']
    },
    currentDate () {
      return new Date(this.user.birthday)
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        console.log(data)

        this.user = data.data
        console.log(this.user)
      } catch (err) {
        console.log(err)
      }
    },
    onAvatarClick () {
      this.file.click()
    },
    onFileChange () {
      // 拿到input选择的文件对象
      const fileObj = this.file.files[0]
      // 使用window.URL.createObjectURL(file)得到文件数据
      const fileData = URL.createObjectURL(fileObj)
      // 将img.src=路径
      this.images = [fileData]
      this.isPreviewShow = true
      // ImagePreview({
      //   images: [fileData]
      // })
    },
    async onUpdateAvatar () {
      // 提示状态
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '保存中'
      })
      try {
        // 异步发送文件上传
        const formData = new FormData()
        // formData.append('名字', 数据)
        // 参数一：后端要求的数据字段
        // 参数二：数据值
        formData.append('photo', this.$refs.file.files[0])
        const { data } = await updateUserPhoto(formData)
        this.user.photo = data.data.photo
        this.$toast.success('保存成功')
        this.isPreviewShow = false
      } catch (err) {
        console.log(err)
        this.$toast.file('保存失败')
      }
    },
    async onUpdateName () {
      // console.log(1)
      // 提交表单
      await this.updateUserProfile('name', this.inputName)
      // 更新视图
      this.user.name = this.inputName
      this.isEditNameShow = false
    },
    // field:要修改的数据字段
    // value：数据值
    async updateUserProfile (field, value) {
      // 提示状态
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '保存中'
      })
      try {
        await updateUserProfile({
          [field]: value
        })
        this.$toast.success('完成')
      } catch (err) {
        console.log(err)
        this.$toast.fail('失败')
      }
    },
    async onGenderSelect (data) {
      // 请求提交
      await this.updateUserProfile('gender', data.value)
      // 更新视图展示
      this.user.gender = data.value
      // 关闭上拉菜单
      this.isEditGenderShow = false
    },

    async onUpdateBirthday (value) {
      // 使用 moment 把日期对象格式化为指定格式的字符串
      const date = moment(value).format('YYYY-MM-DD')

      // 请求提交
      await this.updateUserProfile('birthday', date)

      // 更新视图
      this.user.birthday = date

      // 关闭弹层
      this.isEditBirthdayShow = false
    }
  }
}
</script>
<style scoped lang="less">
.user-profile {
  .avatar {
    width: 30px;
    height: 30px;
  }

  /deep/ .van-image-preview__cover {
    top: unset;
    left: 0;
    right: 0;
    bottom: 0;
    .van-nav-bar {
      background: #000;
    }
  }

  .van-popup {
    /deep/ .van-nav-bar {
      background: #fff;
      .van-nav-bar__title {
        color: #323233;
      }
    }
  }
}
</style>
