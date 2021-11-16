<template>
<div class="container card">
<div class="flex-container">
  <h3>{{activeUser}}</h3>
  <el-button type="danger" @click="logout">Log out</el-button>
</div>
<div class="center gr-button">
  <!-- <el-button-group class="gr-button"> -->
   <el-button type="info" class="myButton">Clinics</el-button>
   <el-button type="info" class="myButton">Doctors</el-button>
   <el-button type="info" class="myButton">Services</el-button>
   <el-button type="info" class="myButton">Cities</el-button>
  <!-- </el-button-group> -->
  
  <!-- <el-button-group class="gr-button"> -->
   <el-button type="info" class="myButton">WorkingTime</el-button>
   <el-button type="info" class="myButton">Pets</el-button>
   <el-button type="info" class="myButton">Users</el-button>
   <el-button type="info" class="myButton">Treatments</el-button>
   <el-button type="info" class="myButton">ShopGoods</el-button>

  <!-- </el-button-group> -->

</div>
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
    /* text-decoration: left; */
    /* letter-spacing: 3px; */
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
  /* text-align: center; */
  display:flex;
  flex-direction: column;
  margin-top:2%;
  margin-bottom: 2%;
}
</style>
