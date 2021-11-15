<template>
<div>
 <div class="container">   
   <h1 class="label">VetCl</h1>
  <el-menu  
    :default-active="activeIndex" 
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
  <!-- @click="closeInfo@click="closeInfo@click="showInfo" -->
        <el-menu-item index="0"><router-link to="main"> Main </router-link></el-menu-item>
        <el-menu-item index="1" v-if="!auth" ><router-link to="login"> Log In</router-link></el-menu-item>
        <el-menu-item index="2" v-if="!auth" ><router-link to="signup">  Sign Up</router-link></el-menu-item>   
     
        <el-menu-item index="1" v-if="auth" @click="logout"> Log Out</el-menu-item>
  </el-menu>  
  </div>
  <hr>
  <router-view class="card container" v-if="!info"></router-view>
  <mainInfo v-if="info"></mainInfo>
</div>  
</template>


<script>
import Info from '../views/Info'
import { ElMessage } from 'element-plus'

export default {
  components:{
    mainInfo:Info,
  },
  data() {
    return {
      // info:true,
      // activeIndex:'0',
    }
  },
  methods:{
      handleSelect(key, keyPath){
      },
      logout(){
        this.$store.commit('auth/logout',{root:true})
      },
      open(){
        ElMessage({
        showClose: true,
        message: this.message,
        type: 'error',
      })
      }
  },
  watch:{
    message(){
      if(this.message!=''){
        setTimeout(()=>{
        this.open()
        this.$store.commit('auth/deleteError',{root:true})
       }, 2025)
      }
    }
  },
  computed:{
    auth(){
      return this.$store.state.auth.role==="USER"?true:false
    },
    message(){
      return this.$store.state.auth.error
    },
    info(){
      if(this.$route.path == '/main' || this.$route.path == '/' ){
        return true
      }
      else{
        return false
      }
    },
    activeIndex(){
      switch(this.$route.path){
        case '/':
          return '0'
          break
        case '/main':
          return '0'
          break

        case '/login':
          return '1'
          break
        
        case '/signup':
          return '2'
          break

      }
      }

    }
  // },
  
}
</script>
<style scoped>
.el-menu--horizontal{
        /* justify-content: space-evenly; */
        justify-content: flex-end;
        border-bottom:none;

}
.label{
    position: absolute;
    z-index: 5;
    top: -1%;
  /* display: inline; */
  /* flex-direction: row;s */
}
/* .container{
  padding: 5%;
} */
</style>
