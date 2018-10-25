<template>
  <split-pane split="vertical" @resize="resize">
    <template slot="paneL">
      <org-tree/>
    </template>
    <template slot="paneR">
      <org-tree/>
    </template>
  </split-pane>
</template>
<script>
import OrgTree from './components/OrgTree'
import splitPane from 'vue-splitpane'

export default {
  name: 'SearchOrg',
  components: { OrgTree, splitPane },
  data() {
    return {}
  },
  methods: {
    resize() {
      console.log('resize')
    }
  }
}
</script>
