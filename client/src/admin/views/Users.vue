<template>
<div v-if="users.length!==0">
    <div class="flex" v-for="user in users" :key="user.id">
         <div v-for="user in users" :key="user.id">
        <h1>{{user.name}}</h1>
        <h4>{{user.country}}, {{user.city}}</h4>
        <ul><li>{{user.services}}</li></ul>
        <p>{{user.doctors}}</p>
        <img :src="user.photo" alt="user">
        <p>{{user.description}}</p>
        <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(user._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(user._id)" circle></el-button>
        </el-row>

        
        </div>{{user}}</div>
</div>
<h2 v-else>NO</h2>
    
</template>

<script>
export default {
    data(){
        return{
            type:'users',
            users:[],

        }
    },
    methods:{
    async updateInfo(){
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.users = info
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
