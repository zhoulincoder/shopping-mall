/*
 * @Author: zhoulin
 * @Date: 2020-04-22 12:11:45
 * @LastEditors: your name
 * @LastEditTime: 2020-05-01 16:47:40
 * @Description: file content
 */
import Router from 'koa-router'
// import Province from '../dbs/models/province'
import axios from './utils/axios'

const router = new Router({ prefix: '/geo' })
const sign = 'abcdefg'
router.get('/getPosition', (ctx) => {
  // const { status, data: { province, city } } = await axios.get('http://cp-tools.cn/geo/getPosition')
  // if (status === 200) {
  //   ctx.body = {
  //     province,
  //     city
  //   }
  // } else {
  //   ctx.body = {
  //     province: '',
  //     city: ''
  //   }
  // }
  ctx.body = {
    province: '',
    city: '北京'
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
  // const province = await Province.find()
  // ctx.body = {
  //   province: province.map((item) => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }
  const { status, data: { province } } = await axios.get('http://cp-tools.cn/geo/province')
  ctx.body = {
    province: status === 200 ? province : []
  }
})

router.get('/province/:id', async (ctx) => {
  const { status, data: { city } } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/city', async (ctx) => {
  const { status, data: { city } } = await axios.get('http://cp-tools.cn/geo/city')
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/hotCity', async (ctx) => {
  const { status, data: { hots } } = await axios.get('http://cp-tools.cn/geo/hotCity')
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
})

export default router
