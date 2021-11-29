<template>
<div>
   <el-form
    ref="info"
    :model="info"
    :rules="infoRules"
    label-width="120px"
    class="demo-info"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="info.name"></el-input>
    </el-form-item> 

    <el-form-item label="Surname" prop="surname">
        <el-input v-model="info.surname"></el-input>
    </el-form-item>       
    
    <el-form-item label="Photo" prop="photo">
        <el-input v-model="info.photo"></el-input>
    </el-form-item>   

    <!-- <el-form-item label="Doctor?" prop="doctor">
      <el-switch v-model="registrate.doctor"></el-switch>
    </el-form-item> -->


    <!-- <el-form-item>
      <el-button type="primary" @click="submitForm('info')"
        >Sign up</el-button
      >
      <el-button @click="resetForm('info')">Reset</el-button>
    </el-form-item> -->
  </el-form>
  <el-form
    v-if="submittedInfo"
    ref="registrate"
    :model="registrate"
    :rules="rules"
    label-width="120px"
    class="demo-registrate animated"
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

    <!-- <el-form-item label="Doctor?" prop="doctor">
      <el-switch v-model="registrate.doctor"></el-switch>
    </el-form-item> -->


    <el-form-item>
      <el-button type="primary" @click="submitForms"
        >Sign up</el-button
      >
      <el-button @click="resetForms">Reset</el-button>

       <!-- <el-button type="primary" @click="submitForm('registrate')"
        >Sign up</el-button
      >
      <el-button @click="resetForm('registrate')">Reset</el-button> -->
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { ElLoading } from 'element-plus'
export default {
  data() {
    return { 
      // submittedInfo:false,
      id:'',
      registrate: {
        username: '',
        password:'',
        doctor: false,     
      },
      info:{
          name:'',
          surname:'',
          photo:'',
          pets:[],
      },
       infoRules: {
        name: [
          {
            required: true,
            message: 'Please, input name',
            trigger: 'blur',
          },
        ],
        surname: [
          {
            required: true,
            message: 'Please, input surname',
            trigger: 'blur',
          },
        ],
        photo: [
          {
            required: true,
            message: 'Please, input photo',
            trigger: 'blur',
          },
        ],
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
    submitForms(){
          this.loading()
          
          this.$refs['info'].validate(async(valid) => {
            if (valid) {
             let response = await this.$store.dispatch('info/addNew', {items:this.info, type:'clients'}, {root:true,})
            console.log(response, '- I am that response')
            
             this.id=response._id
             this.submitForm('registrate')
          // if(this.id){
          //   console.log(this.id)
          //   this.$refs['registrate'].validate(async(valid,) => {
          //     if (valid) {
          //       const {username, password} = this.registrate
          //       this.$store.dispatch('auth/registrate', {username, password, role:this.role, infoId:this.id}, {root:true,})             
          //     }
          //     else {
          //       console.log('error submit!!')
          //       return false
          //     }  
          //   })
           
          // }
            }
            else {
              console.log('error submit!!')
              return false
            }  
          })
          

          
          //  this.$refs['registrate'].validate(async(valid) => {
          //     if (valid) {
          //       const {username, password} = this.registrate
          //       this.$store.dispatch('auth/registration', {username, password, role:this.role, infoId:this.id}, {root:true,})
          //     }
          //     else {
          //       console.log('error submit!!')
          //       return false
          //     }  
          //   })


    },
    resetForms(){
      this.$refs['info'].resetFields()
      this.$refs['registrate'].resetFields()

    },
    submitForm(formName) {
      
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading()
          // this.$store.commit('addNewFormInsidePetsBase', this.petForm )

          this.$refs['info'].validate((valid) => {
            if (valid) {
                const {username, password} = this.registrate
                this.$store.dispatch('auth/registrate', {username, password, role:this.role, infoId:this.id}, {root:true,})       
            //  this.$store.dispatch('info/addNew', {info:this.info, type:'clients'}, {root:true,})
            //  console.log('s', response)
            }
            else {
              console.log('error submit!!')
              return false
            }  
          })

        //  const response  =  valided?await this.$store.dispatch('info/addNew', {info:this.info, type:'clients'}, {root:true,}):null
        //  console.log('s', response)
         

          // const {username, password} = this.registrate
          // this.$store.dispatch('auth/registrate', {username, password, role:this.role}, {root:true,})

          // console.log(data)

          // const rr = this.role
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
        if(this.message){
           this.info = {
              name:'',
              surname:'',
              photo:'',
              pets:[],
           }
           this.registrate = {
              username: '',
              password:'',
              doctor: false,
           }
        }
        else{
           this.$router.push('/main')
        }       
        loading.close()
      }, 2000)
    },
  },
  
  computed:{
      role(){
          return this.registrate.doctor?'DOCTOR':'USER'
      },
      message(){
        return this.$store.state.auth.error
      },
      submittedInfo(){
        if(this.info.name && this.info.surname && this.info.photo)
        return true
        else
        return false
      }
  }
}
</script>
<style scoped>
/* @keyframes Motion{

}
.animated{
  animation: Motion 5s ;
} */
</style>