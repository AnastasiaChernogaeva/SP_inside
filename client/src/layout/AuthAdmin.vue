<template>
<div>
  <el-form
    ref="loginAdmin"
    :model="login"
    :rules="rules"
    label-width="120px"
    class="demo-loginAdmin"
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
    
    <el-form-item label="admin" prop="admin">
      <el-switch v-model="login.admin"></el-switch>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="submitForm('loginAdmin')"
        >Log in</el-button
      >
      <el-button @click="resetForm('loginAdmin')">Reset</el-button>
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
        admin: true,
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