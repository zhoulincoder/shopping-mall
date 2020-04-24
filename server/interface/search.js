/*
 * @Author: zhoulin
 * @Date: 2020-04-22 19:03:20
 * @LastEditors: your name
 * @LastEditTime: 2020-04-24 09:10:39
 * @Description: file content
 */
import Router from 'koa-router'
// import Poi from '../dbs/models/poi'
import axios from './utils/axios'

const router = new Router({ prefix: '/search' })
// const sign = 'abcdefg'

router.get('/top', async (ctx) => {
  const { status, data: { top } } = await axios.get('http://cp-tools.cn/search/top', {
    params: {
      input: ctx.query.input,
      city: ctx.query.city
      // sign
    }
  })
  ctx.body = {
    top: status === 200 ? top : []
  }
})

router.get('/hotPlace', async (ctx) => {
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  // 如果ctx.store存在，传参city可能要编码

  const { status, data: { result } } = await axios.get('http://cp-tools.cn/search/hotPlace', {
    params: {
      // sign
      // city: encodeURIComponent(city)
      city
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  const { city, keyword } = ctx.query
  const { status, data: { count, pois } } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})

export default router
