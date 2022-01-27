<template>
  <div class>
    <el-input type="text" :value="inputParams" @click="handler"></el-input>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      props: {
        inputParams: {
          type: String,
          default() {
            return ''
          },
        },
        handleInput: {
          type: Function,
          default() {
            return Function
          },
        },
      },
    }
  },
  computed: {},
  watch: {},
  methods: {
    handler() {
      this.handleInput()
    },
  },
  created() {},
  mounted() {},
  updated() {},
}
</script>
<style lang='less' scoped>
</style>