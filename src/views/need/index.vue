<template>
  <div style="background: #f2f2f2">
    <top></top>
    <div class="locationDiv">
      <div class="location">
        <img src="@/assets/images/icon-map-1.png" />
        <a >首页</a>&nbsp;&gt;&nbsp;全部需求
      </div>
    </div>
    <div class="tutorType">
      <span>全部需求</span>
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
               listQuery.firstCategoryId=undefined;
               listQuery.secondCategoryId=undefined;
               listQuery.thirdCategoryId=undefined;
               current.firstCategoryId=undefined;
               current.secondCategoryId=undefined;
               current.thirdCategoryId=undefined;
               listQuery.current=1;
               getPage()">不限</a>
            <a :class="{hover:current.firstCategoryId===item.id}"v-for="(item,index) in firstCategorys"  @click.prevent="handleFirstCategoryChange(item.id)">{{item.name}}</a>
          </div>
        </div>

        <div class="choose" v-if="secondCategorys.length>0">
          <div class="type">
            学员年级
          </div>
          <div class="list">
            <a :class="{hover:current.secondCategoryId===undefined}"
               @click="
               listQuery.secondCategoryId=undefined;
               listQuery.thirdCategoryId=undefined;
               current.secondCategoryId=undefined
               current.thirdCategoryId=undefined;
               listQuery.current=1;
               getPage()">不限</a>
            <a
              :class="{hover:current.secondCategoryId===item.id}"
               v-for="(item,index) in secondCategorys"
              @click.prevent="handleSecondCategoryChange(item.id)">{{item.name}}
            </a>
          </div>
        </div>

        <div class="choose" v-if="thirdCategorys.length>0">
          <div class="type">所学科目</div>
          <div class="list">
            <a :class="{hover:current.thirdCategoryId===undefined}"
               @click="
               listQuery.thirdCategoryId=undefined;
               current.thirdCategoryId=undefined;
               listQuery.current=1;
               getPage()">不限</a>
            <a :class="{hover:current.thirdCategoryId===item.id}"
               v-for="(item,index) in thirdCategorys"
               @click.prevent="handleThirdCategoryChange(item.id)">{{item.name}}
            </a>
          </div>
        </div>

        <div class="choose">
          <div class="type">
            所在地区
          </div>
          <div class="list">
            <a :class="{hover:current.areaId===undefined}"
               @click="listQuery.areaId=undefined;
               current.areaId=undefined;
               listQuery.current=1;
               getPage()">不限
            </a>
            <a :class="{hover:current.areaId===item.id}"
               v-for="(item,index) in areas"
               @click="listQuery.areaId=item.id;current.areaId=item.id;listQuery.current=1;getPage()">{{item.name}}
            </a>
          </div>
        </div>
        <div class="choose">
          <div class="type">
            要求教员
          </div>
          <div class="list">
            <a :class="{hover:current.teacherGender===undefined}" @click="listQuery.teacherGender=undefined;current.teacherGender=undefined;listQuery.current=1;getPage()">不限</a>
            <a  :class="{hover:current.teacherGender===1}" @click="listQuery.teacherGender=1;current.teacherGender=1;listQuery.current=1;getPage()">男</a>
            <a  :class="{hover:current.teacherGender===2}" @click="listQuery.teacherGender=2;current.teacherGender=2;listQuery.current=1;getPage()">女</a>
          </div>
        </div>
      </div>
    </div>

    <div class="isTypeDiv">
      <div :class="{default:true, ords:current.sort===undefined}">
        <a @click="listQuery.sort=undefined;current.sort=undefined;;getPage()">综合排序</a>
      </div>
      <div :class="{default:true, ords:current.sort==='totalPrice'}">
        <a @click="listQuery.sort='totalPrice';current.sort='totalPrice';getPage()">总价格排序</a>
      </div>
      <div :class="{default:true, ords:current.sort==='hourPrice'}">
        <a @click="listQuery.sort='hourPrice';current.sort='hourPrice';getPage()">小时价格排序</a>
      </div>
      <div class="right">
        <div class="people">
          {{total}}个结果
        </div>
      </div>
    </div>
    <div class="publicDiv">
      <div class="publicLeft">


        <div class="traineeDiv" v-for="(item,index) in needs">
          <div class="Title">
            <a @click="$router.push({path:'/needs/'+item.id+'/detail'})" class="name">
               共{{item.frequency}}次，每次{{item.timeHour}}小时</a>
            <div class="money">
              ￥{{item.hourPrice}}/小时, 总价{{item.totalPrice}}元
            </div>
          </div>
          <ul class="turul">
            <li class="li-1"><span>学员性别：</span>
              <div class="txt">
                {{item.gender | gender}}
              </div></li>

            <li class="li-2"><span>学员科目：</span>
              <div class="txt">
                {{item.firstCategory.name}} {{item.secondCategory.name}} {{item.thirdCategory.name}}
              </div></li>

            <li class="li-3"><span>要求性别：</span>
              <div class="txt">
                {{item.teacherGender | gender}}
              </div></li>
            <li class="li-4"><span>学生类型：</span>
              <div class="txt">
                {{item.studentType.name}}
              </div></li>
            <li class="li-6"><span>详细地址：</span>
              <div class="txt">
                {{item.area.name}} {{item.address}}
              </div>
            </li>

          </ul>
        </div>

        <div class="jogger">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float: right"
                         :page-sizes="[2, 4, 7, 10, 20, 50]" :current-page="listQuery.current" :page-size="listQuery.size" :total="total"
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

  import * as needApi from '@/api/business/front/need'

  import * as categoryApi from '@/api/business/front/category'

  import * as areaApi from '@/api/business/front/area'

export default {
  name: "Need",

  props: {  },
  data() {
    return {

      cityId:undefined,

      //总共条数
      total:0,

      listQuery:{
        current: 1, //当前页
        size: 4, //每页大小


        //以下根据业务需求
        firstCategoryId:undefined, //一级分类
        secondCategoryId:undefined, //二级分类
        thirdCategoryId:undefined, //三级分类
        cityId:undefined, //城市
        areaId:undefined, //地区
        teacherGender:undefined, //教员性别 0不限 1男 2女
        //nickname:undefined,
        sort: undefined, //排序字段
        order:'desc',
      },

      //class绑定
      current:{
        //以下根据业务需求
        firstCategoryId:undefined, //一级分类
        secondCategoryId:undefined, //二级分类
        thirdCategoryId:undefined, //三级分类
        areaId:undefined, //地区
        teacherGender:undefined, //教员性别 0不限 1男 2女
        sort:undefined //排序
      },

      //全部需求
      needs:[],
      //地区
      areas:[],
      //一级分类, 如小学
      firstCategorys:[],
      //二级分类 如年级
      secondCategorys:[],
      //三级类 如英语
      thirdCategorys:[]
    }
  },

  methods: {

    handleFirstCategoryChange(id){
      this.listQuery.current=1;
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
      this.listQuery.current=1;
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
        this.thirdCategorys = response
        this.getPage()
      }).catch(error=>{
        console.log(error);
      })
    },

    handleThirdCategoryChange(id){
      this.listQuery.current=1;
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

    //获取列表
    getPage(){
      needApi.page(this.listQuery).then(response=>{
        this.needs = response.records
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

    // if(!this.$route.query){
    //   this.listQuery = !this.$route.query
    // }

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

    // firstCategoryId:undefined, //一级分类
    //   secondCategoryId:undefined, //二级分类
    //   thirdCategoryId:undefined, //三级分类
    if(this.$route.query.firstCategoryId){
      this.listQuery.firstCategoryId = this.$route.query.firstCategoryId
      this.handleFirstCategoryChange(this.listQuery.firstCategoryId)
    }
    if(this.$route.query.secondCategoryId){
      this.listQuery.secondCategoryId = this.$route.query.secondCategoryId
      this.handleSecondCategoryChange(this.listQuery.secondCategoryId)
    }
    if(this.$route.query.thirdCategoryId){
      this.listQuery.thirdCategoryId = this.$route.query.thirdCategoryId
      this.handleThirdCategoryChange(this.listQuery.thirdCategoryId)
    }

    //获取需求列表
    this.getPage()

  }

}
</script>
<style scoped src="@/styles/front/common.css"></style>
<style scoped src="@/styles/front//public.css"></style>
<style scoped>
  .traineeDiv{height: 180px;}
  .traineeDiv .Title .money {
    font-size: 22px;
  }
</style>

