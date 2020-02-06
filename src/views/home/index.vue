<template>
  <div class="home home-container">
    <!-- 导航栏 -->

    <van-nav-bar title="首页" fixed />

    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <!--
      v-model="active" 控制激活的标签
      title 标签标题
    -->
    <van-tabs v-model="active" class="fixed-tabs">
      <!-- 插槽插入一个图标 -->
      <van-icon class="wap-nav" slot="nav-right" name="wap-nav" @click="isChannelEditShow = true" />
      <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id">
        <!-- 文章列表 -->
        <article-list :channel="channel" />
        <!-- /文章列表 -->
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
    <!-- 弹出层列表 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit
      :user-channels="userChannels"
      :active="active"
       @switch="onChannelEdit"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      isChannelEditShow: false, // 弹窗的显示控制
      active: 0, // 控制激活的标签页
      userChannels: [] // 用户频道列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    onChannelEdit (index) {
      // 切换频道
      this.active = index
      // 关闭弹层
      this.isChannelEditShow = false
    },
    async loadUserChannels () {
      // console.log(1)

      try {
        // 1. 定义一个变量用来存储频道列表
        let channels = []

        // 2. 获取本地存储的频道列表
        const localUserChannles = getItem('user-channels')

        // 3. 如果本地存储有，就使用本地存储的
        if (localUserChannles) {
          channels = localUserChannles
        } else {
          // 4. 如果本地存储没有，则请求获取接口推荐的频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        }

        // 5. 最后，把数据赋值到当前组件中
        this.userChannels = channels
      } catch (err) {
        console.log(err)
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
.wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
}

</style>
