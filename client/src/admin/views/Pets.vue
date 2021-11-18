<template>
<div v-if="pets.length!==0">
    <div v-for="pet in pets" :key="pet.id">
         <div v-for="pet in pets" :key="pet.id">
        <h1>{{pet.name}}</h1>
        <h4>{{pet.country}}, {{pet.city}}</h4>
        <ul><li>{{pet.services}}</li></ul>
        <p>{{pet.doctors}}</p>
        <img :src="pet.photo" alt="pet">
        <p>{{pet.description}}</p>

        
        </div>{{pet}}</div>
</div>
<h2 v-else>NO</h2>

    
</template>

<script>
export default {
    data(){
        return{
            type:'pets',
            pets:[],

        }
    },
    methods:{

    },
    async beforeMount() {
        const info = await this.$store.dispatch('info/getInfo', {type:this.type}, {root:true,})
        if(info)
        this.pets = info
    },
}
</script>
