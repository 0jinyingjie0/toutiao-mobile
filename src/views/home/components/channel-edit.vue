<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain @click="isEditShow=!isEditShow">
          {{ isEditShow ? '完成' : '编辑'}}
      </van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item,index) in userChannels"
        :key="item.id"
        @click="onUserChannelClick(index)"
      >
       <span
          slot="text"
          class="text"
          :class="{
            active: index === active
          }"
        >{{ item.name }}</span>
         <van-icon v-show="isEditShow && index!=0" slot="icon" name="close" />
      </van-grid-item>

    </van-grid>

    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in remainChannels"
        :key="value.id"
        :text="value.name"
        @click="onChannel(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allchannels: [],
      isEditShow: false
    }
  },
  computed: {
    //   用计算属性获取剩余的频道
    remainChannels () {
      // 获取频道总数和用户的频道
      const { allchannels, userChannels } = this
      //   定义剩余的频道
      const channels = []
      //   通过遍历获取剩余的频道
      allchannels.forEach(item => {
        if (!userChannels.find(i => i.id === item.id)) {
          channels.push(item)
        }
      })
      //   返回出剩余的频道
      return channels
    }
  },
  watch: {
    // 当 userChannels 发生改变的时候，将该数据存储到本地存储
    userChannels () {
      setItem('user-channels', this.userChannels)
    }
  },
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    //   删除频道
    onUserChannelClick (index) {
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1)
      } else {
        // console.log(444444)

        //   非编辑状态，点击切换频道
        this.$emit('switch', index)
      }
    },
    //   添加频道事件
    onChannel (channel) {
    //   console.log(1111111111)

      this.userChannels.push(channel)
    },
    //   获取全部的频道
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allchannels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 40px;
  .channel-header {
    font-size: 16px;
    color: #333;
  }
  /deep/ .van-grid-item {
    width: 80px;
    height: 43px;
    position: relative;
    .van-grid-item__icon-wrapper {
      position: absolute;
      top: -14px;
      right: -5px;
      .van-icon-close {
        font-size: 14px;
      }
    }
    .van-grid-item__content {
      background: #f4f5f6;
    }
    .van-grid-item__text, .text {
      font-size: 14px;
      color: #222;
    }
    .active {
      color: red;
    }
  }
}
</style>
