<template>
<div>
    <h1>
        Search
    </h1>
    <!-- 
          ref="filtered"
          :model="filtered"
          class="demo-filtered"
     -->
      <el-form
          
            label-width="120px"
         
        >
            <el-form-item label="Name" prop="name">
                <el-input v-model="name" ></el-input>
            </el-form-item> 
            <!-- <el-form-item label="Country" prop="country">
                <el-input v-model="country" ></el-input>
            </el-form-item>  -->
            
            <el-form-item label="Country" >
                <el-select
                    v-model="co"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="Choose country"
                >
                    <el-option
                    v-for="item in countries"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
                <!-- <el-input v-model="country" ></el-input> -->
            </el-form-item> 

            <!-- <el-form-item label="City" prop="city">
                <el-input v-model="city" ></el-input>
            </el-form-item>  -->
            <!-- <el-form-item label="Services" prop="services">
                <el-input v-model="services" ></el-input>
            </el-form-item>  -->
            <el-form-item label="Doctors" prop="doctors">
                <el-input v-model="doctors" ></el-input>
            </el-form-item> 
            <el-form-item>
                <!-- <el-button class="icon" type="danger" icon="el-icon-close" @click="()=>resetForm('filtered')"></el-button> -->

                <el-button  type="danger"  @click="reset">Clear</el-button>
            </el-form-item>
      </el-form>
      <p>
          {{info}}
      </p>
      
      <p>
          {{countries}}
      </p>
      <p>
          {{services}}
      </p>
</div>
</template>
<script>
export default {
    emits:['filtered'],
    props:['info'],
    data(){
        return{
            // clinics
                name: '',
                co:[],
                se:[],
                // country:'',

                city:'',
                // services:'',
                doctors:'',
            // filtered:{
               
            // }
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
    reset(){
        this.name='';
        this.country='';
        this.city='';
        this.services='';
        this.doctors='';
    }
    },

    watch:{
        filtered(){   
            // if(this.filtered!=undefined)     
            this.$emit('filtered', this.filtered)
        },
    },
    computed:{
        filtered(){
               if(this.name || this.country || this.city ||this.services ||this.doctors){
                   return ({                       
                        name: this.name?this.name:'',
                        country: this.country?this.country:'',
                        city: this.city?this.city:'',
                        services: this.services?this.services:'',
                        doctors: this.doctors?this.doctors:'',
                   })
               }

        },
        countries(){
            let countriesS=this.info.map(clinic =>
                clinic.country)
            console.log('countriesS', countriesS)
            let reC = countriesS.map(elem => ({'value':elem, 'label':elem, }))
            return reC
        },
        services(){
            let servicesS=[...this.info.map(clinic =>
                clinic.services).concat()]
            console.log('servicesS', servicesS)
            // let reC = countriesS.map(elem => ({'value':elem, 'label':elem, }))
            return servicesS
        }
    }
}
</script>