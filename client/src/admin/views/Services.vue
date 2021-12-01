<template>
<div class="card  container ">
  <h1 class="center">Services</h1>
  <hr>
    <form-services @added="updateInfo"></form-services>
  <hr>
  <h3><em>List of services:</em></h3>
    <div v-if="services.length!==0">
       <div class="flex border" v-for="serv in services" :key="serv._id">
            <h3>{{serv.name}}</h3>
            <h4>{{currency(serv.price)}}</h4>
            <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(serv._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(serv._id)" circle></el-button>
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
import FormServices from '../forms/FormServices.vue'
import Modal from '../ui/Modal.vue'
import {currency} from '../../use/currency'




export default {
    components:{
      FormServices,
      Modal
    },
    data(){
     return {
      editId:'',
      modal:false,
      currency,
      type:'services',
      services:[]
      
    }
    },
    methods:{
    edited(){
      // console.log('inside the services')
      this.modal=false
      this.updateInfo()
      },
    async updateInfo(){
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.services = info
    },
    editInfo(id){
      this.modal = true
      this.editId = id
      // console.log('id in edit', id)
    },
    async deleteInfo(id){
      await this.$store.dispatch('info/deleteItem', {type:this.type, id:id}, {root:true,})
      this.updateInfo()
    },
    },
    beforeMount() {
        this.updateInfo()
    },
}
</script>
