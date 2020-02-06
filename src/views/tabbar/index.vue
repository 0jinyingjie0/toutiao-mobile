<template>
  <div class="tabbar-contanier">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- tabbar 标签栏 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data () {
    return {
    //   user: {}
    }
  },
  methods: {

  },
  create () {

  }
}
</script>

<style>
</style>
