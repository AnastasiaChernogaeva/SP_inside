<template>
<div v-if="doctors.length!==0">
    <div class="flex" v-for="doctor in doctors" :key="doctor.id">
         <div v-for="doctor in doctors" :key="doctor.id">
        <h1>{{doctor.name}}</h1>
        <h4>{{doctor.country}}, {{doctor.city}}</h4>
        <ul><li>{{doctor.services}}</li></ul>
        <p>{{doctor.doctors}}</p>
        <img :src="doctor.photo" alt="doctor">
        <p>{{doctor.description}}</p>
        <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(doctor._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(doctor._id)" circle></el-button>
        </el-row>

        
        </div>{{doctor}}</div>
</div>
<h2 v-else>NO</h2>

    
</template>

<script>
export default {
    data(){
        return{
            type:'doctors',
            doctors:[],

        }
    },
    methods:{
    async updateInfo(){
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.doctors = info
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
