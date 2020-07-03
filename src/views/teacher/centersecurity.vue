<template>
  <div>
    <div class="user_right" >
      <div class="usernav_title">
        <span :class="{hover:current===undefined}"><a @click.prevent="current=undefined;listQuery.current=1;listQuery.type=undefined;getPage()">帐号安全</a></span>
      </div>

      <div class="usercollect" >

        <div class="setting-right-wrap wrap-boxes settings">

          <div class="page-settings">
            <div class="oplog-tip" style="display:none">
              上次登录时间：2019-12-29  12:21:53&nbsp;&nbsp;&nbsp;地点：  <a href="/user/oplog">查看最近操作记录</a>
              <span class="tip-close pull-right js-tip-close">×</span>
            </div>
            <div class="common-title">
              账号绑定 <span class="title-tips">完成<b class="color-red">4/4</b></span>
            </div>
            <div class="line"></div>
            <div class="setting">
              <div class="contentBox">
                <div class="bingd">
                  <div class="itemBox">
                    <div class="left">	<i class="icon-set_email ico36"></i></div>
                    <div class="center">
                      <p><span class="font1">邮箱</span>
                        <span class="font3">
                            </span> <span class="font4">798****73@qq.com

                            </span>
                      </p>
                      <p class="font2">可用邮箱加密码登录，可用邮箱找回密码</p>
                    </div>
                    <div class="right">
                      <a href="javascript:void(0);" class="binding js-bindemail moco-btn moco-btn-normal">操作</a>
                    </div>
                  </div>
                  <div class="itemBox">
                    <div class="left">  <i class="icon-set_phone ico36"></i></div>
                    <div class="center">
                      <p> <span class="font1">手机</span> <span class="font4" id="jsPhone">181******35</span></p>
                      <p class="font2">可用手机号加密码登录，可通过手机号找回密码 <a class="font2" style="text-decoration: underline;" href="http://www.imooc.com/help/detail/78" target="_blank">无法绑定</a></p>
                    </div>
                    <div class="right">
                      <a href="javascript:void(0);" class="change js-operate-phone moco-btn moco-btn-normal" changetype="phone">操作</a>
                      <input type="hidden" id="account" value="181******35">
                    </div>
                  </div>

                  <div class="itemBox">
                    <div class="left">	<i class="icon-set_key ico36"></i></div>
                    <div class="center">
                      <p> <span class="font1">密码</span> 已设置</p>
                      <p class="font2">用于保护账号信息和登录安全</p>
                    </div>
                    <div class="right">
                      <a @click="dialogVisible=true" class="moco-btn moco-btn-normal js-changePWD">修改</a>
                    </div>
                  </div>

                  <div class="itemBox bb0 h380">
                    <div class="left">	<i class="icon-feedback ico36"></i></div>
                    <div class="center">
                      <p class="font1">社交账号</p>
                      <p class="font2">绑定第三方账号，可以直接登录，还可以将内容同步到以下平台，与更多好友分享</p>
                      <div class="accountBox">
                        <div class="inner-i-box">
                          <i class="icon-qq"></i>
                          <p class="mr87 bind-name">QQ</p>
                          <p class="mr87">Dzz</p>
                          <a href="/passport/user/tplogin?tp=qq&amp;bind=1" aria-role="button" hidefocus="true" class="moco-btn-normal rlf-btn-green btn js-bind mr87">解绑</a>
                        </div>
                        <div class="inner-i-box">
                          <i class="icon-weixin"></i>
                          <p class="mr87 bind-name">微信</p>
                          <p class="mr87 red">未绑定</p>
                          <a href="/passport/user/tplogin?tp=weixin&amp;bind=1" aria-role="button" hidefocus="true" class="moco-btn-normal rlf-btn-green btn js-bind mr87">添加绑定</a>
                        </div>
                        <div class="inner-i-box">
                          <i class="icon-weibo"></i>
                          <p class="mr87 bind-name">微博</p>
                          <p class="mr87 red">未绑定</p>
                          <a href="/passport/user/tplogin?tp=weibo&amp;bind=1" aria-role="button" hidefocus="true" class="moco-btn-normal rlf-btn-green btn js-bind mr87">添加绑定</a>

                        </div>

                      </div>
                    </div>
                    <div class="right">	</div>
                    <div class="cb">    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      </div>


    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">

      <el-form label-position="right" :model="form" label-width="120px" :rules="formRules">
        <el-form-item label="新的密码：" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="password2">
          <el-input v-model="form.password2" show-password></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="info"  round size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" round type="primary" @click="changePassword">确 定</el-button>
      </span>
    </el-dialog>

    </div>
</template>

<script>

  import * as authMessageApi from '@/api/business/auth/message'

  import * as authUserApi from '@/api/upms/auth/user'

export default {
  name: "CenterMessage",
  data() {

    const passwordValidator = (rule, value, callback)=>{
      if(value===this.form.password) {
        callback()
      } else {
        callback(new Error('两次密码不一致'))
      }
    }

    return {

      listQuery:{
        current: 1, //当前页
        size: 7, //每页大小

        //以下根据业务需求
        type: undefined,

      },
      //全部条数
      total:0,

      current: undefined,

      messages:[],




      dialogVisible:false,
      form:{

      },
      formRules:{
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
          { required: true,validator:passwordValidator, trigger: 'blur' },
        ],
      },

    }
  },

  methods: {
    getPage(){
      authMessageApi.page(this.listQuery).then(response=>{
        this.messages = response.records
        this.total = parseInt(response.total)
        this.listQuery.current = parseInt(response.current)
      }).catch(error=>{

      })
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

    handleRead(index,message){
      const title = message.type===1?'系统消息':'用户消息'
      this.$alert(message.content, title, {
        confirmButtonText: '确定',
        callback: action => {
          if(message.state===0){
            authMessageApi.readById(message.id).then(response=>{
              this.getPage()
            })
          }
        }
      });
    },

    handleDelete(index,message){
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return authMessageApi.deleteById(message.id)
      }).then(response=>{
        this.$message({
          message: '已删除',
          type: 'success',
          duration: 3000
        })
        this.getPage()
      })
    },

    changePassword(){
      authUserApi.changePassword(this.form).then(response=>{
        this.$message({
          message: '密码修改成功',
          type: 'success',
          duration: 3000
        })
        this.dialogVisible = false
      })
    }

  },
  computed: {  },
  watch: {  },

  components: {  },
  directives: {  },
  filters: {
    state(value){ // 状态 1处理中 2成功 3失败
      if(value===0){
        return '未读'
      }
      if(value===1){
        return '已读'
      }
    },

    type(value){
      if(value===1){
        return '系统'
      }
      if(value===2){
        return '用户'
      }
    },


  },

  created(){
    this.getPage();
  }

}
</script>

<style scoped src="@/styles/front/common.css"></style>
<style scoped src="@/styles/front//public.css"></style>
<style scoped>
  /*! CSS Used from: @/assets/css/common.css */
  *{margin:0px;padding:0px;font-size:14px;font-family:"Microsoft Yahei";}
  div,li,ul,span{margin:0;padding:0;}
  ul,li{list-style:none;list-style-type:none;}
  a{border:none;text-decoration:none;}
  input{margin:0px;padding:0px;outline:none;}
  input:focus{outline:none;}
  a{color:#309de0;}
  a:hover,a:active,a:visited{text-decoration:none;}
  .other{text-align:center;border-bottom:1px solid #ddd;border-top:1px solid #ddd;}
  /*! CSS Used from: @/assets/css/user.css */
  *{margin:0px;padding:0px;font-size:12px;}
  div,li,ul,span{margin:0px;padding:0px;list-style:none;list-style-type:none;}
  a{text-decoration:none;margin:0px;padding:0px;}
  input{margin:0px;padding:0px;}
  input{outline:none;}
  .user_right{width:966px;min-height:600px;overflow:hidden;float:right;border:1px solid #dedede;background:#fff;}
  .usernav_title{width:982px;height:36px;border-bottom:1px solid #dedede;background:#fafafa;}
  .usernav_title span{height:35px;padding:0px 30px;background:#fff;line-height:34px;display:inline-block;border-right:1px solid #dedede;overflow:hidden;position:relative;top:-2px;}
  .usernav_title span a{color:#333;}
  .usernav_title span.hover{height:35px;border-top:3px solid #e80000;top:-1px;color:#e80000;font-size:14px;}
  .usernav_title span.hover a{color:#c00202;}
  .usercollect{width:98%;margin:10px auto 0px auto;overflow:hidden;font-family:"微软雅黑";}
  .paytype{width:98%;height:30px;background:#fe5840;color:#fff;line-height:30px;text-indent:15px;margin:0px auto;}
  .u-amount{width:99%;height:40px;background:#fdf8e4;border:solid 1px #fbedd2;margin:15px auto;line-height:40px;text-indent:15px;color:#bc914c;}
  .u-amount span{font-weight:bold;font-size:15px;color:#e05a41;margin:0 3px 0 3px;}
  .fullred{color:#f00;}
  .rehgeorwd{color:#e05a41;font-size:14px;font-weight:bold;}
  .iwantrechangediv{width:100%;height:auto;overflow:hidden;}
  .onlinsbalance{width:98%;margin:20px auto 0px auto;line-height:30px;clear:both;}
  .cashback_type{width:98%;margin:20px auto 10px auto;height:auto;overflow:hidden;display:block;}
  .cashback_type input{position:relative;top:3px;}
  .cashback_type label{cursor:pointer;}
  .bankno{width:100%;height:auto;overflow:hidden;margin:10px auto;}
  .paytype{width:99%;height:30px;background:#fe5840;color:#fff;line-height:30px;text-indent:15px;margin:0px auto;}
  .onlinesub{width:121px;height:32px;border:none;background:#e55;color:#fff;text-align:center;cursor:pointer;font-weight:bold;font-size:14px;margin:10px 0 0 4px;}
  .usermoneymtext{width:80px;height:25px;border:solid 1px #dcdcdc;border-radius:2px;padding:0 6px;}
  .usermoneymtext:focus,.bankno_text:focus{border:solid 1px #61ade7;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);}
  .bankno_text{width:280px;height:25px;border:solid 1px #dcdcdc;border-radius:2px;padding:0 6px;margin:10px auto 0 0;}
  .rec_amount_ul{width:100%;height:auto;overflow:hidden;}
  .rec_amount_ul li{width:133px;height:50px;float:left;cursor:pointer;text-align:center;line-height:50px;border:1px solid #dedede;margin-right:21px;margin-left:5px;_display:inline;border-radius:2px;margin-top:15px;}
  .rec_amount_ul li.item{font-size:18px;font-family:Arial;}
  .rec_amount_ul li.other{margin-right:0;}
  .otherAmount{width:100px;display:block;height:30px;line-height:30px;border:none;margin:10px auto;}
  .ailpay_rec{width:150px;height:50px;border:solid 1px #dcdcdc;margin:40px auto 5px 5px;float:left;overflow:hidden;line-height:35px;text-indent:10px;vertical-align:middle;background-repeat:no-repeat;background-position:center center;cursor:pointer;border-radius:2px;margin-left:200px;_display:inline;}
  .weixin_rec{width:150px;height:50px;border:solid 1px #dcdcdc;margin:40px auto 5px 30px;float:left;overflow:hidden;line-height:35px;text-indent:10px;vertical-align:middle;background-repeat:no-repeat;background-position:center center;cursor:pointer;border-radius:2px;}


  .el-tag{
    background-color:rgba(64,158,255,.1);
    display:inline-block;
    padding:0 10px;
    height:32px;
    line-height:30px;
    font-size:12px;
    color:#409eff;
    border-radius:4px;
    box-sizing:border-box;
    border:1px solid rgba(64,158,255,.2);
    white-space:nowrap;
  }

  .el-tag--danger {
    background-color: hsla(0,87%,69%,.1);
    border-color: hsla(0,87%,69%,.2);
    color: #f56c6c;}

  .el-tag--success {
    background-color: rgba(103,194,58,.1);
    border-color: rgba(103,194,58,.2);
    color: #67c23a;
  }

  .el-tag--info {
    background-color: hsla(220,4%,58%,.1);
    border-color: hsla(220,4%,58%,.2);
    color: #909399;
  }

  .overLong {
    width:10em;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }


  /*! CSS Used from: Embedded */
  div,input,p{margin:0;padding:0;}
  :focus{outline:0;}
  input{*font-size:100%;border:0;}
  :link,:visited{text-decoration:none;}
  a:link,a:visited{color:#5e5e5e;}
  a:hover{color:#c9394a;}
  a:active{color:#666;}
  a:focus{outline:0;-moz-outline:0;}
  input{outline:0;}
  .color-red{color:#EF1300!important;}
  .cb{clear:both;}
  a:link,a:visited{color:#1c1f21;}
  a:active,a:hover{color:#ec1500;}
  a{outline:0;}
  a:active{star:expression(this.onFocus=this.blur());}
  a,input{outline:0;}
  input::-moz-focus-inner{border:0;}
  .btn{display:inline-block;margin-bottom:0;font-weight:200;text-align:center;vertical-align:middle;touch-action:manipulation;cursor:pointer;text-decoration:none;box-sizing:content-box;background-image:none;border:1px solid transparent;-webkit-appearance:none;white-space:nowrap;outline:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}
  .btn:focus,.btn:hover{color:#fff;text-decoration:none;}
  .btn:active{outline:0;background-image:none;}
  [class^=icon-]{font-family:icomoon;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}
  .icon-set_key:before{content:"\e922";}
  .icon-set_phone:before{content:"\e924";}
  .icon-set_email:before{content:"\e925";}
  .icon-qq:before{content:"\e63b";}
  .icon-weibo:before{content:"\e63c";}
  .icon-weixin:before{content:"\e63e";}
  .icon-feedback:before{content:"\e906";}
  .moco-btn{position:relative;display:inline-block;margin-bottom:0;text-align:center;vertical-align:middle;touch-action:manipulation;text-decoration:none;box-sizing:border-box;background-image:none;border-radius:0;-webkit-appearance:none;white-space:nowrap;outline:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-style:solid;border-width:1px;cursor:pointer;-weibkit-transition:all .3s;-moz-transition:all .3s;transition:all .3s;color:#545c63;background-color:transparent;border-color:#9199a1;opacity:1;padding:7px 16px;font-size:14px;line-height:1.42857143;border-radius:18px;}
  .moco-btn:active{outline:0;background-image:none;}
  .moco-btn:link,.moco-btn:visited{color:#545c63;}
  .moco-btn:hover,.moco-btn:focus,.moco-btn:active{color:#1c1f21;border-color:#545c63;opacity:1;}
  .moco-btn-normal{border-style:solid;border-width:1px;cursor:pointer;-weibkit-transition:all .3s;-moz-transition:all .3s;transition:all .3s;color:#545c63;background-color:transparent;border-color:#9199a1;opacity:1;}
  .moco-btn-normal:link,.moco-btn-normal:visited{color:#545c63;}
  .moco-btn-normal:hover,.moco-btn-normal:focus,.moco-btn-normal:active{color:#1c1f21;border-color:#545c63;opacity:1;}
  input{font-family:'Microsoft YaHei';}
  .pull-right{float:right;}
  .line{height:1px;background-color:#d0d6d9;margin-top:12px;}
  .oplog-tip{line-height:40px;font-size:12px;color:#f56108;background-color:#fff4e5;padding:0 20px;margin-bottom:20px;}
  .oplog-tip a{color:#008cc8;}
  .oplog-tip a:hover{color:#008cc8;}
  .oplog-tip .tip-close{font-size:12px;cursor:pointer;}
  .common-title{line-height:40px;font-size:16px;font-weight:700;}
  .common-title .title-tips{font-size:12px;color:#93999f;margin-left:18px;font-weight:400;}
  .settings-cont .setting-right-wrap{min-height:550px;}
  input{font-family:"Microsoft Yahei","Microsoft Yahei";}
  .common-title{line-height:40px;font-size:16px;font-weight:700;}
  .line{height:1px;background-color:#d0d6d9;margin-top:12px;}
  .setting-right-wrap{padding:0!important;}
  .page-settings .mr87{margin-left:87px;}
  .page-settings .red{color:#f01414;}
  .page-settings .setting .bingd .h380{height:190px!important;}
  .page-settings .setting .bingd .bb0{border-bottom:0!important;}
  .page-settings .setting .bingd .itemBox{height:88px;overflow:hidden;margin:auto;border-bottom:1px solid #d9dde1;}
  .page-settings .setting .bingd .itemBox .left{width:60px;float:left;font-size:36px;color:#d9dde1;line-height:98px;}
  .page-settings .setting .bingd .itemBox p{line-height:24px;font-size:12px;}
  .page-settings .setting .bingd .itemBox .center{padding-top:22px;width:510px;float:left;}
  .page-settings .setting .bingd .itemBox .center .accountBox{width:650px;margin-top:19px;}
  .page-settings .setting .bingd .itemBox .center .accountBox .inner-i-box{width:200px;float:left;margin-right:24px;}
  .page-settings .setting .bingd .itemBox .center .accountBox .inner-i-box .btn{display:block;width:62px;height:22px;color:#07111b;line-height:22px;font-size:12px;border:1px solid #d9dde1;}
  .page-settings .setting .bingd .itemBox .center .accountBox .inner-i-box .bind-name{font-size:16px;font-weight:700;}
  .page-settings .setting .bingd .itemBox .center .accountBox .inner-i-box:last-child{margin-right:0;}
  .page-settings .setting .bingd .itemBox .center .accountBox .icon-qq,.page-settings .setting .bingd .itemBox .center .accountBox .icon-weibo,.page-settings .setting .bingd .itemBox .center .accountBox .icon-weixin{float:left;color:#c8cdd2;width:80px;height:80px;font-size:80px;}
  .page-settings .setting .bingd .itemBox .right{float:right;padding-right:12px;margin-top:28px;}
  .page-settings .setting .bingd .itemBox .right .moco-btn-normal{padding-left:15px;padding-right:15px;}
  .page-settings .setting .bingd .itemBox .font1{color:#2b333b;font-size:16px;font-weight:700;}
  .page-settings .setting .bingd .itemBox .font2{color:#93999f;font-size:14px;}
  .page-settings .setting .bingd .itemBox .font3{color:#2b333b;font-size:14px;}
  .page-settings .setting .bingd .itemBox .font4{color:#f01414;font-size:14px;}
  .moco-btn{margin-right:10px;}
  div,input,p{margin:0;padding:0;}
  /*! CSS Used fontfaces */
  @font-face{font-family:icomoon;src:url(https://www.imooc.com/static/fonts/icomoon/fonts/icomoon.eot?d8493nx);src:url(https://www.imooc.com/static/fonts/icomoon/fonts/icomoon.eot?d8493nx#iefix) format('embedded-opentype'),url(https://www.imooc.com/static/fonts/icomoon/fonts/icomoon.ttf?d8493nx) format('truetype'),url(https://www.imooc.com/static/fonts/icomoon/fonts/icomoon.woff?d8493nx) format('woff'),url(https://www.imooc.com/static/fonts/icomoon/fonts/icomoon.svg?d8493nx#icomoon) format('svg');font-weight:400;font-style:normal;}

  .ico36 {
    font-size: 36px;
  }

</style>
