<template>
<div>
  <el-affix :offset="880" position="top" >
    <a href="#Top"><el-button type="primary" class="myButton"> Up</el-button></a>
  </el-affix>
<div class="card  container ">
  <h1 class="center" name="Top" >Clients</h1>
  
    <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin')}">Back</el-button>
    <el-button class="icon" :type="addNewOne?'danger':'success'" @click="addNewOne=!addNewOne" :icon="addNewOne?'el-icon-minus':'el-icon-plus'"></el-button>
    <el-button class="icon" :type="search?'danger':'success'" @click="changeSearch" :icon="search?'el-icon-close':'el-icon-search'"></el-button>
   <hr>
    <form-clients v-if="addNewOne" @added="updateInfo"></form-clients>
    <filter-clients v-if="search" :info="clients" @filtered="(info)=>checkIt(info)"></filter-clients>
    <!-- <form-clients @added="updateInfo"></form-clients> -->
  <!-- <hr> -->
  <h3><em>List of clients:</em></h3>
  <div v-if="search&&filtered&&search&&searchedClients.length!==0">
    <div class="border container" v-for="client in searchedClients" :key="client._id">
        <h3>{{client.name}} {{client.surname}}</h3>
        <ul v-if="client.pets.length!==0"><li v-for="(pet, idx) in clients.pets" :key="idx*Math.random()">{{pet}}</li></ul>
        <ul v-if="client.appointments.length!==0"><li v-for="(appointment, idx) in clients.appointments" :key="idx*Math.random()">{{appointment}}</li></ul>
        <el-avatar :src="client.photo"></el-avatar>
        <!-- <img  alt="client"> -->
        <p><em>Phone:</em>{{client.phone}}</p>
        <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(client._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(client._id)" circle></el-button>
        </el-row>

        
        </div>
</div>
<div v-else-if="!filtered&&clients.length!==0">
    <div class="border container" v-for="client in clients" :key="client._id">
        <h3>{{client.name}} {{client.surname}}</h3>
        <ul v-if="client.pets.length!==0"><li v-for="(pet, idx) in clients.pets" :key="idx*Math.random()">{{pet}}</li></ul>
        <ul v-if="client.appointments.length!==0"><li v-for="(appointment, idx) in clients.appointments" :key="idx*Math.random()">{{appointment}}</li></ul>
        <el-avatar :src="client.photo"></el-avatar>
        <!-- <img  alt="client"> -->
        <p><em>Phone:</em>{{client.phone}}</p>
        <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(client._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(client._id)" circle></el-button>
        </el-row>

        
        </div>
</div>
<h2 v-else>NO</h2>
<modal v-if="modal" @closeForm="modal=false" :edit="editId" @closeModal="edited"/>


<!-- <hr> -->
   <!-- <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin')}">Back</el-button> -->
   <!-- <a href="#Top"><el-button type="info" class="myButton"> Up</el-button></a> -->


</div>
</div>    
</template>

<script>
import FormClients from '../forms/FormClients.vue'
import FilterClients from '../filters/FilterClients.vue'

import Modal from '../ui/Modal.vue'

export default {
  
    components:{
        FormClients,
        FilterClients,
        Modal
    },
    data(){
        return{
            addNewOne:false,
            search:false,
            searchedClients:[],

            editId:'',
            modal:false,
            type:'clients',
            clients:[],
            filtered:false,

        }
    },
    methods:{
    changeSearch(){
      console.log('s', this.search)
   
      this.search=!this.search
      if(this.search===false)
      this.filtered=false
    },
    checkIt(info){
        this.filtered=info.filter!={}?true:false
        this.searchedClients=info.info
    },
    edited(){
      // console.log('inside the clients')
      this.modal=false
      this.updateInfo()
      },
    async updateInfo(){
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.clients = info
    },
    editInfo(id){
      this.modal = true
      this.editId = id
      // console.log('id in edit', id)
    },
    async deleteInfo(id){
      await this.$store.dispatch('info/deleteItem', {type:this.type, id:id}, {root:true,})
      this.updateInfo()
      await this.$store.dispatch('auth/deleteUser', { infoId:id}, {root:true,})
      
    },
    },
    beforeMount() {
        this.updateInfo()
    },
}
</script>
