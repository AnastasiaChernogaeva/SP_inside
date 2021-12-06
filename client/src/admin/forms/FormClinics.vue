<template>
<div>
  <h3><em>{{edit?'Editing':'Adding new one'}}</em></h3>
   <el-form
    ref="clinic"
    :model="clinic"
    :rules="rules"
    label-width="120px"
    class="demo-clinic"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="clinic.name"></el-input>
    </el-form-item> 

    <el-form-item label="Country" prop="country">
        <el-input
        v-model.number="clinic.country"
      ></el-input>    
    </el-form-item>

    <el-form-item label="City" prop="city">
      <el-input v-model="clinic.city"  ></el-input>
    </el-form-item> 

    <el-form-item label="Description" prop="description">
      <el-input v-model="clinic.description"  ></el-input>
    </el-form-item> 

    <!-- <el-form-item label="Services" prop="services">
      <el-select v-model="clinic.services" placeholder="Services">
        <el-option v-for="service in services" :key="service._id" :label="service.name" :value="service._id"></el-option>
      </el-select>
    </el-form-item> -->

    <el-form-item label="Services" prop="services">
    <el-checkbox-group v-model="clinic.services">
      <el-checkbox-button v-for="service in services" :key="service._id" :label="service.name" :value="service._id">{{
        service.name
      }}</el-checkbox-button>
    </el-checkbox-group>
    </el-form-item>

    <el-form-item label="Doctors" prop="doctors">
    <el-checkbox-group v-model="clinic.doctors">
      <el-checkbox-button v-for="doc in doctors" :key="doc._id" :label="doc.name" :value="doc._id">{{
        doc.name
      }}</el-checkbox-button>
    </el-checkbox-group>
    </el-form-item>



    <el-form-item label="Photo" prop="photo">
        <el-input
        v-model="clinic.photo"
      ></el-input>    
    </el-form-item>

    <!-- <el-form-item>
      
      <el-upload
        class="avatar-uploader"        
        list-type="picture-card"
        :on-change="handleAdd"
        v-if="!clinic.photo"
        
      >
        <el-icon><plus /></el-icon>
        
        
      </el-upload>
      
    </el-form-item>
    <el-form-item v-if="clinic.photo">
      <img  :src="clinic.photo" class="avatar" />
    </el-form-item> -->

    <!-- <el-form-item>
       <el-uploadaction="https://jsonplaceholder.typicode.com/posts/"
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleAdd"

        >
          <img v-if="clinic.photo" :src="clinic.photo" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        </el-uploadaction=>
    </el-form-item> -->

 <!-- :on-preview="handlePictureCardPreview" -->
  
     <el-form-item>
      <el-button type="primary" @click="editElem('clinic')" v-if="edit"
        >Edit</el-button
      >
     <el-button type="primary" @click="submitForm('clinic')" v-else
        >Save</el-button
      > 
      <el-button @click="resetForm('clinic')">Reset</el-button>
    </el-form-item>
  </el-form>  

  <!-- <img v-if="clinic.photo" :src="clinic.photo
  " alt=""> -->
</div>
  
</template>
<script>
import { ElLoading } from 'element-plus'
// import { Plus } from '@element-plus/icons'

export default {
    props:['edit'],
    emits:['added', 'closeNow', 'edited'],
    // components:{
    //   Plus
    // },
    data(){
     return {
      // focused:false,
      dialogVisible: false,
      type:'clinics',
      services:[],
      doctors:[],
      clinic: {
        name: '',
        country:'',
        city:'',
        services:[],
        doctors:[],
        // photo:'',
        photo:'',
        description:'',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please, input name of clinic',
            trigger: 'blur',
          },
        ],
        country: [
          {
            required: true,
            message: 'Please, input country',
            trigger: 'blur',
          },
        ],
        city: [
          {
            required: true,
            message: 'Please, input city',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: 'Please, input description of clinic',
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
    // handleAvatarSuccess(res, file) {
    //   console.log("NEWFile",file)
    //   this.clinic.photo = URL.createObjectURL(file.raw)
    // },

    // handleAdd(file){
    //   console.log('file', file.url)
    //   this.clinic.photo = file.url
    // },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList)
    // },
    // handlePictureCardPreview(file) {
    //   this.clinic.photo = file.url
    //   this.dialogVisible = true
    // },
      editElem(formName){ 
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading()
          this.$store.dispatch('info/editElem', {item:this.clinic, id:this.edit, type:this.type}, {root:true,})
        } else {
          console.log('error submit!!')
          return false
        } } )},

      submitForm(formName) {     
        // console.log(formName, this.clinic) 
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading()
          this.$store.dispatch('info/addNew', {items:this.clinic, type:this.type}, {root:true,})
               
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
            //  console.log('Inside the form')
        }
       
        
        this.resetForm('clinic')
        loading.close()        
      }, 2000)
    },
    },
    async beforeMount() {
      if(this.edit){
        let arr = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        this.clinic = arr.find(elem=>elem._id==this.edit)
     }
        this.services =  await this.$store.dispatch('info/getInfo', {type:'services'}, {root:true,})
        this.doctors = await this.$store.dispatch('info/getInfo', {type:'doctors'}, {root:true,})
     
      
    },
}

</script>

<style>
/* .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: 74px; /* (178px - 28px) / 2 - 1px */
/* }
.avatar {
  width: 178px;
  height: 178px;
  display: block;
} */ 
</style>

