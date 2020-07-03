<template>
  <div>

    <top></top>
    <div class="bannerDiv">
      <div class="menuDiv">
        <div class="lfmenu">
          <div class="list" v-for="(item,index) in categories">
            <div class="type">
              <a @click="$router.push({path:'/needs',query:{firstCategoryId:item.id}})">{{item.name}}</a>
            </div>
            <!--前五个二级分类-->
            <div class="small">
              <a @click="$router.push({path:'/needs',query:{firstCategoryId:item.id,secondCategoryId:item2.id}})" v-for="(item2,index2) in item.children" v-if="index2 < 5">{{item2.name}}</a>
            </div>

            <!--鼠标点上去时显示-->
            <div class="allcate">
              <dl v-for="(item3,index3) in item.children">
                <!--二级-->
                <dt>
                  <a @click="$router.push({path:'/needs',query:{firstCategoryId:item.id,secondCategoryId:item3.id}})">{{item3.name}}</a>
                </dt>
                <!--三级-->
                <dd v-for="(item4,index4) in item3.children">
                  <a @click="$router.push({path:'/needs',query:{firstCategoryId:item.id,secondCategoryId:item3.id,thirdCategoryId:item4.id}})">{{item4.name}}</a>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="right" v-if="!isLogin">
          <div class="txt"><span>用户登录</span><i class="err_tip"></i><a @click="handleReg"><span>用户注册</span></a></div>
          <form name="loginform" @keydown.enter="handleLogin">
            <div class="user_in"><input v-model="loginForm.username" type="text" autocomplete="off" name="user" required="" placeholder="用户名/手机号/邮箱" class="log_in"></div>
            <div class="pass_in"><input v-model="loginForm.password" type="password" autocomplete="off" name="password" class="log_in" required="" placeholder="请输入您的密码"></div>
            <div class="forgets">
              <div class="left"><input type="checkbox" name="" checked="checked" class="check">记住用户名</div>
              <a href="http://47.115.38.150/getpass.html" class="rgforget">忘记密码？</a>
            </div>
            <input @click="handleLogin"  type="button" name="login" value="登         录" class="btn login_but">
            <input @click="handleSsoLogin" type="button" name="login" value="单 点 登 录" class="btn login_but" style="background: #00e87f">
          </form>
        </div>

      </div>
      <el-carousel height="500px">
        <el-carousel-item v-for="(item,index) in advertisements">
          <li ><a target="_blank" href="#"><img :src="item.imageUrl"/></a></li>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="mainDiv">
      <div class="mListDiv casesDiv">
        <div class="lists voice">
          <div class="indexType">
            <div class="lf">
              <img src="@/assets/images/type-voice.png" />最新公告
            </div>
            <a href="#" class="more">更多+</a>
          </div>
          <ul class="voiceUl">
            <li v-for="(item,index) in notices"><a @click="showNotice(item)">{{item.title}}</a></li>
          </ul>
        </div>
        <div class="right">
          <div class="indexType">
            <div class="lf">
              <img src="@/assets/images/type-info.png" />最新需求
            </div>
            <a @click="$router.push({path:'/needs'})" class="more">查看更多+</a>
          </div>
          <div class="infos">

            <a @click="$router.push({path:'/needs/'+item.id+'/detail'})" class="infoA" v-for="(item,index) in needs">
              <ul>
                <li class="date"><img src="@/assets/images/icon-time.png" />{{item.createTime}}</li>
                <li class="book"><img src="@/assets/images/icon-book.png" /> {{item.firstCategory.name}} {{item.secondCategory.name}} {{item.thirdCategory.name}}</li>
                <li class="marker"><img src="@/assets/images/icon-marker.png" />{{item.area.name}} {{item.address}}</li>
                <li class="money"><img src="@/assets/images/icon-money.png" />{{item.hourPrice}}元/小时</li>
                <li class="claim"><img src="@/assets/images/icon-claim.png" />要求：{{item.demand}}</li>
              </ul>
            </a>
          </div>
        </div>
      </div>
      <div class="mListDiv precautDiv">
        <div class="lists precaut">
          <div class="indexType">
            <div class="lf">
              <img src="@/assets/images/type-list.png" />功能待定
            </div>
            <a href="#" class="more">更多+</a>
          </div>
          <ul class="precautUl">
            <li v-for="(item,index) in teacherShares"><a :href="item.src">{{item.title}}</a></li>
          </ul>
        </div>
        <div class="right">
          <div class="indexType">
            <div class="lf">
              <img src="@/assets/images/type-teach.png" />优秀教员
            </div>
            <a @click="$router.push({path:'/teachers'})" class="more">查看更多+</a>
          </div>
          <div class="teach">

            <a v-for="(item,index) in teachers" @click="$router.push({path:'/teachers/'+item.userId+'/detail'})" class="teaA">
              <div class="pic">
                <img :src="item.headImage" width="135" height="155" alt="" />
              </div>
              <div class="name">
                {{item.nickname}}
                <img v-if="item.realnameAuth===1" height="21" src="@/assets/images/realnameAuth.png" />
                <img v-if="item.studentAuth===1"height="21" src="@/assets/images/studentAuth.png" />
                <img v-if="item.teacherAuth===1"height="21" src="@/assets/images/teacherAuth.png" />
              </div>
              <div class="list">
                擅长：
                <span> {{item.goodAt}}</span>
              </div>
              <div class="list">
                地区：
                <span>{{item.city.name }} </span>
              </div>
              <div class="intro">
                {{item.resume}}
              </div> </a>
          </div>
        </div>
      </div>

      <div class="banDiv">
        <div class="indexType">
          <div class="lf">
            <img src="@/assets/images/type-partner.png" />友情链接
          </div>
        </div>

        <a  v-for="(item,index) in friendLinks" :href="item.url" class="bans" target="_blank">
          <div class="pic">
            <img :src="item.imageUrl" width="220" height="90" :alt="item.name" />
          </div>
          <div class="opac">
            <div class="txt">
              {{item.name}}
            </div>
          </div> </a>
      </div>
    </div>
    <footer2></footer2>
  </div>
</template>

<script>

  import cookieUtil from 'js-cookie'

  import top from '@/views/top'

  import footer2 from '@/views/footer'

  import * as categoryApi from '@/api/business/front/category'

  import * as advertisementApi from '@/api/system/front/advertisement'

  import * as friendLinkApi from '@/api/system/front/friendLink'

  import * as noticeApi from '@/api/system/front/notice'

  import * as needApi from '@/api/business/front/need'

  import * as teacherApi from '@/api/business/front/teacher'

  import * as tokenUtils from '@/utils/auth'

  import * as ssoLoginApi from '@/api/ssoLogin'

  import { setToken } from '@/utils/auth'

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
    name: "Front",

    props: {  },
    data() {
      return {

        cityId: undefined,


        loginForm:{
          username:undefined,
          password:undefined,
        },

        //导航
        navigations:[
        ],
        //大广告
        advertisements:[
        ],
        //学科分类
        categories:[
          ],
      //最新公告
        notices:[
        ],
      // 最新需求
        needs:[
        ],
      //教员分享
        teacherShares:[
          {
            title:'朱老师家教心得分享',
            src:'#'
          },{
            title:'张老师家教心得分享',
            src:'#'
          }
        ],
      //  优秀教员
        teachers:[
        ],
      //  成功案例
        successCases:[
          {
            title:'家教信息',
            msg:'号青云谱区学员聘请西湖区毛教员(编号：98058158)'
          },
          {
            title:'成绩不好需要补习',
            msg:'号红谷滩新区学员聘请西湖区毛教员(编号：98058158)'
          }
        ],
      //  合作伙伴
      //   partners:[
      //     {
      //       image:'http://jiajiaowang.com/uploads/images/default/default.png',
      //       name:'闽南师大'
      //     },
      //     {
      //       image:'http://jiajiaowang.com/uploads/images/default/default.png',
      //       name:'漳州师院'
      //     }
      //   ],
      //  友情链接
        friendLinks:[
        ],
        isLogin:false
      }
    },

    methods: {

      showNotice(notice){
        this.$notify({
          title: notice.title,
          message: notice.content,
          duration:4*1000
        });
      },

      handleLogin(){
        ssoLoginApi.getAccessTokenByPassword({ grant_type:'password',scope:'all',username: this.loginForm.username, password: this.loginForm.password }).then(response => {
          setToken(response.access_token)
          this.$router.push({path:'/center'})
        }).catch(error => {
            if(error.response.data.error_description){
              this.$message({
                message:error.response.data.error_description,
                type: 'warning',
                duration: 3000
              })
            }
        })
      },

      handleSsoLogin(){

        const redirect_uri = encodeURIComponent(window.location.origin + `/ssoredirect`)

        //const url = `http://tutor-ssoLogin-web:80/oauth/authorize?response_type=code&client_id=web-portal&scope=all&redirect_uri=${redirect_uri}`

        //第三方登录时使用
        //const url = `http://www.merryyou.cn/oauth/authorize?response_type=code&client_id=web-portal&scope=all&redirect_uri=${redirect_uri}`

        const url = `http://47.115.38.150/oauth/authorize?response_type=code&client_id=web-portal&scope=all&redirect_uri=${redirect_uri}`

        window.open(url)
      },

      handleReg(){

        //const url = `http://tutor-ssologin-web:80/reg.html`

        // const url = `http://www.merryyou.cn/reg.html` //第三方登录时使用

        const url = `http://47.115.38.150/reg.html`

        window.open(url)
      },



    },
    computed: {  },
    watch: {  },

    components: {
      top,
      footer2
    },
    directives: {  },
    filters: {  },

    created(){

      if(tokenUtils.getToken()){
        this.isLogin=true
      }else{
        this.isLogin=false
      }



      if(!cookieUtil.get('areaId')){
        cookieUtil.set('areaId',162)
        cookieUtil.set('areaName','漳州市')
      }
      this.cityId = cookieUtil.get('areaId')

      //学科
      categoryApi.list().then(response=>{
        this.categories = array2tree2(response,'id','parentId','children')
        console.log(response)
      }).catch(error=>{
        console.log(error);
      })

      //大广告
      advertisementApi.list().then(response=>{
        this.advertisements = response
        console.log(response)
      }).catch(error=>{
        console.log(error);
      })

      //友情链接
      friendLinkApi.list().then(response=>{
        this.friendLinks = response
        console.log(response)
      }).catch(error=>{
        console.log(error);
      })

      //最新公告
      noticeApi.page({current:1,size:5,sort:'createTime',order:'desc'}).then(response=>{
        this.notices = response.records
        console.log(response)
      }).catch(error=>{
        console.log(error);
      })


      // 最新需求
      needApi.page({current:1,size:6,sort:'createTime','cityId':this.cityId,order:'desc'}).then(response=>{
        this.needs = response.records
        console.log(response)
      }).catch(error=>{
        console.log(error);
      })


      //  优秀教员
      teacherApi.page({current:1,size:6,sort:'satisfaction','cityId':this.cityId,order:'desc'}).then(response=>{
        this.teachers = response.records
        console.log(response)
      }).catch(error=>{
        console.log(error);
      })


      //  合作伙伴

      //  成功案例


      //教员分享

      //底部版权



    }

  }
</script>

<style scoped src="@/styles/front/common.css"></style>
<style scoped src="@/styles/front//public.css"></style>
<!--<style scoped src="@/assets/images/favicon.ico"></style>-->
<style scoped src="@/styles/front/index.css"></style>
<style scoped>
  body{
    background: #fff;
  }
  .casesDiv .infoA .date{
    width: 120px;
    color: #1a85c6;
  }
</style>


