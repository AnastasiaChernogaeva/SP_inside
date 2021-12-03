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
            </el-form-item> 
            <el-form-item label="Services" >
                <el-select
                    v-model="se"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="Choose services"
                >
                    <el-option
                    v-for="item in services"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="Doctors" >
                <el-select
                    v-model="doc"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="Choose doctors"
                >
                    <el-option
                    v-for="item in doctors"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item> 

            <!-- <el-form-item label="City" prop="city">
                <el-input v-model="city" ></el-input>
            </el-form-item>  -->
            <!-- <el-form-item label="Services" prop="services">
                <el-input v-model="services" ></el-input>
            </el-form-item>  -->
            <!-- <el-form-item label="Doctors" prop="doctors">
                <el-input v-model="doctors" ></el-input>
            </el-form-item>  -->
            <el-form-item>
                <!-- <el-button class="icon" type="danger" icon="el-icon-close" @click="()=>resetForm('filtered')"></el-button> -->

                <el-button  type="danger"  @click="reset">Clear</el-button>
            </el-form-item>
      </el-form>
      <!-- <p>
          {{info}}
      </p>
      
      <p>
          {{countries}}
      </p>
      <p>
          {{services}}
      </p> -->
     <!-- <p>{{doctors}}</p> -->
     <!-- <p>{{filtered}}</p> -->
     <!-- <p v-for="inf in info" :key="inf._id">{{inf}}</p> -->
     <!-- <div v-for="(no, idx) in filteredInformation" :key="idx">
         <em>
             <p>
                 <b>{{idx+1}}. &nbsp;</b> 
                 <span>{{no}}</span>

             </p>
         </em>
     </div> -->

     <p>{{info}}</p>



</div>
</template>
<script>
export default {
    emits:['filtered'],
    props:['info'],
    data(){
        return{
                name: '',
                co:[],
                se:[],
                doc:[],
                city:'',
                filteredInformation:[],
                // country:'',
                // services:'',
                // doctors:'',
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
        this.co=[];
        this.city='';
        this.se=[];
        this.doc=[];
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
            //    if(this.name || this.co|| this.se ||this.doc){
                //    let arr =[]
                //     if(this.name!==''){
                //        arr=this.info.filter(elem => elem.name.includes(this.name))
                //        arr.forEach(item => {
                //            if(!this.filteredInformation.includes(item))
                //             this.filteredInformation.push(...arr)
                //        })
                       
                //        return arr
                //     }
                //     else if(this.name===''){}
                //     if(this.co!==[]){
                //         this.co.forEach(element => {
                //             // arr=this.info.filter(elem => elem.country.includes(element))
                //             arr=this.info.filter(elem => elem.country.includes(element))
                //             this.filteredInformation.push(...arr)


                //         });                       
                //        return arr
                //    }
                //     if(this.se!==[]){
                //         this.se.forEach(element => {
                //             arr=this.info.filter(elem => elem.country.includes(element))
                //             this.filteredInformation.push(...arr)
                            
                //         });                       
                //        return arr
                //    }
                //     if(this.doc!==[]){
                //         this.doc.forEach(element => {
                //             arr=this.info.filter(elem => elem.country.includes(element))
                //             this.filteredInformation.push(...arr)

                //         });                       
                //        return arr
                //    }
                //   let inTh=this.info.includes({                       
                //         name: this.name?this.name:'',
                //         co: this.co?this.co:'',
                //         // city: this.city?this.city:'',
                //         se: this.se?this.se:'',
                //         doc: this.doc?this.doc:'',
                //    })
                //    console.log('inTh', arr)
                //    return false
                //    return ({                       
                //         name: this.name?this.name:'',
                //         co: this.co?this.co:'',
                //         // city: this.city?this.city:'',
                //         se: this.se?this.se:'',
                //         doc: this.doc?this.doc:'',
                //    })



                
                // let arr = this.info.slice().filter((elem)=>{
                //     this.name!==''&&elem.name==this.name
                //     this.se!==[]&&this.se.filter(s=>elem.services.map(ser=> ser===s ))
                //     this.doc!==[]&&this.doc.filter(s=>elem.services.map(ser=> ser===s ))
                //     this.co!==[]&&this.co.filter(s=>elem.services.map(ser=> ser===s ))


                // })
                // return arr

               }

        },
        countries(){
            let countriesS=this.info.map(clinic =>clinic.country).map(elem => ({'value':elem, 'label':elem, }))
            return countriesS
        },
        services(){
            let arr = this.info.map(clinic =>clinic.services).flat()
            let servicesS=arr.filter((elem, idx)=> arr.indexOf(elem) === idx).map(elem => ({'value':elem, 'label':elem, }))

            return servicesS
        },
        doctors(){
            let arr = this.info.map(clinic =>clinic.doctors).flat()
            let doctorsS=arr.filter((elem, idx)=> arr.indexOf(elem) === idx).map(elem => ({'value':elem, 'label':elem, }))

            return doctorsS
        }
    }
// }
</script>