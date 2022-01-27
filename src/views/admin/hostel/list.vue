<template>
  <div class>
    <search-input :inputParams="inputContent" :handleInput="handleInput"></search-input>
  </div>
</template>

<script>
import searchInput from '../../../components/search/searchInput.vue'
export default {
  name: 'hotel',
  components: { searchInput },
  data() {
    return {
      inputContent: 'aaa',
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