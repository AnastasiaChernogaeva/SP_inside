<template>
<div>
  <h3><em>{{edit?'Editing':'Adding new one'}}:</em></h3>
   <el-form
    ref="client"
    :model="client"
    :rules="rules"
    label-width="120px"
    class="demo-client"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="client.name" ></el-input>
    </el-form-item> 
    <el-form-item label="Surname" prop="surname">
      <el-input v-model="client.surname" ></el-input>
    </el-form-item> 
    <el-form-item label="Phone number" prop="phone">
      <el-input v-model="client.phone" ></el-input>
    </el-form-item> 
    <el-form-item v-if="edit">
         <el-button type="primary" @click="editElem('client')" 
        >Edit</el-button
      >
      <el-button @click="resetForm('client')">Reset</el-button>

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
        <!-- <el-button type="primary" @click="editElem('client')" v-if="edit"
        >Edit</el-button
      >
     <el-button type="primary" @click="submitForm('doctor')" v-else
        >Save</el-button
      >  -->
      <el-button type="primary" @click="submitForms"
        >Save</el-button
      >
      <el-button @click="resetForms">Reset</el-button>

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
      type:'clients',
      id:'',
      registrate: {
        username: '',
        password:'',
        doctor: false,     
      },
      clients:[],
      client: {
        name: '',
        surname:'',
        pets:[],
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
          
          this.$refs['client'].validate(async(valid) => {
            if (valid) {
                response = await this.$store.dispatch('info/addNew', {items:this.client, type:'clients'}, {root:true,})
            
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
      this.$refs['client'].resetFields()
      this.$refs['registrate'].resetFields()

    },
      editElem(formName){ 
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading()
          this.$store.dispatch('info/editElem', {item:this.client, id:this.edit, type:this.type}, {root:true,})
        } else {
          console.log('error submit!!')
          return false
        } } )},

      submitForm(formName) {      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading()
          const {username, password} = this.registrate
          this.$store.dispatch('auth/registrate', {username, password, role:'USER', infoId:this.id}, {root:true,})   
               
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
        if(!this.edit)  
        this.$emit('added') 
        else  {
             this.$emit('edited') 
            //  console.log('Inside the form')
        }
       
        
        this.resetForm('client')
        loading.close()        
      }, 2000)
    },
    },  
    
  computed:{
      submittedInfo(){
        if(this.client.name && this.client.surname)
        return true
        else
        return false
      }
  },  
    async beforeMount() {
      if(this.edit){
        let arr = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        this.client = arr.find(elem=>elem._id==this.edit)
     }
        this.clients = await this.$store.dispatch('info/getInfo', {type:'clients'}, {root:true,})
     
      
    },
}

</script>

