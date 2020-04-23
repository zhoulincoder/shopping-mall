<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="https://s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" @focus="focus" @blur="blur" @input="input" placeholder="搜索商家或地点" />
          <button class="el-button el-button--primary"><i class="el-icon-search" /></button>
          <dl v-if="isHotPlace" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, idx) in $store.state.home.hotPlace.slice(0, 5)" :key="idx">{{ item.name }}</dd>
          </dl>
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item, idx) in searchList" :key="idx">{{ item.name }}</dd>
          </dl>
        </div>
        <p class="suggset">
          <!-- <a href="#">故宫博物院故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a> -->
          <a v-for="(item, idx) in $store.state.home.hotPlace.slice(0, 5)" :key="idx" href="#">{{ item.name }}</a>
        </p>
        <ul class="nav">
          <li><nuxt-link to="/" class="takeout">美团外卖</nuxt-link></li>
          <li><nuxt-link to="/" class="movie">猫眼电影</nuxt-link></li>
          <li><nuxt-link to="/" class="hotel">美团酒店</nuxt-link></li>
          <li><nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link></li>
          <li><nuxt-link to="/" class="business">商家入驻</nuxt-link></li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li><i class="refund" /><p class="txt">随时退</p></li>
          <li><i class="single" /><p class="txt">不满意免单</p></li>
          <li><i class="overdue" /><p class="txt">过期退</p></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      isFocus: false,
      search: '',
      hotPlace: [],
      searchList: []
    }
  },
  computed: {
    isHotPlace () {
      return this.isFocus && !this.search
    },
    isSearchList () {
      return this.isFocus && this.search
    }
  },
  methods: {
    focus () {
      this.isFocus = true
    },
    blur () {
      const _this = this
      // 使得点击热门搜索选项能够实现
      setTimeout(function () {
        _this.isFocus = false
      }, 200)
    },
    // 触发更新hotPlace和searchList
    input: _.debounce(async function () {
      const self = this
      // const city = self.$store.state.geo.position.city.replace('市', '')
      const city = '天津'
      self.searchList = []
      const { data: { top } } = await self.$axios.get('/search/top', {
        params: {
          input: self.search,
          city
        }
      })
      self.searchList = top.slice(0, 10)
    }, 300)
  }
}
</script>

<style>

</style>
