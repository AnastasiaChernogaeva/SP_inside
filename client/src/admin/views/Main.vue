<template>
<div class="container card">
<div class="flex-container">
  <h3>{{activeUser}}</h3>
  <el-button type="danger" @click="logout">Log out</el-button>
</div>
<div class="center gr-button">
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/clinics')}">Clinics</el-button>
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/doctors')}">Doctors</el-button>
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/services')}">Services</el-button>
   <!-- <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/cities')}">Cities</el-button> -->

   <!-- <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/workingtime')}">WorkingTime</el-button> -->
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/pets')}">Pets</el-button>
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/clInfo')}">Clients</el-button>

   <!-- <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/clients')}">Clients</el-button> -->
   <!-- <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/treatments')}">Treatments</el-button> -->
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/shopgoods')}">ShopGoods</el-button>



</div>

<!-- <div class="center gr-button">
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/templ/clinics')}">Clinics</el-button>
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/templ/doctors')}">Doctors</el-button>
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/templ/services')}">Services</el-button>
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/templ/cities')}">Cities</el-button>

   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/templ/working_time')}">WorkingTime</el-button>
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/templ/pets')}">Pets</el-button>
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/templ/users')}">Users</el-button>
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/templ/treatments')}">Treatments</el-button>
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin/templ/shop_goods')}">ShopGoods</el-button>



</div> -->
</div>
</template>

<script>


export default {

  data(){
    return{
      activeUser:localStorage.getItem('activeUser'),
    }
  },
  methods:{
    logout(){
        this.$store.commit('auth/logout',{root:true})
    }
  }
  
}
</script>

<style scoped>
.flex-container{
  display: flex;
  justify-content: space-between;
}
.myButton{
    font-size:18px;
    box-shadow: 0 2px 4px #e9e9eb, 0 0 6px rgb(0 0 0 / 4%);
    margin-bottom:2px;

    /* box-shadow: 0 2px 4px #d1dbe5, 0 0 6px rgb(0 0 0 / 4%); */
    /* --el-button-background-color: #d1dbe5;
    --el-button-border-color: #d1dbe559; */
    --el-button-background-color: #d1dbe5db;
    --el-button-border-color: #d1dbe5;
    --el-button-hover-color: #66b1ff;
    --el-button-active-font-color: #66b1ff;
    --el-button-active-background-color: #409eff;
    --el-button-active-border-color: #3a8ee6;
}
.myButton:first-child{
  margin:0px 0px 2px 10px
}
.gr-button{
  display:flex;
  flex-direction: column;
  margin-top:2%;
  margin-bottom: 2%;
}
</style>
