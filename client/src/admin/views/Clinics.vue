<template>
<div v-if="clinics.length!==0">
    <div v-for="clinic in clinics" :key="clinic.id">
        <h1>{{clinic.name}}</h1>
        <h4>{{clinic.country}}, {{clinic.city}}</h4>
        <ul><li>{{clinic.services}}</li></ul>
        <p>{{clinic.doctors}}</p>
        <img :src="clinic.photo" alt="clinic">
        <p>{{clinic.description}}</p>

        
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

    },
    async beforeMount() {
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.clinics = info
    },
}
</script>
