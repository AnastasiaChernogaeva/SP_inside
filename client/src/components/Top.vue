<template>
 <el-menu
    :active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >

        <el-menu-item index="1"><router-link to="login"> Log In</router-link></el-menu-item>
        <el-menu-item index="2"><router-link to="signup">  Sign Up</router-link></el-menu-item> 


  </el-menu>  
</template>

<script>
export default {
 
}
</script>

