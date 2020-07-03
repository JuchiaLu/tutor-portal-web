<template>
  <div>
    <div class="topDiv">
      <div class="top">
        <div class="left">
          <img src="@/assets/images/icon-voice.png" />欢迎你的到来到！
          <a href="#" class="hover" v-if="isLogin" @click="handleLogout()">【安全退出】</a>&nbsp;
          <a href="#" class="hover" v-if="!isLogin" @click="handleLogin()">【用户登录】</a>&nbsp;
          <a href="#" class="hover" v-if="!isLogin" @click="handleReg()">【用户注册】</a>&nbsp;
        </div>
        <div class="right">
          <a v-if="isLogin" @click="$router.push({path:'/center'})" class="user"><img src="@/assets/images/icon-user.png" />个人中心</a>
          <!--div class="icons">
             <a href="javascript:;" class="sina"></a>
             <a href="javascript:;" class="wechat"></a>
             <a href="http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes" class="qq" target="_blank"></a>
             <div class="code"><img src="http://jiajiaowang.com/uploads/images/20180120/11dc255f609c4.jpg" width="110" height="110" alt="" /></div>
           </div-->
        </div>
      </div>
    </div>

    <div class="headerDiv">
      <div class="header">
        <a @click="$router.push({path:'/index'})" class="logo"><img src="@/assets/logo.png" width="220" height="70" alt="" /></a>
        <div class="citys">
          <div class="now">
            <img src="@/assets/images/icon-map.png" height="16" />{{areaName}}
          </div>
          <div class="choose">
            <router-link to='/areas'><a>【切换城市】</a></router-link>
          </div>
        </div>
        <div class="selects">
          <a class="btn" @click="setPlatform('student')">切换为学员端</a>
          <a class="btn beTeacher" @click="setPlatform('teacher')">切换为教员端</a>
        </div>
      </div>
    </div>
    <div class="navDiv">
      <div class="nav">
        <div class="menus">
          <img src="@/assets/images/icon-list.png" />全部科目导航
        </div>
        <ul class="navUl">
          <li v-for="(item,index) in navigations"><a @click="$router.push({path:item.url})">{{item.name}}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  import cookieUtil from 'js-cookie'

  import * as navigationApi from '@/api/system/front/navigation'

  import * as tokenUtils from '@/utils/auth'

export default {
  name: "Top",

  props: {  },
  data() {
    return {
      areaName: cookieUtil.get('areaName'),
      navigations:[],

      isLogin: false,

      ssoLoginForm:{
        response_type:'code',
        client_id: 'imooc',
        redirect_uri: window.location.origin+'/ssoredirect',
        scope: 'all'
      }

    }
  },

  methods: {

    setPlatform(type){
      if(type==='student'){
        cookieUtil.set('platform','student')
      }else{
        cookieUtil.set('platform','teacher')
      }
      this.$router.go(0)
    },

    handleLogin(){

      const redirect_uri = encodeURIComponent(window.location.origin + `/ssoredirect`)

      //const url = `http://tutor-ssoLogin-web:80/oauth/authorize?response_type=code&client_id=web-portal&scope=all&redirect_uri=${redirect_uri}`

      //第三方登录时使用
      //const url = `http://www.merryyou.cn/oauth/authorize?response_type=code&client_id=web-portal&scope=all&redirect_uri=${redirect_uri}`

      const url = `http://47.115.38.150/oauth/authorize?response_type=code&client_id=web-portal&scope=all&redirect_uri=${redirect_uri}`


      window.open(url)
    },

    handleReg(){

      //const url = `http://tutor-ssologin-web:80/reg.html`
      //const url = `http://www.merryyou.cn/reg.html` //第三方登录时使用

      //http://47.115.38.150/
      const url = `http://47.115.38.150/reg.html`

      window.open(url)
    },

    handleLogout(){
      tokenUtils.removeToken()
      this.isLogin = false
      this.$message({
        message: '已注销',
        type: 'success',
        duration: 3000
      })
      if(this.$route.path==='/index'){
        this.$router.go(0)
      }else {
        this.$router.push({path:'/index'})
      }
    }

  },
  computed: {  },
  watch: {  },

  components: {  },
  directives: {  },
  filters: {  },

  created(){
    //导航
    navigationApi.list().then(response=>{
      this.navigations = response
      console.log(response)
    }).catch(error=>{
      console.log(error);
    })


    if(tokenUtils.getToken()){
      this.isLogin=true
    }else{
      this.isLogin=false
    }

  }

}
</script>

<style scoped>

</style>

<style scoped src="@/styles/front/common.css"></style>
<style scoped src="@/styles/front//public.css"></style>
