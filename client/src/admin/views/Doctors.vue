<template>
<div v-if="doctors.length!==0">
    <div v-for="doctor in doctors" :key="doctor.id">
         <div v-for="doctor in doctors" :key="doctor.id">
        <h1>{{doctor.name}}</h1>
        <h4>{{doctor.country}}, {{doctor.city}}</h4>
        <ul><li>{{doctor.services}}</li></ul>
        <p>{{doctor.doctors}}</p>
        <img :src="doctor.photo" alt="doctor">
        <p>{{doctor.description}}</p>

        
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

    },
    async beforeMount() {
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.doctors = info
    },
}
</script>
