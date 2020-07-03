<template>
  <div style="background: #f2f2f2">
    <top></top>
    <div class="locationDiv">
      <div class="location">
        <img src="@/assets/images/icon-map-1.png" />
        <a >首页</a>&nbsp;&gt;&nbsp;
        <a >家教详情</a>
      </div>
    </div>
    <div class="publicDiv">
      <div class="publicLeft">
        <div class="turtorItemDiv traineeItemDiv">
          <div class="traineeItem">
            <div class="Title">
              <a class="name">
                {{need.firstCategory.name}}
                {{need.secondCategory.name}}
                {{need.thirdCategory.name}}：
                每次{{need.timeHour}}小时，{{need.hourPrice}}元/小时，{{need.frequency}}次，共{{need.totalPrice}}元
              </a>
              <div class="times">
                发布时间 {{need.createTime}}
                <span v-if="need.state===3"> （{{need.state|state}} 可预约） </span>
                <span v-else> （{{need.state|state}} 不可预约） </span>
              </div>
            </div>
            <div style="color: #309de0; font-size: 20px; margin-top: 30px;">
              学生概况：
            </div>
            <ul class="rgUl">
              <li class="li-1">学员性别：{{need.gender | gender}}</li>
              <li>辅导科目： {{need.firstCategory.name}} {{need.secondCategory.name}} {{need.thirdCategory.name}} </li>
              <li>学生类型：{{need.studentType.name}}</li>
              <li>详细地址：{{need.city.name}} {{need.area.name}} {{need.address}}</li>
              <li>可上课时间：
                <table class="tables" cellpadding="0" cellspacing="0">
                  <tbody>
                  <tr class="tr-1">
                    <td>时间</td>
                    <td>一</td>
                    <td>二</td>
                    <td>三</td>
                    <td>四</td>
                    <td>五</td>
                    <td>六</td>
                    <td>日</td>
                  </tr>

                  <tr tr-2>
                    <td>上午</td>
                    <td><img v-if="teachDate.mondayMorning" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.tuesdayMorning" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.wednesdayMorning" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.thursdayMorning" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.fridayMorning" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.SaturdayMorning" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.SundayMorning" src="@/assets/images/icon-ok.png" height="16"/></td>
                  </tr>
                  <tr tr-3>
                    <td>下午</td>
                    <td><img v-if="teachDate.mondayAfternoon" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.tuesdayAfternoon" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.wednesdayAfternoon" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.thursdayAfternoon" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.fridayAfternoon" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.SaturdayAfternoon" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.SundayAfternoon" src="@/assets/images/icon-ok.png" height="16"/></td>
                  </tr>
                  <tr tr-4>
                    <td>晚上</td>
                    <td><img v-if="teachDate.mondayEvening" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.tuesdayEvening" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.wednesdayEvening" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.thursdayEvening" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.fridayEvening" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.SaturdayEvening" src="@/assets/images/icon-ok.png" height="16"/></td>
                    <td><img v-if="teachDate.SundayEvening" src="@/assets/images/icon-ok.png" height="16"/></td>
                  </tr>
                  </tbody>
                </table> </li>
            </ul>
            <hr class="lineHr" />
            <div style="color: #309de0; font-size: 20px; margin-top: 30px;">
              家教要求：
            </div>
            <ul class="rgUl">
              <li class="li-1">家教性别：{{need.teacherGender | gender}}</li>
              <li class="li-2">身份要求：{{need.teacherType.name}}</li>
              <li class="li-1">授课安排：每次{{need.timeHour}}小时，{{need.frequency}}次</li>
              <li class="li-2">课时标准：{{need.hourPrice}}元/小时</li>
              <li>具体要求：{{need.demand}}</li>
            </ul>
            <div class="leapTxt">
              完成本单你能赚到: <span style="color: red;font-size: larger">{{need.totalPrice}}</span> 元
              <div class="circle"></div>
            </div>
            <a class="freeLeap" v-if="isMyPublish">你已发布</a>
            <a class="freeLeap" v-else-if="isMyAppoint">已预约</a>
            <a class="freeLeap" v-else-if="need.state===1" >审核中不可预约</a>
            <a class="freeLeap" v-else-if="need.state===2" >审核失败不可预约</a>
            <a class="freeLeap" v-else-if="need.state===3" @click="handleAddAppoint()">免费预约此订单</a>
            <a class="freeLeap" v-else-if="need.state===4">进行中不可预约</a>
            <a class="freeLeap" v-else-if="need.state===5">已完成不可预约</a>
            <a class="freeLeap" v-else-if="need.state===6">已关闭不可预约</a>
          </div>
        </div>
      </div>
      <right></right>
      <div class="gray"></div>
      <div class="commentDiv" style="background: white">
        <div class="parents">
          <span v-if="need.state===5">双方互评</span>
          <span v-else-if="need.state===4">中标者</span>
          <span v-else="need.state===3">已预约</span>
        </div>

        <div data-v-04ca7e90="" class="commentList" v-if="need.state===5" style="border-bottom: 2px solid #f2f2f2;">
          <div data-v-04ca7e90="" class="rgs">
            <div data-v-04ca7e90="" class="one">
          <div data-v-04ca7e90="" class="topic">
          【学员评论】 时间：{{need.studentComment.createTime}}
        </div>
              <div data-v-04ca7e90="" class="score">
          评分：
                <img  v-for="(item,index) in need.studentComment.rank" data-v-04ca7e90="" src="@/assets/images/icon-star.png">
              </div>
            </div>
            <div data-v-04ca7e90="" class="two">
          标　　签：
              <a v-for="(item,index) in need.studentComment.tag.trim().split(' ')" data-v-04ca7e90="" href="javascript:;" class="tags">{{item}}</a>
            </div>
            <div data-v-04ca7e90="" class="three">
          评价内容：{{need.studentComment.content}}
        </div>
          </div>
        </div>

        <div data-v-04ca7e90="" class="commentList" v-if="need.state===5" style="border-bottom: 2px solid #f2f2f2;">
          <div data-v-04ca7e90="" class="rgs">
            <div data-v-04ca7e90="" class="one">
              <div data-v-04ca7e90="" class="topic">
                【教员评论】 {{need.teacherComment.createTime}}
              </div>
              <div data-v-04ca7e90="" class="score">
                评分：
                <img  v-for="(item,index) in need.teacherComment.rank" data-v-04ca7e90="" src="@/assets/images/icon-star.png">
              </div>
            </div>
            <div data-v-04ca7e90="" class="two">
              标　　签：
              <a v-for="(item,index) in need.teacherComment.tag.trim().split(' ')" data-v-04ca7e90="" href="javascript:;" class="tags">{{item}}</a>
            </div>
            <div data-v-04ca7e90="" class="three">
              评价内容：{{need.teacherComment.content}}
            </div>
          </div>
        </div>


        <div class="publicLeft" v-else>

          <div  class="tutoringDiv" v-for="(item,index) in teachers">
            <a  @click="$router.push({path:'/teachers/'+item.userId+'/detail'})" class="pic" ><img :src="item.headImage" width="140" height="160" alt="" /></a>
            <div class="rights">
              <div class="Title">
                <a  class="name" @click="$router.push({path:'/teachers/'+item.userId+'/detail'})">{{item.nickname}}</a>
                <div class="rz">
                  <img v-if="item.realnameAuth===1" src="@/assets/images/realnameAuth.png" />
                  <img v-if="item.studentAuth===1" src="@/assets/images/studentAuth.png" />
                  <img v-if="item.teacherAuth===1" src="@/assets/images/teacherAuth.png" />
                </div>
                <div class="lists">
                  经验：{{item.experience}} 年
                </div>
                <div class="lists lists-2">
                  满意度 {{item.satisfaction}} %
                </div>
              </div>
              <ul class="turul">
                <li class="li-1"><span>所在区域：{{item.city.name}}</span>
                  <div class="txt"></div></li>
                <li class="li-2"><span>擅长科目：{{item.goodAt}}</span>
                  <div class="txt">
                    &nbsp;&nbsp;
                  </div> </li>
                <li class="li-3"><span>教师简介：{{item.resume}}</span>
                  <div class="txt"></div></li>
              </ul>
              <div class="bott">
                <div class="tags">
                  评价{{item.totalComment}}条
                </div>
                <div class="tags">
                  成功{{item.totalSuccess}}次
                </div>
                <a v-if="need.state===3&&isMyPublish" class="more" @click="chooseTeacherForNeed(needId,item.userId)">选他</a>
              </div>
            </div>
          </div>

          <div class="jogger">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float: right"
                           :page-sizes="[2,5, 7, 10, 20, 50]" :current-page="listQuery.current" :page-size="listQuery.size" :total="total"
                           layout="total, sizes, prev, pager, next, jumper" background>
            </el-pagination>
          </div>
        </div>



      </div>


    </div>
    <footer2></footer2>
  </div>
</template>

<script>

  import top from '@/views/top'

  import footer2 from '@/views/footer'

  import right from '@/views/right'

  import * as needApi from '@/api/business/front/need'

  import * as authAppointApi from '@/api/business/auth/appoint'

  import * as authNeedApi from '@/api/business/auth/need'

  import * as tokenUtils from '@/utils/auth'

export default {
  name: "Detail",

  props: {  },
  data() {
    return {

      needId:undefined,


      isMyPublish: false,
      isMyAppoint: false,

      //预约老师总共条数
      total:0,

      //预约老师分页查询参数
      listQuery:{
        current: 1, //当前页
        size: 2, //每页大小

        //以下根据业务需求
        sort: undefined, //排序字段
        order: 'desc',
      },

      need:{
      },
      //可上课时间, 序列化前的对象
      teachDate:{
      },

      //已经预约的教员
      teachers:[
      ],

    }
  },

  methods: {

    handleAddAppoint(){
      authAppointApi.postForMe(this.needId).then(response=>{
        this.$message({
          message: '预约成功',
          type: 'success',
          duration: 3000
        })
        authNeedApi.isMyAppoint(this.needId).then(response=>{
          this.isMyAppoint = response
        }).catch(error=>{
          console.log(error)
        })
        this.getTeacherPage()
      }).catch(error=>{
        console.log(error.messages)
        this.$message({
          message: '预约失败',
          type: 'warning',
          duration: 3000
        })
      })
    },

    // 已预约老师每页大小改变
    handleSizeChange(val) {
      this.listQuery.size = val
      this.listQuery.current = 1
      this.getTeacherPage()
    },
    //已预约老师当前页改变
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.getTeacherPage()
    },

    // 分页获取已预约老师
    getTeacherPage(){
      needApi.pageTeachersForNeed(this.needId).then(response=>{
        this.teachers = response.records
        this.total = parseInt(response.total)
        this.listQuery.current = parseInt(response.current)
      }).catch(error=>{
        console.log(error)
      })
    },


    chooseTeacherForNeed(needId,userId){

      const loading = this.$loading({
        lock: true,
        text: '订单提交中,请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      authNeedApi.chooseTeacherForNeed(needId,userId).then(response=>{
        loading.close();
        this.$confirm('跳转到付款页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.open(response)
          this.$message({
            message: '等待付款,请到我的订单中查看',
            type: 'success',
            duration: 20000
          })
        })
      }).catch(error=>{
        loading.close();
      })
  },


  },
  computed: {  },
  watch: {  },

  components: {
    top,
    footer2,
    right
  },
  directives: {  },
  filters: {
    gender(value){
      if(value===1){
        return '男'
      }
      if(value===2){
        return '女'
      }
      if(value===3){
        return '不限'
      }

    },
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
        return '进行中'
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

    this.needId = this.$route.params.id

    needApi.getById(this.needId).then(response=>{
      this.need = response
      this.teachDate = JSON.parse(this.need.teachDate)
    }).catch(error=>{
      console.log(error)
    })

    if(tokenUtils.getToken()){
      authNeedApi.isMyPublish(this.needId).then(response=>{
        this.isMyPublish = response
      }).catch(error=>{
        console.log(error)
      })

      authNeedApi.isMyAppoint(this.needId).then(response=>{
        this.isMyAppoint = response
      }).catch(error=>{
        console.log(error)
      })
    }

    this.getTeacherPage()

  }

}
</script>

<style scoped src="@/styles/front/common.css"></style>
<style scoped src="@/styles/front//public.css"></style>
<style scoped>

  .tutoringDiv .Title .name{display:block;float:left;width:100px;height:30px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#333;font-size:20px;}

  .commentDiv .commentList .rgs{
    float: left;
    width: 755px;
    height: auto;
    overflow: hidden;
  }

</style>

