<template>
  <div id="app">
    <LiveBroadcast />
  </div>
</template>

<script>
import LiveBroadcast from './components/LiveBroadcast'

export default {
  name: 'App',
  components: {
    LiveBroadcast
  },
  mounted() {
    // 调用迷你播放栏
    try {
      console.log('显示迷你播放栏');
      var pageurl = window.location.href;
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if(isiOS){
        if(pageurl.indexOf('isuiweb')!=-1){//当前iOS乘客端使用比较老的UIWebView加载H5页面，需直接调用openAnchorDetail(anchorID)和showPlayCD()
          showPlayCD(1);
        }else{//后期iOS乘客端会使用WK做全面适配,就不再有’isuiweb‘这个参数了
          window.webkit.messageHandlers.showPlayCD.postMessage(1);
        }
      }else if(isAndroid){
        window.JsInteration.showPlayCD();
      }else{
        //window.location.href = "yongche://showPlayCD?a=1"
      }
    } catch (error) {
      console.error(error);
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
</style>
