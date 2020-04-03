<template>
  <div class="wrapper">
    <div class="inner">
      <div class="stationlogo">
        <img src="https://testing.broadcast.yongche.org/upload/avatar/71e7aa3da87be755f011b84591b9d938@2x.png" alt="">
        <div class="logobar">今日电台30个好声音</div>
      </div>
      <div class="leadtip">每天好声音等着你哦<br/>打开APP随心收听</div>
      <div class="open-btn" @click="download">立即打开</div>
    </div>
  </div>
</template>

<script>
import {phoneTypeFn, getUrlParamFn} from "../utils/functions"
export default {
  name: "ConfirmMask",
  data() {
    return {
      origin:'', //分享来源app--"driver" or "user"
      phoneType:'', //机型---"ios" or "android"
      openAppSchema:'', //schema打开APP
      downloadUrl:'' //下载地址
    };
  },
  created() {
    
  },
  mounted() {
    this.phoneType = phoneTypeFn();
    this.origin = getUrlParamFn('appOrigin');
    this.setDownloadUrl();
  },
  methods:{
    setDownloadUrl:function(){
      if(this.phoneType==="ios"){
        if(this.origin==="driver"){
          this.openAppSchema = "yidaodriver://";
          this.downloadUrl = "https://itunes.apple.com/cn/app/yi-dao-che-zhu-duan/id1011021209?mt=8";
        }else if(this.origin==="user"){
          this.openAppSchema = "yongche://";
          this.downloadUrl = "https://itunes.apple.com/cn/app/yi-dao-yong-che-wan-liang/id427555239?mt=8";
        }else{
          console.log('未知分享来源APP')
        }
      }else if(this.phoneType==="android"){
        if(this.origin==="driver"){
          this.openAppSchema = "yidaodriver://user.com";
          this.downloadUrl ='http://d1.yongche.name//u/download/201804/ycd_724_325_huidu3.apk';
        }else if(this.origin==="user"){
          this.openAppSchema = "yongche://user.com";
          this.downloadUrl ='http://www.yongche.com/download/yongche.php?source=';
        }else{
          console.log('未知分享来源APP')
        }
      } else{
          alert('请在手机中打开')
      }
    },
    download:function(){
      if(this.openAppSchema){
        console.log(this.openAppSchema)
        console.log(this.downloadUrl)
        window.location = this.openAppSchema;
        setTimeout(function() {
            window.location = this.downloadUrl;
        }, 1000);
      }
    }
    
  }
};
</script>

<style scoped>
.wrapper{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background: rgba(0,0,0,0.70);
}
.inner{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -2.9rem;
  margin-top: -2.73rem;
  width: 5.8rem;
  height: 5.46rem;
  text-align: center;
  background: #FFFFFF;
  border-radius: 0.08rem;
}
.stationlogo{
  position: relative;
  margin: 0.56rem auto 0.29rem;
  width: 2.3rem;
  height: 2.3rem;
  overflow: hidden;
  background: #F1F1F1;
}
.stationlogo img{
  width: 100%;
  height: 100%;
}
.logobar{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.41rem;
  font-size: 0.22rem;
  color: #FFFFFF;
  background: rgba(0,0,0,0.3);
}
.leadtip{
  font-size: 0.3rem;
  color: #646464;
  line-height: 0.38rem;
}
.open-btn{
  margin: 0.43rem auto 0;
  width: 5.15rem;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.3rem;
  color: #FFFFFF;
  background: #FF5252;
  border-radius: 0.08rem;
  
}
</style>