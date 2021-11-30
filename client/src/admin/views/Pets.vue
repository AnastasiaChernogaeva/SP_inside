<template>
<div class="card  container ">
  <h1 class="center">Pets</h1>
  <hr>
    <form-pets @added="updateInfo"></form-pets>
  <hr>
  <h3><em>List of pets:</em></h3>
<div v-if="pets.length!==0">
    <div v-for="pet in pets" :key="pet._id">
        <h1>{{pet.fullname}}</h1>
        <h2>{{pet.nickname}}</h2>

        <!-- <h4>{{pet.dateOfBirth}}, {{pet.dateOfDeath}}</h4> -->
        <ul>
            <!-- <li>{{pet.gender}}</li> -->
            <li>{{pet.kind}}</li>
            <li>{{pet.weight}}</li>
        </ul>
        <p>{{pet.appearance}}</p>
        <img :src="pet.photo" alt="pet">
        <!-- <p>{{pet.description}}</p> -->

        
        <!-- {{pet}} -->

         <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(pet._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(pet._id)" circle></el-button>
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
import FormPets from '../forms/FormPets.vue'
import Modal from '../ui/Modal.vue'
import { ElMessage } from 'element-plus'

export default {
    components:{
      FormPets,
      Modal
    },
    data(){
        return{
            editId:'',
            modal:false,
            type:'pets',
            pets:[],

        }
    },
    methods:{
    edited(){
      // console.log('inside the pets')
      this.modal=false
      this.updateInfo()
      },
    async updateInfo(){
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.pets = info
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
