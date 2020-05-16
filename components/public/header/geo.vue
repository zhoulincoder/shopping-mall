<template>
  <div class="m-geo">
    <!--  -->
    <i class="el-icon-location" />{{ $store.state.geo.position.city }}
    <nuxt-link class="changeCity" to="/changeCity">
      切换城市
    </nuxt-link>
    [广州 杭州 南昌]
  </div>
</template>

<script>
export default {
  created () {
    // const res = sessionStorage.getItem('userCity')
    // const rr = localStorage.getItem('userItem')
    // console.log(rr)
  }

}
</script>

<style scoped lang="css">

</style>
