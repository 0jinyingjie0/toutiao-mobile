<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch(searchContent)"
        @cancel="onCancel"
        @focus="isResultShow=false"
        @input="onSearchInput"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result
     v-if="isResultShow"
     :q="searchContent"
     ></search-result>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchContent">
      <van-cell icon="search" :title="item" v-for="(item,index) in suggestions" :key="index" @click="onSearch(item)">
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
       <template v-if="isDeleteShow">
          <span @click="searchHistories = []">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </template>
         <van-icon v-else name="delete" @click="isDeleteShow = true" />
      </van-cell>

       <van-cell
        :title="item"
        v-for="(item, index) in searchHistories"
        :key="index"
        @click="onHistoryClick(item, index)"
      >
        <van-icon  name="close"></van-icon>
      </van-cell>

    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'
import { getItem } from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: {
    SearchResult
  },
  props: {

  },
  data () {
    return {
      isResultShow: false, // 搜索结果的显示状态
      searchContent: '', // 搜索内容
      suggestions: [], // 联想建议
      searchHistories: getItem('search-histories') || [], // 搜索历史记录
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {
    searchHistories (val) {
      getItem('search-histories', val)
    }
  },
  created () {},
  mounted () {},
  methods: {
    onHistoryClick (item, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        this.onSearch(item)
      }
    },
    onSearch (q) {
      // 更新搜索框的数据
      this.searchContent = q
      // 2. 记录搜索历史记录
      const searchHistories = this.searchHistories
      const index = searchHistories.indexOf(q)
      if (index !== -1) {
        searchHistories.splice(index)
      }
      searchHistories.unshift(q)
      // 展示搜索结果
      this.isResultShow = true
    },
    onCancel () {
      console.log('onCancel')
    },
    // 函数防抖
    onSearchInput: debounce(async function () {
      const searchContent = this.searchContent
      if (!searchContent) {
        return
      }
      // 请求获取数据
      const { data } = await getSuggestions(searchContent)
      // 将数据添加到组件实例中
      this.suggestions = data.data.options
      console.log(data)

      // 模板绑定
    }, 200),

    highlight (str) {
      const searchContent = this.searchContent
      const reg = new RegExp(searchContent, 'gi')
      return str.replace(reg, `<span style="color: red">${searchContent}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 54px;
  // 让搜索栏固定在顶部
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
