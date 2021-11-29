<template>
<div v-if="clients.length!==0">
    <div class="flex" v-for="client in clients" :key="client.id">
         <div v-for="client in clients" :key="client.id">
        <h1>{{client.name}}</h1>
        <h4>{{client.country}}, {{client.city}}</h4>
        <ul><li>{{client.services}}</li></ul>
        <p>{{client.doctors}}</p>
        <img :src="client.photo" alt="client">
        <p>{{client.description}}</p>
        <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(client._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(client._id)" circle></el-button>
        </el-row>

        
        </div>{{client}}</div>
</div>
<h2 v-else>NO</h2>
    
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
    data(){
        return{
            type:'clients',
            clients:[],

        }
    },
    methods:{
    async updateInfo(){
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.clients = info
    },
    async deleteInfo(id){
      await this.$store.dispatch('info/deleteItem', {type:this.type, id:id}, {root:true,})
      this.updateInfo()
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
        this.$store.commit('info/deleteError',{root:true})
       }, 2025)
      }
    }
  },
  computed:{
    message(){
      return this.$store.state.info.error
    },
  },
    beforeMount() {
        this.updateInfo()
    },
}
</script>
