<template>
<div>
  <el-form
    ref="login"
    :model="login"
    :rules="rules"
    label-width="120px"
    class="demo-login"
  >
    <el-form-item label="Username" prop="username">
      <el-input v-model="login.username"></el-input>
    </el-form-item> 

    <el-form-item label="Password" prop="password">
        <el-input
        v-model="login.password"
        type="password"
        autocomplete="off"
      ></el-input>
    </el-form-item>       

    <el-form-item label="Who are you?" prop="role">
      <el-radio-group v-model="login.role">
        <el-radio label="DOCTOR"></el-radio>
        <el-radio label="ADMIN"></el-radio>
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
        username: '',
        password:'',
        role: 'USER',
      },
      rules: {
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
  methods: {
    submitForm(formName) {
      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading()
          this.$store.dispatch('auth/login', this.login, {root:true,})

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
        if(this.message){
           this.login = {
              username: '',
              password:'',
              role: 'USER',
           }
        }
        else{
        if(this.$store.state.auth.role==="DOCTOR"){
          this.$router.push('/main_doc')
        }
        else if(this.$store.state.auth.role==="ADMIN"){
          this.$router.push('/main_admin')
        }
        else if(this.$store.state.auth.role==="USER"){
          this.$router.push('/main/clients')
        }
        }
        loading.close()
      }, 2000)
    },
  },  
  
  computed:{
      message(){
        return this.$store.state.auth.error
      }
  }
}
</script>

