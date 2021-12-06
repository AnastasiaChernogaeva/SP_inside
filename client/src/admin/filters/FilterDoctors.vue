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

            <el-form-item label="Post" >
                            <el-select
                                v-model="post"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="Choose post"
                            >
                                <el-option
                                v-for="item in posts"
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
                post:[],
                filter:{},
        }
    },
    methods:{
    reset(){
        this.name='';
        this.surname='';
        this.phone='';
        this.post=[];

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
        post(){
            this.filter['post']=this.post        
        },
        filtered(){   
            console.log('ff', this.filtered)   
            this.$emit('filtered', {filter:this.filter, info:this.filtered})
        },
    },
    computed:{
        filtered(){ let appropriateInf=this.info.filter(doctor =>{
          if(this.filter.name){
            return doctor.name.toLowerCase().includes(this.filter.name.toLowerCase())
          }
          else return doctor
        })
        .filter(doctor =>{
          if(this.filter.surname){
            return doctor.surname.toLowerCase().includes(this.filter.surname.toLowerCase())
          }
          else return doctor
        })
        .filter(doctor =>{
          if(this.filter.phone){
            return doctor.phone.includes(this.filter.phone)
          }
          else return doctor
        })
            return appropriateInf
        },

        posts(){
            let pposts=this.info.map(doc =>doc.post.toLowerCase())
            let arr=pposts.filter((elem, idx)=> pposts.indexOf(elem) === idx).map(elem => ({'value':elem, 'label':elem, }))

            return arr
        },
    }
}
</script>