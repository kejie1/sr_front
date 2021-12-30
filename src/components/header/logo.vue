<template>
  <div class="logo_container">
    <el-image style="height:60px" :src="logoSrc"></el-image>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      logoSrc: require('@/assets/images/logo.png'),
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  updated() {},
}
</script>
<style lang='less' scoped>
.el-image {
}
</style>