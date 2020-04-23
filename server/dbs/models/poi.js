/*
 * @Author: zhoulin
 * @Date: 2020-04-23 08:02:03
 * @LastEditors: your name
 * @LastEditTime: 2020-04-23 08:05:27
 * @Description: file content
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Poi = new Schema({
  name: { // 景点名
    type: String
  },
  province: { // 省
    type: String
  },
  city: { // 市
    type: String
  },
  country: { // 区县
    type: String
  },
  areaCode: { // 区号
    type: String
  },
  tel: { // 电话
    type: String
  },
  area: { // 商圈
    type: String
  },
  addr: { // 地址
    type: String
  },
  type: { // 类型
    type: String
  },
  module: { // 子分类
    type: String
  },
  longitude: { // 经度
    type: Number
  },
  latitude: { // 维度
    type: Number
  }
})

export default mongoose.model('Poi', Poi)
