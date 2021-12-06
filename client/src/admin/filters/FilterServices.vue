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
            <el-form-item label="Min Price" prop="minNum">
                <el-input-number v-model="minNum" :precision="2" :step="0.1"  :min="0"/>
            </el-form-item>
            
            <el-form-item label="Max Price" prop="maxNum">
                <el-input-number v-model="maxNum" :precision="2" :step="0.1"  :min="0"/>
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
                minNum:10,
                maxNum:9000,

                filter:{},
        }
    },
    methods:{
    reset(){
        this.name='';
        this.minNum=10;
        this.maxNum=9000;
        this.filter={};
    }
    },

    watch:{
        name(){
            this.filter['name']=this.name
        },
        minNum(){
            this.filter['minNum']=this.minNum
        },
        maxNum(){
            this.filter['maxNum']=this.maxNum
        },
        filtered(){   
            console.log('ff', this.filtered)   
            this.$emit('filtered', {filter:this.filter, info:this.filtered})
        },
    },
    computed:{
        filtered(){ let appropriateInf=this.info.filter(service =>{
          if(this.filter.name){
            return service.name.toLowerCase().includes(this.filter.name.toLowerCase())
          }
          else return service
        })
        .filter(service =>{
          if(this.filter.minNum){
            return (service.price*1)>=this.filter.minNum
          }
          else return service
        })
        .filter(service =>{
          if(this.filter.maxNum){
            return (service.price*1)<=this.filter.maxNum
          }
          else return service
        })
            return appropriateInf
        },

        // serviceNames(){
        //     let arr = this.info.map(service =>service.name).map(elem => ({'value':elem, 'label':elem, }))
        //     // let servicesS=arr.filter((elem, idx)=> arr.indexOf(elem) === idx).map(elem => ({'value':elem, 'label':elem, }))
        //     return arr
        // },
     
    }
}
</script>