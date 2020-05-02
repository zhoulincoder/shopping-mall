/*
 * @Author: zhoulin
 * @Date: 2020-05-01 09:28:04
 * @LastEditors: your name
 * @LastEditTime: 2020-05-01 19:52:24
 * @Description: file content
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Order = new Schema({
  id: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  time: {
    type: String, // 存储时间有时区概念，换成字符串
    require: true
  },
  total: {
    type: Number,
    require: true
  },
  imgs: {
    type: Array,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  status: {
    type: Number,
    require: true
  }
})

export default mongoose.model('Order', Order)
