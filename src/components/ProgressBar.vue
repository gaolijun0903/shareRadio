<template>
 <div class="wrapper">
   <span class="time time-l">{{GetDateTime(currentTime)}}</span>
        <span class="time time-r">{{GetDateTime(duration)}}</span>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
       
        <div class="bar-inner">
          <div class="progress"  ref="progress"></div>
          <div class="progress-btn-wrapper" ref="progressBtn"
              @touchstart.prevent = "progressTouchStart"
              @touchmove.prevent = "progressTouchMove"
              @touchend = "progressTouchEnd"
          >
            <div class="progress-btn"></div>
          </div>
        </div>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 进度条按钮宽度,由于style中没有设置width,因此只能用clientWidth获取
  import Bus from '../bus' ;
  import { padding0 } from "../utils/functions";
  export default {
    name: "ProgressBar",
    data() {
      return {
        btnWidth: {
          type: Number,
          default: 0
        },
        touchInfo: {
          initiated: false
        },
        currentTime:'',
        duration:'',
        percent:''
      }
    },
 
    mounted() {
      this.btnWidth = document.getElementsByClassName('progress-btn')[0].clientWidth
      Bus.$on('currentTime1', this.getCurrentTime);
      Bus.$on('duration', this.getdDuration);
      
    },
    methods: {
      // 获取currentTime当前时间
      getCurrentTime(val){
        this.currentTime= parseInt(val)
       this.currentTime1()
      },
      getdDuration(e){
        this.duration= parseInt(e)
      },
      currentTime1() {
        // console.log(newPercent)
         var newPercent = Math.min(1, this.currentTime / this.duration)
        if (newPercent > 0 && !this.touchInfo.initiated) {
          // 进度条总长度
          const barWidth = this.$refs.progressBar.clientWidth - this.btnWidth
          const offsetWidth = barWidth * newPercent
          // 设置进度条及按钮偏移
          this._setOffset(offsetWidth)
        }
      },
      // 点击按钮
      progressTouchStart(e) {
        // 记录touch事件已经初始化
        this.touchInfo.initiated = true
        // 点击位置
        this.touchInfo.startX = e.touches[0].pageX
        // 点击时进度条长度
        this.touchInfo.left = this.$refs.progress.clientWidth
      },
      // 开始移动
      progressTouchMove(e) {
        if (!this.touchInfo.initiated) {
          return
        }
        // 计算移动距离
        const moveX = e.touches[0].pageX - this.touchInfo.startX
        // 设置偏移值
        const offsetWidth = Math.min(Math.max(0, this.touchInfo.left + moveX),
          this.$refs.progressBar.clientWidth - this.btnWidth)
        this._setOffset(offsetWidth)
      },
      // 移动结束
      progressTouchEnd(e) {
        this.touchInfo.initiated = false
        // 向父组件派发事件,传递当前百分比值
        this._triggerPercent()
      },
      // 进度条点击事件
      progressClick(e) {
        console.log('clikc')
        // 设置进度条及按钮偏移
        this._setOffset(e.offsetX)
        // 通知父组件播放进度变化
        this._triggerPercent()
      },
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - this.btnWidth
        const percent = Math.min(1, this.$refs.progress.clientWidth / barWidth)
        Bus.$emit('percentChange', percent)
      },
      // 设置偏移
      _setOffset(offsetWidth) {
        // 设置进度长度随着百分比变化
        this.$refs.progress.style.width = `${offsetWidth}px`
        // 设置按钮随着百分比偏移
        this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
      },
      GetDateTime(time) {
        if (time >= 60 && time <= 3600) {
            time = parseInt(time / 60) + ":" + padding0(time % 60);              
        }
        else if (time > 3600) {
             time = parseInt(time / 3600) + ":" + padding0(parseInt(((time % 3600) / 60))) + ":" + padding0(time % 60);
        }
        else {
            time =' 00:'+ padding0(time);
        }
          return time;
      }
    },
    computed: {
      
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper{
    position: fixed;
    bottom: 1.8rem;
    width: 100%;
    height: 0.25rem;
    padding: 0.15rem;
  // border: 1px solid black;
}
.time{
  font-size: 0.18rem;
  color: #E1E1E1;
  letter-spacing: 0;
}
.time-l{
  margin-top 0.08rem
  position absolute
  left 0.24rem
  top 0.24rem
}
.time-r{
  margin-top 0.08rem
  position absolute
  right 0.25rem
  top 0.24rem
}
  .progress-bar
    width 5.34rem
    height 0.5rem
    margin auto
    position relative
    .bar-inner
      width 5.34rem
      position relative
      top 0.25rem
      height 0.04rem
      background rgba(255, 255, 255, 0.5)
      .progress
        position absolute
        height 100%
        background #FF5252
      .progress-btn-wrapper
        position absolute
        left -0.25rem
        top -0.2rem
        width 0.5rem
        height 0.5rem
        .progress-btn
          position relative
          top 0.1rem
          left 0.12rem
          box-sizing border-box
          width 0.24rem
          height 0.24rem
          border 0.06rem solid #fff
          border-radius 50%
          background #fff
</style>