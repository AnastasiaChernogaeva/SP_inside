<template>
<div>


  <div class="center">
        <el-button-group >
          <router-link to="/all" class="el-link" type="primary">
              <el-button type="primary" icon="el-icon-arrow-left"
                > 
                All Cards
              </el-button>
            </router-link>
            <router-link to="/" class="el-link" type="primary">
              <el-button type="primary"
                >Main<i class="el-icon-arrow-right el-icon-right"></i
              ></el-button>
            </router-link>
          </el-button-group>
   </div>

      <!-- {
                    required: true,
                    message: 'Please, input pet full name',
                    trigger: 'blur',
              }, -->


  <el-form  ref="petForm"  :model="petForm" label-width="120px" >

        <el-form-item prop="fullPetName" label="Full Pet Name" 
              :rules="[
        
              {
                    type: 'string',
                    min:0,
                    required: true,
                    message: 'Please, input correct pet full name',
                    trigger: [ 'change'], 
              },
              ]">
                  <el-input v-model="petForm.fullPetName" ></el-input>
        </el-form-item>

        <el-form-item prop="nickName" label="Nickname" 
              :rules="[
              {
                    required: true,
                    message: 'Please, input pet nickname',
                    trigger: 'blur',
              },
              {
                    type: 'string',
                    message: 'Please, input correct pet nickname',
                    trigger: ['blur', 'change'], 
              },
              ]">
                  <el-input v-model="petForm.nickname" ></el-input>
        </el-form-item>

        <el-form-item prop="kind" label="Kind" 
              :rules="[
              {
                    required: true,
                    message: 'Please, input pet kind',
                    trigger: 'blur',
              },
              {
                    type: 'string',
                    message: 'Please, input correct pet kind',
                    trigger: ['blur', 'change'], 
              },
              ]">
                  <el-input v-model="petForm.kind" ></el-input>
        </el-form-item>
          
        <el-form-item prop="gender" label="Gender" 
              :rules="[
              {
                    required: true,
                    message: 'Please, choose pet gender',
                    trigger: 'blur',
              },
              {
                    type: 'string',
                    message: 'Please, choose correct pet gender',
                    trigger: ['blur', 'change'], 
              },
              ]">
                  <el-select v-model="petForm.gender" placeholder="please select pet's gender">
                    <el-option label="Male" value="Male"></el-option>
                    <el-option label="Female" value="Female"></el-option>
                  </el-select>
        </el-form-item>

          
      <el-form-item label="Period of Life" required>
            <el-col :span="11">
              <el-date-picker
                v-model="petForm.date1"
                type="date"
                placeholder="Pick a date of birth"
                style="width: 100%"
                :rules="[
                  {
                        required: true,
                        message: 'Please, pick a date of birth',
                        trigger: 'blur',
                  },
                  {
                        type: 'date',
                        message: 'Please choose correct pet gender',
                        trigger: ['blur', 'change'], 
                  },
                ]"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>

            <el-col :span="11">
              <el-date-picker
                v-model="date2"
                type="date"
                placeholder="Pick a date of death"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
        </el-form-item>

        <el-form-item prop="weight" label="Weight, kilos" 
              :rules="[
              {
                    required: true,
                    message: 'Please, input pet weight',
                    trigger: 'blur',
              },
              {
                    type: 'number',
                    min: '0',
                    message: 'Please, input correct pet weight',
                    trigger: ['blur', 'change'], 
              },
              ]">
                  <el-input v-model="petForm.weight" type="number" ></el-input>
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

        <el-form-item label="Appearance" prop="appearance"
          :rules="[
          {
            required: true,
            type: 'string',
            message: 'Please, describe the appearance of pet ',
            trigger: ['blur', 'change'], 
          },]"
          >
                  <el-input v-model="petForm.appearance" type="textarea" ></el-input>
        </el-form-item>

        <el-form-item label="Active Lifestyle" prop="activeLifestyle" required>
                  <el-radio-group v-model="petForm.activeLifestyle" 
                  :rules="[
                  {
                    required: true,
                    type: 'string',
                    message: 'Please, answer the question',
                    trigger: 'change',
                  },]">
                    <el-radio label="Yes"></el-radio>
                    <el-radio label="No"></el-radio>
                  </el-radio-group>
        </el-form-item>

        <el-form-item label="Activity Form" prop="activityForm"
        :rules="[
              {
                required: true,
                type: 'string',
                message: 'Please, write the form of activity',
                trigger: ['blur', 'change'], 
              },]"  
        >
                  <el-input v-model="petForm.activityForm" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="Health Problems" prop="diseases"
        :rules="[
              {
                required: true,
                type: 'string',
                message: 'Please, write the types of diseases',
                trigger: ['blur', 'change'], 
              },]"
        >
                  <el-input v-model="petForm.diseases" type="textarea"></el-input>
        </el-form-item>




          <el-form-item>
                  <el-button type="primary" @click="submitForm('petForm')">Submit</el-button >
                  <el-button @click="resetForm('petForm')">Reset</el-button>
          </el-form-item>

  </el-form>

     

</div>
</template>




<script>


export default {
    data() {
        return {
            petForm:{
                    fullPetName:'',
                    nickname:'',
                    kind:'',
                    gender:'',
                    date1:'',
                    date2:'',
                    weight:'',
                    homeless:false,
                    pedigree:false,
                    passport:false,
                    activeLifestyle:'no',
                    activityForm:'',
                    diseases:'',
                    appearance:'',

            },
            
        }
    },

    methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          console.log('valid', valid)
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
