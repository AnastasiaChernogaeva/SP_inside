<template>
<div class="card  container ">
    
    <el-form
    ref="service"
    :model="service"
    :rules="rules"
    label-width="120px"
    class="demo-service"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="service.name"></el-input>
    </el-form-item> 

    <el-form-item label="Price" prop="price">
        <el-input
        v-model="service.price"
        type="price"
      ></el-input>    
    </el-form-item>
  
     <el-form-item>
      <el-button type="primary" @click="submitForm('service')"
        >Save</el-button
      >
      <el-button @click="resetForm('service')">Reset</el-button>
    </el-form-item>
  </el-form>
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



</div>


    
</template>

<script>
import { ElLoading} from 'element-plus'
// import AppModal from '../../ui/AppModal.vue'

export default {
    // components:{
    //   AppModal,
    // },
    data(){
     return {
      // modal:false, 
      type:'services',
      services:[],

      service: {
        name: '',
        price:'',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please, input name of service',
            trigger: 'blur',
          },
        ],
        price: [
          {
            required: true,
            message: 'Please, input price',
            trigger: 'blur',
          },
        ],
      },
    }
    },
    methods:{
      submitForm(formName) {      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading()
          this.$store.dispatch('info/addNew', {items:this.service, type:this.type}, {root:true,})
               
        } else {
          console.log('error submit!!')
          return false
        }        
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    loading(){
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      setTimeout(() => {         
        this.updateInfo()
        this.resetForm('service')
        loading.close()        
      }, 2000)
    },
    async updateInfo(){
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.services = info
    },
    editInfo(id){
      // this.modal = true
      console.log('id in edit', id)

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
