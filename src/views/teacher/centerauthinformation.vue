<template>
  <div>
    <div class="user_right">
      <div class="usernav_title">
        <span :class="{hover:current==='personAuth'}" @click="current='personAuth'"><a>实名认证</a></span>
        <span :class="{hover:current==='studentAuth'}" @click="current='studentAuth'"><a>大学生认证</a></span>
        <span :class="{hover:current==='teacherAuth'}" @click="current='teacherAuth'"><a>在职教师认证</a></span>
      </div>
      <dl class="userdl">
        <dd class="usertishi">添加认证信息能增加你的预约成功率哦</dd>
      </dl>
      <!--设置个人信息-->
      <form name="moduser" action="" method="post" v-if="current==='personAuth'">
        <table width="90%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin:15px auto;">
          <tbody>

          <tr height="40">
            <td width="94" align="right" valign="middle">审核状态：</td>
            <td align="left">
              <div  v-if="form1.state===1"><span style="color: #164ebc">审核中</span></div>
              <div  v-if="form1.state===2"><span style="color: #ff1b0c">审核失败</span></div>
              <div  v-if="form1.state===3" ><span style="color: #0ea443">审核通过</span></div>
            </td>
          </tr>

          <tr height="40" v-if="form1.state===2&&form1.reason">
            <td width="94" align="right" valign="middle">失败原因：</td>
            <td align="left"><i style="color: #ff1b0c">{{form1.reason}}</i></td>
          </tr>

          <tr height="40">
            <td width="94" align="right" valign="middle">真实姓名：</td>
            <td align="left"><input type="text" v-model="form1.realname" class="mtext"></td>
          </tr>
          <tr height="40">
            <td width="94" align="right" valign="middle">身份证号：</td>
            <td align="left"><input type="text" v-model="form1.idNumber" class="mtext"></td>
          </tr>

          <tr height="40">
          <td width="94" align="right" valign="middle">身份证正反面：</td>
          <td align="left">
            <el-upload
              action
              multiple
              accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG,"
              :auto-upload="true"
              list-type="picture-card"
              :limit="2"
              ref="upload1"
              :file-list="fileList1"
              :before-remove="handleRemove1"
              :on-exceed="handleExceed1"
              :on-success="handleSuccess1"
              :before-upload="beforeUpload"
              :http-request="fileUpload">
              <i class="el-icon-plus"></i>
            </el-upload>
          </td>
          </tr>
          <tr height="40">
            <td width="74" align="right" valign="middle">&nbsp;</td>
            <td align="left"><input type="button" value="保存" class="ctrls save_info_btn" @click="handleSave1"></td>
          </tr>
          </tbody></table>
        <!--结束-->
      </form>

      <form name="moduser" action="" method="post" v-if="current==='studentAuth'">
        <table width="90%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin:15px auto;">
          <tbody>

          <tr height="40">
            <td width="94" align="right" valign="middle">审核状态：</td>
            <td align="left">
              <div  v-if="form2.state===1"><span style="color: #164ebc">审核中</span></div>
              <div  v-if="form2.state===2"><span style="color: #ff1b0c">审核失败</span></div>
              <div  v-if="form2.state===3" ><span style="color: #0ea443">审核通过</span></div>
            </td>
          </tr>

          <tr height="40" v-if="form2.state===2&&form2.reason">
            <td width="94" align="right" valign="middle">失败原因：</td>
            <td align="left"><i style="color: #ff1b0c">{{form2.reason}}</i></td>
          </tr>

          <tr height="40">
            <td width="94" align="right" valign="middle">真实姓名：</td>
            <td align="left"><input type="text" v-model="form2.realname" class="mtext"></td>
          </tr>
          <tr height="40">
            <td width="94" align="right" valign="middle">所在院校：</td>
            <td align="left"><input type="text" v-model="form2.school" class="mtext"></td>
          </tr>

          <tr height="40">
            <td width="94" align="right" valign="middle">学生证照片：</td>
            <td align="left">
              <el-upload
                action
                multiple
                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG,"
                :auto-upload="true"
                list-type="picture"
                :limit="5"
                ref="upload2"
                :file-list="fileList2"
                :before-remove="handleRemove2"
                :on-exceed="handleExceed2"
                :on-success="handleSuccess2"
                :before-upload="beforeUpload"
                :http-request="fileUpload">
                <el-button size="small" type="primary">点击添加 ( 二到五张 ) </el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </td>
          </tr>

          <tr height="40">
            <td width="74" align="right" valign="middle">&nbsp;</td>
            <td align="left"><input type="button" value="保存" class="ctrls save_info_btn" @click="handleSave2"></td>
          </tr>
          </tbody></table>
        <!--结束-->
      </form>

      <form name="moduser" action="" method="post" v-if="current==='teacherAuth'">
        <table width="90%" border="0" cellspacing="0" cellpadding="0" align="center" style="margin:15px auto;">
          <tbody>

          <tr height="40">
            <td width="94" align="right" valign="middle">审核状态：</td>
            <td align="left">
              <div  v-if="form3.state===1"><span style="color: #164ebc">审核中</span></div>
              <div  v-if="form3.state===2"><span style="color: #ff1b0c">审核失败</span></div>
              <div  v-if="form3.state===3" ><span style="color: #0ea443">审核通过</span></div>
            </td>

          </tr>

          <tr height="40" v-if="form3.state===2&&form3.reason">
            <td width="94" align="right" valign="middle">失败原因：</td>
            <td align="left"><i style="color: #ff1b0c">{{form3.reason}}</i></td>
          </tr>


          <tr height="40">
            <td width="94" align="right" valign="middle">真实姓名：</td>
            <td align="left"><input type="text" v-model="form3.realname" class="mtext"></td>
          </tr>
          <tr height="40">
            <td width="94" align="right" valign="middle">所在院校：</td>
            <td align="left"><input type="text" v-model="form3.school" class="mtext"></td>
          </tr>

          <tr height="40">
            <td width="94" align="right" valign="middle">教师资格证：</td>
            <td align="left">
              <el-upload
                action
                multiple
                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG,"
                :auto-upload="true"
                list-type="picture"
                :limit="5"
                ref="upload3"
                :file-list="fileList3"
                :before-remove="handleRemove3"
                :on-exceed="handleExceed3"
                :on-success="handleSuccess3"
                :before-upload="beforeUpload"
                :http-request="fileUpload">
                <el-button size="small" type="primary">点击添加 ( 二到五张 ) </el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </td>
          </tr>

          <tr height="40">
            <td width="74" align="right" valign="middle">&nbsp;</td>
            <td align="left"><input type="button" value="保存" class="ctrls save_info_btn" @click="handleSave3"></td>
          </tr>
          </tbody></table>
        <!--结束-->
      </form>
    </div>


  </div>
</template>

<script>

  import * as attachmentApi from '@/api/system/auth/attachment'

  import * as realnameAuthApi from '@/api/business/auth/realnameAuth'

  import * as studentAuthApi from '@/api/business/auth/studentAuth'

  import * as teacherAuthApi from '@/api/business/auth/teacherAuth'

export default {
  name: "CenterBaseInformation",

  props: {  },
  data() {
    return {

      current:'personAuth',

      //实名认证
      form1: {},
      fileList1:[],//用于显示已经上传成功的列表

      // 大学生认证
      form2:{},
      fileList2:[],

      //在职教师认证
      form3:{},
      fileList3:[],
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

    //------------------------------------------------

    //点击保存按钮
    handleSave1(){

      if(this.fileList1.length!=2){
        this.$message({
          message: '请上传身份证正反面2张图片',
          type: 'warning',
          duration: 3000
        })
        return
      }

      // 上传文件
      //this.$refs.upload1.submit() //手动上传,会自动调用上传逻辑(这里是异步的)
      this.form1.image1 = this.fileList1[0].url
      this.form1.image2 = this.fileList1[1].url



      realnameAuthApi.putForMe(this.form1).then(response=>{
        this.$message({
          message: '保存成功',
          type: 'success',
          duration: 3000
        })
        this.getRealnameAuth()
      }).catch(error=>{

      })
    },
    //文件超过上传数量时的处理
    handleExceed1(files, fileList){
      this.$message({
        message: '最多上传两张图片',
        type: 'warning',
        duration: 3000
      })
    },
    //文件上传成功时
    handleSuccess1(response, file, fileList){
      file.url = response.url
      file.id = response.id
      this.fileList1 = fileList
    },
    //文件移除时的处理
    handleRemove1(file, fileList){

      this.fileList1 = fileList

      //TODO 删除服务器的图片
      console.log(file);
    },
    //获取我的实名认证
    getRealnameAuth(){
      this.fileList1 = []
      realnameAuthApi.getForMe().then(response=>{
        if(response){
          this.form1 = response
          this.fileList1.push(
            {
              url: this.form1.image1
            },
            {
              url: this.form1.image2
            },
          )
        }

      }).catch(error=>{

      })
    },

  //  ------------------------------------------------

    //点击保存按钮
    handleSave2(){

      console.log(this.fileList2);

      if(this.fileList2.length<2){
        this.$message({
          message: '请上传 2 到 5 张学生证照片',
          type: 'warning',
          duration: 3000
        })
        return
      }
      // 上传文件
      //this.$refs.upload1.submit() //手动上传,会自动调用上传逻辑(这里是异步的)
      try {
        this.form2.image1 = undefined
        this.form2.image2 = undefined
        this.form2.image3 = undefined
        this.form2.image4 = undefined
        this.form2.image5 = undefined

        this.form2.image1 = this.fileList2[0].url
        this.form2.image2 = this.fileList2[1].url
        this.form2.image3 = this.fileList2[2].url
        this.form2.image4 = this.fileList2[3].url
        this.form2.image5 = this.fileList2[4].url
      }catch (e) {

      }
      studentAuthApi.putForMe(this.form2).then(response=>{
        this.$message({
          message: '保存成功',
          type: 'success',
          duration: 3000
        })
        this.getStudentAuth()
      }).catch(error=>{

      })
    },
    //文件超过上传数量时的处理
    handleExceed2(files, fileList){
      this.$message({
        message: '最多上传5张图片',
        type: 'warning',
        duration: 3000
      })
    },
    //文件上传成功时
    handleSuccess2(response, file, fileList){
      file.url = response.url
      file.id = response.id
      this.fileList2 = fileList
    },
    //文件移除时的处理
    handleRemove2(file, fileList){

      this.fileList2 = fileList

      //TODO 删除服务器的图片
      console.log(fileList);
    },
    //获取我的实名认证
    getStudentAuth(){
      this.fileList2 = []
      studentAuthApi.getForMe().then(response=>{
        if(response){
          this.form2 = response
          if(this.form2.image1){
            this.fileList2.push(
              {
                url: this.form2.image1
              },
            )
          }
          if(this.form2.image2){
            this.fileList2.push(
              {
                url: this.form2.image2
              },
            )
          }
          if(this.form2.image3){
            this.fileList2.push(
              {
                url: this.form2.image3
              },
            )
          }
          if(this.form2.image4){
            this.fileList2.push(
              {
                url: this.form2.image4
              },
            )
          }
          if(this.form2.image5){
            this.fileList2.push(
              {
                url: this.form2.image5
              },
            )
          }
        }

      }).catch(error=>{

      })
    },

  //  -------------------------------------------------

    //点击保存按钮
    handleSave3(){

      console.log(this.fileList3);

      if(this.fileList3.length<2){
        this.$message({
          message: '请上传 2 到 5 张教师资格证照片',
          type: 'warning',
          duration: 3000
        })
        return
      }
      // 上传文件
      //this.$refs.upload1.submit() //手动上传,会自动调用上传逻辑(这里是异步的)
      try {
        this.form3.image1 = undefined
        this.form3.image2 = undefined
        this.form3.image3 = undefined
        this.form3.image4 = undefined
        this.form3.image5 = undefined

        this.form3.image1 = this.fileList3[0].url
        this.form3.image2 = this.fileList3[1].url
        this.form3.image3 = this.fileList3[2].url
        this.form3.image4 = this.fileList3[3].url
        this.form3.image5 = this.fileList3[4].url
      }catch (e) {

      }
      teacherAuthApi.putForMe(this.form3).then(response=>{
        this.$message({
          message: '保存成功',
          type: 'success',
          duration: 3000
        })
        this.getTeacherAuth()
      }).catch(error=>{

      })
    },
    //文件超过上传数量时的处理
    handleExceed3(files, fileList){
      this.$message({
        message: '最多上传5张图片',
        type: 'warning',
        duration: 3000
      })
    },
    //文件上传成功时
    handleSuccess3(response, file, fileList){
      file.url = response.url
      file.id = response.id
      this.fileList3 = fileList
    },
    //文件移除时的处理
    handleRemove3(file, fileList){

      this.fileList3 = fileList

      //TODO 删除服务器的图片
      console.log(fileList);
    },
    //获取我的实名认证
    getTeacherAuth(){
      this.fileList3 = []
      teacherAuthApi.getForMe().then(response=>{
        if(response){
          this.form3 = response
          if(this.form3.image1){
            this.fileList3.push(
              {
                url: this.form3.image1
              },
            )
          }
          if(this.form3.image2){
            this.fileList3.push(
              {
                url: this.form3.image2
              },
            )
          }
          if(this.form3.image3){
            this.fileList3.push(
              {
                url: this.form3.image3
              },
            )
          }
          if(this.form3.image4){
            this.fileList3.push(
              {
                url: this.form3.image4
              },
            )
          }
          if(this.form3.image5){
            this.fileList3.push(
              {
                url: this.form3.image5
              },
            )
          }
        }

      }).catch(error=>{

      })
    }


  },
  computed: {  },
  watch: {  },

  components: {  },
  directives: {  },
  filters: {
    authState(value){
      if(value===undefined){
        return ' 未 提 交 '
      }
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
    //获取当前老师的实名认证
    this.getRealnameAuth();
    this.getStudentAuth()
    this.getTeacherAuth()
  }

}
</script>

<style scoped src="@/styles/front/common.css"></style>
<style scoped src="@/styles/front//public.css"></style>
<!--<style scoped src="http://jiajiaowang.com/public/Home/images/favicon.ico"></style>-->
<style scoped src="@/styles/front/appoint.css"></style>
<style scoped>
  /*! CSS Used from: http://jiajiaowang.com/public/Home/css/common.css */
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
  .topDiv .right .user{display:block;float:left;line-height:40px;background:url(http://jiajiaowang.com/public/Home/images/icon-arrow-1.png) no-repeat right center;padding-right:15px;font-size:12px;color:#666;}
  .topDiv .right .user img{position:relative;top:3px;margin-right:8px;}
  .topDiv .right .user:hover{color:#e80000;}
  .headerDiv{width:100%;min-width:1200px;height:105px;clear:both;background:#fff;}
  .headerDiv .header{width:1200px;height:105px;margin:0px auto;}
  .headerDiv .logo{display:block;float:left;width:220px;height:70px;overflow:hidden;margin-top:20px;}
  .headerDiv .tel{float:right;max-width:225px;height:75px;overflow:hidden;margin-top:15px;background:url(http://jiajiaowang.com/public/Home/images/icon-tel.png) no-repeat left 8px;padding-left:45px;color:#666;}
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
  .footerdiv .footer .foot_logo{display:block;border-left:1px solid #1b1b1b;background:url(http://jiajiaowang.com/public/Home/images/logo-foot.png) no-repeat center;}
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
  .footerdiv .foot_list .foot-kf{width:103px;height:33px;background:url(http://jiajiaowang.com/public/Home/images/icon-service.png) no-repeat 12px center;margin:16px auto 0px auto;border-radius:5px;border:1px solid #666;}
  .footerdiv .foot_list .foot-kf a{display:block;width:103px;height:33px;line-height:33px;font-size:14px;padding-left:12px;}
  .footerdiv .foot_list dd:hover a{color:#e80000;}
  .footerdiv .foot_list .foot-kf:hover a{color:#fff;}
  .copyrightDiv{width:100%;height:80px;min-width:1200px;overflow:hidden;clear:both;background:#1b1b1b;}
  .copyrightDiv .copyright{height:80px;line-height:80px;width:1200px;overflow:hidden;margin:0px auto;text-align:center;color:#666;font-size:12px;}
  .copyrightDiv .copyright a{color:#666;}
  /*! CSS Used from: http://jiajiaowang.com/public/Home/css/public.css */
  body{background:#f2f2f2;}
  /*! CSS Used from: http://jiajiaowang.com/public/Home/css/user.css */
  *{margin:0px;padding:0px;font-size:12px;}
  body,div,li,ul,dl,dd,dt,span,b{margin:0px;padding:0px;list-style:none;list-style-type:none;}
  a img{border:none;}
  a{text-decoration:none;margin:0px;padding:0px;}
  body{background:#fff;margin:0px;padding:0px;-webkit-text-size-adjust:none;min-width:1000px;}
  input{margin:0px;padding:0px;}
  input,textarea{outline:none;}
  .inner_mainbox{width:1200px;height:auto;min-height:500px;margin:0 auto;overflow:hidden;}
  .location_now{width:1178px;height:36px;background:url(http://jiajiaowang.com/public/Home/images/icon-map-1.png) no-repeat left center;padding-left:22px;line-height:36px;color:#666;margin:8px auto 6px auto;}
  .location_now a{color:#666;display:inline-block;background:url(http://jiajiaowang.com/public/Home/images/right_arrow.png) no-repeat left center;padding-left:10px;margin-left:8px;font-family:"微软雅黑";}
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
  .userLeft .userNav li{display:block;width:176px;height:30px;line-height:30px;overflow:hidden;background:url(http://jiajiaowang.com/public/Home/images/icon-arrow-9.png) no-repeat left center;}
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


  .el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 300px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
  }

</style>
