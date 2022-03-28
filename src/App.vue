<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    this.$store.dispatch("getCollegeList");
    this.$store.dispatch("getVocationList");
    this.$store.dispatch("getClassList");
  },
  mounted() {},
  methods: {},
};
</script>
