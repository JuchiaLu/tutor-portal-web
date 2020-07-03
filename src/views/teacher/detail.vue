<template>
  <div style="background: #f2f2f2">
    <top></top>
    <div class="locationDiv">
      <div class="location">
        <img src="@/assets/images/icon-map-1.png" />
        <a href="/Index/index.html">首页</a>&nbsp;&gt;&nbsp;
        <a href="/Teacher/index.html">教员详情</a>
      </div>
    </div>
    <div class="publicDiv">
      <div class="publicLeft">
        <div class="turtorItemDiv">
          <div class="turLf">
            <div class="divs">
              <div class="faces">
                <img :src="teacher.headImage" width="180" height="205" alt="" />
              </div>
              <ul class="numUls">
                <li class="num-1">教学经验<span>{{teacher.experience}}年</span></li>
                <li class="num-2">满意度<span>{{teacher.satisfaction}}%</span></li>
                <li class="num-3">成功次数<span>{{teacher.totalSuccess}}次</span></li>
                <li class="num-4">家长评价<span>{{teacher.totalComment}}条</span></li>
              </ul>
              <a  class="leap leap-2">微信：{{teacher.wechat}}</a>
              <a  class="leap leap-3">QQ: {{teacher.qq}}</a>
              <a  class="leap leap-1" @click="form.toId=teacher.userId;sentMessageDialogVisible=true">点击发消息</a>
              <a class="leap" style="background: #42bd9f;" @click="handleCollection(teacher.userId)">点击收藏</a>
            </div>
          </div>
          <div class="turRg">
            <ul class="rgUl">
              <li class="li-1 hover">{{teacher.nickname}}（{{teacher.gender | gender}}）<img v-if="teacher.realnameAuth===1" src="@/assets/images/realnameAuth.png" />
                <img v-if="teacher.studentAuth===1" src="@/assets/images/studentAuth.png" />
                <img v-if="teacher.teacherAuth===1" src="@/assets/images/teacherAuth.png" /> </li>
              <li class="li-2">年　　龄：{{teacher.age}}</li>
              <li>课时费用：{{teacher.hourPrice}}元/小时</li>

              <li >可授科目： <el-button size="small" type="primary" @click="handleUpdateCategory">点击查看</el-button></li>
              <li>擅长科目：{{teacher.goodAt}}</li>

              <li class="li-2">所在地区：{{teacher.province.name}} {{teacher.city.name}} </li>
              <li >授课区域： <el-button size="small" type="primary" @click="handleUpdateArea">点击查看</el-button></li>
              <li class="li-2">最近登录：{{teacher.lastLoginTime}}</li>

              <li>授课时间：
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
              <li>个人简介: {{teacher.resume}}</li>
            </ul>
          </div>
        </div>
        <div class="gray"></div>
        <div class="commentDiv">
          <div class="parents">
            <span>家长评价</span>
          </div>

          <div data-v-04ca7e90="" class="commentList" v-for="(item,index) in comments" style="border-bottom: 2px solid #f2f2f2;">

            <div data-v-04ca7e90="" class="rgs">
              <div data-v-04ca7e90="" class="one">
                <div data-v-04ca7e90="" class="topic">
                  【家长评论】 时间：{{item.createTime}}
                </div>
                <div data-v-04ca7e90="" class="score">
                  评分：
                  <img  v-for="(item2,index) in item.rank" data-v-04ca7e90="" src="@/assets/images/icon-star.png">

                </div>
              </div>
              <div data-v-04ca7e90="" class="two">
                标　　签：
                <a v-for="(item3,index) in item.tag.trim().split(' ')" data-v-04ca7e90="" href="javascript:;" class="tags">{{item3}}</a>
              </div>
              <div data-v-04ca7e90="" class="three">
                评价内容：{{item.content}}
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
      <right></right>
    </div>


    <el-dialog title="所教科目" :visible.sync="categoryTreeVisible">
      <el-tree
        :data="categories"
        :props="categoryTreeProps"
        node-key="id"
        ref="categoryTree"
        :check-strictly="true"
        :expand-on-click-node="false"
        :indent="22"
        accordion
        show-checkbox>
      </el-tree>
      <!--:load="loadNode"-->
      <!--lazy-->
      <!--default-expand-all-->
      <!--@check-change="handleCheckChange"-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="categoryTreeVisible = false">关 闭</el-button>
        <!--<el-button @click="updateCategory" type="primary" >更新</el-button>-->
      </div>
    </el-dialog>


    <el-dialog title="所教地区" :visible.sync="areaTreeVisible">
      <el-tree
        :data="areas"
        :props="areaTreeProps"
        node-key="id"
        ref="areaTree"
        :check-strictly="true"
        :expand-on-click-node="false"
        :indent="22"
        accordion
        show-checkbox>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="areaTreeVisible = false">关 闭</el-button>
        <!--<el-button @click="updateArea" type="primary" >更新</el-button>-->
      </div>
    </el-dialog>


    <el-dialog title="发送消息" :visible.sync="sentMessageDialogVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form.content" rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sentMessageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSentMessage()">提 交</el-button>
      </div>
    </el-dialog>

   <footer2></footer2>

  </div>
</template>

<script>

  import cookieUtil from 'js-cookie'

  import top from '@/views/top'

  import footer2 from '@/views/footer'

  import right from '@/views/right'

  import * as teacherApi from '@/api/business/front/teacher'

  import * as authMessageApi from '@/api/business/auth/message'

  import * as categoryApi from '@/api/business/front/category'

  import * as areaApi from '@/api/business/front/area'

  import * as authStudentCollectApi from '@/api/business/auth/studentCollection'

  function array2tree2(source, id, parentId, children) {
    const cloneData = JSON.parse(JSON.stringify(source)) // 对源数据深度克隆
    return cloneData.filter(father => { // 循环所有项，并添加children属性
      const branchArr = cloneData.filter(child => father[id] === child[parentId]) // 返回每一项的子级数组

      if (branchArr.length > 0) {
        father[children] = branchArr // 如果有子数组，就给父级添加一个children属性，并赋值
      }

      father.path = father.uri
      father['meta'] = { title:father.name}

      return father[parentId] === '0' // 如果第一层不是parentId=0，请自行修改
    })
  }
export default {
  name: "TeacherDetail",
  props: {  },
  data() {
    return {

      areaId: undefined,

      teacherId: 1,

      //总共条数
      total:0,

      form: {
      },

      listQuery:{
        current: 1, //当前页
        size: 2, //每页大小
        sort: undefined, //排序字段
        order:'desc',
      },

      teacher:{
      },

      comments:[],

      teachDate:{
      },

      //所教科目
      categories:[],

      //所教地区
      areas:[],

      // tree的配置属性
      categoryTreeProps: {
        label: 'name',
        children: 'children'
      },

      areaTreeProps:{
        label: 'name',
        children: 'children'
      },
      // tree是否显示
      categoryTreeVisible: false,
      areaTreeVisible: false,
      sentMessageDialogVisible: false,

    }
  },

  methods: {

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

    //获取评论列表
    getPage(){
      teacherApi.pageCommentForTeacher(this.teacherId,this.listQuery).then(response=>{
        this.comments = response.records
        this.total = parseInt(response.total)
        this.listQuery.current = parseInt(response.current)
      }).catch(error=>{
        console.log(error);
      })
    },

    //点击所教科目按钮时
    handleUpdateCategory(index,row){
      // 查系统中全部的科目
      categoryApi.list().then(response=>{
        this.categories = array2tree2(response,'id', 'parentId', 'children')
        console.log(response)
      }).catch(error=>{
        console.log(error);
      })
      // 查老师已经选择的科目
      teacherApi.listCategoriesForTeacher(this.teacherId).then(resopne => {
        const has = resopne.map(category => {
          return category.id
        })
        // 选中已经选择的科目
        this.$refs.categoryTree.setCheckedKeys(has)
      })
      this.categoryTreeVisible = true
    },


    handleUpdateArea(index,row){
      // 查系统中全部的地区
      areaApi.listByParentId(this.areaId).then(response=>{
        //this.areas = array2tree2(response,'id', 'parentId', 'children')
        this.areas = response
        console.log(response)
      }).catch(error=>{
        console.log(error);
      })
      // 查老师已经选择的地区
      teacherApi.listAreasForTeacher(this.teacherId).then(resopne => {
        const has = resopne.map(area => {
          return area.id
        })
        // 选中已经选择的地区
        this.$refs.areaTree.setCheckedKeys(has)
      })
      this.areaTreeVisible = true
    },


    handleSentMessage() {
      authMessageApi.save(this.form).then(response=>{
        this.$message({
          message: '已发送',
          type: 'success',
          duration: 3000
        })
        this.sentMessageDialogVisible = false
      }).catch(error=>{

      })
    },

    handleCollection(teacherId){
      authStudentCollectApi.save(teacherId).then(response=>{
        this.$message({
          message: '已收藏',
          type: 'success',
          duration: 3000
        })
      })
    }


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
      if(value===3){
        return "不限"
      }
      return value===1 ? '男': '女'
    },
  },

  created(){

    this.areaId = cookieUtil.get('areaId')

    this.teacherId = this.$route.params.id
    teacherApi.getById(this.teacherId).then(response=>{
      this.teacher = response
      if(!response.teachDate){
        this.teachDate = {}
      }else {
        this.teachDate = JSON.parse(response.teachDate)
      }
      //this.teacher.teachDate = this.teachDate
    }).catch(error=>{
      console.log(error)
    })
    this.getPage()
  }

}
</script>

<style scoped src="@/styles/front/common.css"></style>
<style scoped src="@/styles/front//public.css"></style>
<style scoped>

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

  .commentDiv .commentList .rgs {
    float: left;
  }
</style>

