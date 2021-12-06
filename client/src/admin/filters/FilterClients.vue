<template>
<div>
    <h1>
        Search
    </h1>
      <el-form          
            label-width="120px"         
        >
            <el-form-item label="Name" prop="name">
                <el-input v-model="name"  ></el-input>
            </el-form-item> 
            
            <el-form-item label="Surame" prop="surname">
                <el-input v-model="surname"  ></el-input>
            </el-form-item> 

            <el-form-item label="Phone" prop="phone">
                <el-input v-model="phone"  ></el-input>
            </el-form-item> 
            <el-form-item>

                <el-button  type="danger"  @click="reset">Clear</el-button>
            </el-form-item>
      </el-form>
  <hr>

</div>
</template>
<script>
export default {
    emits:['filtered'],
    props:['info'],
    data(){
        return{
                name: '',
                surname:'',
                phone:'',
                filter:{},
        }
    },
    methods:{
    reset(){
        this.name='';
        this.surname='';
        this.phone='';
        this.filter={};
    }
    },

    watch:{
        name(){
            this.filter['name']=this.name
        },
        surname(){
            this.filter['surname']=this.surname
        },
        phone(){
            this.filter['phone']=this.phone        
        },
        filtered(){   
            console.log('ff', this.filtered)   
            this.$emit('filtered', {filter:this.filter, info:this.filtered})
        },
    },
    computed:{
        filtered(){ let appropriateInf=this.info.filter(client =>{
          if(this.filter.name){
            return client.name.toLowerCase().includes(this.filter.name.toLowerCase())
          }
          else return client
        })
        .filter(client =>{
          if(this.filter.surname){
            return client.surname.toLowerCase().includes(this.filter.surname.toLowerCase())
          }
          else return client
        })
        .filter(client =>{
          if(this.filter.phone){
            return client.phone.includes(this.filter.phone)
          }
          else return client
        })
            return appropriateInf
        },

    }
}
</script>