<!--
 * @Author: zhoulin
 * @Date: 2020-04-30 20:16:22
 * @LastEditors: your name
 * @LastEditTime: 2020-05-01 09:25:16
 * @Description: file content
 -->
<template>
  <el-table :data="cartData" style="width: 980px">
    <el-table-column label="项目" prop="name" width="532" />
    <el-table-column label="单价" prop="price" width="132" />
    <el-table-column label="数量" width="212">
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.count" :min="0" />
      </template>
    </el-table-column>
    <el-table-column label="总价">
      <template slot-scope="scope">
        <div class="">
          <!-- 是会回写cartData中的值 -->
          {{ scope.row.price * scope.row.count }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    cartData: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

 <style>

 </style>
