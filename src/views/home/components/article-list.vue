<template>
  <div class="article-list">
    <!-- v-model="isLoading"控制下拉刷新的状态 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(article, index) in list" :key="index" :title="article.title"
        @click="$router.push('/article/'+article.art_id)"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'

export default {
  name: 'ArticleList',
  components: {},
  // props: ['channel'],
  props: {
    // 参考文档：https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81
    channel: {
      type: Object, // 必须是对象
      required: true // 必须传递该数据
    }
  },
  data () {
    return {
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      timestamp: null // 用于获取下一页数据的页码（时间戳）
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onRefresh () {
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1
      })

      // 2. 如果有最新数据，则把数据放到列表的顶部
      const { results } = data.data
      this.list.unshift(...results)

      // 3. 关闭下拉刷新的 loading 状态
      this.isLoading = false

      // 提示更新成功
      this.$toast(`更新了${results.length}条数据`)
    },

    async onLoad () {
      // 异步更新数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        // 第1次使用 Date.now() 获取最新数据
        // 下一页的数据使用本次返回的数据中的 timestamp
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      //   把请求数据添加到数组列表中
      const results = data.data.results
      //   console.log(results)
      this.list.push(...results)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成时
      if (results.length) {
        // console.log(111)
        // 更新获取下一页数据的时间戳
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped></style>
