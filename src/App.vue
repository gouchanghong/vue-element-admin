<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  created: function() {
    // 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      window.localStorage.setItem('userResources', JSON.stringify(this.$store.state.user.resources))
      window.localStorage.setItem('userChildResources', JSON.stringify(this.$store.state.user.childResources))
    })
  }
}

</script>
