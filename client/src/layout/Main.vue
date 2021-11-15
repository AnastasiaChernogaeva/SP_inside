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
        <!-- <router-link to="main" class="el-menu-item" role="menuitem" index="1"  data-v-269c9956=""> Main </router-link> -->

        <router-link to="main"><el-menu-item index="0"> Main </el-menu-item></router-link>
        <router-link to="login"><el-menu-item index="1" v-if="!auth" @click="$route.path=='/login'?true:false"> Log In</el-menu-item></router-link>
        <router-link to="signup"><el-menu-item index="2" v-if="!auth" @click="$route.path=='/signup'?true:false">  Sign Up</el-menu-item>  </router-link> 
     
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
      },
      // route(){
      //   switch(this.$route.path){
      //     case 
      //   }
      // }

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
