<template>
  <div id="app">
    <ShareRadio></ShareRadio>
  </div>
</template>

<script>

import ShareRadio from "./components/ShareRadio.vue";

export default {
  name: 'App',
  components: {
    ShareRadio,
  },
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html, body, #app, .container, #bgimg{
  width: 100%;
  height: 100%;
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
