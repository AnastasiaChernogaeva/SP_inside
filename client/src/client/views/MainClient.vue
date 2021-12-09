<template>
<div>
    <h1>
        <!-- USER -->
        {{client}}

        
    </h1>
    <div class="avatar">
      <el-avatar
        :size="60"
        :src="client.photo"
      ></el-avatar>
      <h4>{{client.name}}<br/>
      {{client.surname}}</h4>


    </div>
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
<style scoped>

    .avatar{
            text-align: center;
    }
    /* span.el-avatar.el-avatar--large.el-avatar--circle {
    width: 70px;
    height: 70px;
} */
    
</style>