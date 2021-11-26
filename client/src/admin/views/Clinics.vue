<template>
<div class="card  container ">
  <h1 class="center">Clinics</h1>
  <hr>
    <form-shopgoods @added="updateInfo"></form-shopgoods>
  <hr>
  <h3><em>List of clinics:</em></h3>
<div v-if="clinics.length!==0">
    <div class="flex" v-for="clinic in clinics" :key="clinic._id">
        <h1>{{clinic.name}}</h1>
        <h4>{{clinic.country}}, {{clinic.city}}</h4>
        <ul><li>{{clinic.services}}</li></ul>
        <p>{{clinic.doctors}}</p>
        <img :src="clinic.photo" alt="clinic">
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
import Modal from '../ui/Modal.vue'

export default { 
    components:{
      FormClinics,
      Modal
    },
    data(){
        return{
            editId:'',
            modal:false,
            type:'clinics',
            clinics:[],

        }
    },
    methods:{
    edited(){
      console.log('inside the clinis')
      this.modal=false
      this.updateInfo()
      },
    async updateInfo(){
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.shopgoods = info
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
