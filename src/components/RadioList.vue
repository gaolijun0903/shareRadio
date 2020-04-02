<template>
  <div class="ywrapper">
    <!-- <div class="ycontainer">
      <div class="channellist">
        <div class="channelitem" v-for="(item,index) in zbList" @click="jumpToLive(item.anchor_id)" :key="index">
          <div class="avatarbox">
            <img class="avatar" v-lazy="item.avatar" />
            <div class="browsebox">
              <span class="browseicon"></span><span class="browsenum">{{item.browse}}万</span>
            </div>
          </div>
          <div class="channelname">{{item.signature}}</div>
          <div class="praisebox">
            <span class="praiseicon"></span><span class="praisenum">{{item.praise}}</span>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>

import Bus from '../bus' ;
export default {
  name: "RadioList",
  data() {
    return {
      
    };
  },
  created() {
    // 请求首屏数据
    //this.fetchData();
  },
  mounted() {
    // Bus.$on('changeType', this.changeTypeId);
    // this.$nextTick(() => {
    //   this.createYScroller();
    // });
  },
  methods: {
    
  }
};
</script>

<style scoped>

.praisenum{
  font-family: PingFangSC-Medium, sans-serif; /* 苹方-简 中黑体 */
}
</style>