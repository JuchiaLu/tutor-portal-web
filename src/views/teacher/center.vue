<template>
  <div>
    <top></top>
    <div class="inner_mainbg">
      <div class="inner_mainbox">
        <div class="location_now">当前位置<a>首页</a><a>个人中心</a></div>
        <div class="user_main">

          <div class="userLeft">
            <div class="ones">
              <div class="Top">

                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  action
                  accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG,"
                  :auto-upload="true"
                  ref="upload1"
                  :on-success="handleSuccess1"
                  :before-upload="beforeUpload"
                  :http-request="fileUpload">
                  <img v-if="teacher.headImage" :src="teacher.headImage" class="avatar">
                    <el-avatar v-else :size="63" class="el-icon-plus avatar-uploader-icon"></el-avatar>
                </el-upload>



                <div class="num">昵称：{{teacher.nickname}}</div>
              </div>
            </div>



            <div class="userNav">
              <div class="ctag"><span>账户信息</span></div>
              <ul class="ullist">
                <li><a  :class="{hover:current==='baseInformation'}" @click="current='baseInformation';$router.push({query:{panel:'baseInformation'}})">基础资料</a></li>
                <li v-if="platform==='teacher'"><a  :class="{hover:current==='tutorInformation'}" @click="current='tutorInformation';$router.push({query:{panel:'tutorInformation'}})" >家教资料</a></li>
                <li v-if="platform==='teacher'"><a  :class="{hover:current==='authInformation'}" @click="current='authInformation';$router.push({query:{panel:'authInformation'}})">认证资料</a></li>
              </ul>

              <div class="userNav" v-if="platform==='student'">
                <div class="ctag"><span>需求信息</span></div>
                <ul class="ullist">
                  <li v-if="platform==='student'"><a :class="{hover:current==='need'}" @click="current='need';$router.push({query:{panel:'need'}})">我的需求</a></li>
                  <li v-if="platform==='student'"><a :class="{hover:current==='order'}" @click="current='order';$router.push({query:{panel:'order'}})">我的订单</a></li>

                </ul>
              </div>

              <div class="userNav">
                <div class="ctag"><span>家教信息</span></div>
                <ul class="ullist">
                  <li v-if="platform==='teacher'"><a :class="{hover:current==='appoint'}" @click="current='appoint';$router.push({query:{panel:'appoint'}})">我的预约</a></li>
                  <li><a :class="{hover:current==='studentcollection'}" @click="current='studentcollection';$router.push({query:{panel:'studentcollection'}})">我的收藏</a></li>
                  <!--<li><a >我的维权</a></li>-->
                  <li><a :class="{hover:current==='comment'}" @click="current='comment';$router.push({query:{panel:'comment'}})">我的评价</a></li>
                </ul>
              </div>

              <div class="userNav"  v-if="platform==='teacher'">
                <div class="ctag"><span>财务信息</span></div>
                <ul class="ullist">
                  <li><a :class="{hover:current==='walletbalance'}" @click="current='walletbalance';$router.push({query:{panel:'walletbalance'}})">我的余额</a></li>
                  <li><a :class="{hover:current==='walletcashout'}" @click="current='walletcashout';$router.push({query:{panel:'walletcashout'}})">提现记录</a></li>
                  <li><a :class="{hover:current==='walletincome'}" @click="current='walletincome';$router.push({query:{panel:'walletincome'}})">收入记录</a></li>
                </ul>
              </div>


              <div class="userNav">
                <div class="ctag"><span>系统功能</span></div>
                <ul class="ullist">
                  <li><a :class="{hover:current==='message'}" @click="current='message';notReadMessage=0;$router.push({query:{panel:'message'}})">我的消息<b v-if="notReadMessage!=0">{{notReadMessage}}</b></a></li>
                  <li><a :class="{hover:current==='security'}" @click="current='security';$router.push({query:{panel:'security'}})">帐号安全</a></li>
                  <li><a @click="adviceDialogVisible=true;form.content=undefined">意见建议</a></li>
                </ul>
              </div>
            </div>
            <a @click="handleLogout()" class="loginout">退出登录</a>
          </div>

          <!--基础信息-->
          <centerbaseinformation v-if="current=='baseInformation'"></centerbaseinformation>
          <!--家教信息-->
          <centertutorinformation v-if="current=='tutorInformation'"></centertutorinformation>
          <!--认证信息-->
          <centerauthinformation v-if="current=='authInformation'"></centerauthinformation>

          <!--我的预约-->
          <centerappoint v-if="current=='appoint'"></centerappoint>

          <!--我的评价-->
          <centercomment v-if="current=='comment'"></centercomment>

          <!--我的余额-->
          <centerwalletbalance v-if="current=='walletbalance'"></centerwalletbalance>

          <!--提现记录-->
          <centerwalletcashout v-if="current=='walletcashout'"></centerwalletcashout>

          <!--收入记录-->
          <centerwalletincome v-if="current=='walletincome'"></centerwalletincome>

          <!--我的消息-->
          <centermessage v-if="current=='message'"></centermessage>

          <!--帐号安全-->
          <centersecurity v-if="current=='security'"></centersecurity>

          <!--学生端我的需求-->
          <centerneed v-if="current=='need'"></centerneed>

          <!--学生端我的订单-->
          <centerorder v-if="current=='order'"></centerorder>

          <!--学生端我的收藏-->
          <centerstudentcollection v-if="current=='studentcollection'"></centerstudentcollection>


          <el-dialog title="匿名提交: " :visible.sync="adviceDialogVisible">

            <el-input type="textarea" v-model="form.content" rows="5"></el-input>

            <div slot="footer" class="dialog-footer">
              <el-button @click="adviceDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="handleAddAdvice()">确定</el-button>
            </div>
          </el-dialog>


        </div>
      </div>
    </div>
    <footer2></footer2>
  </div>
</template>

<script>

  import cookieUtil from 'js-cookie'

  import top from '@/views/top'

  import footer2 from '@/views/footer'

  import centerbaseinformation from '@/views/teacher/centerbaseinformation'

  import centertutorinformation from '@/views/teacher/centertutorinformation'

  import centerauthinformation from '@/views/teacher/centerauthinformation'

  import centerappoint from '@/views/teacher/centerappoint'

  import centercomment from '@/views/teacher/centercomment'

  import centerwalletbalance from '@/views/teacher/centerwalletbalance'

  import centerwalletcashout from '@/views/teacher/centerwalletcashout'

  import centerwalletincome from '@/views/teacher/centerwalletincome'

  import centermessage from '@/views/teacher/centermessage'

  import centersecurity from '@/views/teacher/centersecurity'

  import centerneed from '@/views/teacher/centerneed'

  import centerorder from '@/views/teacher/centerorder'

  import centerstudentcollection from '@/views/teacher/centerstudentcollection'

  import * as authAdviceApi from '@/api/system/auth/advice'

  import * as teacherApi from '@/api/business/auth/teacher'

  import * as attachmentApi from '@/api/system/auth/attachment'

  import * as authMessageApi from '@/api/business/auth/message'

  import * as tokenUtils from '@/utils/auth'

  import openWindow from '@/utils/open-window'

export default {
  name: "TeacherCenter",

  props: {  },
  data() {
    return {

      platform: 'student',

      adviceDialogVisible:false,

      form:{
        content: undefined,
      },

      notReadMessage:0,

      teacher:{},

      current:'baseInformation',

    }
  },

  methods: {


    //自定义文件上传逻辑
    fileUpload(file){
      return attachmentApi.save(file)
    },
    //文件上传前的处理
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'|| file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpeg 或 png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //文件上传成功时
    handleSuccess1(response, file, fileList){
      this.teacher.headImage = response.url
      teacherApi.patchMe(this.teacher).then(response=>{
        this.$message({
          message: '头像已更新',
          type: 'success',
          duration: 3000
        })
      }).catch(error=>{

      })
    },


    handleAddAdvice() {
      authAdviceApi.save(this.form).then(response=>{
        this.$message({
          message: '已提交',
          type: 'success',
          duration: 3000
        })
        this.adviceDialogVisible=false;
      }).catch(error=>{})

    },


    countNotReadMessage(){
      authMessageApi.countNotReadMessage().then(response=>{
        this.notReadMessage = response
      }).catch(error=>{

      })
    },

    handleLogout(){
      tokenUtils.removeToken()
      this.$message({
        message: '已注销',
        type: 'success',
        duration: 3000
      })
      this.$router.push({path:'/index'})
      //openWindow('http://tutor-ssologin-web:90/logout', '单点退出测试', 0, 0)
    }

  },
  computed: {  },
  watch: {  },



  components: {
    footer2,
    top,
    centerbaseinformation,
    centertutorinformation,
    centerauthinformation,
    centerappoint,
    centercomment,
    centerwalletbalance,
    centerwalletcashout,
    centerwalletincome,
    centermessage,
    centersecurity,
    centerneed,
    centerorder,
    centerstudentcollection,
  },
  directives: {  },
  filters: {  },

  created(){


    if(!tokenUtils.getToken()){
      this.$message({
        message: '登录信息已过期，请重新登录！',
        type: 'warning',
        duration: 3000
      })
      this.$router.push({path:'/index'})
    }


    this.platform = cookieUtil.get('platform')

    if(this.$route.query.panel){
      this.current = this.$route.query.panel
    }else {
      this.$router.push({query:{panel:'baseInformation'}})
      this.current = 'baseInformation'
    }

    //获取当前用户信息
    teacherApi.getMe().then(resopnse=>{
      this.teacher = resopnse
    }).catch(error=>{
      console.log(error);
    })

    this.countNotReadMessage()

    if(tokenUtils.getToken()){
      setInterval(()=>{
        this.countNotReadMessage()
      },10*1000,)
    }
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
  .userLeft{width:213px;height:auto;overflow:hidden;float:left;border:1px solid #dedede;padding-bottom:20px;background:#fff;min-height: 650px;}
  .userLeft .ones{width:213px;height:auto;background:#f6f6f6;overflow:hidden;padding-bottom:20px;}
  .userLeft .ones .Top{width:213px;height:66px;overflow:hidden;margin-top:20px;margin-bottom:0px;}
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


  .avatar-uploader{
    /*border: 1px dashed #d9d9d9;*/
    /*border-radius: 6px;*/
    /*cursor: pointer;*/
    /*position: relative;*/
    /*overflow: hidden;*/
    width: 63px;
    height: 63px;
    float: left;
    overflow: hidden;
    margin-left: 10px;
    border-radius: 40px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 63px;
    height: 63px;
    line-height: 63px;
    text-align: center;
  }
  .avatar {
    width: 63px;
    height: 63px;
    float: left;
    overflow: hidden;
    margin-left: 0px;
    border-radius: 40px;
  }
</style>
