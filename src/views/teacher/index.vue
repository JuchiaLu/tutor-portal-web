<template>
  <div style="background: #f2f2f2">
    <top></top>
    <div class="locationDiv">
      <div class="location">
        <img src="@/assets/images/icon-map-1.png" />
        <a href="/Index/index.html">首页</a>&nbsp;&gt;&nbsp;全部教员
      </div>
    </div>
    <div class="tutorType">
      <span>全部教员</span>
    </div>
    <div class="termDiv">
      <div class="term">
        <div class="choose">
          <div class="type">
            学员阶段
          </div>
          <div class="list">
            <a :class="{hover:current.firstCategoryId===undefined}"
               @click="
               listQuery.teachCategoryId=undefined;
               listQuery.firstCategoryId=undefined;
               listQuery.secondCategoryId=undefined;
               listQuery.thirdCategoryId=undefined;
               current.firstCategoryId=undefined;
               current.secondCategoryId=undefined;
               current.thirdCategoryId=undefined;
               listQuery.current=1;
               getPage()">不限</a>
            <a :class="{hover:current.firstCategoryId===item.id}"v-for="(item,index) in firstCategorys"  @click.prevent="listQuery.current=1;handleFirstCategoryChange(item.id);">{{item.name}}</a>
          </div>
        </div>

        <div class="choose" v-if="secondCategorys.length>0">
          <div class="type">
            学员年级
          </div>
          <div class="list">
            <a :class="{hover:current.secondCategoryId===undefined}"
               @click="
               listQuery.teachCategoryId=listQuery.firstCategoryId;
               listQuery.secondCategoryId=undefined;
               listQuery.thirdCategoryId=undefined;
               current.secondCategoryId=undefined
               current.thirdCategoryId=undefined;
               listQuery.current=1;
               getPage()">不限</a>
            <a
              :class="{hover:current.secondCategoryId===item.id}"
              v-for="(item,index) in secondCategorys"
              @click.prevent="listQuery.current=1;handleSecondCategoryChange(item.id)">{{item.name}}
            </a>
          </div>
        </div>

        <div class="choose" v-if="thirdCategorys.length>0">
          <div class="type">所学科目</div>
          <div class="list">
            <a :class="{hover:current.thirdCategoryId===undefined}"
               @click="
               listQuery.teachCategoryId=listQuery.thirdCategoryId;
               listQuery.thirdCategoryId=undefined;
               current.thirdCategoryId=undefined;
               listQuery.current=1;
               getPage()">不限</a>
            <a :class="{hover:current.thirdCategoryId===item.id}"
               v-for="(item,index) in thirdCategorys"
               @click.prevent="listQuery.current=1;handleThirdCategoryChange(item.id)">{{item.name}}
            </a>
          </div>
        </div>

        <div class="choose">
          <div class="type">
            所教地区
          </div>
          <div class="list">
            <a :class="{hover:current.teachAreaId===undefined}"
               @click="listQuery.teachAreaId=undefined;
               current.teachAreaId=undefined;
               listQuery.current=1;
               getPage()">不限
            </a>
            <a :class="{hover:current.teachAreaId===index}"
               v-for="(item,index) in areas"
               @click="listQuery.teachAreaId=item.id;current.teachAreaId=index;listQuery.current=1;getPage()">{{item.name}}
            </a>
          </div>
        </div>
        <div class="choose">
          <div class="type">
            教员认证
          </div>
          <div class="list">
            <a :class="{hover:current.teacherTypeId===undefined}"
               @click="listQuery.current=1;handleTeacherAuthChange(0);current.teacherTypeId=undefined">不限
            </a>
            <a :class="{hover:current.teacherTypeId===index}"
               v-for="(item,index) in teacherTypes"
               @click="listQuery.current=1;handleTeacherAuthChange(item.value);current.teacherTypeId=index;">{{item.name}}
            </a>
          </div>
        </div>



      </div>
    </div>
    <div class="isTypeDiv">
      <div :class="{default:true, ords:current.sort===undefined}">
        <a @click="listQuery.sort=undefined;current.sort=undefined;listQuery.current=1;getPage()">综合排序</a>
      </div>
      <div :class="{default:true, ords:current.sort==='hourPrice'}">
        <a @click="listQuery.sort='hourPrice';current.sort='hourPrice';listQuery.current=1;getPage()">课时费用排序</a>
      </div>
      <div :class="{default:true, ords:current.sort==='satisfaction'}">
        <a @click="listQuery.sort='satisfaction';current.sort='satisfaction';listQuery.current=1;getPage()">满意度排序</a>
      </div>
      <div :class="{default:true, ords:current.sort==='totalSuccess'}">
        <a @click="listQuery.sort='totalSuccess';current.sort='totalSuccess';listQuery.current=1;getPage()">成功次数排序</a>
      </div>

      <div class="right">
        <div class="people">
          {{total}}个结果
        </div>
      </div>
    </div>
    <div class="publicDiv">
      <div class="publicLeft">
        <div class="tutoringDiv" v-for="(item,index) in teachers">
          <a @click="$router.push({path:'/teachers/'+item.userId+'/detail'})" class="pic"><img :src="item.headImage" width="140" height="160" alt="" /></a>
          <div class="rights">
            <div class="Title">

              <a @click="$router.push({path:'/teachers/'+item.userId+'/detail'})" class="name">{{item.nickname}}
                <img v-if="item.realnameAuth===1" src="@/assets/images/realnameAuth.png" />
                <img v-if="item.studentAuth===1" src="@/assets/images/studentAuth.png" />
                <img v-if="item.teacherAuth===1" src="@/assets/images/teacherAuth.png" />
              </a>
              <div class="rz">
              </div>
              <div class="lists">
                经验：{{item.experience}} 年
              </div>
              <div class="lists lists-2">
                满意度 {{item.satisfaction}} %
              </div>
              <div class="money">{{item.hourPrice}}元/小时</div>
            </div>
            <ul class="turul">
              <li class="li-1"><span>所在城市：{{item.city.name}}</span>
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
              <a @click="$router.push({path:'/teachers/'+item.userId+'/detail'})" class="more">查看详情</a>
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
      <right></right>
    </div>
    <footer2></footer2>

  </div>
</template>

<script>

  import cookieUtil from 'js-cookie'

  import top from '@/views/top'

  import footer2 from '@/views/footer'

  import right from '@/views/right'

  import * as teacherApi from '@/api/business/front/teacher'

  import * as categoryApi from '@/api/business/front/category'

  import * as areaApi from '@/api/business/front/area'

  import * as dictApi from '@/api/business/front/dict'

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
  name: "Teacher",

  props: {  },
  data() {
    return {
      //多租户,省份id
      cityId: undefined,

      //总共条数
      total:0,

      listQuery:{
        current: 1, //当前页
        size: 5, //每页大小


        //以下根据业务需求
        teachCategoryId:undefined,
        firstCategoryId:undefined, //一级分类
        secondCategoryId:undefined, //二级分类
        thirdCategoryId:undefined, //三级分类
        cityId:undefined, //教员所在城市ID
        teachAreaId:undefined, //所教地区
        // teacherTypeId:undefined, //教员类型
        sort: undefined, //排序字段
        order: 'desc',
        //nickname:undefined
      },

      //class绑定
      current:{
        //以下根据业务需求
        teachCategoryId:undefined,
        firstCategoryId:undefined, //一级分类
        secondCategoryId:undefined, //二级分类
        thirdCategoryId:undefined, //三级分类
        teachAreaId:undefined, //地区
        teacherTypeId:undefined, //教员性别 0不限 1男 2女
        sort:undefined //排序
      },



      //地区
      areas:[],
      //一级分类, 如小学
      firstCategorys:[],
      //二级分类 如年级
      secondCategorys:[],
      //三级类 如英语
      thirdCategorys:[],

      //全部老师
      teachers:[
        {
          id:'1',
          headImage:'http://jiajiaowang.com/uploads/images/userface/default.png', //头像地址
          realname:'卢教员', //真实姓名
          identity: '金牌教员', //认证身份
          identify:'1', //已认证
          experience:'5', //经验
          satisfaction:'50',//满意度
          hourPrice: 40, //每小时价格
          area:'龙文区',//地区
          // TODO 辅导科目
          resume:'闽南师范大学教授',//个人简介
          totalComment:10,//评价总数
          totalSuccess:20, //成功次数
        },
        {
          id:'2',

          headImage:'http://jiajiaowang.com/uploads/images/userface/default.png', //头像地址
          realname:'卢教员', //真实姓名
          identity: '金牌教员', //认证身份
          identify:'1', //已认证
          experience:'60', //经验
          satisfaction:'49',//满意度
          hourPrice: 40, //每小时价格
          area:'芗城区',//地区
          // TODO 辅导科目
          resume:'闽南师范大学教授',//个人简介
          totalComment:10,//评价总数
          totalSuccess:20, //成功次数
        },
        {
          id:'3',
          headImage:'http://jiajiaowang.com/uploads/images/userface/default.png', //头像地址
          realname:'卢教员', //真实姓名
          identity: '金牌教员', //认证身份
          identify:'1', //已认证
          experience:'20', //经验
          satisfaction:'52',//满意度
          hourPrice: 40, //每小时价格
          area:'南海区',//地区
          // TODO 辅导科目
          resume:'闽南师范大学教授',//个人简介
          totalComment:10,//评价总数
          totalSuccess:20, //成功次数
        }
      ],

      teacherTypes:[
        {name:'实名认证',value:1},
        {name:'在校大学生',value:2},
        {name:'在职教师',value:3},
      ],

    }
  },

  methods: {
    handleFirstCategoryChange(id){
      this.listQuery.teachCategoryId = id
      this.listQuery.firstCategoryId = id
      this.current.firstCategoryId = id
      //清空二三级目录列表
      this.secondCategorys = []
      this.thirdCategorys = []
      //清空二三级查询条件
      this.listQuery.secondCategoryId = []
      this.listQuery.thirdCategoryId = []
      //清空二三级选定条件
      this.current.secondCategoryId=undefined
      this.current.thirdCategoryId=undefined
      //获取二级列表
      categoryApi.listByParentId(id).then(response=>{
        this.secondCategorys = response
        this.getPage()
      }).catch(error=>{
        console.log(error);
      })
    },

    handleSecondCategoryChange(id){
      this.listQuery.teachCategoryId = id
      this.listQuery.secondCategoryId = id
      this.current.secondCategoryId = id
      //清空三级目录列表
      this.thirdCategorys = []
      //清空三级查询条件
      this.listQuery.thirdCategoryId = undefined
      //清空三级选定条件
      this.current.thirdCategoryId=undefined
      //获取三级列表
      categoryApi.listByParentId(id).then(response=>{
        //this.listQuery.categoryId = id
        this.thirdCategorys = response
        this.getPage()
      }).catch(error=>{
        console.log(error);
      })
    },

    handleThirdCategoryChange(id){
      this.listQuery.teachCategoryId = id
      this.current.thirdCategoryId = id
      this.listQuery.thirdCategoryId = id
      this.getPage()
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

    //当前页改变
    handleTeacherAuthChange(val) {
      if(val===0){
        this.listQuery.realnameAuth = undefined
        this.listQuery.studentAuth = undefined
        this.listQuery.teacherAuth = undefined
      }else if(val===1){
        this.listQuery.realnameAuth = 1
        this.listQuery.studentAuth = undefined
        this.listQuery.teacherAuth = undefined
      }else if(val===2){
        this.listQuery.realnameAuth = undefined
        this.listQuery.studentAuth = 1
        this.listQuery.teacherAuth = undefined
      }else if(val===3){
        this.listQuery.realnameAuth = undefined
        this.listQuery.studentAuth = undefined
        this.listQuery.teacherAuth = 1
      }
      this.getPage()
    },

    //获取列表
    getPage(){
      teacherApi.page(this.listQuery).then(response=>{
        this.teachers = response.records
        this.total = parseInt(response.total)
        this.listQuery.current = parseInt(response.current)
        //this.$router.push({query:this.listQuery})
      }).catch(error=>{
        console.log(error);
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
    }
  },

  created(){

    this.cityId = cookieUtil.get('areaId')
    this.listQuery.cityId = this.cityId

    //获取一级学科列表
    categoryApi.listByParentId(0).then(response=>{
      this.firstCategorys = response
    }).catch(error=>{
      console.log(error);
    })

    //获取地区列表
    areaApi.listByParentId(this.cityId).then(response=>{
      this.areas = response
    }).catch(error=>{
      console.log(error);
    })
    //获取需求列表
    this.getPage()
  }

}
</script>

<style scoped src="@/styles/front/common.css"></style>
<style scoped src="@/styles/front//public.css"></style>

<style scoped>
  /*! CSS Used from: Embedded */
  .tutoringDiv .Title .name{display:block;float:left;width:250px;height:30px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#333;font-size:20px;}

</style>



