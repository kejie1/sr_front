<template>
  <div class>
    <search-input :inputParams="inputParams" :handleInput="handleInput"></search-input>
  </div>
</template>

<script>
import searchInput from '../../../../components/search/searchInput.vue'
export default {
  components: { searchInput },
  data() {
    return {
      inputParams: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleInput() {
      console.log('父组件')
    },
  },
}
</script>
<style lang='less' scoped>
</style>