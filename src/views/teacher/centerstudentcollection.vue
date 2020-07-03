<template>
  <div>

    <div class="user_right commentDiv" >
      <div class="usernav_title">
        <span :class="{hover:listQuery.queryType==undefined}"><a @click.prevent="listQuery.queryType=undefined;listQuery.current=1; getPage()">收藏教员</a></span>
      </div>
      <div class="usercollect mytutor">

        <div v-if="teachers.length!=0">

          <div class="demo-image">
            <div class="block" v-for="teacher in teachers" :key="teacher.userId">
              <span class="demonstration">{{ teacher.nickname }}</span>
              <el-image
                style="width: 73px; height: 73px"
                :src="teacher.headImage"
                fit="fit"></el-image>

              <el-row>
                <el-popover
                  placement="top"
                  width="160"
                  v-model="teacher.visible">
                  <p>取消收藏？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" circle @click="teacher.visible = false" icon="el-icon-close" ></el-button>
                    <el-button size="mini"  circle  type="danger" @click="handleDelete(teacher)" icon="el-icon-check"></el-button>
                  </div>
                  <el-button slot="reference" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
                </el-popover>

                <el-button icon="el-icon-search" type="success" circle size="mini" @click="$router.push({path:'/teachers/'+teacher.userId+'/detail'})"></el-button>


              </el-row>

            </div>
          </div>

        </div>
        <span v-else> 没有该类型信息 </span>
      </div>

      <div class="jogger">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float: right"
                       :page-sizes="[5, 7, 15, 20, 50]" :current-page="listQuery.current" :page-size="listQuery.size" :total="total"
                       layout="total, sizes, prev, pager, next, jumper" background>
        </el-pagination>
      </div>


    </div>
  </div>
</template>

<script>

  import * as authStudentCollectApi from '@/api/business/auth/studentCollection'

export default {
  name: "CenterAppoint",
  props: {  },
  data() {
    return {

      listQuery:{
        current: 1, //当前页
        size: 15, //每页大小
        //以下根据业务需求
        queryType: undefined,

      },

      //全部条数
      total:0,

      current:undefined,

      //我的预约
      teachers:[
      ],

    }
  },
  methods: {
    getPage(){
      authStudentCollectApi.page(this.listQuery).then(response=>{
        this.teachers = response.records
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

    handleDelete(teacher){
      // teacher.visible = false;
      // return
      authStudentCollectApi.deleteByTeacherId(teacher.userId).then(response=>{
        this.$message({
          message: '已取消',
          type: 'success',
          duration: 3000
        })
        teacher.visible = false;
        this.getPage()
      })
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


  /*! CSS Used from: https://element.eleme.cn/docs.84b973e.css */
  .demonstration{display:block;color:#8492a6;font-size:14px;margin-bottom:5px;}

  /*! CSS Used from: https://element.eleme.cn/element-ui.ead51c9.css */
  .el-image__inner{width:100%;height:100%;}
  .el-image{position:relative;display:inline-block;overflow:hidden;}
  .el-image__inner{vertical-align:top;border-radius: 50%;}
  /*! CSS Used from: https://element.eleme.cn/docs.84b973e.css */
  .demo-image .block{padding:8px 0;text-align:center;border-right:1px solid #eff2f6;display:inline-block;width:20%;box-sizing:border-box;vertical-align:top;}
  .demo-image .demonstration{display:block;color:#8492a6;font-size:14px;margin-bottom:5px;}

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
