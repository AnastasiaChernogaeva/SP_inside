<template>
<div>
  <h3><em>Adding new one:</em></h3>
   <el-form
    ref="shopgood"
    :model="shopgood"
    :rules="rules"
    label-width="120px"
    class="demo-shopgood"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="shopgood.name" ></el-input>
    </el-form-item> 

    <el-form-item label="Price" prop="price">
        <el-input
        v-model.number="shopgood.price"
        type="price"
      ></el-input>    
    </el-form-item>

    <el-form-item label="Description" prop="description">
      <el-input v-model="shopgood.description"  ></el-input>
    </el-form-item> 

    <el-form-item label="Photo" prop="photo">
        <el-input
        v-model="shopgood.photo"
      ></el-input>    
    </el-form-item>
  
     <el-form-item>
      <el-button type="primary" @click="editElem('shopgood')" v-if="edit"
        >Edit</el-button
      >
     <el-button type="primary" @click="submitForm('shopgood')" v-else
        >Save</el-button
      > 
      <el-button @click="resetForm('shopgood')">Reset</el-button>
    </el-form-item>
  </el-form>  
</div>
  
</template>
<script>
import { ElLoading } from 'element-plus'

export default {
    props:['edit'],
    emits:['added', 'closeNow', 'edited'],
    data(){
     return {
      // focused:false,
      type:'shopgoods',
      shopgood: {
        name: '',
        description:'',
        photo:'',
        price:'',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please, input name of shopgood',
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
        description: [
          {
            required: true,
            message: 'Please, input description of shopgood',
            trigger: 'blur',
          },
        ],
        photo: [
          {
            message: 'Please, input url for a photo',
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
          this.$store.dispatch('info/editElem', {item:this.shopgood, id:this.edit, type:this.type}, {root:true,})
        } else {
          console.log('error submit!!')
          return false
        } } )},

      submitForm(formName) {      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading()
          this.$store.dispatch('info/addNew', {items:this.shopgood, type:this.type}, {root:true,})
               
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
      const loading = ElLoading.shopgood({
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
       
        
        this.resetForm('shopgood')
        loading.close()        
      }, 2000)
    },
    },
    async beforeMount() {
      if(this.edit){
        let arr = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        this.shopgood = arr.find(elem=>elem._id==this.edit)
      }
      
    },
    // mounted() {
    //   this.focused = true
    // },
}

</script>
