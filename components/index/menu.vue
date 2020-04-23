<template>
  <div class="m-menu">
    <dl @mouseleave="mouseleave" class="nav">
      <dt>全部分类</dt>
      <dd v-for="(item, idx) in $store.state.home.menu" :key="idx" @mouseenter="enter">
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div v-if="kind" @mouseenter="sover" @mouseleave="sout" class="detail">
      <template v-for="(item, idx) in curdetail.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span v-for="v in item.child" :key="v">
          {{ v }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      kind: '',
      timer: '',
      menu: [{
        type: 'food',
        name: '美食',
        child: [{
          title: '美食',
          child: ['代金券', '甜点饮料', '火锅', '自助餐', '小吃快餐']
        }, {
          title: '外卖',
          child: ['美团外卖', '甜料', '烤肉', '西餐', '小吃']
        }]
      }, {
        type: 'takeout',
        name: '外卖',
        child: [{
          title: '外卖',
          child: ['美团外卖', '甜点饮料', '火锅', '自助餐', '小吃快餐']
        }]
      }, {
        type: 'hotel',
        name: '酒店',
        child: [{
          title: '酒店星级',
          child: ['经济型', '高档型', '舒适型', '特色型', '豪华型']
        }]
      }]
    }
  },
  computed: {
    curdetail () {
      return this.$store.state.home.menu.filter(item => item.type === this.kind)[0]
    }
  },
  methods: {
    mouseleave () {
      const _this = this
      _this.timer = setTimeout(function () {
        _this.kind = ''
      }, 150)
    },
    enter (e) {
      this.kind = e.target.querySelector('i').className
      // console.log(this.kind)
    },
    sover () {
      clearInterval(this.timer)
    },
    sout () {
      this.kind = ''
    }
  }
}
</script>

<style>

</style>
