<template>
  <div>
  </div>
</template>

<script>

  import { setToken } from '@/utils/auth' // set token to cookie
  import * as ssoLoginApi from '@/api/ssoLogin'

export default {
  name: 'SSORedirect',
  data(){
    return{
      form:{
        code: undefined,
        // redirect_uri: 'http://tutor-portal-web:1463/ssoredirect',
        redirect_uri: window.location.origin+'/ssoredirect',
        scope: 'all',
        grant_type: 'authorization_code'
      }
    }
  },

  methods:{
    handleLogin(){
      ssoLoginApi.getAccessTokenByCode(this.form).then(response=>{
        setToken(response.access_token)
        this.$router.push({path:'/center'})
      }).catch(error=>{

      })
    }

  },

  created() {
    this.form.code = this.$route.query.code
    this.handleLogin()
  },
}
</script>

<style>
</style>
