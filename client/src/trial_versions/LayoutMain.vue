<template>
 <div> 
  <el-menu
    :active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
     <el-menu-item><h1>VetCl</h1></el-menu-item>
     <!-- <router-link to="#login"> -->
       <!-- <el-menu-item index="1" @click="dialogLogIn = true" @changedLI="close">Log In</el-menu-item> -->
       <el-menu-item index="1"><router-link to="login"> Log In</router-link></el-menu-item>

      <!-- </router-link> -->
     <!-- <router-link to="#registration"> -->
       <!-- <el-menu-item index="2" @click="dialogSignUp = true" @changedSU="close" >Sign Up</el-menu-item> -->
      <el-menu-item index="2" ><router-link to="signup">  Sign Up</router-link></el-menu-item> 

       <!-- </router-link> -->

  </el-menu>

  <router-view></router-view>

  
  <!-- <el-dialog v-model="dialogLogIn"  @closed="dialogLogIn=false"  title="Log In">
      <auth></auth>
  </el-dialog>

    <el-dialog v-model="dialogSignUp"  @closed="dialogSignUp=false"  title="Sign Up">
      <register></register>
  </el-dialog> -->

    <!-- <user></user> -->




  </div>
  
</template>

<script>
// import Auth from '../layout/Auth.vue'
// import Register from '../layout/Register.vue'
// import MainUser from '../user/views/MainUser.vue'


// import { defineComponent, ref } from 'vue'

// export default defineComponent({
//   setup() {
//     const activeIndex = ref('1')
//     const activeIndex2 = ref('1')
//     const handleSelect = (key, keyPath) => {
//       console.log(key, keyPath)
//     }
//     return {
//       activeIndex,
//       activeIndex2,
//       handleSelect,
//     }
//   },
// })

export default {
  
  
  // emits:['changedLI', 'changedSU'],
  components:{
      user:MainUser,
      // auth:Auth,
      // register:Register,
  },
  data() {
    return {
        dialogLogIn:false,
        dialogSignUp:false,
        activeIndex:1

    }
  },
  methods:{
      handleSelect(key, keyPath){
          // console.log(key, keyPath)
        //   if()
      },
      // logIn(){
      //   this.$route.push('login')

      // },
      // signUp(){
      //   this.$route.push('signup')
      // },
  },
  // watch:{
  //     dialogLogIn(val){
  //       if(val)
  //       this.$route.path = "/logIn"
  //       else
  //       this.$route.path = "/"

  //        console.log('NN', this.$route.path)
  //         console.log('dialogLogIn', val)
  //         if(val===false){
  //             this.$emit('changedLI')
  //         }
  //     },
  //     dialogSignUp(val){
  //         console.log('dialogSignUp',val)
  //           if(val===false){
  //             this.$emit('changedSU')
  //         }
          
  //     }
  // }
}
</script>
<style scoped>
.el-menu--horizontal{
        justify-content: space-evenly;
}
/* .is-not-active{
        display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 60
px
;
    margin: 0;
    border-bottom: 2
px
 solid transparent;
    color: var(--el-menu-text-color);
} */
</style>
