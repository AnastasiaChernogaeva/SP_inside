<template>
<div class="card  container ">
    <form-services @added="updateInfo"></form-services>
  <hr>
    <div v-if="services.length!==0">
       <div class="flex" v-for="serv in services" :key="serv._id">
            <h3>{{serv.name}}</h3>
            <h4>{{serv.price}}</h4>
            <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(serv._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(serv._id)" circle></el-button>
           </el-row>
      </div>
    </div>
<h2 v-else>NO</h2>
<modal v-if="modal" @closeForm="modal=false" :edit="editId" @closeModal="updateInfo"/>


</div>


    
</template>

<script>
import FormServices from '../forms/FormServices.vue'
import Modal from '../ui/Modal.vue'


export default {
    components:{
      FormServices,
      Modal
    },
    data(){
     return {
      editId:'',
      modal:false,
      type:'services',
      services:[],
    }
    },
    methods:{
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
