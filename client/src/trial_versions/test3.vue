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



  <el-form  ref="petForm"  :model="petForm"   :rules="rule" label-width="120px" class="demo-ruleForm">

          <el-form-item prop="fellPetName" label="Full Pet Name">
                  <el-input v-model="petForm.fullPetName" ></el-input>
          </el-form-item>

          <el-form-item prop="nickName" label="Nickname">
                  <el-input v-model="petForm.nickname" ></el-input>
          </el-form-item>

          <!-- <el-form-item prop="kind" label="Kind" 
              :rules="[
              {
                    required: true,
                    message: 'Please, input pet kind',
                    trigger: 'blur',
              },
              {
                    type: 'string',
                    message: 'Please input correct pet kind',
                    trigger: ['blur', 'change'], 
              },
              ]">
                  <el-input v-model="petForm.Kind" ></el-input>
          </el-form-item>
          
          <el-form-item prop="gender" label="Gender" 
              :rules="[
              {
                    required: true,
                    message: 'Please, input pet nickname',
                    trigger: 'blur',
              },
              {
                    type: 'string',
                    message: 'Please input correct pet nickname',
                    trigger: ['blur', 'change'], 
              },
              ]">
                  <el-input v-model="petForm.nickname" ></el-input>
          </el-form-item> -->

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

            rule:{
              fullPetName:[
                 {
                    required: true,
                    message: 'Please, input pet full name',
                    trigger: 'blur',
                  },
                  {
                    type: 'string',
                    message: 'Please input correct pet full name',
                    trigger: ['blur', 'change'], 
                  },
              ],
              nickname:[
                  {
                    required: true,
                    message: 'Please, input pet nickname',
                    trigger: 'blur',
                  },
                  {
                    type: 'string',
                    message: 'Please input correct pet nickname',
                    trigger: ['blur', 'change'], 
                  },
              ],
              // kind:[
              //    {
              //       required: true,
              //       message: 'Please, input pet full name',
              //       trigger: 'blur',
              //     },
              //     {
              //       type: 'string',
              //       message: 'Please input correct pet full name',
              //       trigger: ['blur', 'change'], 
              //     },
              // ],
              // gender:[
              //    {
              //       required: true,
              //       message: 'Please, input pet full name',
              //       trigger: 'blur',
              //     },
              //     {
              //       type: 'string',
              //       message: 'Please input correct pet full name',
              //       trigger: ['blur', 'change'], 
              //     },
              // ],
              // date1:[
              //    {
              //       required: true,
              //       message: 'Please, input pet full name',
              //       trigger: 'blur',
              //     },
              //     {
              //       type: 'string',
              //       message: 'Please input correct pet full name',
              //       trigger: ['blur', 'change'], 
              //     },
              // ],
              // date2:[
              //    {
              //       required: true,
              //       message: 'Please, input pet full name',
              //       trigger: 'blur',
              //     },
              //     {
              //       type: 'string',
              //       message: 'Please input correct pet full name',
              //       trigger: ['blur', 'change'], 
              //     },
              // ],
              // weight:[
              //    {
              //       required: true,
              //       message: 'Please, input pet full name',
              //       trigger: 'blur',
              //     },
              //     {
              //       type: 'string',
              //       message: 'Please input correct pet full name',
              //       trigger: ['blur', 'change'], 
              //     },
              // ],
              // homeless:[
              //    {
              //       required: true,
              //       message: 'Please, input pet full name',
              //       trigger: 'blur',
              //     },
              //     {
              //       type: 'string',
              //       message: 'Please input correct pet full name',
              //       trigger: ['blur', 'change'], 
              //     },
              // ],
              // pedigree:[
              //    {
              //       required: true,
              //       message: 'Please, input pet full name',
              //       trigger: 'blur',
              //     },
              //     {
              //       type: 'string',
              //       message: 'Please input correct pet full name',
              //       trigger: ['blur', 'change'], 
              //     },
              // ],
              // passport:[
              //    {
              //       required: true,
              //       message: 'Please, input pet full name',
              //       trigger: 'blur',
              //     },
              //     {
              //       type: 'string',
              //       message: 'Please input correct pet full name',
              //       trigger: ['blur', 'change'], 
              //     },
              // ],
              // activeLifestyle:[
              //    {
              //       required: true,
              //       message: 'Please, input pet full name',
              //       trigger: 'blur',
              //     },
              //     {
              //       type: 'string',
              //       message: 'Please input correct pet full name',
              //       trigger: ['blur', 'change'], 
              //     },
              // ],
              // activityForm:[
              //    {
              //       required: true,
              //       message: 'Please, input pet full name',
              //       trigger: 'blur',
              //     },
              //     {
              //       type: 'string',
              //       message: 'Please input correct pet full name',
              //       trigger: ['blur', 'change'], 
              //     },
              // ],
              // diseases:[
              //    {
              //       required: true,
              //       message: 'Please, input pet full name',
              //       trigger: 'blur',
              //     },
              //     {
              //       type: 'string',
              //       message: 'Please input correct pet full name',
              //       trigger: ['blur', 'change'], 
              //     },
              // ],
              // appearance:[
              //    {
              //       required: true,
              //       message: 'Please, input pet full name',
              //       trigger: 'blur',
              //     },
              //     {
              //       type: 'string',
              //       message: 'Please input correct pet full name',
              //       trigger: ['blur', 'change'], 
              //     },
              // ],
            },
            
        }
    },

    methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          // console.log('valid', valid)
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
