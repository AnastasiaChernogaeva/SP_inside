<template>
<div class="card  container ">
  <h1 class="center" name="Top">Doctors</h1>  
    <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin')}">Back</el-button>
    <el-button class="icon" :type="addNewOne?'danger':'success'" @click="addNewOne=!addNewOne" :icon="addNewOne?'el-icon-minus':'el-icon-plus'"></el-button>
    <el-button class="icon" :type="search?'danger':'success'" @click="changeSearch" :icon="search?'el-icon-close':'el-icon-search'"></el-button>
   <hr>
    <form-doctors v-if="addNewOne" @added="updateInfo"></form-doctors>
    <filter-doctors v-if="search" :info="docotors" @filtered="(info)=>checkIt(info)"></filter-doctors>
  <!-- <hr> -->
  <h3><em>List of doctors:</em></h3>
<div v-if="doctors.length!==0">
    <div class="border container" v-for="doctor in doctors" :key="doctor._id">
        <h3>{{doctor.name}} {{doctor.surname}}</h3>
        <h4>{{doctor.post}}</h4>
        <ul v-if="doctor.appointments.length!==0"><li v-for="(appointment, idx) in doctor.appointments" :key="idx*Math.random()">{{appointment}}</li></ul>
        <p><em>Phone:</em>{{doctor.phone}}</p>
        <el-avatar :src="doctor.photo"></el-avatar>

        <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(doctor._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(doctor._id)" circle></el-button>
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
import FormDoctors from '../forms/FormDoctors.vue'
import FilterDoctors from '../filters/FilterDoctors.vue'

import Modal from '../ui/Modal.vue'

export default {
    components:{
        FormDoctors,
        FilterDoctors,
        Modal
    },
    data(){
        return{
            addNewOne:false,
            search:false,
            searchedDoctors:[],

            editId:'',
            modal:false,
            type:'doctors',
            doctors:[],

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
        this.searchedDoctors=info.info
    },  
    edited(){
      // console.log('inside the doctors')
      this.modal=false
      this.updateInfo()
      },
    async updateInfo(){
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.doctors = info
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
