<template>
  <div class="wrapper">
    <div class="cdbox">
      <img class="cdcover" :src="coverImg" alt="">
      <div class="btnbox">
        <div class="playbtn" :class="{playing:isPlaying}" @click="play"></div>
        <div class="likebtn" :class="{like:isLike}" @click="leadToApp"></div>
      </div>
    </div>
    <video ref="video" id="video" ></video>
    <!-- <audio ref="audio" id="audio" src="https://live-broadcast.yongche.org/2/live.m3u8 " preload="auto" ></audio> -->
    <!-- <audio ref="audio" id="audio" src="https://lhttp.qingting.fm/live/4900/64k.mp3" preload="auto" type="application/x-mpegURL"></audio> -->

    <div class="maintitle" @click="leadToApp">{{mainTitle}}</div>
    <div class="subtitle" @click="leadToApp">{{subTitle}}</div>
  </div>
</template>

<script>
import { getNetData } from '../utils/axiosRequest';
import Bus from '../bus' ;
export default {
  name: "CDcover",
  data() {
    return {
      coverImg: "https://testing.broadcast.yongche.org/upload/avatar/71e7aa3da87be755f011b84591b9d938@2x.png",
      mainTitle: "《人在江湖》- 郭德纲、于谦",
      subTitle: "郭德纲精选相声合集",
      isPlaying: true, //播放状态--true播放/false暂停
      isLike: true, //订阅状态--true订阅/false未订阅
    };
  },
  created() {
    // this.getTypeList();
  },
  mounted() {
    // if(Hls.isSupported()) {
    //   var video = this.$refs.video;
    //   var hls = new Hls();
    //   hls.loadSource('https://live-broadcast.yongche.org/2/live.m3u8 ');
    //   hls.attachMedia(video);
    //   hls.on(Hls.Events.MANIFEST_PARSED,function() {
    //     video.play();
    //   });
    // }
  },
  methods:{
    getTypeList: async function() {
      try {
        let menu = await getNetData("/Broadcast/GetTypeList");
        this.xMenu = menu.result.list;
        this.currentItem = this.xMenu[0];
        this.currentItem.isActive = true;
      } catch (error) {
        console.log(error);
      }
    },
    play: function(){
      if (this.isPlaying) {
        this.isPlaying = false;
        this.$refs.video.play();
      } else {
        this.isPlaying = true;
        this.$refs.video.pause();
      }
    },
    leadToApp: function(){//打开引导弹层
      this.$emit('leadToApp');
    }
  }
};
</script>

<style scoped>
.wrapper{
  text-align: center;
}
.cdbox{
  position: relative;
  margin: 1.2rem auto 0.96rem;
  width: 4.0rem;
  height: 4.0rem;
  border-radius: 0.16rem;
  overflow: hidden;
}
.cdcover{
  width: 100%;
  height: 100%;
}
.btnbox {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.2);
  
}
.playbtn{
  margin: 1.46rem auto 0;
  width: 1.08rem;
  height: 1.08rem;
  background: url(~@/assets/play@2x.png) no-repeat center;
  background-size: 100%;
}
.playbtn.playing{
  background-image: url(~@/assets/pause@2x.png);
}
.likebtn{
  position: absolute;
  right: 0.12rem;
  bottom: 0.12rem;
  width: 0.56rem;
  height: 0.56rem;
  background: url(~@/assets/dislike@2x.png) no-repeat center;
  background-size: 100%;
}
.likebtn.like{
  background-image: url(~@/assets/like@2x.png);
}
.maintitle{
  height: 0.48rem;
  line-height: 0.48rem;
  font-size: 0.34rem;
  font-weight: bold;
  color: #ffffff;
}
.subtitle{
  margin-top: 0.08rem;
  height: 0.37rem;
  line-height: 0.37rem;
  font-size: 0.26rem;
  color: #E1E1E1;
}
#video{
  display: none;
}
</style>