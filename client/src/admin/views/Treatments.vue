<template>
<div v-if="treatments.length!==0">
    <div v-for="treatment in treatments" :key="treatment.id">
         <div v-for="treatment in treatments" :key="treatment.id">
        <h1>{{treatment.name}}</h1>
        <h4>{{treatment.country}}, {{treatment.city}}</h4>
        <ul><li>{{treatment.services}}</li></ul>
        <p>{{treatment.doctors}}</p>
        <img :src="treatment.photo" alt="treatment">
        <p>{{treatment.description}}</p>

        
        </div>{{treatment}}</div>
</div>
<h2 v-else>NO</h2>

    
</template>

<script>
export default {
    data(){
        return{
            type:'treatments',
            treatments:[],

        }
    },
    methods:{

    },
    async beforeMount() {
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)        
        this.treatments = info
    },
}
</script>
