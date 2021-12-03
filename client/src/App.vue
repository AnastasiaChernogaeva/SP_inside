<template>
  <router-view></router-view>  
</template>
<script>
import { ElMessage } from 'element-plus'

export default {
  methods:{
      open(type){
        if(type==='auth'){
           ElMessage({
            showClose: true,
            message: this.messageAuth,
            type: 'error',
          })
        }
        else if(type==='info'){
           ElMessage({
            showClose: true,
            message: this.messageInfo,
            type: 'error',
          })
        }
       
      }
  },
  watch:{
    messageAuth(){
      if(this.messageAuth!==''&&this.messageAuth!=undefined &&this.messageAuth!=null){
        setTimeout(()=>{
        this.open('auth')
        this.$store.commit('auth/deleteError',{root:true})
       }, 2025)
      }
    },
    messageInfo(){
      if(this.messageInfo!==''&&this.messageInfo!=undefined &&this.messageInfo!=null){
        setTimeout(()=>{
        this.open('info')
        this.$store.commit('info/deleteError',{root:true})
       }, 2025)
      }
    }
  },
  computed:{
    messageAuth(){
      return this.$store.state.auth.error
    },    
    messageInfo(){
      return this.$store.state.info.error
    },
   },
      // route(){
      //   switch(this.$route.path){
      //     case 
      //   }
      // }

    }
</script>
<style>
a{
    color:white;
    text-decoration: none;
}
.center{
      text-align: center;
      margin-bottom: 5%;
}
.el-link{
  text-decoration: none;
}
.container {
  margin: 0 auto;
  max-width: 1000px;
}
.card {
  overflow: hidden;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
  background: #fff;
}
.flex{
  display:flex;
  justify-content:space-between
}
.center{
  text-align: center;
}
.icon{
  width:auto;
  height:10px;
}


.modal {
  position: relative;
  /* position: fixed; */
  top: 60px;
  width: 600px;
  padding: 1rem;
  background: #fff;
  z-index: 1000;
  left: 50%;
  border-radius: 10px;
  transform: translateX(-50%);
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
}

.modal-backdrop {
  overflow-y: scroll;

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 100;
}

body {
  font-family: Inter, Roboto, Oxygen, Fira Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  color: #2c3e50;
  /* background: #2c3e50; */
} 
.border{
  padding-bottom: 3%;
  border-bottom:2px lightgrey solid
}
.border:last-child{
border:none;
}

/* .nesti {
  width: 100%;
  height: 100%;
} */

.myButton{
    font-size:18px;
    box-shadow: 0 2px 4px #e9e9eb, 0 0 6px rgb(0 0 0 / 4%);
    margin-bottom:2px;

    /* box-shadow: 0 2px 4px #d1dbe5, 0 0 6px rgb(0 0 0 / 4%); */
    /* --el-button-background-color: #d1dbe5;
    --el-button-border-color: #d1dbe559; */
    --el-button-background-color: #a0c7c7db;
    --el-button-border-color: #b8e3f0;
    --el-button-hover-color: #fd6659;
    --el-button-active-font-color: #fd6659;;
    --el-button-active-background-color: #fd6659;;
    --el-button-active-border-color: #fd6659;;
}

/* ul li{
  list-style: none;
} */

</style>
