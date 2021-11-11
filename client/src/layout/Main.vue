<template>
 <div> 
  <el-menu
    :active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
     <el-menu-item disabled><h1>VetCl</h1></el-menu-item>
     <el-menu-item index="1"><router-link to="login"> Log In</router-link></el-menu-item>
     <el-menu-item index="2" ><router-link to="signup">  Sign Up</router-link></el-menu-item> 

  </el-menu>

  <router-view></router-view>




  </div>
  
</template>

<script>

export default {
  data() {
    return {
        activeIndex:1

    }
  },
  methods:{
      handleSelect(key, keyPath){
          console.log(key, keyPath)
      },
  },
}
</script>
<style scoped>
.el-menu--horizontal{
        justify-content: space-evenly;
}
</style>
