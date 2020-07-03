<template>
  <div>

    <div class="user_right commentDiv" >
      <div class="usernav_title">
        <span :class="{hover:listQuery.queryType==undefined}"><a @click.prevent="listQuery.queryType=undefined;listQuery.current=1; getPage()">全部</a></span>
        <span :class="{hover:listQuery.queryType==1}"><a @click.prevent="listQuery.queryType=1;listQuery.current=1;getPage()">收到的</a></span>
        <span :class="{hover:listQuery.queryType==2}"><a @click.prevent="listQuery.queryType=2;listQuery.current=1;getPage()">发出的</a></span>
      </div>
      <div class="usercollect mytutor">

        <div v-if="comments.length!=0">
            <div data-v-04ca7e90="" class="commentList" v-for="(item,index) in comments" style="border-bottom: 2px solid #f2f2f2;">
              <div data-v-04ca7e90="" class="rgs">
                <div data-v-04ca7e90="" class="one">
                  <div data-v-04ca7e90="" class="topic">
                    时间：{{item.createTime}}
                  </div>
                  <div data-v-04ca7e90="" class="score">
                    评分：
                    <img  v-for="(item2,index) in item.rank" data-v-04ca7e90="" src="@/assets/images/icon-star.png">
                  </div>
                </div>
                <div data-v-04ca7e90="" class="two">
                  <span style="font-size: medium;">标　　签：</span>
                  <a v-for="(item3,index) in item.tag.trim().split(' ')" data-v-04ca7e90="" href="javascript:;" class="tags">{{item3}}</a>
                </div>
                <div data-v-04ca7e90="" class="three">
                  <span style="font-size: medium;">评价内容：{{item.content}}</span>
                </div>
              </div>
            </div>
        </div>
        <span v-else> 没有该类型信息 </span>
      </div>

      <div class="jogger">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float: right"
                       :page-sizes="[2,5, 7, 10, 20, 50]" :current-page="listQuery.current" :page-size="listQuery.size" :total="total"
                       layout="total, sizes, prev, pager, next, jumper" background>
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>

  import * as authCommentApi from '@/api/business/auth/comment'

export default {
  name: "CenterAppoint",
  props: {  },
  data() {
    return {

      listQuery:{
        current: 1, //当前页
        size: 2, //每页大小

        //以下根据业务需求
        queryType: undefined,

      },

      //全部条数
      total:0,

      current:undefined,

      //我的预约
      comments:[],
    }
  },
  methods: {
    getPage(){
      authCommentApi.page(this.listQuery).then(response=>{
        this.comments = response.records
        this.total = parseInt(response.total)
        this.listQuery.current = parseInt(response.current)
      }).catch(error=>{

      })
    },

    // 每页大小改变
    handleSizeChange(val) {
      this.listQuery.size = val
      this.listQuery.current = 1
      this.getPage()
    },
    //当前页改变
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.getPage()
    },

  },
  computed: {  },
  watch: {  },

  components: {  },
  directives: {  },
  filters: {
  },

  created(){
    this.getPage();
  }

}
</script>

<style scoped src="@/styles/front/common.css"></style>
<style scoped src="@/styles/front//public.css"></style>
<style scoped>

  /*! CSS Used from: @/assets/css/common.css */
  *{margin:0px;padding:0px;font-size:14px;font-family:"Microsoft Yahei";}
  div,dl,dd,dt,span,b,p{margin:0;padding:0;}
  dl,dt,dd{list-style:none;list-style-type:none;}
  a{border:none;text-decoration:none;}
  a{color:#309de0;}
  a:hover,a:active,a:visited{text-decoration:none;}
  /*! CSS Used from: @/assets/css/user.css */
  *{margin:0px;padding:0px;font-size:12px;}
  div,dl,dd,dt,span,b,p{margin:0px;padding:0px;list-style:none;list-style-type:none;}
  a{text-decoration:none;margin:0px;padding:0px;}
  .user_right{width:966px;height:auto;overflow:hidden;float:right;border:1px solid #dedede;background:#fff;}
  .usernav_title{width:982px;height:36px;border-bottom:1px solid #dedede;background:#fafafa;}
  .usernav_title span{height:35px;padding:0px 25px;background:#fff;line-height:34px;display:inline-block;border-right:1px solid #dedede;overflow:hidden;position:relative;top:-2px;}
  .usernav_title span a{color:#333;}
  .usernav_title span.hover{height:35px;border-top:3px solid #e80000;top:-1px;color:#e80000;font-size:14px;}
  .usernav_title span.hover a{color:#c00202;}
  .usercollect{width:98%;margin:10px auto 0px auto;overflow:hidden;font-family:"微软雅黑";}
  .mytutor dl{border-bottom:1px dotted #ccc;margin:20px auto;padding:0px 10px;}
  .mytutor dl dt{width:690px;display:inline-block;}
  .mytutor dl dt h6{color:#999;margin-bottom:10px;}
  .mytutor dl dt h6 span{color:#F00;font-weight:normal;}
  span.topic,span.classcount{font-size:16px;color:#333;margin-right:5px;}
  span.topic a{font-size:16px;color:#333;}
  span.topic a:hover{color:#e80000;}
  span.standard{color:#e80000;font-size:14px;}
  span.date{font-size:14px;color:#666;margin-left:20px;}
  .mytutor dl dt p{    font-size: 14px;
    color: #888;
    height: 50px;
    line-height: 28px;
    padding-top: 10px;}
  .mytutor dl dt p.stuInfo{color:#309de0;}
  .mytutor dl dd{height:60px;line-height:60px;display:inline-block;width:230px;}
  .mytutor dl dd span{display:block;width:72px;height:36px;line-height:36px;text-align:center;border-radius:10px;font-size:15px;cursor:pointer;float:left;}
  .mytutor dl dd span.type2{color:#309de0;border:1px solid #309de0;margin-right:5px;}
  .operate{height:32px;line-height:28px;padding-bottom:10px;}
  .operate span{background:#4db5ee;color:#FFF;cursor:pointer;display:inline-block;padding:0px 10px;border-radius:5px;}
  .operate span:hover{background:#e80000;}

  /*! CSS Used from: https://element.eleme.cn/2.0/docs.d551f48.css */
  button{font-family:inherit;font-size:inherit;line-height:inherit;color:inherit;}
  /*! CSS Used from: Embedded */
  .el-button{display:inline-block;line-height:1;white-space:nowrap;cursor:pointer;background:#fff;border:1px solid #dcdfe6;border-color:#dcdfe6;color:#606266;-webkit-appearance:none;text-align:center;box-sizing:border-box;outline:none;margin:0;transition:.1s;font-weight:500;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;padding:12px 20px;font-size:14px;border-radius:4px;}
  .el-button:focus,.el-button:hover{color:#409eff;border-color:#c6e2ff;background-color:#ecf5ff;}
  .el-button:active{color:#3a8ee6;border-color:#3a8ee6;outline:none;}
  .el-button::-moz-focus-inner{border:0;}
  .el-button--primary{color:#fff;background-color:#C42E2E;border-color:#C42E2E;}
  .el-button--primary:focus,.el-button--primary:hover{background:#C42E2E;border-color:#C42E2E;color:#fff;}
  .el-button--primary:active{outline:none;}
  .el-button--primary:active{background:#a50e0e;border-color:#a50e0e;color:#fff;}
  .el-button--small{padding:5px 15px;font-size:12px;border-radius:3px;}

  .commentDiv .commentList{
    width: 100%;
    margin: 20px auto 0 auto;
    height: auto;
    overflow: hidden;
  }
  .commentDiv .commentList .rgs {
    float: left;
    width: 755px;
    height: auto;
    overflow: hidden;
  }
</style>
