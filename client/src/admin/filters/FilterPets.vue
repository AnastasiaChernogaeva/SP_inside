<template>
<div>
    <h1>
        Search
    </h1>
      <el-form          
            label-width="120px"         
        >
            <el-form-item label="Fullname" prop="fullname">
                <el-input v-model="fullname"  ></el-input>
            </el-form-item> 
            <el-form-item label="Nickname" prop="nickname">
                <el-input v-model="nickname" ></el-input>
            </el-form-item> 
            
           <el-form-item label="Kind" >
                <el-select
                    v-model="kind"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="Choose kind"
                >
                    <el-option
                    v-for="item in kinds"
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
                fullname: '',
                nickname: '',

                kind:[],
                // se:[],
                // doc:[],
                filter:{},
        }
    },
    methods:{
    reset(){
        this.fullname='';
        this.nickname='';

        this.kind=[];
        this.filter={};
    }
    },

    watch:{
        fullname(){
            this.filter['fullname']=this.fullname
        },
        nickname(){
            this.filter['nickname']=this.nickname
        },
        kind(){
            this.filter['kind']=this.kind        
        },
        filtered(){   
            // console.log('ff', this.filtered)   
            this.$emit('filtered', {filter:this.filter, info:this.filtered})
        },
    },
    computed:{
        filtered(){ 
        let appropriateInf=this.info.filter(pet =>{
          if(this.filter.fullname){
            return pet.fullname.toLowerCase().includes(this.filter.fullname.toLowerCase())
          }
          else return pet
        }).filter(pet =>{
          if(this.filter.nickname){
            return pet.nickname.toLowerCase().includes(this.filter.nickname.toLowerCase())
          }
          else return pet
        })
        .filter(pet =>{
          if(this.filter.kind&&this.filter.kind.length>0){
            let cl
            this.filter.kind.forEach(kindInFilter => {
                if(pet.kind.toLowerCase().includes(kindInFilter.toLowerCase()))
                 cl=pet 
                })
            return cl
          }
          else return pet
        })
            return appropriateInf
        },
        
        kinds(){
            let kKinds=this.info.map(pet =>pet.kind.toLowerCase())
            let arr=kKinds.filter((elem, idx)=> kKinds.indexOf(elem) === idx).map(elem => ({'value':elem, 'label':elem, }))

            return arr
        },

    }
}
</script>