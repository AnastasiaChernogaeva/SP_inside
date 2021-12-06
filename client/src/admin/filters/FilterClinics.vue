<template>
<div>
    <h1>
        Search
    </h1>
      <el-form          
            label-width="120px"         
        >
            <el-form-item label="Name" prop="name">
                <el-input v-model="name" autofocus ></el-input>
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

       <!-- <h3>Неотфильтрованные клиники:</h3>
       <p v-for="(filtr, idx) in info" :key="idx">
          <em>{{idx+1}}.&nbsp;<br>
          {{filtr.name}}</em>
          {{filtr.country}},{{filtr.city}}<br>
          <span v-for="(fl, idx) in filtr.services" :key="idx">{{fl}}&nbsp;</span><br>
          <span v-for="(d, idx) in filtr.doctors" :key="idx">{{d}}</span><br>

      </p> -->
          <!-- <h3>Отфильтрованные клиники:</h3>
          
       <p v-for="(filtr, idx) in filtered" :key="idx">
          <em>{{idx+1}}.&nbsp;<br>
          {{filtr.name}}</em>
          {{filtr.country}},{{filtr.city}}<br>
          <span v-for="(fl, idx) in filtr.services" :key="idx">{{fl}}&nbsp;</span><br>
          <span v-for="(d, idx) in filtr.doctors" :key="idx">{{d}}</span><br>

      </p> -->
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
                filter:{},
        }
    },
    methods:{
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
            this.filter['name']=this.name
        },
        co(){
            this.filter['co']=this.co
        },
        se(){
            this.filter['se']=this.se        
        },
        doc(){
            this.filter['doc']=this.doc         
        },
        filtered(){   
            console.log('ff', this.filtered)   
            this.$emit('filtered', {filter:this.filter, info:this.filtered})
        },
    },
    computed:{
        filtered(){ let appropriateInf=this.info.filter(clinic =>{
          if(this.filter.name){
            return clinic.name.toLowerCase().includes(this.filter.name.toLowerCase())
          }
          else return clinic
        })
        .filter(clinic =>{
          if(this.filter.co&&this.filter.co.length>0){
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
          if(this.filter.se&&this.filter.se.length>0){
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
          if(this.filter.doc&&this.filter.doc.length>0){
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
</script>