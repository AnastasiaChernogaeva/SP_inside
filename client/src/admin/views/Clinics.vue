<template>
<div v-if="clinics.length!==0">
    <div class="flex" v-for="clinic in clinics" :key="clinic.id">
        <h1>{{clinic.name}}</h1>
        <h4>{{clinic.country}}, {{clinic.city}}</h4>
        <ul><li>{{clinic.services}}</li></ul>
        <p>{{clinic.doctors}}</p>
        <img :src="clinic.photo" alt="clinic">
        <p>{{clinic.description}}</p>
        <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(clinic._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(clinic._id)" circle></el-button>
        </el-row>
        
        </div>
</div>
<h2 v-else>NO</h2>


    
</template>

<script>
export default {
    data(){
        return{
            type:'clinics',
            clinics:[],

        }
    },
    methods:{
    async updateInfo(){
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.clinics = info
    },
    async deleteInfo(id){
      await this.$store.dispatch('info/deleteItem', {type:this.type, id:id}, {root:true,})
      this.updateInfo()
    },
    },
    beforeMount() {
        this.updateInfo()
    },
}
</script>
