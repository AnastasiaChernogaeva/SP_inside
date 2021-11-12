<template>
<div>
  <el-form
    ref="registrate"
    :model="registrate"
    :rules="rules"
    label-width="120px"
    class="demo-registrate"
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

    <el-form-item label="Doctor?" prop="doctor">
      <el-switch v-model="registrate.doctor"></el-switch>
    </el-form-item>
<!-- 
    <el-form-item label="Who are you?" prop="role">
      <el-radio-group v-model="registrate.role">
        <el-radio label="DOCTOR"></el-radio>
        <el-radio label="ADMIN"></el-radio>
      </el-radio-group>
    </el-form-item> -->


    <el-form-item>
      <el-button type="primary" @click="submitForm('registrate')"
        >Sign up</el-button
      >
      <el-button @click="resetForm('registrate')">Reset</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { ElLoading } from 'element-plus'
export default {
  data() {
    return { 
      registrate: {
        username: '',
        password:'',
        doctor: false,
     
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
          // this.$store.commit('addNewFormInsidePetsBase', this.petForm )

          const {username, password} = this.registrate
          this.$store.dispatch('auth/registrate', {username, password, role:this.role}, {root:true,})
          // console.log(data)

          const rr = this.role
          // console.log('Reg',  {username, password, rr})


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
        this.$router.push('/main')
        loading.close()
      }, 2000)
    },
  },
  computed:{
      role(){
        // console.log(this.registrate)
          return this.registrate.doctor?'DOCTOR':'USER'
      }
  }
}
</script>