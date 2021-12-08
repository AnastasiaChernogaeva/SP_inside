<template>
<div>
    <h1>
        USER
        {{client}}
        
    </h1>
</div>
</template>
<script>
export default {
    data(){
        return{
            clinet:{}
        }
    },
    async beforeMount() {
        let clients = await this.$store.dispatch('info/getInfo',{type:'users'})
        console.log(clients)
        // let clieNt = clients.find(user=>user.username === this.$store.auth.state.activeUser)
        // let clientsFull = await this.$store.dispatch('info/getInfo', {type:'clients'})
        // let inf = clientsFull.find(elem => elem,_id === clieNt.infoId)
        // console.log(inf)
        // this.client = inf

    },
}
</script>