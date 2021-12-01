<template>
<div class="card  container ">
  <h1 class="center">Shopgoods</h1>
  <hr>
    <form-shopgoods @added="updateInfo"></form-shopgoods>
  <hr>
  <h3><em>List of shopgoods:</em></h3>
<div v-if="shopgoods.length!==0">
    <div class="border" v-for="good in shopgoods" :key="good._id">
        <h1>{{good.name}}</h1>
        <h3>{{currency(good.price)}}</h3>
        <!-- <ul><li></li></ul> -->
        <img :src="good.photo" alt="shopgood" v-if="good.photo">
        <p v-else>No photo</p>
        <h3>About the item:</h3>
        <p>{{good.description}}</p>
        <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(good._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(good._id)" circle></el-button>
        </el-row>

        
        </div>
        <!-- {{shopgood}} -->
        </div>
<h2 v-else>NO</h2>
<modal v-if="modal" @closeForm="modal=false" :edit="editId" @closeModal="edited"/>


<hr>
   <el-button type="info" class="myButton" @click="()=>{$router.push('/main_admin')}">Back</el-button>

</div>
    
</template>

<script>
import FormShopgoods from '../forms/FormShopgoods.vue'
import Modal from '../ui/Modal.vue'
import {currency} from '../../use/currency'
import { ElMessage } from 'element-plus'


export default {
    components:{
      FormShopgoods,
      Modal
    },
    data(){
        return{
            editId:'',
            modal:false,
            currency,
            type:'shopgoods',
            shopgoods:[],

        }
    },
    methods:{
    edited(){
      // console.log('inside the shopgoods')
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
<style  scoped>
img{
  width:300px;
  height:auto;
}
</style>
