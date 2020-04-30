<!--
 * @Author: zhoulin
 * @Date: 2020-04-26 10:09:56
 * @LastEditors: your name
 * @LastEditTime: 2020-04-30 19:35:30
 * @Description: file content
 -->
<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword" />
      <category :type="types" :area="areas" />
      <list :list="list" />
    </el-col>
    <el-col :span="5">
      <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"
      />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/products/crumbs'
import Category from '@/components/products/category'
import List from '@/components/products/list'
import Amap from '@/components/public/map'
export default {
  components: {
    Crumbs,
    Category,
    List,
    Amap
  },
  data () {
    return {
      types: [],
      areas: [],
      keyword: '',
      list: [],
      point: []
    }
  },
  async asyncData (ctx) {
    // console.log('sss')
    const keyword = ctx.query.keyword
    const city = ctx.store.state.geo.position.city
    // const city = '北京'
    const { status, data: { count, pois } } = await ctx.$axios.get('/search/resultsByKeywords', {
      params: {
        keyword,
        city
      }
    })
    const { status: status2, data: { areas, types } } = await ctx.$axios.get('/category/crumbs', {
      params: {
        city
      }
    })
    // console.log(count, areas, types)
    if (status === 200 && count > 0 && status2 === 200) {
      return {
        list: pois.filter(item => item.photos.length).map((item) => {
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random() * 10000), // 评论
            rate: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0]
          }
        }),
        keyword,
        areas: areas.filter(item => item.type !== '').slice(0, 5),
        types: types.filter(item => item.type !== '').slice(0, 5),
        point: (pois.find(item => item.location).location || '').split(',')
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/products/index.scss"
</style>
