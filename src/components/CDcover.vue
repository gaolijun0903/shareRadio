<template>
  <div class="wrapper">
    <div class="wrapper1" :style="{backgroundImage:'url('+background+')'}"></div>
    <div class="cdbox">
      <img class="cdcover" :src="coverImg" alt="">
      <div class="btnbox">
        <div class="playbtn" :class="{playing:isPlaying}" @click="play"></div>
        <div class="likebtn" :class="{like:isLike}" @click="leadToApp"></div>
      </div>
    </div>
    <audio ref="audio" class="dn" id="audio" 
     loop="loop"
    :src="url" :preload="audio.preload"
    @play="onPlay" 
    @error="onError"
    @waiting="onWaiting"
    @pause="onPause" 
    @timeupdate="onTimeupdate" 
    @loadedmetadata="onLoadedmetadata"
    
    ></audio>

    <div class="maintitle">{{mainTitle}}</div>
    <div class="subtitle">{{subTitle}}</div>
  </div>
</template>

<script>
import { getNetData } from '../utils/axiosRequest';
import { padding0 } from "../utils/functions";
import Bus from '../bus' ;
export default {
  name: "CDcover",
  data() {
    return {
      coverImg: "",
      mainTitle: "",
      subTitle: "",
      isPlaying: true, //播放状态--true播放/false暂停
      isLike: true, //订阅状态--true订阅/false未订阅
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false,
        muted: false,
        speed: 1,
        waiting: true,
        preload: 'auto'
      },
      background:'',
      duration:'',
      url:'https://sharefs.yun.kugou.com/202004071005/e42a1acc8ad45f032d725878453aec68/G212/M02/1B/00/FA4DAF5m9hmAJM-NADw8lP7caBA847.mp3'
    };
  },
  props: {
    anchor_state: {
      type:Array,
      required:true
    }
  },
  created() {
    this.getAnchorInfo();
    this.getProgramInfo();
  },
  mounted() {
    Bus.$on('percentChange', this.getPercent);
  },
  methods:{
    getPercent(val){
      this.$refs.audio.currentTime = this.audio.maxTime * val
    },  
    async getAnchorInfo(){
       try {
        let res = await getNetData("/Broadcast/GetAnchorInfo",{'anchor_id':this.anchor_state[0].anchor_id});
        this.coverImg = res.result.avatar;
        this.background = res.result.avatar;
      } catch (error) {
        console.log(error);
      }
    },
     // 节目详情
    async getProgramInfo(){
       try {
        let res = await getNetData("/Broadcast/GetProgramInfo",{'program_id':this.anchor_state[0].program_id});
        this.mainTitle = res.result.program_name;
        this.subTitle = res.result.material_name;
        this.url = res.result.material_path;
      } catch (error) {
        console.log(error);
      }
    },
    play: function(){
      if (this.isPlaying) {
        this.isPlaying = false;
        this.$refs.audio.play();
        this.leadToApp();
      } else {
        this.isPlaying = true;
        this.$refs.audio.pause();
      }
    },
    // 当音频开始播放
    onPlay (res) {
      console.log(res)
      this.audio.playing = true
      this.audio.loading = false
      // if(!this.controlList.onlyOnePlaying){
      //   return 
      // }
      let target = res.target
      let audios = document.getElementsByTagName('audio');
      [...audios].forEach((item) => {
        if(item !== target){
          item.pause()
        }
      })
    },
    // 暂停
    pausePlay() {
      this.$refs.audio.pause()
    },
    // 当音频暂停
    onPause () {
      this.audio.playing = false
    },
    // 当发生错误, 就出现loading状态
    onError () {
      this.audio.waiting = true
    },
    // 当音频开始等待
    onWaiting (res) {
      console.log(res)
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      // console.log('timeupdate')
      // console.log(res)
      this.audio.currentTime = res.target.currentTime
      Bus.$emit('currentTime1', this.audio.currentTime);
      this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
    
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      console.log('loadedmetadata')
      console.log(res)
      this.audio.waiting = false
      this.audio.maxTime = parseInt(res.target.duration)
      console.log(this.audio.maxTime )
      Bus.$emit('duration', this.audio.maxTime);
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
.wrapper1{
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent url() center center no-repeat;
  filter: blur(0.4rem);
  z-index: -1;
  background-size: cover;
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
  background: url(~@/assets/pause@2x.png) no-repeat center;
  background-size: 100%;
}
.playbtn.playing{
  background: url(~@/assets/play@2x.png) no-repeat center;
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
</style>