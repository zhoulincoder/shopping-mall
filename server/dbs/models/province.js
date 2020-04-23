/*
 * @Author: zhoulin
 * @Date: 2020-04-22 16:15:53
 * @LastEditors: your name
 * @LastEditTime: 2020-04-22 16:22:58
 * @Description: file content
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Province = new Schema({
  id: {
    type: String,
    require: true
  },
  value: {
    type: Array,
    require: true
  }
})

export default mongoose.model('Province', Province)
