<template>
  <div class="wrapper">
    <div class="listhead">
      <div class="head-l">
        <span class="station-icon"></span>
        电台直播
      </div>
      <div class="head-r" @click="leadToApp">
        <span class="addall-icon"></span>
        添加全部回放
      </div>
    </div>
    <div class="listbody">
      <div class="listitem played">
        <div class="item-l">《人在江湖》 - 郭德纲、于谦</div>
        <div class="item-r">已播完</div>
      </div>
      <div class="listitem playing">
        <div class="item-l">《人在江湖》 - 郭德纲、于谦</div>
        <div class="item-r"></div>
      </div>
      <div class="listitem toplay">
        <div class="item-l">《人在江湖》 - 郭德纲、于谦</div>
        <div class="item-r">14:05 播放</div>
      </div>
      <div class="listitem toplay">
        <div class="item-l">《人在江湖》 - 郭德纲、于谦</div>
        <div class="item-r">14:05 播放</div>
      </div>
      <div class="listitem toplay">
        <div class="item-l">《人在江湖》 - 郭德纲、于谦</div>
        <div class="item-r">14:05 播放</div>
      </div>
      <div class="listitem toplay">
        <div class="item-l">《人在江湖》 - 郭德纲、于谦</div>
        <div class="item-r">14:05 播放</div>
      </div>
    </div>
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
    leadToApp: function(){
      //打开引导弹层
    }
  }
};
</script>

<style scoped>
.wrapper{
  margin-top: 0.96rem;
  margin-bottom:0.96rem;
  padding-left: 0.28rem;
  color: #ffffff;
  background:rgba(0,0,0,0.3);
}
.listhead{
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  padding-right: 0.28rem;
  width: 100%;
  height: 1.2rem;
}
.head-l{
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  width: 2.28rem;
  height: 0.56rem;
  font-size: 0.34rem;
  font-weight: bold;
}
.head-l .station-icon{
  margin-right: 0.04rem;
  width: 0.56rem;
  height: 0.56rem;
  background: url(~@/assets/station@2x.png) no-repeat center;
  background-size: 100%;
}
.head-r{
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  width: 2.28rem;
  height: 0.56rem;
  background: rgba(0,0,0,0.3);
  border: 0.01rem solid #C8C8C8;
  border-radius:0.08rem;
}
.head-r .addall-icon{
  margin-right: 0.04rem;
  width: 0.4rem;
  height: 0.4rem;
  background: url(~@/assets/addall@2x.png) no-repeat center;
  background-size: 100%;
}
.listitem{
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  padding-right: 0.28rem;
  height: 0.8rem;
  font-size: 0.28rem;
  border-top: 0.01rem solid #888888;
}
.listitem.played{
  color: #888888;
}
.listitem.playing{
  color: #FF5252;
}
.listitem.toplay{
  color: #ffffff;
}
.listitem .item-r{
  font-size: 0.24rem;
  text-align: right;
}
.listitem.playing .item-r{
  width: 0.64rem;
  height: 0.64rem;
  background: url(~@/assets/playing@2x.png) no-repeat center;
  background-size: 100%;
}
.listitem.toplay .item-r{
  color: #C8C8C8;
}
</style>