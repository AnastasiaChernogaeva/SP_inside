<template>
<div>
    <h1>
        <!-- USER -->
        {{client}}
        
    </h1>
</div>
</template>
<script>
export default {
    data(){
        return{
            client:{}
        }
    },
    async beforeMount() {
        // let userId = await this.$store.state.auth.infoId
        let clients = await this.$store.dispatch('info/getInfo',{type:'clients'})
        this.client= clients.find(user=>user._id === this.$store.state.auth.infoId)
        // let clientsFull = await this.$store.dispatch('info/getInfo', {type:'clients'})
        // let inf = clientsFull.find(elem => elem,_id === clieNt.infoId)
        // console.log(inf)

    },
}
</script>