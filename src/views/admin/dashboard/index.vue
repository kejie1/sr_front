<template>
  <div class="container">
      <div class="title"><h1>新生报到系统后台管理</h1></div>
      <div class="footer">
          <span>
              技术支持：黄川东
          </span>
          <span>联系我们：1950439317@qq.com</span>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style lang='less' scoped>
.container{
    .title{
        display: flex;
        justify-content: center;
        align-items: center;
        h1{
            color: #515c64;
            font-size: 36px;
        }
    }
    .footer{
        position:absolute;
        bottom: 10px;
        right:10px;
        font-size: 14px;
    }
}
</style>
