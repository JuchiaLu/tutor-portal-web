<template>
  <div>

    <div class="publicRight">
      <div class="recentDiv successRec">
        <div class="reTypes">
          <span>最新成功记录</span>
        </div>
        <div class="successList">
          <div class="topic">
            芗城区132****789学员，辅导初三物理课程：
          </div>
          <div class="answer">
            很负责人的一个老师！！！！
          </div>
        </div>
      </div>
      <div class="recentDiv teacheRec">
        <div class="reTypes">
          <span>金牌教员</span>
        </div>
        <div class="teacherList">
          <a  class="pic"><img src="@/assets/images/right1.jpg" width="70" height="80" alt="" /></a>
          <a  class="topic">吴老师【在校大学生】</a>
          <div class="shanc">
            擅长：计算机
          </div>
          <!--<div class="money">40元-200元</div>-->
        </div>
      </div>
      <div class="recentDiv aboutRec">
        <div class="reTypes">
          <span>关于</span>
        </div>
        <a href="#" class="abpic"><img src="@/assets/images/right2.jpg" width="265" height="90" alt="" /></a>
        <div class="abintro">
          专业、权威，家长无中介费！颇受家长好评！
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Right",

  props: {  },
  data() {
    return {

    }
  },

  methods: {  },
  computed: {  },
  watch: {  },

  components: {  },
  directives: {  },
  filters: {  },

  created(){  }

}
</script>

<style scoped>

</style>
<style scoped src="@/styles/front/common.css"></style>
<style scoped src="@/styles/front//public.css"></style>
