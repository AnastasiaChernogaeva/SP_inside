<template>
<div class="container card">
<div class="flex-container">
  <h3>{{$store.state.auth.activeUser}}</h3>
  <el-button type="danger" @click="logout">Log out</el-button>
</div>

<hr>
<div class="center">
  <router-link to="/main_doc/addNewOne" class="el-link" type="success">
      <el-button type="success">
          New Pet
      </el-button>
  </router-link>
  <router-link to="/main_doc/all" class="el-link" type="success">
      <el-button type="success">
        All Cards
      </el-button>
  </router-link>
    
  <!-- <el-button type="danger" @click="close" :disabled="disabled"><router-link class="el-link" type="danger" to="/main"> Close all</router-link></el-button> -->

  <!-- <hr> -->

<!-- 
  <div class="tabs">
      <keep-alive >
        <component  :is="currentTabComponent" :class=[{disabled:disabled},]>  </component>
      </keep-alive>
  </div> -->
</div>
</div>
</template>

<script>
// import NewPet from './views/NewPet.vue'
// import PetInfo from './views/PetInfo.vue'


export default {
//   components:{
//     NewPet,
//     PetInfo,
//   },

  data(){
    return{
      currentTabComponent:"",
      addNewPet:false,
      showAll:false,
      disabled:true,
      activeUser:'',
    }
  },
  computed:{
    activeUser(){
      return this.$store.state.auth.activeUser
    }
  },
  // mounted(){
  //   console.log('hey', this.$store.state.auth.activeUser)
  //   console.log('heyhey', this.activeUser)

  //   // this.activeUser = this.$store.state.auth.activeUser
  // },
  methods:{
    logout(){
        this.$store.commit('auth/logout',{root:true})
    }
  }

//   methods:{
//     // addNewPetFunc(){

//     //   this.addNewPet=!this.addNewPet
//     //   this.showAll=false

//     //   this.currentTabComponent = "NewPet"

//     // console.group("Inside Add New Pet Function!!!")
//     //   console.log("Adding Pet :", this.addNewPet)
//     //   console.log("Show all pets' cards :", this.showAll)
//     // console.groupEnd()

//       this.disabled = false
//     },
//     showAllFunc(){

//       this.showAll=!this.showAll
//       this.addNewPet=false

//       this.currentTabComponent = "PetInfo"


//     // console.group("Inside Show All Function!!!")
//     //   console.log("Adding Pet :", this.addNewPet)
//     //   console.log("Show all pets' cards :", this.showAll)
//     // console.groupEnd()

//       this.disabled = false
//     },

//     close(){
//       if(!this.addNewPet&&!this.showAll){
//         this.disabled = true
//       }
//       else{
//         this.disabled = false
//         this.addNewPet = false
//         this.showAll = false

//     // console.group("CLOSE ALL!!!")
//     //     console.log("Adding Pet :", this.addNewPet)
//     //     console.log("Show all pets' cards  :", this.showAll)
//     // console.groupEnd()
//       }
//     }
//   },

  // mounted() {
  //   this.$store.commit("loadPetCards")
  // },
  
}
</script>

<style scoped>
.center{
  text-align: center;
}
.tabs{
  margin-top:5%;
}

.disabled{
  display:none,
}
.flex-container{
  display: flex;
  justify-content: space-between;
}
</style>