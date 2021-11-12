<template>
<div class="container card">
<div class="flex-container">
  <h3>{{activeUser}}</h3>
  <el-button type="danger" @click="logout">Log out</el-button>
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
</style>
