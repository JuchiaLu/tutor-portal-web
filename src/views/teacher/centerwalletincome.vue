<template>
  <div>
    <div class="user_right" >
      <div class="usernav_title">
        <span :class="{hover:current==='income'}"><a @click.prevent="current='income';listQuery.current=1;getPage()">收入记录</a></span>
      </div>
      <div class="usercollect" v-if="current==='income'">

        <el-table
          :data="incomes"
          style="width: 100%"
          stripe
          current-row-key="id"
        >
          <el-table-column
            prop="cteateTime"
            label="日期"
            sortable
          >

          </el-table-column>
          <el-table-column
            prop="name"
            label="标题"
          >
            <template slot-scope="scope">
              <a v-if="scope.row.needId" @click="$router.push({path:'/needs/'+scope.row.needId+'/detail'})">{{scope.row.name}}</a>
              <span v-else >{{scope.row.name}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="description"
            label="描述"
            >
          </el-table-column>

          <el-table-column
            prop="totalAmount"
            label="收入金额">
          </el-table-column>

          <el-table-column
            prop="balance"
            label="余额">
          </el-table-column>

        </el-table>

        <div class="jogger">
          <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" style="float: right"
                         :page-sizes="[2,5, 7, 10, 20, 50]" :current-page="listQuery2.current" :page-size="listQuery2.size" :total="total2"
                         layout="total, sizes, prev, pager, next, jumper" background>
          </el-pagination>
        </div>

      </div>
      </div>
    </div>
</template>

<script>

  import * as authCashinApi from '@/api/pay/auth/cashin'

export default {
  name: "CenterAppoint",
  data() {
    return {
      listQuery2:{
        current: 1, //当前页
        size: 7, //每页大小

        //以下根据业务需求
        queryType: undefined,

      },
      total2:0,

      current:'income',

      incomes:[],
    }
  },

  methods: {
    getPage2(){
      authCashinApi.page(this.listQuery2).then(response=>{
        this.incomes = response.records
        this.total2 = parseInt(response.total)
        this.listQuery2.current = parseInt(response.current)
      }).catch(error=>{

      })
    },
    handleSizeChange2(val) {
      this.listQuery2.size = val
      this.listQuery2.current = 1
      this.getPage2()
    },
    //当前页改变
    handleCurrentChange2(val) {
      this.listQuery2.current = val
      this.getPage2()
    },

  },
  computed: {  },
  watch: {  },

  components: {  },
  directives: {  },
  filters: {
  },


  created(){
    this.getPage2();
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
</style>
