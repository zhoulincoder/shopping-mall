<!--
 * @Author: zhoulin
 * @Date: 2020-04-24 14:51:51
 * @LastEditors: your name
 * @LastEditTime: 2020-04-25 11:07:27
 * @Description: file content
 -->
<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <span class="name">直接搜索：</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      @select="handleSelect"
      placeholder="请输入城市中文或拼音"
    />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data: () => {
    return {
      province: [], // 全国省份直辖市
      pvalue: '', // 选择的省份
      cvalue: '', // 选择的城市
      city: [], // 选择省份的对应下级城市
      cities: [], // 全国城市列表
      input: ''
    }
  },
  watch: {
    async pvalue (newPvalue) {
      const self = this
      // 根据省份查城市的接口可以换腾讯位置服务
      // 如果是特别行政区是没有下级城市的
      if (newPvalue !== '810000' && newPvalue !== '820000') {
        const { status, data: { city } } = await self.$axios.get(`/geo/province/${newPvalue}`)
        if (status === 200) {
          self.city = city.map((item) => {
            return {
              value: item.id,
              label: item.name
            }
          })
          self.cvalue = ''
        }
      } else {
        self.city = []
      }
    }
  },
  async mounted () {
    const self = this
    const { status, data: { province } } = await self.$axios.get('/geo/province')
    if (status === 200) {
      self.province = province.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function (query, cb) {
      const self = this
      if (self.cities.length) {
        cb(self.cities.filter(item => item.value.includes(query)))
      } else {
        const { status, data: { city } } = await self.$axios.get('/geo/city')
        if (status === 200) {
          self.cities = city.map((item) => {
            return { value: item.name }
          })
          cb(self.city.filter(item => item.value.includes(query) > -1))
        } else {
          cb()
        }
      }
    }, 200),
    handleSelect (item) {
      // log item.value
    }
  }
}
</script>

 <style lang="scss">
 @import "@/assets/css/changeCity/iselect.scss"

 </style>
