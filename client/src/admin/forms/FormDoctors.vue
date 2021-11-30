<template>
<div>
  <h3><em>Adding new one:</em></h3>
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

   


<!-- 
    <el-form-item label="Photo" prop="photo">
        <el-input
        v-model="doctor.photo"
      ></el-input>    
    </el-form-item> -->
  
     <el-form-item>
      <el-button type="primary" @click="editElem('doctor')" v-if="edit"
        >Edit</el-button
      >
     <el-button type="primary" @click="submitForm('doctor')" v-else
        >Save</el-button
      > 
      <el-button @click="resetForm('doctor')">Reset</el-button>
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
      users:[],
      doctor: {
        name: '',
        surname:'',
        post:'',
        photo:'',
        phone:'',
        id:'',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please, input name of doctor',
            trigger: 'blur',
          },
        ],
        country: [
          {
            required: true,
            message: 'Please, input country',
            trigger: 'blur',
          },
        ],
        city: [
          {
            required: true,
            message: 'Please, input city',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: 'Please, input description of doctor',
            trigger: 'blur',
          },
        ],
        photo: [
          {
            message: 'Please, input url for a photo',
            trigger: 'blur',
          },
        ],
      },
    }
    },
    methods:{
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
          this.$store.dispatch('info/addNew', {items:this.doctor, type:this.type}, {root:true,})
               
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
       
        
        this.resetForm('doctor')
        loading.close()        
      }, 2000)
    },
    },
    async beforeMount() {
      if(this.edit){
        let arr = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        this.doctor = arr.find(elem=>elem._id==this.edit)
     }
        this.services =  await this.$store.dispatch('info/getInfo', {type:'services'}, {root:true,})
        this.doctors = await this.$store.dispatch('info/getInfo', {type:'doctors'}, {root:true,})
     
      
    },
}

</script>

