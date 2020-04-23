/*
 * @Author: zhoulin
 * @Date: 2020-04-22 12:11:45
 * @LastEditors: your name
 * @LastEditTime: 2020-04-23 09:06:20
 * @Description: file content
 */
import Router from 'koa-router'
import Province from '../dbs/models/province'
import axios from './utils/axios'

const router = new Router({ prefix: '/geo' })
const sign = 'abcdefg'
router.get('/getPosition', async (ctx) => {
  const { status, data: { province, city } } = await axios.get('http://cp-tools.cn/geo/getPosition')
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/menu', async (ctx) => {
  // const result = await Menu.findOne()
  // ctx.body = {
  //   menu: result.menu
  // }
  const { status, data: { menu } } = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

router.get('/province', async (ctx) => {
  const province = await Province.find()
  ctx.body = {
    province: province.map((item) => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }
})

export default router
