<template>
<div>
 <div class="container"> 
   <h1 class="label">VetCl</h1>
<!-- :active="activeIndex" -->
  <el-menu    
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
     <!-- <el-menu-item disabled><h1>VetCl</h1></el-menu-item> -->

        <el-menu-item index="1" v-if="!auth"><router-link to="login"> Log In</router-link></el-menu-item>
        <el-menu-item index="2" v-if="!auth"><router-link to="signup">  Sign Up</router-link></el-menu-item> 

     
     

     <el-menu-item index="1" v-if="auth" @click="logout"> Log Out</el-menu-item>


  </el-menu>  
  </div>
  <!-- <top/> -->
<hr>
  <router-view class="card container"></router-view>

</div>



  
</template>

<script>
// import Top from '../components/Top.vue'

export default {
  // components:{
  //   top:Top,
  // },
  data() {
    return {
        // activeUserRole:'',
        // activeIndex:1,
        // auth:false,

    }
  },
  methods:{
      handleSelect(key, keyPath){
          // console.log(key, keyPath)
      },
      logout(){
        this.$store.commit('auth/logout',{root:true})
      }
  },
  // mounted(){
  //   if(this.$store.state.auth.role === "USER")
  //   this.auth = true
  //   // console.log(this.activeUserRole)
  // },
  computed:{
    auth(){
      return this.$store.state.auth.role==="USER"?true:false
    }
  }
  
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
