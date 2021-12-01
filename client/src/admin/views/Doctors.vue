<template>
<div class="card  container ">
  <h1 class="center">Doctors</h1>
  <hr>
    <form-doctors @added="updateInfo"></form-doctors>
  <hr>
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
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin')}">Back</el-button>
</div> 
</template>

<script>
import FormDoctors from '../forms/FormDoctors.vue'
import Modal from '../ui/Modal.vue'
import { ElMessage } from 'element-plus'

export default {
    components:{
        FormDoctors,
        Modal
    },
    data(){
        return{
            editId:'',
            modal:false,
            type:'doctors',
            doctors:[],

        }
    },
    methods:{      
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
