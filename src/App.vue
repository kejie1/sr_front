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
  async created() {
    await this.$store.dispatch("getCollegeList");
    await this.$store.dispatch("getVocationList");
    await this.$store.dispatch("getClassList");
  },
  mounted() {},
  methods: {},
};
</script>
