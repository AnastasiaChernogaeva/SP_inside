<template>
<div class="card  container ">
  <h1 class="center" name="Top">Pets</h1>
    <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin')}">Back</el-button>
    <el-button class="icon" :type="addNewOne?'danger':'success'" @click="addNewOne=!addNewOne" :icon="addNewOne?'el-icon-minus':'el-icon-plus'"></el-button>
    <el-button class="icon" :type="search?'danger':'success'" @click="changeSearch" :icon="search?'el-icon-close':'el-icon-search'"></el-button>
   <hr>
    <form-pets v-if="addNewOne" @added="updateInfo"></form-pets>
    <filter-pets v-if="search" :info="pets" @filtered="(info)=>checkIt(info)"></filter-pets>
  <!-- <hr> -->
  <h3><em>List of pets:</em></h3>
<div v-if="search&&filtered&&search&&searchedPets.length!==0">
    <div class="border container" v-for="pet in searchedPets" :key="pet._id">
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
<div v-else-if="!filtered&&pets.length!==0">
    <div class="border container" v-for="pet in pets" :key="pet._id">
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
   <!-- <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin')}">Back</el-button> -->
   <a href="#Top"><el-button type="info" class="myButton"> Up</el-button></a>

</div>
    
</template>

<script>
import FormPets from '../forms/FormPets.vue'
import FilterPets from '../filters/FilterPets.vue'

import Modal from '../ui/Modal.vue'

export default {
    components:{
      FormPets,
      FilterPets,
      Modal
    },
    data(){
        return{
            addNewOne:false,
            search:false,
            searchedPets:[],

            editId:'',
            modal:false,
            type:'pets',
            pets:[],
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
        this.searchedPets=info.info
    },
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
    },
    beforeMount() {
        this.updateInfo()
    },
}
</script>
