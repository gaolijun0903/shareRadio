<template>
  <div class="ywrapper">
    <div class="ycontainer">
      <div class="channellist">
        <div class="channelitem" v-for="(item,index) in zbList" @click="jumpToLive(item.anchor_id)" :key="index">
          <div class="avatarbox">
            <img class="avatar" v-lazy="item.avatar" />
            <div class="browsebox">
              <span class="browseicon"></span><span class="browsenum">{{item.browse}}万</span>
            </div>
          </div>
          <div class="channelname">{{item.signature}}</div>
          <div class="praisebox">
            <span class="praiseicon"></span><span class="praisenum">{{item.praise}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNetData } from '../utils/axiosRequest';
import BScroll from 'better-scroll';
import Bus from '../bus' ;
export default {
  name: "YScrollList",
  data() {
    return {
      zbList: [],
      isPullUping: false,
      curPage: 1,
      pageSize: 6,
      type_id:1,
      isChangeTag: false // 是否是切换菜单
    };
  },
  created() {
    // 请求首屏数据
    this.fetchData();
  },
  mounted() {
    Bus.$on('changeType', this.changeTypeId);
    this.$nextTick(() => {
      this.createYScroller();
    });
  },
  methods: {
    changeTypeId: async function(id){
      this.isChangeTag = true;
      this.type_id = id;
      this.curPage = 1;
      this.zbList = [];
      await this.fetchData();
      this.isChangeTag = false;
    },
    createYScroller: function() {
      if (!this.scrollerY) {
        this.scrollerY = new BScroll(".ywrapper", {
          click: true,
          probeType: 0,
          pullUpLoad: {
            threshold: 100
          },
          mouseWheel: {
            // pc端同样能滑动
            speed: 20,
            invert: false
          },
          useTransition: false, // 防止iphone微信滑动卡顿
          bounce: {
            top: false,
            bottom: false,
            left: false,
            right: false
          }
        });
        this.scrollerY.on("pullingUp", this.pullingUpCallback);
        //this.scrollerY.on("scroll", this.scrollCallback);
      } else {
        this.scrollerY.refresh();
      }
    },
    pullingUpCallback: function() {
      // 处理加载更多
      this.isChangeTag ? 1 : this.fetchData();
    },
    scrollCallback: function(params) {
      //console.log(params);
    },
    fetchData: async function() {
      try {
        let liveData = await getNetData("/Broadcast/GetAnchorList", {
          type_id: this.type_id,
          page: this.curPage,
          page_size: this.pageSize
        });
        this.zbList = this.zbList.concat(liveData.result.list);
        this.curPage++;
        this.scrollerY.finishPullUp();
        this.scrollerY.refresh();
      } catch (error) {
        console.error(error);
      }
    },
    jumpToLive: function (anchor_id){
      try {
        var pageurl = window.location.href;
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if(isiOS){
          if(pageurl.indexOf('isuiweb')!=-1){//当前iOS乘客端使用比较老的UIWebView加载H5页面，需直接调用openAnchorDetail(anchorID)和showPlayCD()
            openAnchorDetail(anchor_id);
          }else{//后期iOS乘客端会使用WK做全面适配
            window.webkit.messageHandlers.openAnchorDetail.postMessage(anchor_id);
          }
        }else if(isAndroid){
          window.JsInteration.openAnchorDetail(anchor_id);
        }else{
          //window.location.href = "yongche://openAnchorDetail?anchor_id="+anchor_id;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.ywrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #eee;
}
.ywrapper .ycontainer {
  padding: 0.21rem 0.32rem 0;
  /* 兼容曲面屏 */
  padding: 0.21rem 4.266666% 0;
}
.channellist {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.channelitem {
  margin-bottom: 0.26rem;
  width: 3.3rem;
  /* 兼容曲面屏 */
  width: 48.52941%;
  height: 4.36rem;
  background: #ffffff;
  box-shadow: 0 0.2rem 0.4rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.16rem;
  overflow: hidden;
}
.avatarbox {
  position: relative;
  width: 100%;
  height: 3.3rem;
}
.avatar {
  width: 100%;
  height: 100%;
}
.browsebox {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-left: 0.21rem;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.2rem;
  color: #ffffff;
  background-image: url(~@/assets/browsebg@2x.png);
  background-size: 100%;
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-line-pack: center;
    align-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.browseicon {
  /* display: inline-block; */
  margin-right: 0.04rem;
  width: 0.24rem;
  height: 0.24rem;
  background-image: url(~@/assets/browseicon@2x.png);
  background-size: 100%;
}
.channelname {
  margin-top: 0.13rem;
  height: 0.37rem;
  line-height: 0.37rem;
  padding-left: 0.21rem;
  font-size: 0.26rem;
  font-weight: bold;
  color: #323232;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.praisebox{
  margin-top: 0.17rem;
  padding-left:0.21rem;
  height: 0.28rem;
  line-height: 0.28rem;
  font-size: 0.2rem;
  color: #c8c8c8;
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-line-pack: center;
    align-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.praisebox .praiseicon{
  margin-right: 0.065rem;
  width: 0.195rem;
  height: 0.186rem;
  background-image: url(~@/assets/praiseicon@2x.png);
  background-size: 100%;
}
.praisenum{
  font-family: PingFangSC-Medium, sans-serif; /* 苹方-简 中黑体 */
}
</style>