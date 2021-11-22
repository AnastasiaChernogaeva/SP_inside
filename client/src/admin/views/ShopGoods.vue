<template>
<div v-if="shopgoods.length!==0">
    <div v-for="shopgood in shopgoods" :key="shopgood.id">
         <div v-for="shopgood in shopgoods" :key="shopgood.id">
        <h1>{{shopgood.name}}</h1>
        <h4>{{shopgood.country}}, {{shopgood.city}}</h4>
        <ul><li>{{shopgood.services}}</li></ul>
        <p>{{shopgood.doctors}}</p>
        <img :src="shopgood.photo" alt="shopgood">
        <p>{{shopgood.description}}</p>

        
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
    }
    },
    beforeMount() {
        this.updateInfo()
    },
}
</script>
