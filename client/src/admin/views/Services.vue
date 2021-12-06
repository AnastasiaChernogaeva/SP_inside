<template>
<div class="card  container ">
  <h1 class="center" name="Top">Services</h1>
  <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin')}">Back</el-button>
  <el-button class="icon" :type="addNewOne?'danger':'success'" @click="addNewOne=!addNewOne" :icon="addNewOne?'el-icon-minus':'el-icon-plus'"></el-button>
  <el-button class="icon" :type="search?'danger':'success'" @click="changeSearch" :icon="search?'el-icon-close':'el-icon-search'"></el-button>
   <hr>
    <form-services  v-if="addNewOne" @added="updateInfo"></form-services>
    <filter-services v-if="search" :info="services" @filtered="(info)=>checkIt(info)"></filter-services>

  <!-- <hr> -->
  <h3><em>List of services:</em></h3>
    <div v-if="search&&filtered&&search&&searchedServices.length!==0">
       <div class="flex border" v-for="serv in searchedServices" :key="serv._id">
            <h3>{{serv.name}}</h3>
            <h4>{{currency(serv.price)}}</h4>
            <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(serv._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(serv._id)" circle></el-button>
           </el-row>
      </div>
    </div>
    <div v-else-if="!filtered&&services.length!==0">
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
   <!-- <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin')}">Back</el-button> -->
   <a href="#Top"><el-button type="info" class="myButton"> Up</el-button></a>

</div>


    
</template>

<script>
import FormServices from '../forms/FormServices.vue'
import FilterServices from '../filters/FilterServices.vue'

import Modal from '../ui/Modal.vue'
import {currency} from '../../use/currency'




export default {
    components:{
      FormServices,
      FilterServices,
      Modal
    },
    data(){
     return {
      addNewOne:false,
      search:false,
      searchedServices:[],

      editId:'',
      modal:false,
      currency,
      type:'services',
      services:[],
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
        this.searchedServices=info.info
    },
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
