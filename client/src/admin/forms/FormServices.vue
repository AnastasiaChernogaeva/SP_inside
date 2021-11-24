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
      <el-button type="primary" @click="editElem('service')" v-if="edit"
        >Edit</el-button
      >
     <el-button type="primary" @click="submitForm('service')" v-else
        >Save</el-button
      > 
      <el-button @click="resetForm('service')">Reset</el-button>
    </el-form-item>
  </el-form>    
</template>
<script>
import { ElLoading} from 'element-plus'

export default {
    props:['edit'],
    emits:['added', 'closeNow', 'edited'],
    data(){
     return {
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
          this.$store.dispatch('info/editElem', {item:this.service, id:this.edit, type:this.type}, {root:true,})
          // this.$emit('closeNow') 
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
        if(!this.edit)  
        this.$emit('added') 
        else  {
             this.$emit('edited') 
             console.log('Inside the form')
        }
       
        
        this.resetForm('service')
        loading.close()        
      }, 2000)
    },
    },
    async beforeMount() {
      if(this.edit){
        let arr = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        this.service = arr.find(elem=>elem._id==this.edit)
      }
      
    },
}

</script>
