<template>
  <div>

    <top></top>

    <div class="city_list" style="min-height:400px">
      <dl v-for="(item,index) in areas">
        <dt>{{item.name}}</dt>
        <dd v-for="(item2,index2) in item.children">
          <a @click="setArea(item2)">{{item2.name}}</a>
        </dd>
      </dl>
    </div>

    <footer2></footer2>

  </div>
</template>

<script>

  import cookieUtil from 'js-cookie'

  import top from '@/views/top'

  import footer2 from '@/views/footer'

  import * as areaApi from '@/api/business/front/area'

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
  name: "Area",

  props: {  },
  data() {
    return {
      areas: [],
    }
  },

  methods: {
    setArea(area){
      cookieUtil.set('areaId',area.id)
      cookieUtil.set('areaName',area.name)
      this.$router.go(-1);
      // this.$router.push({path:'/index'})
    },
  },
  computed: {  },
  watch: {  },

  components: {
    top,
    footer2,
  },
  directives: {  },
  filters: {  },

  created(){
    areaApi.list().then(response=>{
      this.areas = array2tree2(response,'id', 'parentId', 'children')
    }).catch(error=>{
      console.log(error);
    })
  }

}
</script>

<style scoped>

  *{margin:0px;padding:0px;font-size:14px;font-family:"Microsoft Yahei";}
  div,dl,dd,dt{margin:0;padding:0;}
  dl,dt,dd{list-style:none;list-style-type:none;}
  a{border:none;text-decoration:none;}
  a{color:#309de0;}
  a:hover,a:active,a:visited{text-decoration:none;}

  .city_list{width:1200px;margin:20px auto;}
  .city_list dl{clear:both;height:28px;line-height:28px;padding:10px 0px;}
  .city_list dl dt{font-weight:bold;padding-right:10px;float:left;overflow:hidden;}
  .city_list dl dd{float:left;}
  .city_list dl dd a{color:#333;margin-right:10px;position:relative;}
  .city_list dl dd  a.enabled{color:#999;cursor:not-allowed;}
</style>
