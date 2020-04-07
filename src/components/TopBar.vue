<template>
  <div class="topbar">
    <div class="title">随行电台</div>
    <div class="downloadbtn" @click="leadToApp">打开APP</div>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  data() {
    return {
      
    };
  },
  created() {
    
  },
  mounted() {
    
  },
  methods:{
    leadToApp: function(){//打开引导弹层
      this.$emit('leadToApp');
    }
  }
};
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 0.96rem;
  color: #FFFFFF;
  text-align: center;
  background: rgba(0,0,0,0.3);
}
.title{
  font-size: 0.34rem;
  line-height: 0.96rem;
  font-weight: bold;
}
.downloadbtn{
  position: absolute;
  top: 0.2rem;
  right: 0.24rem;
  width: 1.51rem;
  height: 0.56rem;
  font-size: 0.26rem;
  line-height: 0.56rem;
  background: rgba(0,0,0,0.3);
  border-radius: 0.32rem;
}

</style>