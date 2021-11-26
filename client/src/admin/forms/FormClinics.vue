<template>
<div>
  <h3><em>Adding new one:</em></h3>
   <el-form
    ref="clinic"
    :model="clinic"
    :rules="rules"
    label-width="120px"
    class="demo-clinic"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="clinic.name" ></el-input>
    </el-form-item> 

    <el-form-item label="Country" prop="country">
        <el-input
        v-model.number="clinic.country"
      ></el-input>    
    </el-form-item>

    <el-form-item label="City" prop="city">
      <el-input v-model="clinic.city"  ></el-input>
    </el-form-item> 

    <el-form-item label="Description" prop="description">
      <el-input v-model="clinic.description"  ></el-input>
    </el-form-item> 

    <!-- <el-form-item label="Services" prop="services">
      <el-select v-model="clinic.services" placeholder="Services">
        <el-option v-for="service in services" :key="service._id" :label="service.name" :value="service._id"></el-option>
      </el-select>
    </el-form-item> -->

    <el-form-item label="Services" prop="services">
    <el-checkbox-group v-model="clinic.services">
      <el-checkbox-button v-for="service in services" :key="service._id" :label="service.name" :value="service._id">{{
        service.name
      }}</el-checkbox-button>
    </el-checkbox-group>
    </el-form-item>



    <el-form-item label="Photo" prop="photo">
        <el-input
        v-model="clinic.photo"
      ></el-input>    
    </el-form-item>
  
     <el-form-item>
      <el-button type="primary" @click="editElem('clinic')" v-if="edit"
        >Edit</el-button
      >
     <el-button type="primary" @click="submitForm('clinic')" v-else
        >Save</el-button
      > 
      <el-button @click="resetForm('clinic')">Reset</el-button>
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
      type:'clinics',
      services:[],
      clinic: {
        name: '',
        country:'',
        city:'',
        services:[],
        doctors:[],
        photo:'',
        description:'',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please, input name of clinic',
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
            message: 'Please, input description of clinic',
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
          this.$store.dispatch('info/editElem', {item:this.clinic, id:this.edit, type:this.type}, {root:true,})
        } else {
          console.log('error submit!!')
          return false
        } } )},

      submitForm(formName) {      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading()
          this.$store.dispatch('info/addNew', {items:this.clinic, type:this.type}, {root:true,})
               
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
             console.log('Inside the form')
        }
       
        
        this.resetForm('clinic')
        loading.close()        
      }, 2000)
    },
    },
    async beforeMount() {
      if(this.edit){
        let arr = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        this.clinic = arr.find(elem=>elem._id==this.edit)
     }
        this.services =  await this.$store.dispatch('info/getInfo', {type:'services'}, {root:true,})

     
      
    },
}

</script>

