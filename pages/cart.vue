<!--
 * @Author: zhoulin
 * @Date: 2020-04-30 20:16:34
 * @LastEditors: your name
 * @LastEditTime: 2020-05-05 09:34:42
 * @Description: file content
 -->
<template>
  <div class="page-cart">
    <el-row>
      <el-col v-if="cart.length" :span="24" class="m-cart">
        <list :cart-data="cart" />
        <p>应付金额：<em class="money">￥{{ total }}</em></p>
        <div class="post">
          <el-button @click="submit" type="primary" class="bt-submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col v-else class="empty">购物车为空</el-col>

    </el-row>
  </div>
</template>

<script>
import List from '@/components/cart/list'
export default {
  components: {
    List
  },
  data () {
    return {
      cart: []
    }
  },
  computed: {
    total () {
      let total = 0
      this.cart.forEach((item) => {
        total += item.price * item.count
      })
      return total
    }
  },
  async asyncData (ctx) {
    const { status, data: { code, data: { name, price } } } = await ctx.$axios.post('/cart/getCart', {
      id: ctx.query.id
    })
    if (status === 200 && code === 0 && name) {
      return {
        cart: [{
          name,
          price,
          count: 1
        }],
        cartNo: ctx.query.id
      }
    }
  },
  methods: {
    async submit () {
      const self = this
      const { status, data: { code } } = await self.$axios.post('/order/createOrder', {
        id: self.cartNo,
        price: self.cart[0].price,
        count: self.cart[0].count
      })
      if (status === 200 && code === 0) {
        window.location.href = '/order'
      } else {
        throw new Error('创建表单失败')
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/cart/index.scss"
</style>
