<template>
  <div class="container">
    <div class="inner">
      <TopBar @leadToApp="showMask"></TopBar>
      <CDcover :anchor_state="anchor_state" @leadToApp="showMask" ></CDcover>
      <ProgressBar v-show="!isLive"></ProgressBar>
      <RadioList v-show="isLive"  
        :anchor_state="anchor_state"
        @leadToApp="showMask">
      </RadioList>
      <ConfirmMask :shareImgUrl='shareImgUrl' v-show="isShow" @close="closeMask"></ConfirmMask>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import wx from 'weixin-js-sdk'
import TopBar from "./TopBar.vue";
import CDcover from "./CDcover.vue";
import ProgressBar from "./ProgressBar.vue";
import RadioList from "./RadioList.vue";
import ConfirmMask from "./ConfirmMask.vue";
import { getNetData } from '../utils/axiosRequest';

export default {
  name: "ShareRadio",
  data: function() {
    return {
      anchor_state:[{
        'anchor_id':'',
        'program_id':'',
        'source':'', //来源（1乘客端、2司机端）
        }
      ],
      source:'', 
      isLive: false, //是否是“电台直播”还是“回放”
      isShow: false, //是否打开“引导下载弹层”
      shareTitle: '',
      shareDesc: '',
      shareLink: location.href.split('#')[0],
      shareImgUrl: '',
    }
  },
  created() {
     this.anchor_state[0].program_id =  this.GetQueryString('program_id');
     this.anchor_state[0].anchor_id = this.GetQueryString('anchor_id');
     this.anchor_state[0].source = this.GetQueryString('source');
  },
  mounted() {
    this.setWxConfig();
    this.getProgramInfo()
  },
  methods: {
        // 项目详情
    async getProgramInfo(){
      var that = this;
      try {
        let res = await getNetData("/Broadcast/GetProgramInfo",{'program_id':this.anchor_state[0].program_id});
          console.log(res)
          that.isLive = res.result.is_live;
          this.shareTitle = res.result.program_name;
          this.shareDesc = res.result.material_name;
          this.shareImgUrl = res.result.material_image;
          this.anchor_state[0].anchor_id = res.result.anchor_id;
           console.log(that.anchor_state[0].anchor_id)
      } catch (error) {
        console.log(error);
      }
    },
    showMask: function(){ //打开引导弹层
      this.isShow = true;
    },
    closeMask: function(){
      this.isShow = false;
    },
    setWxConfig:function(){
      axios.get('//weixin.yongche.com/wechat/jssdk/config?url=' + encodeURIComponent(location.href.split('#')[0])).then((res) => {
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
    },

    GetQueryString(name) { 
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
      var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
      var context = ""; 
      if (r != null) 
         context = r[2]; 
      reg = null; 
      r = null; 
      return context == null || context == "" || context == "undefined" ? "" : context; 
    }


  },
  components: {
    TopBar,
    CDcover,
    ProgressBar,
    RadioList,
    ConfirmMask
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
}
.inner{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  padding-top: 0.96rem;
  background: rgba(0,0,0,0.3);
  overflow: scroll;
}
.blur {	
  /* FireFox, Chrome, Opera */
  /*filter: url(blur.svg#blur);*/  
  -webkit-filter: blur(10px); /* Chrome, Opera */
      -moz-filter: blur(10px);
      -ms-filter: blur(10px);    
          filter: blur(10px);
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */
}
</style>