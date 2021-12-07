<template>
<div>
   <el-menu
    :active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >  

     <el-menu-item index="1" v-if="activeUserRole" @click="logout"> Log Out</el-menu-item>
    

  </el-menu> 
  <el-avatar :icon="UserFilled" @click="myPage"></el-avatar></div>
</template>
<script>
import { UserFilled } from '@element-plus/icons'
</script>