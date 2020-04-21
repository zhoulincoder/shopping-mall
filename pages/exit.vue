<!--
 * @Author: zhoulin
 * @Date: 2020-04-21 17:08:04
 * @LastEditors: your name
 * @LastEditTime: 2020-04-21 17:11:23
 * @Description: file content
 -->
<template>
  <div />
</template>

<script>
export default {
  layout: 'blank',
  middleware: async (ctx) => {
    // 为什么用中间件退出
    const { status, data } = await ctx.$axios.get('users/exit')
    if (status === 200 && data && data.code === 0) {
      window.location.href = '/'
    }
  }
}
</script>
