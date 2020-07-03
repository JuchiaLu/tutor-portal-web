<template>
  <div>
    <div class="user_right">
      <div class="usernav_title">
        <span :class="{hover:listQuery.state==undefined}"><a @click.prevent="listQuery.state=undefined;listQuery.current=1;listQuery.teacherCommentState=0; getPage()">全部</a></span>
        <span :class="{hover:listQuery.state==1}"><a @click.prevent="listQuery.state=1;listQuery.current=1;listQuery.teacherCommentState=undefined;getPage()">已预约</a></span>
        <span :class="{hover:listQuery.state==2}"><a @click.prevent="listQuery.state=2;listQuery.current=1;getPage()">已中标</a></span>
        <span :class="{hover:listQuery.state==3}"><a @click.prevent="listQuery.state=3;listQuery.current=1;listQuery.teacherCommentState=undefined;getPage()">试教中</a></span>
        <span :class="{hover:listQuery.state==4}"><a @click.prevent="listQuery.state=4;listQuery.current=1;listQuery.teacherCommentState=undefined;getPage()">进行中</a></span>
        <span :class="{hover:listQuery.state==5}"><a @click.prevent="listQuery.state=5;listQuery.current=1;listQuery.teacherCommentState=undefined;getPage()">结课中</a></span>
        <span :class="{hover:listQuery.state==6}"><a @click.prevent="listQuery.state=6;listQuery.current=1;listQuery.teacherCommentState=undefined;getPage()">待同意</a></span>
        <span :class="{hover:listQuery.state==7}"><a @click.prevent="listQuery.state=7;listQuery.current=1;listQuery.teacherCommentState=0;getPage()">已完成</a></span>
        <!--<span :class="{hover:listQuery.state==8}"><a @click.prevent="listQuery.state=8;listQuery.current=1;listQuery.teacherCommentState=undefined;getPage()">已评价</a></span>-->
        <span :class="{hover:listQuery.state==9}"><a @click.prevent="listQuery.state=9;listQuery.current=1;listQuery.teacherCommentState=undefined;getPage()">已维权</a></span>
        <span :class="{hover:listQuery.state==10}"><a @click.prevent="listQuery.state=10;listQuery.current=1;listQuery.teacherCommentState=undefined;getPage()">已关闭</a></span>
      </div>
      <div class="usercollect mytutor">

        <div v-if="appoints.length!=0">
        <dl v-for="(item,index) in appoints" >
          <dt>
            <span class="topic" @click="$router.push({path:'/needs/'+item.needId+'/detail'})"><a>{{item.subject}}：</a></span>
            <span class="classcount">总共{{item.frequency}}次 每次{{item.timeHour}}小时</span>
            <span class="standard">{{item.hourPrice}}元/小时 共{{item.totalPrice}}元</span>
            <p ><b>生成时间：{{item.createTime}}</b></p>
            <p><b>详细地址：</b>{{item.address}}</p>

            <p>
              <b>联系信息：</b>【称呼 {{item.nickname}}】【手机 {{item.phone}}】【微信 {{item.wechat}}】【QQ {{item.qq}}】
            </p>
            <p v-if="item.reason" ><b>失败原因：</b > <span style="color: red">{{item.reason}} </span></p>
          </dt>
          <dd>
            <span class="type2">{{item.state|state}}</span>
          </dd>
          <div class="operate">
            <span v-if="item.state===1" @click="cancelAppointByAppointId(item.id)">取消预约</span>

            <span v-if="item.state===4" @click="endCourseAppointByAppointId(item.id)">申请结课</span>
            <span v-if="item.state===4" @click="rightAppointByAppointId(item.id)">提交维权</span>


            <span v-if="item.state===6" @click="agreeCloseAppointByAppointId(item.id)">同意关闭</span>
            <span v-if="item.state===6" @click="rejectCloseAppointByAppointId(item.id)">拒绝关闭</span>
            <span v-if="item.state===6" @click="rightAppointByAppointId(item.id)">提交维权</span>

            <span v-if="item.state===7&&item.teacherCommentState===0" @click="writeCommentId=item.id;writeCommentDialogVisible=true">写评价</span>

            <span v-if="item.state===7&&item.teacherCommentState===1" @click="deleteAppointByAppointId(item.id)">删除</span>
            <span v-if="item.state===9" @click="deleteAppointByAppointId(item.id)">删除</span>
            <span v-if="item.state===10" @click="deleteAppointByAppointId(item.id)">删除</span>
          </div>

        </dl>
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

    <el-dialog title="填写评论" :visible.sync="writeCommentDialogVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="评分">
          <el-rate v-model="form.rank" show-text style="margin: 10px;"></el-rate>
        </el-form-item>
        <el-form-item label="标签">
          <a  v-for="(item,index) in tags" :class="{tag:true,tagSelect:item.select}" @click="item.select=!item.select">{{item.value}}</a>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form.content" rows="4"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="writeCommentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddComment()">提 交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import * as authAppointApi from '@/api/business/auth/appoint'

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
        teacherCommentState: undefined, //老师是否已评价
        studentCommentState: undefined, //学生是否已评价
        state:undefined, //状态
      },
      //全部条数
      total:0,
      //当前标签
      current:undefined,
      //我的预约
      appoints:[],


      writeCommentDialogVisible: false,
      writeCommentId:undefined,

      form:{
        rank:undefined,
        tag:undefined,
        content:undefined
      },

      tags: [
        {value:'认真',select:false},
        {value:'好学',select:false},
        {value:'乖巧',select:false},
        {value:'理解能力强',select:false},
        {value:'好教',select:false},
        {value:'可爱',select:false},
      ],
    }
  },
  methods: {
    //分页获取
    getPage(){
      authAppointApi.page(this.listQuery).then(response=>{
        this.appoints = response.records
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
    //取消预约
    cancelAppointByAppointId(id){
      this.$confirm('确定取消预约?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return authAppointApi.cancel(id)
      }).then(response=>{
        this.$message({
          message: '已取消预约',
          type: 'success',
          duration: 3000
        })
        this.getPage()
      })
    },
    //提出结课
    endCourseAppointByAppointId(id){
      this.$confirm('确定结课?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return authAppointApi.endCourse(id)
      }).then(response=>{
        this.$message({
          message: '已申请结课',
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
      let loading
      this.$confirm('同意关闭资金将退还学员，确定同意关闭?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        loading = this.$loading({
          lock: true,
          text: '家教关闭,正在退款,请稍后...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        return authAppointApi.agreeClose(id)
      }).then(response=>{
        this.$message({
          message: '已同意关闭',
          type: 'success',
          duration: 3000
        })
        this.getPage()
        loading.close()
      }).catch(error=>{
        loading.close()
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
        return '等待学员选标'
      }
      if(value===2){
        return '等待学员付款'
      }
      if(value===3){
        return '等待试教通过'
      }
      if(value===4){
        return '进　 行　 中'
      }
      if(value===5){
        return '等待学员同意'
      }
      if(value===6){
        return '等待你的同意'
      }
      if(value===7){
        return '已　 完　 成'
      }
      // if(value===8){
      //   return '已评价'
      // }
      if(value===9){
        return '已　 维　 权'
      }
      if(value===10){
        return '已　 关　 闭'
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
