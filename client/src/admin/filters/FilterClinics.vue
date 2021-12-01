<template>
<div>
    <h1>
        Kkkk
    </h1>
      <el-form
            ref="filtered"
            :model="filtered"
            label-width="120px"
            class="demo-filtered"
        >
            <el-form-item label="Name" prop="name">
                <el-input v-model="filtered.name" ></el-input>
            </el-form-item> 
            <el-form-item label="Country" prop="country">
                <el-input v-model="filtered.country" ></el-input>
            </el-form-item> 
            <el-form-item label="City" prop="city">
                <el-input v-model="filtered.city" ></el-input>
            </el-form-item> 
            <el-form-item label="Services" prop="services">
                <el-input v-model="filtered.services" ></el-input>
            </el-form-item> 
            <el-form-item label="Doctors" prop="doctors">
                <el-input v-model="filtered.doctors" ></el-input>
            </el-form-item> 
            <el-form-item>
                <el-button class="icon" type="danger" icon="el-icon-close" @click="()=>resetForm('filtered')"></el-button>
            </el-form-item>
      </el-form>
      <p>{{this.filtered}}</p>
</div>
</template>
<script>
export default {
    emits:['filtered'],
    data(){
        return{
            filtered:{
                name: '',
                country:'',
                city:'',
                services:'',
                doctors:'',
            }
        }
    },
    methods:{

      submitForm(formName) {      
      this.$refs[formName].validate((valid) => {
        if (valid) {
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

    watch:{
        filtered(){
            console.log('hjjjj')
            this.$emit('filtered', this.filtered)
        }
    }
}
</script>