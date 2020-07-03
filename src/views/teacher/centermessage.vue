<template>
  <div>
    <div class="user_right" >
      <div class="usernav_title">
        <span :class="{hover:current===undefined}"><a @click.prevent="current=undefined;listQuery.current=1;listQuery.type=undefined;getPage()">全部</a></span>
        <span :class="{hover:current==='system'}"><a @click.prevent="current='system';listQuery.current=1;listQuery.type=1;getPage()">系统消息</a></span>
        <span :class="{hover:current==='user'}"><a @click.prevent="current='user';listQuery.current=1;listQuery.type=2;getPage()">用户消息</a></span>
      </div>

      <div class="usercollect" >

        <el-table
          :data="messages"
          style="width: 100%"
          stripe
          current-row-key="id"
          >

          <el-table-column
            prop="createTime"
            label="日期"
            width="180px"
            sortable
          >
          </el-table-column>


          <el-table-column
            prop="content"
            label="内容"
            >
            <template slot-scope="scope">
              <span class="overLong" style="width: 120px">{{scope.row.content}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="type"
            label="类型">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type===1" type="danger" >{{scope.row.type | type}}</el-tag>
              <el-tag v-if="scope.row.type===2" type="success">{{scope.row.type | type}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="state"
            label="状态"
            sortable>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.state===0">{{scope.row.state | state}}</el-tag>
              <el-tag type="info" v-if="scope.row.state===1">{{scope.row.state | state}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-zoom-in" size="mini" round @click="handleRead(scope.$index,scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"round @click="handleDelete(scope.$index,scope.row)"></el-button>
            </template>
          </el-table-column>

        </el-table>

        <div class="jogger">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float: right"
                         :page-sizes="[2,5, 7, 10, 20, 50]" :current-page="listQuery.current" :page-size="listQuery.size" :total="total"
                         layout="total, sizes, prev, pager, next, jumper" background>
          </el-pagination>
        </div>

      </div>


      </div>


    <el-dialog title="查看消息" :visible.sync="sentMessageDialogVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="来源：">
          <el-button type="primary"  icon="el-icon-zoom-in" size="mini"round @click="openWindow('/teachers/'+readMessage.fromId+'/detail')"></el-button>
        </el-form-item>
        <el-form-item label="内容：">
          <span><p> {{readMessage.content}} </p></span>

        </el-form-item>
        <el-form-item label="回复：">
          <el-input type="textarea" v-model="form.content" rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info"  size="mini" round @click="sentMessageDialogVisible = false">关 闭</el-button>
        <el-button type="success"  size="mini"round @click="handleSentMessage()">回 复</el-button>
      </div>
    </el-dialog>


    </div>
</template>

<script>

  import * as authMessageApi from '@/api/business/auth/message'


  import openWindow from '@/utils/open-window'

export default {
  name: "CenterMessage",
  data() {
    return {

      listQuery:{
        current: 1, //当前页
        size: 7, //每页大小

        //以下根据业务需求
        type: undefined,

      },
      //全部条数
      total:0,

      current: undefined,

      messages:[],

      form:{
        toId: undefined,
        content: undefined,
      },

      sentMessageDialogVisible:false,

      readMessage:{

      }

    }
  },

  methods: {


    openWindow(uri,title){
      openWindow(window.location.origin+uri,title,500,500)
    },


    handleSentMessage(fromId) {
      authMessageApi.save(this.form).then(response=>{
        this.$message({
          message: '已回复',
          type: 'success',
          duration: 3000
        })
        this.sentMessageDialogVisible = false
      }).catch(error=>{

      })
    },


    getPage(){
      authMessageApi.page(this.listQuery).then(response=>{
        this.messages = response.records
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

    handleRead(index,message){

      if(message.type===1){
        this.$alert(message.content, '系统消息', {
          confirmButtonText: '确定',
          callback: action => {
            if(message.state===0){
              authMessageApi.readById(message.id).then(response=>{
                this.getPage()
              })
            }
          }
        });
      } else {
        this.readMessage = message
        this.sentMessageDialogVisible = true
        this.form.toId = message.fromId
        if(message.state===0){
          authMessageApi.readById(message.id).then(response=>{
            this.getPage()
          })
        }
      }
    },

    handleDelete(index,message){
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return authMessageApi.deleteById(message.id)
      }).then(response=>{
        this.$message({
          message: '已删除',
          type: 'success',
          duration: 3000
        })
        this.getPage()
      })
    }

  },
  computed: {  },
  watch: {  },

  components: {  },
  directives: {  },
  filters: {
    state(value){ // 状态 1处理中 2成功 3失败
      if(value===0){
        return '未读'
      }
      if(value===1){
        return '已读'
      }
    },

    type(value){
      if(value===1){
        return '系统'
      }
      if(value===2){
        return '用户'
      }
    },


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
  div,li,ul,span{margin:0;padding:0;}
  ul,li{list-style:none;list-style-type:none;}
  a{border:none;text-decoration:none;}
  input{margin:0px;padding:0px;outline:none;}
  input:focus{outline:none;}
  a{color:#309de0;}
  a:hover,a:active,a:visited{text-decoration:none;}
  .other{text-align:center;border-bottom:1px solid #ddd;border-top:1px solid #ddd;}
  /*! CSS Used from: @/assets/css/user.css */
  *{margin:0px;padding:0px;font-size:12px;}
  div,li,ul,span{margin:0px;padding:0px;list-style:none;list-style-type:none;}
  a{text-decoration:none;margin:0px;padding:0px;}
  input{margin:0px;padding:0px;}
  input{outline:none;}
  .user_right{width:966px;min-height:600px;overflow:hidden;float:right;border:1px solid #dedede;background:#fff;}
  .usernav_title{width:982px;height:36px;border-bottom:1px solid #dedede;background:#fafafa;}
  .usernav_title span{height:35px;padding:0px 30px;background:#fff;line-height:34px;display:inline-block;border-right:1px solid #dedede;overflow:hidden;position:relative;top:-2px;}
  .usernav_title span a{color:#333;}
  .usernav_title span.hover{height:35px;border-top:3px solid #e80000;top:-1px;color:#e80000;font-size:14px;}
  .usernav_title span.hover a{color:#c00202;}
  .usercollect{width:98%;margin:10px auto 0px auto;overflow:hidden;font-family:"微软雅黑";}
  .paytype{width:98%;height:30px;background:#fe5840;color:#fff;line-height:30px;text-indent:15px;margin:0px auto;}
  .u-amount{width:99%;height:40px;background:#fdf8e4;border:solid 1px #fbedd2;margin:15px auto;line-height:40px;text-indent:15px;color:#bc914c;}
  .u-amount span{font-weight:bold;font-size:15px;color:#e05a41;margin:0 3px 0 3px;}
  .fullred{color:#f00;}
  .rehgeorwd{color:#e05a41;font-size:14px;font-weight:bold;}
  .iwantrechangediv{width:100%;height:auto;overflow:hidden;}
  .onlinsbalance{width:98%;margin:20px auto 0px auto;line-height:30px;clear:both;}
  .cashback_type{width:98%;margin:20px auto 10px auto;height:auto;overflow:hidden;display:block;}
  .cashback_type input{position:relative;top:3px;}
  .cashback_type label{cursor:pointer;}
  .bankno{width:100%;height:auto;overflow:hidden;margin:10px auto;}
  .paytype{width:99%;height:30px;background:#fe5840;color:#fff;line-height:30px;text-indent:15px;margin:0px auto;}
  .onlinesub{width:121px;height:32px;border:none;background:#e55;color:#fff;text-align:center;cursor:pointer;font-weight:bold;font-size:14px;margin:10px 0 0 4px;}
  .usermoneymtext{width:80px;height:25px;border:solid 1px #dcdcdc;border-radius:2px;padding:0 6px;}
  .usermoneymtext:focus,.bankno_text:focus{border:solid 1px #61ade7;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);}
  .bankno_text{width:280px;height:25px;border:solid 1px #dcdcdc;border-radius:2px;padding:0 6px;margin:10px auto 0 0;}
  .rec_amount_ul{width:100%;height:auto;overflow:hidden;}
  .rec_amount_ul li{width:133px;height:50px;float:left;cursor:pointer;text-align:center;line-height:50px;border:1px solid #dedede;margin-right:21px;margin-left:5px;_display:inline;border-radius:2px;margin-top:15px;}
  .rec_amount_ul li.item{font-size:18px;font-family:Arial;}
  .rec_amount_ul li.other{margin-right:0;}
  .otherAmount{width:100px;display:block;height:30px;line-height:30px;border:none;margin:10px auto;}
  .ailpay_rec{width:150px;height:50px;border:solid 1px #dcdcdc;margin:40px auto 5px 5px;float:left;overflow:hidden;line-height:35px;text-indent:10px;vertical-align:middle;background-repeat:no-repeat;background-position:center center;cursor:pointer;border-radius:2px;margin-left:200px;_display:inline;}
  .weixin_rec{width:150px;height:50px;border:solid 1px #dcdcdc;margin:40px auto 5px 30px;float:left;overflow:hidden;line-height:35px;text-indent:10px;vertical-align:middle;background-repeat:no-repeat;background-position:center center;cursor:pointer;border-radius:2px;}




  .el-tag{
    background-color:rgba(64,158,255,.1);
    display:inline-block;
    padding:0 10px;
    height:32px;
    line-height:30px;
    font-size:12px;
    color:#409eff;
    border-radius:4px;
    box-sizing:border-box;
    border:1px solid rgba(64,158,255,.2);
    white-space:nowrap;
  }

  .el-tag--danger {
    background-color: hsla(0,87%,69%,.1);
    border-color: hsla(0,87%,69%,.2);
    color: #f56c6c;}

  .el-tag--success {
    background-color: rgba(103,194,58,.1);
    border-color: rgba(103,194,58,.2);
    color: #67c23a;
  }

  .el-tag--info {
    background-color: hsla(220,4%,58%,.1);
    border-color: hsla(220,4%,58%,.2);
    color: #909399;
  }

  .overLong {
    width:10em;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

</style>
