<template>
<div class="card  container ">
  <h1 class="center">Clinics</h1>
  <!-- <hr> -->
    <el-button class="icon" :type="addNewOne?'danger':'success'" @click="addNewOne=!addNewOne" :icon="addNewOne?'el-icon-minus':'el-icon-plus'"></el-button>
    <el-button class="icon" :type="search?'danger':'success'" @click="changeSearch" :icon="search?'el-icon-close':'el-icon-search'"></el-button>
    <form-clinics v-if="addNewOne" @added="updateInfo"></form-clinics>
    <filter-clinics v-if="search" :info="clinics" @filtered="(info)=>checkIt(info)"></filter-clinics>
  <hr>
  <h3><em>List of clinics:</em></h3>
  <!-- <p>{{searchedClinics}}</p> -->
<div v-if="search&&filtered&&search&&searchedClinics.length!==0">
    <div class="border" v-for="clinic in searchedClinics" :key="clinic._id">
        <h1>{{clinic.name}}</h1>
        <h4>{{clinic.country}}, {{clinic.city}}</h4>
        
        <h3>Services:</h3>
        <ul v-if="clinic.services.length!==0"><li v-for="serv in clinic.services" :key="serv">{{serv}}</li></ul>
        <p v-else>No</p>

        <h3>Doctors:</h3>
        <ul v-if="clinic.doctors.length!==0"><li v-for="doc in clinic.doctors" :key="doc">{{doc}}</li></ul>
        <p v-else>No</p>
        
        
        <img :src="clinic.photo" alt="clinic">

        <h3>About the clinic:</h3>
        <p>{{clinic.description}}</p>
        <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(clinic._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(clinic._id)" circle></el-button>
        </el-row>
        
        </div>
</div>
<!-- <div v-else-if="!search&&!filtered&&clinics.length!==0"> -->
<div v-else-if="!filtered&&clinics.length!==0">
  
    <div class="border" v-for="clinic in clinics" :key="clinic._id">
        <h1>{{clinic.name}}</h1>
        <h4>{{clinic.country}}, {{clinic.city}}</h4>
        
        <h3>Services:</h3>
        <ul v-if="clinic.services.length!==0"><li v-for="serv in clinic.services" :key="serv">{{serv}}</li></ul>
        <p v-else>No</p>

        <h3>Doctors:</h3>
        <ul v-if="clinic.doctors.length!==0"><li v-for="doc in clinic.doctors" :key="doc">{{doc}}</li></ul>
        <p v-else>No</p>
        
        
        <img :src="clinic.photo" alt="clinic">

        <h3>About the clinic:</h3>
        <p>{{clinic.description}}</p>
        <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(clinic._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(clinic._id)" circle></el-button>
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
import FormClinics from '../forms/FormClinics.vue'
import FilterClinics from '../filters/FilterClinics.vue'

import Modal from '../ui/Modal.vue'


export default { 
    components:{
      FormClinics,
      FilterClinics,
      Modal
    },
    data(){
        return{
            addNewOne:false,
            search:false,
            searchedClinics:[],

            editId:'',
            modal:false,
            type:'clinics',
            clinics:[],
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
      // if(info!=undefined){
      //   this.clinics.forEach(clinic=>{
      //     // console.log(clinic.name)
      //     if(clinic.name.includes(info.name))
      //     !this.searchedClinics.includes(clinic)&&this.searchedClinics.push(clinic)
      //     // this.searchedClinics.includes(clinic)&& this.searchedClinics=[]

      //   })
      //   //  console.log(info)
      // }
      // else{
      //   this.searchedClinics=[]
      // }
        //  console.log(this.clinics)
        this.filtered=info.filter!={}?true:false
        this.searchedClinics=info.info
    },
    edited(){
      // console.log('inside the clinis')
      this.modal=false
      this.updateInfo()
      },
    async updateInfo(){
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.clinics = info
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
<style scoped>

img{

  background:lightblue;
  width:400px;
  height:150px;;
}

</style>
