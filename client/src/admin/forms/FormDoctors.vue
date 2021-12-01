<template>
<div>
  <h3><em>{{edit?'Editing':'Adding new one'}}</em></h3>
   <el-form
    ref="doctor"
    :model="doctor"
    :rules="rules"
    label-width="120px"
    class="demo-doctor"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="doctor.name" ></el-input>
    </el-form-item> 
    <el-form-item label="Surname" prop="surname">
      <el-input v-model="doctor.surname" ></el-input>
    </el-form-item> 
    <el-form-item label="Post" prop="post">
      <el-input v-model="doctor.post" ></el-input>
    </el-form-item>  
    <el-form-item label="Phone number" prop="phone">
      <el-input v-model="doctor.phone" ></el-input>
    </el-form-item> 
    <el-form-item v-if="edit">
         <el-button type="primary" @click="editElem('doctor')" 
        >Edit</el-button
      >
      <el-button @click="resetForm('doctor')">Reset</el-button>

    </el-form-item>
  </el-form>  
  <el-form
    v-if="submittedInfo&&!edit"
    ref="registrate"
    :model="registrate"
    :rules="regRules"
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
        >Save</el-button
      >
      <el-button @click="reset">Reset</el-button>

    </el-form-item>
  </el-form>

</div>
  
</template>
<script>
import { ElLoading } from 'element-plus'

export default {
    props:['edit'],
    emits:['added', 'closeNow', 'edited'],
    data(){
     return {
      // focused:false,
      type:'doctors',
      id:'',
      registrate: {
        username: '',
        password:'',
        doctor: true,     
      },
      doctors:[],
      doctor: {
        name: '',
        surname:'',
        post:'',
        phone:'',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please, input name of client',
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
        phone: [
          {
            required: true,
            message: 'Please, input phone number',
            trigger: 'blur',
          },
        ],
        photo: [
          {
            message: 'Please, input url for a photo',
            trigger: 'blur',
          },
        ],
        post:[
          {
            required: true,
            message: 'Please, input post',
            trigger: 'blur',
          },
        ]
      },
       regRules: {
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
    methods:{
        submitForms(){
          this.loading()
          let response 
          
          this.$refs['doctor'].validate(async(valid) => {
            if (valid) {
                response = await this.$store.dispatch('info/addNew', {items:this.doctor, type:'doctors'}, {root:true,})
            
             this.id=response._id
             this.submitForm('registrate')
            }
            else {
              console.log('error submit!!')
              return false
            }  
          })      


    },    
      editElem(formName){ 
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading()
          this.$store.dispatch('info/editElem', {item:this.doctor, id:this.edit, type:this.type}, {root:true,})
        } else {
          console.log('error submit!!')
          return false
        } } )},

      submitForm(formName) {      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading()
          const {username, password} = this.registrate
          this.$store.dispatch('auth/registrate', {username, password, role:'DOCTOR', infoId:this.id}, {root:true,})                  
        } else {
          console.log('error submit!!')
          return false
        }        
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    reset(){
       this.resetForm('doctor')
        this.registrate = {          
          username: '',
          password:'',
          doctor: true,     
        }
      
    },
    loading(){
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      setTimeout(() => {   
        if(!this.edit)  
        this.$emit('added') 
        else  {
             this.$emit('edited') 
        }
        
        this.reset()
        loading.close()       
      }, 2000)
    },
    },
  computed:{
      submittedInfo(){
        if(this.doctor.name && this.doctor.surname && this.doctor.post && this.doctor.phone)
        return true
        else
        return false
      }
  },  
    async beforeMount() {
      if(this.edit){
        let arr = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        this.doctor = arr.find(elem=>elem._id==this.edit)
     }
        this.doctors = await this.$store.dispatch('info/getInfo', {type:'doctors'}, {root:true,})
     
      
    },
}

</script>

