<template>
<div>
    <h1>
        Search
    </h1>
      <el-form
          
            label-width="120px"
         
        >
            <el-form-item label="Name" prop="name">
                <el-input v-model="name" ></el-input>
            </el-form-item> 
            
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
            <el-form-item>

                <el-button  type="danger"  @click="reset">Clear</el-button>
            </el-form-item>
      </el-form>
          <h3>Неотфильтрованные клиники:</h3>
       <p v-for="(filtr, idx) in info" :key="idx">
          <em>{{idx+1}}.&nbsp;<br>
          {{filtr.name}}</em>
          {{filtr.country}},{{filtr.city}}<br>
          <span v-for="(fl, idx) in filtr.services" :key="idx">{{fl}}&nbsp;</span><br>
          <span v-for="(d, idx) in filtr.doctors" :key="idx">{{d}}</span><br>

      </p>
          <h3>Отфильтрованные клиники:</h3>
          
       <p v-for="(filtr, idx) in filteredInfo" :key="idx">
          <em>{{idx+1}}.&nbsp;<br>
          {{filtr.name}}</em>
          {{filtr.country}},{{filtr.city}}<br>
          <span v-for="(fl, idx) in filtr.services" :key="idx">{{fl}}&nbsp;</span><br>
          <span v-for="(d, idx) in filtr.doctors" :key="idx">{{d}}</span><br>

      </p>

</div>
</template>
<script>
export default {
    data(){
        return{
                name: '',
                co:[],
                se:[],
                doc:[],
                info:[ 
                    { 
                        services: [ "X-ray", "Injection" ], 
                        doctors: [], 
                        _id: "61a0b74986aea54a609739bc", 
                        name: "Toronto Central Animal Clinic", 
                        country: "Canada",
                    }, 
                    {
                        services: [ "X-ray", "Injection" ],
                        doctors: [ "Leyla" ],
                        _id: "61a86e4664711450c4ee6796",
                        name: "r",
                        country: "r",
                    }, 
                    { 
                        services: [ "X-ray" ],
                        doctors: [ "Leyla" ],
                        _id: "61a89c0364711450c4ee6798",
                        name: "w",
                        country: "w",
                    } 
                ],
                filter:{},
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
        this.se=[];
        this.doc=[];
        this.filter={};
    }
    },

    watch:{
        name(){
            // if(this.name!=='')
            this.filter['name']=this.name
            // else
            // delete this.filter.name

            // let arrInfo = this.info.filter(elem => elem.name.includes( this.name))
            // // for(let i=0; i<arrInfo.length; i++ ){
            //     if(!this.filteredInformation.includes(...arrInfo))
            //     this.filteredInformation.push(...arrInfo)
            // }
            
            console.log('filter', this.filter)
        },
        co(){
            
            // if(this.co!==[])
            this.filter['co']=this.co
            // else
            // delete this.filter.co

            // let length = this.co.length
            // let arrInfo = []
            // for(let i=0; i<length; i++){
            //     arrInfo.push(this.info.filter(elem => elem.country === this.co[i]))  

            // }
            // for(let i=0; i<arrInfo.length; i++){
            //     if(!this.filteredInformation.includes(arrInfo[i]))
            //     this.filteredInformation.push(arrInfo[i])
            // console.log('...s', arrInfo[i])
            // }
            console.log('filter', this.filter)
            
        },
        se(){
            // if(this.se!==[])
            this.filter['se']=this.se            
            // else
            // delete this.filter.se

            console.log('filter', this.filter)

        },
        doc(){
            // if(this.doc!==[])
            this.filter['doc']=this.doc           
            // else
            // delete this.filter.doc

            console.log('filter', this.filter)

        }
    },

    computed:{
        filteredInfo(){
         let appropriateInf=this.info.filter(clinic =>{
          if(this.filter.name){
            return clinic.name.toLowerCase().includes(this.filter.name.toLowerCase())
          }
          else return clinic
        })
        .filter(clinic =>{
          if(this.filter.co){
            let cl
            this.filter.co.forEach(countryInFilter => {
                if(clinic.country.toLowerCase().includes(countryInFilter.toLowerCase()))
                 cl=clinic 
                })
            return cl
          }
          else return clinic
        })
        .filter(clinic =>{
          if(this.filter.se){
            let cl
            this.filter.se.forEach(s => {
                if(clinic.services.find(serv => {
                    return serv.toLowerCase().includes(s.toLowerCase())
                    }))
                 cl=clinic 
                })
            return cl
          }
          else return clinic
        })
        .filter(clinic =>{
          if(this.filter.doc){
            let cl
            this.filter.doc.forEach(docName => {
                if(clinic.doctors.find(doct => {
                    return doct.toLowerCase().includes(docName.toLowerCase())
                    }))
                 cl=clinic 
                })
            return cl
          }
          else return clinic
        })
            return appropriateInf
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
    }
// }
</script>