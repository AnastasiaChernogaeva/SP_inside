<template>
<div>
  <el-form
    ref="login"
    :model="login"
    :rules="rules"
    label-width="120px"
    class="demo-login"
  >
    <el-form-item label="Email" prop="email">
      <el-input v-model="login.email"></el-input>
    </el-form-item> 

    <el-form-item label="Password" prop="password">
        <el-input
        v-model="login.password"
        type="password"
        autocomplete="off"
      ></el-input>
    </el-form-item>       
<!--     
    <el-form-item label="Doctor?" prop="doctor">
      <el-switch v-model="login.doctor"></el-switch>
    </el-form-item>

    <el-form-item label="Doctor?" prop="doctor">
      <el-switch v-model="login.doctor"></el-switch>
    </el-form-item> -->

    <el-form-item label="Who are you?" prop="role">
      <el-radio-group v-model="login.role">
        <el-radio label="Doctor"></el-radio>
        <el-radio label="Admin"></el-radio>
      </el-radio-group>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="submitForm('login')"
        >Log in</el-button
      >
      <el-button @click="resetForm('login')">Reset</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { ElLoading } from 'element-plus'
export default {
  data() {
    return {
      login: {
        email: '',
        password:'',
        role: '',
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Please, input email',
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
        role:[
          {
            default:'User'
          }
        ]
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