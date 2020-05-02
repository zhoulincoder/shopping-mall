/*
 * @Author: zhoulin
 * @Date: 2020-05-01 09:28:04
 * @LastEditors: your name
 * @LastEditTime: 2020-05-01 09:30:56
 * @Description: file content
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Cart = new Schema({
  id: {
    type: String,
    require: true
  },
  detail: {
    type: Array,
    require: true
  },
  cartNo: { // 购物车id
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
  }
})

export default mongoose.model('Cart', Cart)
