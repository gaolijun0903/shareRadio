<template>
  <div id="app">
    <div class="container">
        <TopBar></TopBar>
        <YScrollList></YScrollList>
    </div>
  </div>
</template>

<script>
import TopBar from "./components/TopBar.vue";
import YScrollList from "./components/YScrollList.vue";

export default {
  name: 'App',
  components: {
    TopBar,
    YScrollList
  },
  mounted() {
    
    try {
      
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    initFn:function(){

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
