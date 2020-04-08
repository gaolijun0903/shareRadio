<template>
  <div class="wrapper">
    <div class="listhead">
      <div class="head-l">
        <span class="station-icon"></span>
        电台直播
      </div>
      <div class="head-r" @click="leadToApp">
        <span class="addall-icon"></span>
        添加全部回放
      </div>
    </div>
    <div class="listbody">
      <div v-for="(item,index) in programList" :key="index"  @click="leadToApp">
        <div class="listitem played" v-show="item.playState == 0">
          <div class="item-l">{{item.material_name}}</div>
          <div class="item-r">已播完</div>
        </div>
        <div class="listitem playing" v-show="item.playState == 1">
          <div class="item-l">{{item.material_name}}</div>
          <div class="item-r"></div>
        </div>
        <div class="listitem toplay" v-show="item.playState == 2">
          <div class="item-l">{{item.material_name}}</div>
          <div class="item-r">{{item.start_time_formatted}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '../bus' ;
import { getNetData } from '../utils/axiosRequest';
import { padding0 } from "../utils/functions";
export default {
  name: "RadioList",
  data() {
    return {
      programList:[]
    };
  },
  props: {
     anchor_state: {
      type:Array,
      required:true
    }
  },
  created() {
   
  },
  mounted() {
     this.getProgramList()
  },
  methods: {
     getProgramList: async function() { 
      try {
        //获取主播节目列表
          var res = await getNetData("/Broadcast/GetProgramList", {
          anchor_id: this.anchor_state[0].anchor_id, 
          source: this.anchor_state[0].source, 
          page: 1,
          page_size: 100   //长页面展示不分页
        });
         this.programList  = res.result.list;
         Bus.$emit('programListLength', res.result.count);
         this.timeFilter();

      } catch (error) {
        console.error(error);
      }
    },
    timeFilter: function(){
      setInterval(() => {
        this.programList.map(item => {
          this.setPlayState(item);
          item.start_time_formatted = this.formatDate(item.start_time*1000);
        })
      }, 60000);  //每分钟更新播放状态
    },
    setPlayState: function(item){
      var curTimestamp = new Date().getTime();
      // var curTimestamp = 1586229587953;   //TODO  测试时间
      if(curTimestamp<item.start_time*1000){ //未开始
        item.playState = 2;
      }else if(curTimestamp>=item.start_time*1000 && curTimestamp<item.end_time*1000){ //ing
        item.playState = 1;
      }else if(curTimestamp>=item.end_time*1000){//已结束
        item.playState = 0;
      }
    },
    formatDate: function (t) { 
      var d=new Date(t); 
      var hour=d.getHours(); 
      var minute=d.getMinutes(); 
      return padding0(hour)+":"+padding0(minute)+" 播放"; 
    },
    leadToApp: function(){//打开引导弹层
      this.$emit('leadToApp');
    }
  }
};
</script>

<style scoped>
.wrapper{
  margin-top: 0.96rem;
  margin-bottom:0.96rem;
  padding-left: 0.28rem;
  color: #ffffff;
  background:rgba(0,0,0,0.3);
}
.listhead{
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  padding-right: 0.28rem;
  width: 100%;
  height: 1.2rem;
}
.head-l{
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  width: 2.28rem;
  height: 0.56rem;
  font-size: 0.34rem;
  font-weight: bold;
}
.head-l .station-icon{
  margin-right: 0.04rem;
  width: 0.56rem;
  height: 0.56rem;
  background: url(~@/assets/station@2x.png) no-repeat center;
  background-size: 100%;
}
.head-r{
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  width: 2.28rem;
  height: 0.56rem;
  background: rgba(0,0,0,0.3);
  border: 0.01rem solid #C8C8C8;
  border-radius:0.08rem;
}
.head-r .addall-icon{
  margin-right: 0.04rem;
  width: 0.4rem;
  height: 0.4rem;
  background: url(~@/assets/addall@2x.png) no-repeat center;
  background-size: 100%;
}
.listitem{
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  padding-right: 0.28rem;
  height: 0.8rem;
  font-size: 0.28rem;
  border-top: 0.01rem solid #888888;
}
.listitem.played{
  color: #888888;
}
.listitem.playing{
  color: #FF5252;
}
.listitem.toplay{
  color: #ffffff;
}
.listitem .item-r{
  font-size: 0.24rem;
  text-align: right;
}
.listitem.playing .item-r{
  width: 0.64rem;
  height: 0.64rem;
  background: url(~@/assets/playing@2x.png) no-repeat center;
  background-size: 100%;
}
.listitem.toplay .item-r{
  color: #C8C8C8;
}
</style>