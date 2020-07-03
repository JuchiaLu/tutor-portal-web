<template>
  <div>
    <top></top>
    <div class="locationDiv">
      <div class="location">
        <img src="@/assets/images/icon-map-1.png" />
        <a>首页</a>&nbsp;&gt;&nbsp; 在线预约教员
      </div>
    </div>
    <div class="publicDiv appoint">
      <form name="moduser" id="moduser" action="" method="">
        <input name="tutorindentify" value="16" type="hidden" />
        <input type="hidden" name="tutorid" value="" />
        <input name="tutorindentify" value="16" type="hidden" />
        <input type="hidden" name="tutorid" value="" />
        <input name="tutorindentify" value="16" type="hidden" />
        <input type="hidden" name="tutorid" value="" />
        <input type="hidden" name="bh_from_token" value="685c09a0834ac0d9d1be7b61a83a3d4a_59d307d3b89dafdd4b196fc763e88ed6" />

        <table width="90%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin:15px auto;">
          <tbody>
          <tr height="50">
            <td width="300" align="right" valign="middle"><span style="color:red;">*</span>称呼：</td>
            <td align="left"><input v-model="form.nickname" type="text" name="username" class="mtext" value="" placeholder="如：李先生/王女士/张同学" /></td>
          </tr>
          <tr height="50">
            <td width="300" align="right" valign="middle"><span style="color:red;">*</span>联系号码：</td>
            <td align="left"> <input v-model="form.phone" type="text" name="phone" class="mtext" value="" placeholder="输入手机号码" /> </td>
          </tr>
          <tr height="50">
            <td width="300" align="right" valign="middle">微信号：</td>
            <td align="left"><input v-model="form.wechat" type="text" name="weixin" class="mtext" value="" /></td>
          </tr>
          <tr height="50">
            <td width="300" align="right" valign="middle">QQ号：</td>
            <td align="left"><input v-model="form.qq" type="text" name="weixin" class="mtext" value="" /></td>
          </tr>
          <tr height="50">
            <td width="300" align="right" valign="middle"><span style="color:red;">*</span>学员性别：</td>
            <td align="left">
              <input v-model="form.gender" type="radio" name="sex" value="1" /> 男
              <input v-model="form.gender" type="radio" name="sex" value="2" /> 女 </td>
          </tr>

          <tr height="50">
            <td width="300" align="right" valign="middle"><span style="color:red;">*</span>辅导科目：</td>
            <td>
              <select v-model="form.firstCategoryId" name="classcount1" style="width: 150px;" @change="handleFirstCategoryChange(form.firstCategoryId)">
                <option value="" selected disabled>请选择阶段</option>
                <option v-for="(item,index) in firstCategorys" :value="item.id" >{{item.name}}</option>
              </select>
              <select v-model="form.secondCategoryId" name="classcount2" style="width: 150px;" @change="handleSecondCategoryChange(form.secondCategoryId)">
                <option value="" selected disabled>请选择年级</option>
                <option v-for="(item,index) in secondCategorys" :value="item.id" >{{item.name}}</option>
              </select>

              <select v-model="form.thirdCategoryId" name="classcount2" style="width: 150px;">
                <option value="" selected disabled>请选择科目</option>
                <option v-for="(item,index) in thirdCategorys" :value="item.id" >{{item.name}}</option>
              </select>
            </td>
          </tr>

          <tr height="50">
            <td width="300" align="right" valign="middle"><span style="color:red;">*</span>学员类型：</td>
            <td align="left">
              <select name="tutorindentify" v-model="form.studentTypeId">
                <option value="" selected disabled>请选择</option>
                <option v-for="(item,index) in studentType" :value="item.id">{{item.name}}</option>
              </select>
            </td>
          </tr>

          <tr height="50">
            <td width="300" align="right" valign="middle"><span style="color:red;">*</span>家教上课地点：</td>
            <td align="left">
              <span class="regionshow">
              <select v-model="form.areaId" name="region" class="region" style="width:100px;">
                <option value="" selected disabled>请选择</option>
                <option v-for="(item,index) in areas" :value="item.id">{{item.name}}</option>
              </select>
              </span>
              <input v-model="form.address" type="text" name="address" class="mtext" placeholder="附近公交、地铁站名或小区名" /> </td>
          </tr>
          <tr height="50">
            <td width="300" align="right" valign="middle"><span style="color:red;">*</span>可授课时间：</td>
            <td align="left">
              <table class="classtime" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                <tr>
                  <td>时间</td>
                  <td>一</td>
                  <td>二</td>
                  <td>三</td>
                  <td>四</td>
                  <td>五</td>
                  <td>六</td>
                  <td>日</td>
                </tr>
                <tr>
                  <td>上午</td>
                  <td><input v-model="teachDate.mondayMorning"  type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.tuesdayMorning"  type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.wednesdayMorning"type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.thursdayMorning" type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.fridayMorning"   type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.SaturdayMorning" type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.SundayMorning"   type="checkbox" value="true" /></td>
                </tr>
                <tr>
                  <td>下午</td>
                  <td><input v-model="teachDate.mondayAfternoon"   type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.tuesdayAfternoon"   type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.wednesdayAfternoon" type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.thursdayAfternoon"  type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.fridayAfternoon"    type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.SaturdayAfternoon"  type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.SundayAfternoon"    type="checkbox" value="true" /></td>
                </tr>
                <tr>
                  <td>晚上</td>
                  <td><input v-model="teachDate.mondayEvening"   type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.tuesdayEvening"   type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.wednesdayEvening" type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.thursdayEvening"  type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.fridayEvening"    type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.SaturdayEvening"  type="checkbox" value="true" /></td>
                  <td><input v-model="teachDate.SundayEvening"    type="checkbox" value="true" /></td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr height="50">
            <td width="300" align="right" valign="middle"><span style="color:red;">*</span>请选择教员类型(待定)：</td>
            <td align="left">
              <select name="tutorindentify" v-model="form.teacherTypeId">
                <option value="" selected disabled>请选择</option>
                <option v-for="(item,index) in teacherType" :value="item.id">{{item.name}}</option>
              </select>
            </td>
          </tr>
          <tr height="50">
            <td width="300" align="right" valign="middle"><span style="color:red;">*</span>选择教员性别：</td>
            <td align="left">
              <label><input v-model="form.teacherGender" type="radio" name="tutorsex" value="1" /> 男&nbsp;&nbsp;</label>
              <label><input v-model="form.teacherGender" type="radio" name="tutorsex" value="2" /> 女 &nbsp;&nbsp;</label>
              <label><input v-model="form.teacherGender" type="radio" name="tutorsex" value="3" checked="checked" /> 不限 &nbsp;&nbsp;</label>
            </td>
          </tr>
          <tr height="50">
            <td width="300" align="right" valign="middle"><span style="color:red;">*</span>其他要求：</td>
            <td align="left"> <textarea v-model="form.demand" name="tutorrequire" class="intro">有家教经验，有责任心。</textarea> </td>
          </tr>

          <tr height="50">
            <td width="300" align="right" valign="middle"><span style="color:red;">*</span>家教时间安排：</td>
            <td align="left">
              每次<input type="number" v-model="form.timeHour" class="mtext" min="1" style="width: 50px;">小时，
              每小时<input type="number" v-model="form.hourPrice" class="mtext" min="1" style="width: 50px;">元，
              共<input type="number" v-model="form.frequency" class="mtext" min="1" style="width: 50px;">次
            </td>
          </tr>

          <tr height="50">
            <td width="300" align="right" valign="middle">总金额：</td>
            <td align="left"> <i style="font-size: large">{{totalPrice}} 元</i></td>
          </tr>
          <tr height="50">
            <td width="300" align="right" valign="middle"></td>
            <td align="left"> <label style="color: #737373"> <input checked="checked" value="checkbox" name="checkbox" id="checkbox" type="checkbox" /> &nbsp;因虚假信息而引发的任何后果，一概由填表人负责，与本站无关。 </label> </td>
          </tr>
          <tr height="50">
            <td width="300" align="right" valign="middle">&nbsp;</td>
            <td align="left"><input type="button" value="填写好了，立即提交" class="ctrls save_info_btn" @click.prevent="handleSubmit" /></td>
          </tr>
          </tbody>
        </table>
      </form>
    </div>
    <footer2></footer2>
  </div>
</template>

<script>

  import cookieUtil from 'js-cookie'

  import top from '@/views/top'

  import footer2 from '@/views/footer'

  import * as needApi from '@/api/business/auth/need'

  import * as dictApi from '@/api/business/front/dict'

  import * as categoryApi from '@/api/business/front/category'

  import * as areaApi from '@/api/business/front/area'

  import * as tokenUtils from '@/utils/auth'


export default {
  name: "Appoint",

  props: {  },
  data() {
    return {

      cityId: undefined,
      //表格
        form:{
          // id:'',
          nickname:'',//学生称呼
          phone:'', //联系电话
          cityId:'', //城市外键
          areaId:'', //地区_外键
          wechat:'', //微信号
          qq:'',//qq号
          gender:'', //性别
          address:'', //详细地址
          firstCategoryId:'', //一级分类_外键 如小学
          secondCategoryId:'', //二级分类_外键 如一年级
          thirdCategoryId:'', //三级分类_外键 如数学
          frequency:'', //上课次数
          timeHour:'', //每次几小时
          hourPrice:'', //每小时多少元
          teachDate:'', //可上课时间, 序列化后的对象
          studentTypeId:'', //学员类型_外键
          teacherGender:'', //教师性别要求
          teacherTypeId:'', //教师类型__外键
          demand:'', //具体要求
        },

      //可上课时间, 序列化前的对象
      teachDate:{},

      //教员类型,查字典表
      teacherType:[
        {
          id:1,
          name:'在读大学生',
        },
        {
          id:2,
          name:'在职教师',
        },
        {
          id:3,
          name:'其他'
        }
      ],

      //学生类型, 查字典表
      studentType:[
        {
          id:1,
          name:'零基础',
        },
        {
          id:2,
          name:'补差型',
        },
        {
          id:3,
          name:'提高型'
        },
        {
          id:3,
          name:'拔尖型'
        }
      ],

      //地区,查地区表
      areas:[
        {
          id:1,
          name:'芗城区',
        },
        {
          id:2,
          name:'龙文区',
        },
        {
          id:3,
          name:'南海区',
        },
      ],

      //一级分类, 如小学
      firstCategorys:[
        {
          id:1,
          name:'小学'
        },
        {
          id:2,
          name:'初中'
        },
        {
          id:3,
          name:'高中'
        }
      ],
      //二级分类 如年级
      secondCategorys:[
        {
          id:1,
          name:'一年级'
        },
        {
          id:2,
          name:'二年级'
        },
        {
          id:3,
          name:'三年级'
        }
      ],
      //三级类 如英语
      thirdCategorys:[
        {
          id:1,
          name:'数学'
        },
        {
          id:2,
          name:'英语'
        },
        {
          id:3,
          name:'语文'
        }
      ],

      //上课次
      frequency:[
        {
          id: 1,
          value: 1,
          name:'一次'
        },
        {
          id: 2,
          value: 2,
          name:'两次'
        },
        {
          id: 3,
          value: 3,
          name:'三次'
        },
      ],
      //每次几小时
      timeHour:[
        {
          id: 1,
          value:1,
          name:'一小时'
        },
        {
          id: 2,
          value:2,
          name:'两小时'
        },
        {
          id: 3,
          value:3,
          name:'三小时'
        },
      ],
      //每小时价格
      hourPrice:[
        {
          id:1,
          value: 40,
          name:'40元/小时'
        },
        {
          id:2,
          value: 50,
          name:'50元/小时'
        },
        {
          id:3,
          value: 60,
          name:'60元/小时'
        },
        {
          id:4,
          value: 70,
          name:'70元/小时'
        }
      ]
    }
  },

  methods: {
    handleSubmit(){
      //JSON.stringify({"key":"val"}) ; //序列化成字符串
      //JSON.parse(string);//json字符串反序列化成对象
      this.form.teachDate = JSON.stringify(this.teachDate)
      this.form.cityId = this.cityId

      needApi.save(this.form).then(resopnse=>{
        this.$message({
          message: '添加成功，请在我的需求中查看',
          type: 'success',
          duration: 3000
        })
        this.$router.push({path:'/center',query:{panel:'need'}})
      }).catch(error=>{
        console.log(error);
      })
    },

    handleFirstCategoryChange(id){
      this.secondCategorys={}
      this.thirdCategorys={}
      categoryApi.listByParentId(id).then(resopnse=>{
        this.secondCategorys = resopnse;
      }).catch(error=>{
        console.log(error)
      })
    },
    handleSecondCategoryChange(id){
      this.thirdCategorys={}
      categoryApi.listByParentId(id).then(resopnse=>{
        this.thirdCategorys = resopnse;
      }).catch(error=>{
        console.log(error)
      })
    },
    // handleThirdCategory(id){
    //   categoryApi.listByParentId(id).then(resopnse=>{
    //     this.thirdCategorys = resopnse;
    //   }).catch(error=>{
    //     console.log(error)
    //   })
    // }

  },
  computed: {
    totalPrice(){
      return this.form.frequency * this.form.timeHour * this.form.hourPrice
    }
  },
  watch: {  },

  components: {
    footer2,
    top,
  },
  directives: {  },
  filters: {  },

  created(){


    if(!tokenUtils.getToken()){
      this.$message({
        message: '请登录后访问！',
        type: 'warning',
        duration: 3000
      })
      this.$router.push({path:'/index'})
    }

    this.cityId = cookieUtil.get('areaId')

    dictApi.listByCode('teacherType').then(response=>{
      this.teacherType = response
    }).catch(error=>{
      console.log(error);
    })

    dictApi.listByCode('studentType').then(response=>{
      this.studentType = response
    }).catch(error=>{
      console.log(error);
    })

      categoryApi.listByParentId(0).then(resopnse=>{
        this.firstCategorys = resopnse;
      }).catch(error=>{
        console.log(error)
      })

    areaApi.listByParentId(this.cityId).then(resopnse=>{
      this.areas = resopnse;
    }).catch(error=>{
      console.log(error)
    })
  }

}
</script>

<style scoped>

</style>

<style scoped src="@/styles/front/common.css"></style>
<style scoped src="@/styles/front//public.css"></style>
<!--<style scoped src="@/assets/images/favicon.ico"></style>-->
<style scoped src="@/styles/front/appoint.css"></style>
