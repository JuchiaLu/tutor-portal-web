<template>
  <div>
    <div class="user_right">
      <div class="usernav_title">
        <span :class="{hover:listQuery.state==undefined}"><a @click.prevent="listQuery.state=undefined;listQuery.current=1;listQuery.teacherCommentState=0; getPage()">全部</a></span>
        <span :class="{hover:listQuery.state==1}"><a @click.prevent="listQuery.state=1;listQuery.current=1;listQuery.teacherCommentState=undefined;getPage()">审核中</a></span>
        <span :class="{hover:listQuery.state==2}"><a @click.prevent="listQuery.state=2;listQuery.current=1;getPage()">审核失败</a></span>
        <span :class="{hover:listQuery.state==3}"><a @click.prevent="listQuery.state=3;listQuery.current=1;listQuery.teacherCommentState=undefined;getPage()">审核通过</a></span>
        <span :class="{hover:listQuery.state==4}"><a @click.prevent="listQuery.state=4;listQuery.current=1;listQuery.teacherCommentState=undefined;getPage()">已选标</a></span>
        <span :class="{hover:listQuery.state==5}"><a @click.prevent="listQuery.state=5;listQuery.current=1;listQuery.teacherCommentState=undefined;getPage()">已完成</a></span>
        <span :class="{hover:listQuery.state==6}"><a @click.prevent="listQuery.state=6;listQuery.current=1;listQuery.teacherCommentState=undefined;getPage()">已关闭</a></span>
      </div>
      <div class="usercollect mytutor">

        <div v-if="needs.length!=0">
        <dl v-for="(item,index) in needs" >
          <dt>

            <span class="topic" @click="$router.push({path:'/needs/'+item.id+'/detail'})" style="color: #409EFF"><a>{{item.firstCategory.name}} {{item.secondCategory.name}} {{item.thirdCategory.name}}</a></span>
            <span class="standard">每次{{item.timeHour}}小时 {{item.hourPrice}}元/小时 {{item.frequency}}次 共{{item.totalPrice}}元</span>
            <p ><b>生成时间：{{item.createTime}}</b></p>

            <p><b>详细地址：</b>{{item.city.name}} {{item.area.name}} {{item.address}}</p>

            <p>
              <b>预约人数：</b>
              <span >{{item.totalAppoint}}</span>
            </p>
            <p v-if="item.reason" ><b>失败原因：</b > <span style="color: red">{{item.reason}} </span></p>
          </dt>
          <dd>
            <span class="type2">{{item.state|state}}</span>
          </dd>
          <div class="operate">
            <span v-if="item.state===1" @click="closeNeedByNeedId(item.id)">关闭需求</span>
            <span v-if="item.state===2" @click="closeNeedByNeedId(item.id)">关闭需求</span>
            <span v-if="item.state===3" @click="closeNeedByNeedId(item.id)">关闭需求</span>
            <!--<span v-if="item.state===2" @click="">重新发布</span>-->
            <span v-if="item.state===5" @click="softDeleteNeedByNeedId(item.id)">删除</span>
            <span v-if="item.state===6" @click="softDeleteNeedByNeedId(item.id)">删除</span>
          </div>
        </dl>
        </div>
        <span v-else> 没有该类型信息 </span>
      </div>

      <div class="jogger">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float: right"
                     :page-sizes="[3, 7, 10, 20, 50]" :current-page="listQuery.current" :page-size="listQuery.size" :total="total"
                     layout="total, sizes, prev, pager, next, jumper" background>
      </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>

  import * as authNeedApi from '@/api/business/auth/need'

  export default {
  name: "CenterAppoint",
  props: {  },
  data() {
    return {
      listQuery:{
        current: 1, //当前页
        size: 3, //每页大小
        //以下根据业务需求
        state:undefined, //状态
      },
      //全部条数
      total:0,
      //当前标签
      current:undefined,
      //我的需求
      needs:[],

    }
  },
  methods: {
    //分页获取
    getPage(){
      authNeedApi.page(this.listQuery).then(response=>{
        this.needs = response.records
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
    //关闭需求
    closeNeedByNeedId(id){
      this.$confirm('确定关闭吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return authNeedApi.close(id)
      }).then(response=>{
        this.$message({
          message: '已关闭需求',
          type: 'success',
          duration: 3000
        })
        this.getPage()
      })
    },
    //软删除需求
    softDeleteNeedByNeedId(id){
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return authNeedApi.softDelete(id)
      }).then(response=>{
        this.$message({
          message: '已删除',
          type: 'success',
          duration: 3000
        })
        this.getPage()
      })
    },


    //申请维权
    rightAppointByAppointId(id){
      this.$confirm('确定维权?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return authAppointApi.right(id)
      }).then(response=>{
        this.$message({
          message: '已申请维权',
          type: 'success',
          duration: 3000
        })
        this.getPage()
      })
    },
    //同意关闭
    agreeCloseAppointByAppointId(id){
      this.$confirm('确定同意关闭?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return authAppointApi.agreeClose(id)
      }).then(response=>{
        this.$message({
          message: '已同意关闭',
          type: 'success',
          duration: 3000
        })
        this.getPage()
      })
    },
    // 拒绝关闭
    rejectCloseAppointByAppointId(id){
      this.$confirm('确定拒绝关闭?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return authAppointApi.rejectClose(id)
      }).then(response=>{
        this.$message({
          message: '已拒绝关闭',
          type: 'success',
          duration: 3000
        })
        this.getPage()
      })
    },
    //删除
    deleteAppointByAppointId(id){
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return authAppointApi.deleteForTeacher(id)
      }).then(response=>{
        this.$message({
          message: '已删除',
          type: 'success',
          duration: 3000
        })
        this.getPage()
      })
    },

    translateTag(){
      this.form.tag = this.tags.filter(tag=>{
        return tag.select
      }).map(tag=>{
        return tag.value
      }).join(" ")
    },

  //
    handleAddComment() {
      this.translateTag();
      authCommentApi.saveCommentForTeacher(this.form,this.writeCommentId).then(response=>{
        this.$message({
          message: '已评论',
          type: 'success',
          duration: 3000
        })
        this.writeCommentDialogVisible = false
        this.getPage()
      }).catch(error=>{

      })
    },

  },
  computed: {  },
  watch: {  },
  components: {  },
  directives: {  },
  filters: {
    state(value){
      if(value===1){
        return '审核中'
      }
      if(value===2){
        return '审核失败'
      }
      if(value===3){
        return '审核通过'
      }
      if(value===4){
        return '已选标'
      }
      if(value===5){
        return '已完成'
      }
      if(value===6){
        return '已关闭'
      }
    }
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
    height: 35px;
    /*line-height: 28px;*/
    padding-top: 10px;}
  .mytutor dl dt p.stuInfo{color:#309de0;}
  .mytutor dl dd{height:60px;line-height:60px;display:inline-block;width:230px;}
  .mytutor dl dd span{display:block;width:auto;height:40px;line-height:36px;text-align:center;border-radius:10px;font-size:15px;cursor:pointer;float:left;}
  .mytutor dl dd span.type2{    color: #309de0;
    border: 1px solid #309de0;
    margin-right: 5px;
    padding: 2px 2px 2px 2px;}
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

  .tag{
    display: inline-block;
    padding: 0 10px;
    height: 24px;
    line-height: 24px;
    border: 1px solid rgba(156, 156, 171, 0.83);
    overflow: hidden;
    border-radius: 20px;
    color: #9c9cab;
    font-size: 12px;
    margin-right: 10px;
    position: relative;
    top: 8px;
  }
  .tagSelect{
    border: 1px solid #37ab40;
    color: #37ab40;
  }

</style>
