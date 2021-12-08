<template>
    <div class="card container">
     <el-form
    ref="appointment"
    :model="appointment"
    :rules="rules"
    label-width="120px"
    class="demo-appointment"
  >
    <el-form-item label="Name" prop="client.name">
      <el-input v-model="appointment.name" ></el-input>
    </el-form-item> 
    <el-form-item label="Surname" prop="client.surname">
      <el-input v-model="appointment.surname" ></el-input>
    </el-form-item> 
    <!-- <el-form-item label="Pet" prop="client.pets">
      <el-input v-model="appointment.surname" ></el-input>
    </el-form-item>  -->

    <el-form-item>
      <el-button type="primary" @click="submitForms"
        >Save</el-button
      >
      <el-button @click="reset">Reset</el-button>

    </el-form-item>
  </el-form>
  <hr>
    </div>
</template>
<script>
export default {
    data(){
        return{
            user:'',
            clinic:{},
            client:{},
            appointment:{
                name:'',
                surname:'',
                petFullName:'',

            },
            rules:{

            },
        }
    },
    async beforeMount() {
        let clients = await this.$store.dispatch('info/getInfo',{type:'users'})
        let clieNt = clients.find(user=>user.username === this.$store.state.auth.activeUser)
        let clientsFull = await this.$store.dispatch('info/getInfo', {type:'clients'})
        let inf = clientsFull.find(elem => elem,_id === clieNt.infoId)
        this.client = {authInfo:{...clieNt}, fullInfo:{...inf}}
        let arrCl = await this.$store.dispatch('info/getInfo',{type:'clinics'})
        this.clinic = arrCl.find(el => el._id === this.$route.params.id)
        //clients loading==> найти того клиента ==> инфо про него ==> животные ==> врачи ==> время работы ==> кнопка записи
        //после записи маленькая бумага с чеком
        // console.log('clinic Id',this.$route.params.id)
        console.log('clinic',this.clinic)
        console.log('client',this.client)


    },
}
</script>