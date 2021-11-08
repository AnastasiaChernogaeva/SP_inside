<template>
<div>
  <el-menu
    :default-active="15"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1" :class="{'is-active':false}">Processing Center</el-menu-item>
    <el-menu-item index="3" unique-opened="true" :class="{'is-active':false}"	>Info</el-menu-item>
    <el-menu-item index="4" :class="{'is-active':false}">Orders</el-menu-item>
  </el-menu>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const activeIndex = ref('1')
    const activeIndex2 = ref('1')
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      activeIndex,
      activeIndex2,
      handleSelect,
    }
  },
})
</script>