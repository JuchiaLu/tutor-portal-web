<template>
  <div>
    <div class="user_right">
      <div class="usernav_title"><span class="hover"><a>基础信息</a></span></div>
      <dl class="userdl">
        <dd class="usertishi">每次修改个人信息后要重新审核，只有审核通过的教员才能预约家教需求，请确保个人信息的真实性</dd>
      </dl>
      <!--设置个人信息-->
      <form name="moduser" action="" method="post">
        <table width="90%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin:15px auto;">
          <tbody>

          <tr height="40">
            <td width="94" align="right" valign="middle">状态：</td>
            <td align="left">
              <div  v-if="form.state===1"><span style="color: #164ebc">审核中</span></div>
              <div  v-if="form.state===2"><span style="color: #ff1b0c">审核失败</span></div>
              <div  v-if="form.state===3" ><span style="color: #0ea443">审核通过</span></div>
            </td>
          </tr>

          <tr height="40" v-if="form.state===2">
            <td width="74" align="right" valign="middle">原因：</td>
            <td align="left"><span style="color: #ff1b0c">{{form.reason}}</span></td>
          </tr>

          <tr height="40">
            <td width="74" align="right" valign="middle">昵称：</td>
            <td align="left"><input type="text" v-model="form.nickname" class="mtext"></td>
          </tr>
          <tr height="40">
            <td width="74" align="right" valign="middle">姓名：</td>
            <td align="left"><input type="text" v-model="form.realname" class="mtext"></td>
          </tr>
          <tr height="40">
            <td width="74" align="right" valign="middle">性别：</td>
            <td align="left">
              <input type="radio" v-model="form.gender" value="1" checked="checked"> 男
              <input type="radio" v-model="form.gender" value="2"> 女
            </td>
          </tr>
          <tr height="40">
            <td width="74" align="right" valign="middle">年龄：</td>
            <td align="left"><input type="text" v-model="form.age" class="mtext"></td>
          </tr>

          <tr height="40">
            <td width="74" align="right" valign="middle">微信：</td>
            <td align="left"><input type="text"  v-model="form.wechat" class="mtext"></td>
          </tr>
          <tr height="40">
            <td width="74" align="right" valign="middle">QQ：</td>
            <td align="left"><input type="text" v-model="form.qq" class="mtext"></td>
          </tr>
          <tr height="40">
            <td width="74" align="right" valign="middle">邮箱：</td>
            <td align="left"><input type="text" v-model="form.email" class="mtext"></td>
          </tr>
          <tr height="40">
            <td width="74" align="right" valign="middle">手机：</td>
            <td align="left"><input type="text" v-model="form.phone" class="mtext" ></td>
          </tr>

          <tr height="40">
            <td width="74" align="right" valign="middle">详细地址：</td>
            <td align="left"><input type="text"  v-model="form.address" class="mtext"></td>
          </tr>

          <tr height="40">
            <td width="74" align="right" valign="middle">当前工作：</td>
            <td align="left"><input type="text"  v-model="form.currentJob" class="mtext"></td>
          </tr>
          <tr height="90">
            <td width="74" align="right" valign="middle">个人简介：</td>
            <td align="left"><textarea v-model="form.resume" class="intro">个人简介</textarea></td>
          </tr>
          <tr height="40">
            <td width="74" align="right" valign="middle">&nbsp;</td>
            <td align="left"><input type="button" value="保存" class="ctrls save_info_btn" @click="handlePatch"></td>
          </tr>
          </tbody></table>
        <!--结束-->
      </form></div>
  </div>
</template>

<script>

  import * as teacherApi from '@/api/business/auth/teacher'

  import * as areaApi from '@/api/business/front/area'

export default {
  name: "CenterBaseInformation",

  props: {  },
  data() {
    return {
      form:{
        nickname:undefined,
        realname:undefined,
        gender:undefined,
        age:undefined,
        wechat:undefined,
        qq:undefined,
        email:undefined,
        phone:undefined,
        areaId:undefined,
        address:undefined,
        currentJob:undefined,
        resume:undefined,
      },
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
    }
  },

  methods: {
    //部分自动更新老师
    handlePatch(){
      console.log(this.form)
      this.form.province = undefined
      this.form.city = undefined
      this.form.teacherType = undefined
      teacherApi.patchMe(this.form).then(response=>{
        this.$message({
          message: '保存成功',
          type: 'success',
          duration: 3000
        })
      }).catch(error=>{

      })
    },
  },
  computed: {
  },
  watch: {  },

  components: {  },
  directives: {  },
  filters: {
    authState(value){
      if(value===1){
        return ' 审 核 中 '
      }
      if(value===2){
        return ' 审 核 失  败 '
      }
      if(value===3){
        return ' 审 核 通 过 '
      }
    }
  },

  created(){
    //获取地区列表
    areaApi.listByParentId(162).then(resopnse=>{
      this.areas = resopnse
    }).catch(error=>{
      console.log(error)
    })


    //获取当前用户信息
    teacherApi.getMe().then(resopnse=>{
      this.form = resopnse
    }).catch(error=>{
      console.log(error);
    })
  }

}
</script>

<style scoped>
  /*! CSS Used from: ../../assets/css/common.css */
  *{margin:0px;padding:0px;font-size:14px;font-family:"Microsoft Yahei";}
  body,div,li,ul,ol,dl,dd,dt,span,b{margin:0;padding:0;}
  ul,li,dl,dt,dd,ol{list-style:none;list-style-type:none;}
  a img,a{border:none;text-decoration:none;}
  body{font-size:14px;margin:0px;padding:0px;font-family:"微软雅黑";}
  input{margin:0px;padding:0px;outline:none;}
  input:focus{outline:none;}
  a{color:#309de0;}
  a:hover,a:active,a:visited{text-decoration:none;}
  .topDiv{width:100%;min-width:1200px;height:40px;background:#f4f4f4;border-bottom:1px solid #ddd;}
  .topDiv .top{width:1200px;height:40px;margin:0px auto;}
  .topDiv .top .left{float:left;width:800px;height:40px;line-height:40px;overflow:hidden;font-size:12px;color:#666;}
  .topDiv .left img{position:relative;top:4px;margin-right:5px;}
  .topDiv .left a{color:#666;margin-left:5px;}
  .topDiv .left a:hover,.topDiv .left a.hover{color:#e80000;}
  .topDiv .top .right{float:right;max-width:300px;height:40px;}
  .topDiv .right .user{display:block;float:left;line-height:40px;background:url(../../assets/images/icon-arrow-1.png) no-repeat right center;padding-right:15px;font-size:12px;color:#666;}
  .topDiv .right .user img{position:relative;top:3px;margin-right:8px;}
  .topDiv .right .user:hover{color:#e80000;}
  .headerDiv{width:100%;min-width:1200px;height:105px;clear:both;background:#fff;}
  .headerDiv .header{width:1200px;height:105px;margin:0px auto;}
  .headerDiv .logo{display:block;float:left;width:220px;height:70px;overflow:hidden;margin-top:20px;}
  .headerDiv .tel{float:right;max-width:225px;height:75px;overflow:hidden;margin-top:15px;background:url(../../assets/images/icon-tel.png) no-repeat left 8px;padding-left:45px;color:#666;}
  .headerDiv .tel span{display:block;font-size:26px;color:#e80000;font-weight:bold;font-family:"Arial";}
  .headerDiv .tel i{font-style:normal;}
  .headerDiv .tel i i{color:#e80000;font-family:'Arial';font-size:16px;}
  .headerDiv .citys{float:left;width:100px;height:40px;overflow:hidden;margin:35px 0 0 25px;text-align:center;}
  .headerDiv .citys .now{width:100px;height:20px;color:#e80000;font-size:16px;}
  .headerDiv .citys .now img{position:relative;top:3px;margin-right:4px;}
  .headerDiv .citys .choose{width:100px;height:20px;color:#242424;font-size:14px;cursor:pointer;}
  .headerDiv .citys .choose a{color:#242424;font-size:14px;}
  .headerDiv .citys .choose:hover a{color:#e80000;}
  .headerDiv .selects{float:left;width:510px;overflow:hidden;z-index:101;margin:40px 0 0 60px;}
  .headerDiv .selects .btn{text-align:center;display:block;float:left;width:100px;height:29px;line-height:29px;border-radius:5px;margin:4px 0 0 8px;color:#fff;overflow:hidden;background:#309de0;border:none;font-weight:bold;font-family:"微软雅黑";cursor:pointer;}
  .headerDiv .selects .beTeacher{background:#33b633;}
  .navDiv{width:100%;min-width:1200px;height:50px;background:#e80000;clear:both;overflow:hidden;}
  .navDiv .nav{width:1200px;height:50px;overflow:hidden;margin:0px auto;}
  .navDiv .nav .menus{float:left;width:200px;height:50px;line-height:50px;text-align:center;background:#ff4545;overflow:hidden;color:#fff;font-size:16px;}
  .navDiv .nav .navUl{float:left;width:1000px;height:50px;line-height:50px;overflow:hidden;}
  .navDiv .navUl li{display:block;float:left;width:125px;overflow:hidden;height:50px;text-align:center;}
  .navDiv .navUl li a{display:block;width:125px;overflow:hidden;height:50px;color:#fff;font-size:16px;}
  .navDiv .navUl li a:hover{background:#cd0000;}
  .footerdiv{width:100%;height:250px;min-width:1200px;background:#2b2b2b;clear:both;overflow:hidden;}
  .footerdiv .footer{width:1200px;height:250px;min-width:1200px;margin:0px auto 0px auto;}
  .footerdiv .footer .foot_list{width:193px;height:250px;border-right:1px solid #1b1b1b;text-align:center;float:left;overflow:hidden;}
  .footerdiv .footer .foot_logo{display:block;border-left:1px solid #1b1b1b;background:url(../../assets/images/logo-foot.png) no-repeat center;}
  .footerdiv .foot_list dt{color:#999;font-size:16px;height:30px;line-height:30px;margin-top:40px;margin-bottom:12px;width:193px;overflow:hidden;}
  .footerdiv .foot_list dt img{position:relative;top:6px;left:48px;float:left;}
  .footerdiv .foot_list dd{font-size:14px;line-height:26px;}
  .footerdiv .foot_list dd a{color:#bbb;}
  .footerdiv .foot_list .wechat{width:106px;height:106px;background:#fff;margin:20px auto 0px auto;}
  .footerdiv .foot_list .wechat img{margin:2px 2px;}
  .footerdiv .foot_list  span{color:#FFF;line-height:36px;}
  .footerdiv .foot_list .foot-last{width:190px;color:#999;font-size:16px;line-height:30px;margin-top:40px;}
  .footerdiv .foot_list .foot-last img{position:relative;top:3px;}
  .footerdiv .foot_list .foot-ftel{margin-top:10px;color:#ffe23c;font-size:20px;}
  .footerdiv .foot_list .foot-date{margin-bottom:10px;color:#bbb;font-size:12px;}
  .footerdiv .foot_list .foot-kf{width:103px;height:33px;background:url(../../assets/images/icon-service.png) no-repeat 12px center;margin:16px auto 0px auto;border-radius:5px;border:1px solid #666;}
  .footerdiv .foot_list .foot-kf a{display:block;width:103px;height:33px;line-height:33px;font-size:14px;padding-left:12px;}
  .footerdiv .foot_list dd:hover a{color:#e80000;}
  .footerdiv .foot_list .foot-kf:hover a{color:#fff;}
  .copyrightDiv{width:100%;height:80px;min-width:1200px;overflow:hidden;clear:both;background:#1b1b1b;}
  .copyrightDiv .copyright{height:80px;line-height:80px;width:1200px;overflow:hidden;margin:0px auto;text-align:center;color:#666;font-size:12px;}
  .copyrightDiv .copyright a{color:#666;}
  /*! CSS Used from: ../../assets/css/public.css */
  body{background:#f2f2f2;}
  /*! CSS Used from: ../../assets/css/user.css */
  *{margin:0px;padding:0px;font-size:12px;}
  body,div,li,ul,dl,dd,dt,span,b{margin:0px;padding:0px;list-style:none;list-style-type:none;}
  a img{border:none;}
  a{text-decoration:none;margin:0px;padding:0px;}
  body{background:#fff;margin:0px;padding:0px;-webkit-text-size-adjust:none;min-width:1000px;}
  input{margin:0px;padding:0px;}
  input,textarea{outline:none;}
  .inner_mainbox{width:1200px;height:auto;min-height:500px;margin:0 auto;overflow:hidden;}
  .location_now{width:1178px;height:36px;background:url(../../assets/images/icon-map-1.png) no-repeat left center;padding-left:22px;line-height:36px;color:#666;margin:8px auto 6px auto;}
  .location_now a{color:#666;display:inline-block;background:url(../../assets/images/right_arrow.png) no-repeat left center;padding-left:10px;margin-left:8px;font-family:"微软雅黑";}
  .location_now a:hover{color:#af0f0f;}
  .user_main{width:1198px;height:auto;overflow:hidden;min-height:300px;margin:0 auto 20px auto;}
  .user_right{width:966px;height:auto;overflow:hidden;float:right;border:1px solid #dedede;background:#fff;}
  .usernav_title{width:982px;height:36px;border-bottom:1px solid #dedede;background:#fafafa;}
  .usernav_title span{height:35px;padding:0px 30px;background:#fff;line-height:34px;display:inline-block;border-right:1px solid #dedede;overflow:hidden;position:relative;top:-2px;}
  .usernav_title span a{color:#333;}
  .usernav_title span.hover{height:35px;border-top:3px solid #e80000;top:-1px;color:#e80000;font-size:14px;}
  .usernav_title span.hover a{color:#c00202;}
  .userdl{width:90%;margin:10px auto 0px auto;}
  .userdl .usertishi{height:38px;line-height:38px;border:solid 1px #d0d0d0;margin:15px auto 15px 0;text-align:center;width:100%;color:#666;}
  .userdl dd{line-height:37px;letter-spacing:1px;}
  .bindphone{color:#11a6e8;}
  .mtext{width:166px;height:24px;border:solid 1px #dcdcdc;color:#4e4e4e;padding:3px;border-radius:2px;}
  .intro{resize:none;width:400px;height:62px;border:solid 1px #dcdcdc;color:#666;line-height:25px;padding:3px;border-radius:2px;}
  .ctrls{width:136px;height:30px;background:#309de0;color:#fff;text-align:center;border:none;cursor:pointer;margin:10px auto 0px auto;font-size:14px;line-height:30px;}
  .mtext:focus{border:solid 1px #61ade7;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);}
  .intro:focus{border:solid 1px #61ade7;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);}
  .mtext:focus{border:solid 1px #61ade7;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);}
  body{background:#f2f2f2;}
  .userLeft{width:213px;height:auto;overflow:hidden;float:left;border:1px solid #dedede;padding-bottom:20px;background:#fff;}
  .userLeft .ones{width:213px;height:auto;background:#f6f6f6;overflow:hidden;padding-bottom:20px;}
  .userLeft .ones .Top{width:213px;height:66px;overflow:hidden;margin-top:20px;margin-bottom:14px;}
  .userLeft .ones .pic{width:63px;height:63px;float:left;overflow:hidden;margin-left:10px;border-radius:40px;}
  .userLeft .ones .topic{width:120px;height:24px;float:left;overflow:hidden;margin-left:15px;color:#333;}
  .userLeft .ones .num{width:120px;height:20px;float:left;overflow:hidden;margin-left:15px;color:#1985c6;font-size:12px;}
  .userLeft .ones .integral{width:120px;height:22px;float:left;overflow:hidden;margin-left:15px;color:#666;font-size:12px;}
  .userLeft .ones .integral span{color:#e80000;}
  .userLeft .userNav{width:211px;height:auto;overflow:hidden;margin:0 1px;}
  .userLeft .userNav .ctag{width:211px;height:35px;line-height:35px;overflow:hidden;background:#e5f1fa;}
  .userLeft .userNav .ctag span{display:block;margin-left:35px;color:#333;font-size:16px;font-weight:bold;}
  .userLeft .userNav .ullist{width:176px;height:auto;overflow:hidden;margin-left:35px;}
  .userLeft .userNav li{display:block;width:176px;height:30px;line-height:30px;overflow:hidden;background:url(../../assets/images/icon-arrow-9.png) no-repeat left center;}
  .userLeft .userNav li a{display:block;width:160px;height:30px;margin-left:16px;color:#666;font-size:14px;}
  .userLeft .userNav li a:hover,.userLeft .userNav li a.hover{color:#e80000;}
  .userLeft .userNav li a b{padding:3px 8px;background:#cc0202;color:#fff;border-radius:15px;}
  .userLeft .loginout{display:block;width:93px;height:30px;line-height:30px;text-align:center;color:#309de0;font-size:14px;border:1px solid #309de0;margin:20px 0 20px 35px;border-radius:7px;}
  .userLeft .loginout:hover{color:#fff;border:1px solid #e80000;background:#e80000;}
</style>
