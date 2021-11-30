<template>
<div class="card  container ">
  <h1 class="center">Clients</h1>
  <hr>
    <form-clients @added="updateInfo"></form-clients>
  <hr>
  <h3><em>List of clients:</em></h3>
<div v-if="clients.length!==0">
    <div  v-for="client in clients" :key="client._id">
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


<hr>
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin')}">Back</el-button>

</div>
    
</template>

<script>
import FormClients from '../forms/FormClients.vue'
import Modal from '../ui/Modal.vue'
import { ElMessage } from 'element-plus'

export default {
  
    components:{
        FormClients,
        Modal
    },
    data(){
        return{
            editId:'',
            modal:false,
            type:'clients',
            clients:[],

        }
    },
    methods:{
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
