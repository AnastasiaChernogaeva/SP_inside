<template>
<div>
  <h3><em>{{edit?'Editing':'Adding new one'}}</em></h3>
   <el-form
    ref="pet"
    :model="pet"
    :rules="rules"
    label-width="120px"
    class="demo-pet"
  >
    <el-form-item label="Full Pet Name" prop="fullname">
      <el-input v-model="pet.fullname"></el-input>
    </el-form-item>

    <el-form-item label="Nickname" prop="nickname">
      <el-input v-model="pet.nickname"></el-input>
    </el-form-item>
    
    <el-form-item label="Kind" prop="kind">
      <el-input v-model="pet.kind"></el-input>
    </el-form-item>
    
    <el-form-item label="Gender" prop="gender">
      <el-select v-model="pet.gender" placeholder="Gender">
        <el-option label="Male" value="Male"></el-option>
        <el-option label="Female" value="Female"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Period of Life" required>
      <el-col :span="11">
        <el-form-item prop="dateOfBirth">
          <el-date-picker
            v-model="pet.dateOfBirth"
            type="date"
            placeholder="Pick a birth date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="dateOfDeath">
          <el-date-picker
            v-model="pet.dateOfDeath"
            placeholder="Pick a death date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    
    <el-form-item label="Weight, kilos" prop="weight">
      <el-input v-model="pet.weight"></el-input>
    </el-form-item> 
    
    <el-form-item label="Appearance" prop="appearance">
      <el-input v-model="pet.appearance"></el-input>
    </el-form-item> 
<!-- 
    <el-form-item label="Homeless" prop="homeless">
      <el-switch v-model="pet.homeless"></el-switch>
    </el-form-item>

    <el-form-item label="Pedigree" prop="pedigree">
      <el-switch v-model="pet.pedigree"></el-switch>
    </el-form-item>

    <el-form-item label="Passport" prop="passport">
      <el-switch v-model="pet.passport"></el-switch>
    </el-form-item> -->
    
    <!-- <el-form-item label="Active Lifestyle" prop="activeLifestyle">
      <el-radio-group v-model="pet.activeLifestyle">
        <el-radio label="Yes"></el-radio>
        <el-radio label="No"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Activity form" prop="activityForm">
      <el-input v-model="pet.activityForm" type="textarea"></el-input>
    </el-form-item> -->

    <!-- <el-form-item label="Health Problems" prop="diseases">
      <el-input v-model="pet.diseases" type="textarea"></el-input>
    </el-form-item> -->
    
    <el-form-item label="Photo" prop="photo">
      <el-input v-model="pet.photo"></el-input>
    </el-form-item> 
     <el-form-item>
      <el-button type="primary" @click="editElem('pet')" v-if="edit"
        >Edit</el-button
      >
     <el-button type="primary" @click="submitForm('pet')" v-else
        >Save</el-button
      > 
      <el-button @click="resetForm('pet')">Reset</el-button>
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
        type:'pets',
        pet: {
        fullname: '',
        nickname:'',
        kind:'',
        gender: '',
        dateOfBirth: '',
        dateOfDeath: '',
        weight:'',
        appearance:'',
        // homeless: false,
        // pedigree: false,
        // passport: false,
        // activeLifestyle: '',
        // activityForm: '',
        // diseases:'',
        photo:'',
        // appointments:'',
        // treatments:'',
        // owner:'',


      },
      rules: {
        fullPetName: [
          {
            required: true,
            message: 'Please, input pet fullname',
            trigger: 'blur',
          },
        ],
        nickname: [
          {
            required: true,
            message: 'Please, input pet nickname',
            trigger: 'blur',
          },
        ],
        kind: [
          {
            required: true,
            message: 'Please, input pet kind',
            trigger: 'blur',
          },
        ],
        gender: [
          {
            required: true,
            message: 'Please, select pet gender',
            trigger: 'change',
          },
        ],
        dateOfBirth: [
          {
            type: 'date',
            required: true,
            message: 'Please, pick a birth date',
            trigger: 'change',
          },
        ],
        dateOfDeath: [
          {
            type: 'date',
            required: false,
            message: 'Please pick a time',
            trigger: 'change',
          },
        ],
        appearance: [
          {
            required: true,
            message: 'Please, describe pet appearance',
            trigger: 'blur',
          },
        ],
        weight: [
          {
            required: true,
            message: 'Please, input pet weight',
            trigger: 'blur',
          },
        ],
        activeLifestyle: [
          {
            required: true,
            message: 'Please, select activity activeLifestyle',
            trigger: 'change',
          },
        ],
        activityForm: [
          {
            required: true,
            message: 'Please, input activity form',
            trigger: 'blur',
          },
        ],
        diseases: [
          {
            required: true,
            message: 'Please, input info about health problems',
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
          this.$store.dispatch('info/editElem', {item:this.pet, id:this.edit, type:this.type}, {root:true,})
        } else {
          console.log('error submit!!')
          return false
        } } )},

      submitForm(formName) {      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading()
          this.$store.dispatch('info/addNew', {items:this.pet, type:this.type}, {root:true,})
          this.resetForm('pet')    
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
       
        
        this.resetForm('pet')
        loading.close()        
      }, 2000)
    },
    },
    async beforeMount() {
      if(this.edit){
        let arr = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        this.pet = arr.find(elem=>elem._id==this.edit)
      }
      else{
        this.resetForm(this.type)
      }
      
    },
}

</script>
