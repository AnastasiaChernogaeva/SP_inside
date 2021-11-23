<template>
   <el-form
    ref="service"
    :model="service"
    :rules="rules"
    label-width="120px"
    class="demo-service"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="service.name"></el-input>
    </el-form-item> 

    <el-form-item label="Price" prop="price">
        <el-input
        v-model="service.price"
        type="price"
      ></el-input>    
    </el-form-item>
  
     <el-form-item>
      <el-button type="primary" @click="editElem('service')" 
        >Edit</el-button
      >
      <!-- <el-button type="primary" @click="submitForm('service')" v-else
        >Save</el-button
      > v-if="editId!==''"-->
      <el-button @click="resetForm('service')">Reset</el-button>
    </el-form-item>
  </el-form>    
</template>
<script>
import { ElLoading} from 'element-plus'

export default {
    emits:['added'],
    data(){
     return {
      // edit:'',
      type:'services',
      service: {
        name: '',
        price:'',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please, input name of service',
            trigger: 'blur',
          },
        ],
        price: [
          {
            required: true,
            message: 'Please, input price',
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
          this.$store.dispatch('info/edit', {item:this.service, type:this.type}, {root:true,})
               
        } else {
          console.log('error submit!!')
          return false
        } } )},

      submitForm(formName) {      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading()
          this.$store.dispatch('info/addNew', {items:this.service, type:this.type}, {root:true,})
               
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
        this.$emit('added')    
        this.resetForm('service')
        loading.close()        
      }, 2000)
    },
    },

    inject: ['editId'],
    watch:{
      editId: (val)=>{
         this.service = this.$store.state.info.services.find(elem => elem._id===val)
      }
    }
}

</script>
