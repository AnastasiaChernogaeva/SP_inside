<template>
<div>
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
    <div v-if="services.length!==0">
    <div v-for="service in services" :key="service.id">
         <div v-for="service in services" :key="service.id">
        <h1>{{service.name}}</h1>
        <h4>{{service.country}}, {{service.city}}</h4>
        <ul><li>{{service.services}}</li></ul>
        <p>{{service.doctors}}</p>
        <img :src="service.photo" alt="service">
        <p>{{service.description}}</p>

        
        </div>{{service}}</div>
</div>
<h2 v-else>NO</h2>
</div>


    
</template>

<script>
import { ElLoading } from 'element-plus'

export default {
    data(){
     return { 
      type:'services',
    //   services:[],

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
        return{
          
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
    //     if(this.message){
    //        this.login = {
    //           username: '',
    //           password:'',
    //           role: 'USER',
    //        }
    //     }
    //     else{
    //     if(this.$store.state.auth.role==="DOCTOR"){
    //       this.$router.push('/main_doc')
    //     }
    //     else if(this.$store.state.auth.role==="ADMIN"){
    //       this.$router.push('/main_admin')
    //     }
    //     else if(this.$store.state.auth.role==="USER"){
    //       this.$router.push('/main/users')
    //     }
    //     }
        this.resetForm('service')
        loading.close()
      }, 2000)
    },
    },
    async beforeMount() {
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.services = info
    },
    computed:{
        services(){
            if(this.$store.state.services)
            return this.$store.state.services
            else
            return []
        }
    }
}
</script>
