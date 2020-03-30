<template>
  <div class="xwrapper">
    <div class="xcontainer">
      <div class="tabitem" v-for="(item,index) in xMenu" @click="changeType(item)" :key="index">
        <div class="title" v-bind:class="{active: item.isActive}">{{item.name}}</div>
        <div class="activeline" v-show="item.type_id==currentItem.type_id"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNetData } from '../utils/axiosRequest';
import Bus from '../bus' ;
export default {
  name: "TopMenu",
  data() {
    return {
      currentItem: null, // 当前点击的菜单
      xMenu: []
    };
  },
  created() {
    this.getTypeList();
  },
  mounted() {
  },
  methods:{
    getTypeList: async function() {
      try {
        let menu = await getNetData("/Broadcast/GetTypeList");
        this.xMenu = menu.result.list;
        this.currentItem = this.xMenu[0];
        this.currentItem.isActive = true;
      } catch (error) {
        console.log(error);
      }
    },
    changeType: function(item){
      this.currentItem.isActive = false;
      this.currentItem = item;
      this.currentItem.isActive = true;
      Bus.$emit('changeType', item.type_id);
    }
  }
};
</script>

<style scoped>
.xwrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 0.72rem;
  overflow: auto;
  white-space: nowrap;
  border-bottom: 0.01rem solid #e1e1e1;
  background: #fff;
}
.xcontainer{
  padding-left: 0.8rem;
  
}
.xcontainer .tabitem {
  margin-right:1.27rem;
  line-height: 0.72rem;
  font-size: 0.28rem;
  color: #323232;
  text-align: center;
  display: inline-block;
}
.xcontainer .tabitem:last-child{
  margin-right: 0.8rem;
}
.active {
  color: #FF5252;
  font-weight: bold;
}
.activeline{
  margin: -0.04rem auto 0;
  width: 0.56rem;
  height: 0.04rem;
  background: #FF5252;
  border-radius: 0.02rem;
}
.xcontainer .item-active {
  color: #ff5252;
  font-weight: bold;
}
</style>