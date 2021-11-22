<template>
<div  v-if="workingtimes.length!==0">
    <div class="flex" v-for="workingtime in workingtimes" :key="workingtime.id">
         <div v-for="workingtime in workingtimes" :key="workingtime.id">
        <h1>{{workingtime.name}}</h1>
        <h4>{{workingtime.country}}, {{workingtime.city}}</h4>
        <ul><li>{{workingtime.services}}</li></ul>
        <p>{{workingtime.doctors}}</p>
        <img :src="workingtime.photo" alt="workingtime">
        <p>{{workingtime.description}}</p>
        <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(workingtime._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(workingtime._id)" circle></el-button>
        </el-row>

        
        </div>{{workingtime}}</div>
</div>
<h2 v-else>NO</h2>

    
</template>

<script>
export default {
    data(){
        return{
            type:'workingtimes',
            workingtimes:[],

        }
    },
    methods:{
    async updateInfo(){
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.workingtimes = info
    }
    },
    beforeMount() {
        this.updateInfo()
    },
}
</script>
