<template>
<div>
   <el-form
    ref="info"
    :model="info"
    :rules="infoRules"
    label-width="120px"
    class="demo-info"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="info.name"></el-input>
    </el-form-item> 

    <el-form-item label="Surname" prop="surname">
        <el-input v-model="info.surname"></el-input>
    </el-form-item> 
    
    <el-form-item label="Phone number" prop="phone">
      <el-input v-model="info.phone" ></el-input>
    </el-form-item>        
  </el-form>
  <el-form
    v-if="submittedInfo"
    ref="registrate"
    :model="registrate"
    :rules="rules"
    label-width="120px"
    class="demo-registrate animated"
  >
    <el-form-item label="Username" prop="username">
      <el-input v-model="registrate.username"></el-input>
    </el-form-item> 

    <el-form-item label="Password" prop="password">
        <el-input
        v-model="registrate.password"
        type="password"
        autocomplete="off"
      ></el-input>
    </el-form-item>       



    <el-form-item>
      <el-button type="primary" @click="submitForms"
        >Sign up</el-button
      >
      <el-button @click="resetForms">Reset</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { ElLoading } from 'element-plus'
export default {
  data() {
    return { 
      id:'',
      registrate: {
        username: '',
        password:'',
        doctor: false,     
      },
      info:{
          name:'',
          surname:'',
          pets:[],
      },
       infoRules: {
        name: [
          {
            required: true,
            message: 'Please, input name',
            trigger: 'blur',
          },
        ],
        surname: [
          {
            required: true,
            message: 'Please, input surname',
            trigger: 'blur',
          },
        ],
        photo: [
          {
            message: 'Please, input photo',
            trigger: 'blur',
          },
        ],        
        phone: [
          {
            required: true,
            message: 'Please, input phone number',
            trigger: 'blur',
          },
        ],
      },
      rules: {
        username: [
          {
            required: true,
            message: 'Please, input username',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please, input password',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submitForms(){
          this.loading()
          
          this.$refs['info'].validate(async(valid) => {
            if (valid) {
             let response = await this.$store.dispatch('info/addNew', {items:this.info, type:'clients'}, {root:true,})
            console.log(response, '- I am that response')
            
             this.id=response._id
             this.submitForm('registrate')
            }
            else {
              console.log('error submit!!')
              return false
            }  
          })
        

    },
    resetForms(){
      this.$refs['info'].resetFields()
      this.$refs['registrate'].resetFields()

    },
    submitForm(formName) {
      
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading()

          this.$refs['info'].validate((valid) => {
            if (valid) {
                const {username, password} = this.registrate
                this.$store.dispatch('auth/registrate', {username, password, role:this.role, infoId:this.id}, {root:true,})       
            }
            else {
              console.log('error submit!!')
              return false
            }  
          })


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
        if(this.message){
           this.info = {
              name:'',
              surname:'',
              photo:'',
              pets:[],
              phone:'',
           }
           this.registrate = {
              username: '',
              password:'',
              doctor: false,
           }
        }
        else{
           this.$router.push('/main')
        }       
        loading.close()
      }, 2000)
    },
  },
  
  computed:{
      role(){
          return this.registrate.doctor?'DOCTOR':'USER'
      },
      message(){
        return this.$store.state.auth.error
      },
      submittedInfo(){
        if(this.info.name && this.info.surname)
        return true
        else
        return false
      }
  }
}
</script>
<style scoped>
/* @keyframes Motion{

}
.animated{
  animation: Motion 5s ;
} */
</style>