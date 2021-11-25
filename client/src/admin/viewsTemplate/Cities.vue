<template>
<div>

 <div class="center">
        <el-button-group >
          <router-link to="/main_doc/all" class="el-link" type="primary">
              <el-button type="primary" icon="el-icon-arrow-left"
                > 
                All Cards
              </el-button>
            </router-link>
            <router-link to="/main_doc" class="el-link" type="primary">
              <el-button type="primary"
                >Main<i class="el-icon-arrow-right el-icon-right"></i
              ></el-button>
            </router-link>
          </el-button-group>
   </div>

  <el-form
    ref="petForm"
    :model="petForm"
    :rules="rules"
    label-width="120px"
    class="demo-petForm"
  >
    <el-form-item label="Full Pet Name" prop="fullPetName">
      <el-input v-model="petForm.fullPetName"></el-input>
    </el-form-item>

    <el-form-item label="Nickname" prop="nickname">
      <el-input v-model="petForm.nickname"></el-input>
    </el-form-item>
    
    <el-form-item label="Kind" prop="kind">
      <el-input v-model="petForm.kind"></el-input>
    </el-form-item>
    
    <el-form-item label="Gender" prop="gender">
      <el-select v-model="petForm.gender" placeholder="Gender">
        <el-option label="Male" value="Male"></el-option>
        <el-option label="Female" value="Female"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Period of Life" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            v-model="petForm.date1"
            type="date"
            placeholder="Pick a birth date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-date-picker
            v-model="petForm.date2"
            placeholder="Pick a death date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    
    <el-form-item label="Weight, kilos" prop="weight">
      <el-input v-model="petForm.weight"></el-input>
    </el-form-item> 
    
    <el-form-item label="Appearance" prop="appearance">
      <el-input v-model="petForm.appearance"></el-input>
    </el-form-item> 

    <el-form-item label="Homeless" prop="homeless">
      <el-switch v-model="petForm.homeless"></el-switch>
    </el-form-item>

    <el-form-item label="Pedigree" prop="pedigree">
      <el-switch v-model="petForm.pedigree"></el-switch>
    </el-form-item>

    <el-form-item label="Passport" prop="passport">
      <el-switch v-model="petForm.passport"></el-switch>
    </el-form-item>
    
    <el-form-item label="Active Lifestyle" prop="activeLifestyle">
      <el-radio-group v-model="petForm.activeLifestyle">
        <el-radio label="Yes"></el-radio>
        <el-radio label="No"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Activity form" prop="activityForm">
      <el-input v-model="petForm.activityForm" type="textarea"></el-input>
    </el-form-item>

    <el-form-item label="Health Problems" prop="diseases">
      <el-input v-model="petForm.diseases" type="textarea"></el-input>
    </el-form-item>
    
    <el-form-item label="Photo" prop="photo">
      <el-input v-model="petForm.photo"></el-input>
    </el-form-item> 

    <el-form-item>
      <el-button type="primary" @click="submitForm('petForm')"
        >Create</el-button
      >
      <el-button @click="resetForm('petForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { ElLoading } from 'element-plus'
export default {
  data() {
    return {
      petForm: {
        fullPetName: '',
        nickname:'',
        kind:'',
        gender: '',
        date1: '',
        date2: '',
        weight:'',
        appearance:'',
        homeless: false,
        pedigree: false,
        passport: false,
        activeLifestyle: '',
        activityForm: '',
        diseases:'',
        photo:'',
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
        date1: [
          {
            type: 'date',
            required: true,
            message: 'Please, pick a birth date',
            trigger: 'change',
          },
        ],
        date2: [
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
  methods: {
    submitForm(formName) {
      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading()
          this.$store.commit('addNewFormInsidePetsBase', this.petForm )
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
        this.$router.push('/all')
        loading.close()
      }, 2000)
    },
  },
}
</script>