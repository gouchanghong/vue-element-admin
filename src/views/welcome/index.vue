<template>
  <div class="container">
    <div class="el-row up" style="height: 60%;">&nbsp;
    </div>
    <div class="el-row down" style="height: 40%;">&nbsp;
    </div>
  </div>
</template>
<script>

import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
export default {
  name: 'Welcome',
  components: { LangSelect, SocialSign },
  data() {
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  mounted() {
    // this.refreshCode()
  },
  methods: {
    handleLogin() {
      this.$router.push({ path: this.redirect || '/' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
