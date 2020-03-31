<template>
  <div class="topbar">
    <div class="downloadbtn" @click="download">下载</div>
  </div>
</template>

<script>
import {phoneTypeFn, getUrlParamFn} from "../utils/functions"
export default {
  name: "TopBar",
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
.topbar {
  width: 100%;
  height: 0.72rem;
  background: #ccc;
}
.downloadbtn{
  width: 50%;
  height: 0.72rem;
  background: #fff;
  
}

</style>