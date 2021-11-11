<template>
   <el-menu
    :active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >  

     <el-menu-item index="1" v-if="activeUserRole" @click="logout"> Log Out</el-menu-item>


  </el-menu>  
</template>