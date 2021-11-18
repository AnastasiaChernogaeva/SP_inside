<template>
<div v-if="services.length!==0">
    <div v-for="service in services" :key="service.id">
         <div v-for="service in services" :key="service.id">
        <h1>{{service.name}}</h1>
        <h4>{{service.country}}, {{service.city}}</h4>
        <ul><li>{{service.services}}</li></ul>
        <p>{{service.doctors}}</p>
        <img :src="service.photo" alt="service">
        <p>{{service.description}}</p>

        
        </div>{{service}}</div>
</div>
<h2 v-else>NO</h2>

    
</template>

<script>
export default {
    data(){
        return{
            type:'services',
            services:[],

        }
    },
    methods:{

    },
    async beforeMount() {
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.services = info
    },
}
</script>
