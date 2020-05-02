import Router from 'koa-router'
import md5 from 'crypto-js/md5'
import Order from '../dbs/models/order'
import cart from '../dbs/models/cart'
// import axios from './utils/axios'

const router = new Router({ prefix: '/order' })

router.post('/createOrder', async (ctx) => {
  const { id, price, count } = ctx.request.body
  const time = Date()
  const orderID = md5(Math.random() * 1000 + time).toString()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    const findCart = await cart.findOne({
      cartNo: id
    })
    const order = new Order({
      id: orderID,
      count,
      total: price * count,
      time,
      user: ctx.session.passport.user,
      name: findCart.detail[0].name,
      imgs: findCart.detail[0].imgs,
      status: 0// 待付款
    })
    try {
      const result = await order.save()
      if (result) {
        await findCart.remove() // 删除购物车
        ctx.body = {
          code: 0,
          id: orderID
        }
      } else {
        ctx.body = {
          code: -1
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        msg: e
      }
    }
  }
})

router.post('/getOrders', async (ctx) => {
  // ctx.body = {
  //   code: 0,
  //   msg: 'ok'
  // }
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: 'please login'
    }
  } else {
    try {
      const result = await Order.find()
      if (result) {
        ctx.body = {
          code: 0,
          list: result
        }
      } else {
        ctx.body = {
          code: -1,
          list: []
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        msg: e
      }
    }
  }
})

export default router
