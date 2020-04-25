<!--
 * @Author: zhoulin
 * @Date: 2020-04-25 11:08:20
 * @LastEditors: your name
 * @LastEditTime: 2020-04-25 18:32:37
 * @Description: file content
 -->
<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd :key="item.id" v-for="item in list">{{ item.name === '市辖区' ? item.province : item.name }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  async mounted () {
    const { status, data: { hots } } = await this.$axios.get('/geo/hotCity')
    if (status === 200) {
      this.list = hots
    }
  }
}
</script>

 <style lang="scss">
  @import "@/assets/css/changeCity/hot.scss"
 </style>
