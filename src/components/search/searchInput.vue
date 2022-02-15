<template>
  <div class>
    <el-input type="text" v-model="inputParams" @click="handler"></el-input>
  </div>
</template>

<script>
export default {
  components: {},
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
  data() {
    return {}
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