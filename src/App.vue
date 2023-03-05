<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'app',
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  created () {
    this.i18nHandle(this.$i18n.locale)
  },
  methods: {
    i18nHandle (val, oldVal) {
      util.cookies.set('lang', val)
      document.querySelector('html').setAttribute('lang', val)
    }
  }
}
</script>

<style lang="scss">
.el-card{
  border-radius: 10px !important;
  margin: 10px 0px;
}

.search-form-customized .el-form-item{
  margin-bottom: 0px !important;
}

@import '~@/assets/style/public-class.scss';
</style>
