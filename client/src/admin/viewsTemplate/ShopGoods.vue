<template>
<div v-if="shopgoods.length!==0">
    <div class="flex" v-for="shopgood in shopgoods" :key="shopgood.id">
         <div v-for="shopgood in shopgoods" :key="shopgood.id">
        <h1>{{shopgood.name}}</h1>
        <h4>{{shopgood.country}}, {{shopgood.city}}</h4>
        <ul><li>{{shopgood.services}}</li></ul>
        <p>{{shopgood.doctors}}</p>
        <img :src="shopgood.photo" alt="shopgood">
        <p>{{shopgood.description}}</p>
        <el-row>
            <el-button class="icon" type="primary" icon="el-icon-edit"  @click="()=>editInfo(shopgood._id)" circle></el-button>
            <el-button class="icon" type="danger" icon="el-icon-delete"  @click="()=>deleteInfo(shopgood._id)" circle></el-button>
        </el-row>

        
        </div>{{shopgood}}</div>
</div>
<h2 v-else>NO</h2>

    
</template>

<script>
export default {
    data(){
        return{
            type:'shopgoods',
            shopgoods:[],

        }
    },
    methods:{
    async updateInfo(){
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.shopgoods = info
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
