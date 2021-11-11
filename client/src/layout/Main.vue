<template>
<div class="container">
 <!-- <div >  -->
   <h1 class="label">VetCl</h1>

  <!-- <el-menu
    :active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  > -->
     <!-- <el-menu-item disabled><h1>VetCl</h1></el-menu-item> -->

        <!-- <el-menu-item index="1"><router-link to="login"> Log In</router-link></el-menu-item>
        <el-menu-item index="2"><router-link to="signup">  Sign Up</router-link></el-menu-item>  -->

     
     

     <!-- <el-menu-item index="1" v-if="activeUserRole" @click="logout"> Log Out</el-menu-item> -->


  <!-- </el-menu>   -->
  <!-- </div> -->
  <top/>

  <router-view></router-view>

</div>



  
</template>

<script>
import Top from '../components/Top.vue'

export default {
  components:{
    top:Top,
  },
  data() {
    return {
        // activeUserRole:'',
        activeIndex:1

    }
  },
  methods:{
      handleSelect(key, keyPath){
          console.log(key, keyPath)
      },
      logout(){
        this.$store.commit('auth/logout',{root:true})
      }
  },
  mounted(){
    this.activeUserRole = this.$store.state.auth.role
    console.log(this.activeUserRole)
  }
}
</script>
<style scoped>
.el-menu--horizontal{
        /* justify-content: space-evenly; */
        justify-content: flex-end;

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
