<template>
  <div id="app">
    <div class="container">
        <TopBar></TopBar>
        <!-- <YScrollList></YScrollList> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import wx from 'weixin-js-sdk'
import TopBar from "./components/TopBar.vue";
//import YScrollList from "./components/YScrollList.vue";

export default {
  name: 'App',
  data: {
    shareTitle: '世界那么大，我想去看看-微信test',
    shareDesc: '世界那么大，我想去看看-微信test',
    shareLink: location.href.split('#')[0],
    shareImgUrl: 'http://www.baidu.com/FpEhdOqBzM8EzgFz3ULByxatSacH'
  },
  components: {
    TopBar,
    // YScrollList
  },
  mounted() {
    this.setWxConfig();
    
  },
  methods: {
    initFn:function(){
      
    },
    setWxConfig:function(){
      this.axios.get('//weixin.yongche.com/wechat/jssdk/config?url=' + encodeURIComponent(location.href.split('#')[0])).then((res) => {
        wx.config({
          debug: true, // 开启调试模式
          appId: res.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature,// 必填，签名
          jsApiList: [
            "updateAppMessageShareData",//自定义“分享给朋友”及“分享到QQ”按钮的分享内容
            "updateTimelineShareData",//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
            //"onMenuShareWeibo",//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
          ] // 必填，需要使用的JS接口列表
        })
      }).catch((error) => {
        console.log(error)
      });

      //通过ready接口处理成功验证
      wx.ready(function(){
          this.wxShareTimeline();
          this.wxShareAppMessage();
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });

      wx.error(function(res){
      //config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    },
    wxShareTimeline() {// 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
      wx.updateAppMessageShareData({
        title: this.shareTitle, // 分享标题
        desc: this.shareDesc, // 分享描述
        link: this.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.shareImgUrl, // 分享图标
        success: () => {
        }
      })
    },
    wxShareAppMessage() {//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
      wx.updateTimelineShareData({
        title: this.shareTitle, // 分享标题
        desc: this.shareDesc, // 分享描述
        link: this.shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.shareImgUrl,
        //imgUrl: require('./logo.jpg'), // 分享图标(不能赋相对路径，一定要是绝对路径)
        success: () => {
        }
      })
    }

  }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html,body{
    width: 100%;
    height: 100%;
}
#app{
  padding-top: 0.72rem;
  width: 100%;
  height: 100%;
}
.container{
    width: 100%;
    height: 100%;
}
</style>
