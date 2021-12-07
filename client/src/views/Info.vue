<template>
<div class="card container">
    <div>
       <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item, idx)  in photos" :key="idx" >
        <img :src="item" alt="animal">
        </el-carousel-item>
    </el-carousel>
    </div>
    <br>
    <br>
    <h1 class="center">
        Clinics
    </h1>
    <div v-if="search&&filtered&&search&&searchedClinics.length!==0">
    <div class="border" v-for="clinic in searchedClinics" :key="clinic._id">
        <h1>{{clinic.name}}</h1>
        <h4>{{clinic.country}}, {{clinic.city}}</h4>
        
        <h3>Services:</h3>
        <ul v-if="clinic.services.length!==0"><li v-for="serv in clinic.services" :key="serv">{{serv}}</li></ul>
        <p v-else>No</p>

        <h3>Doctors:</h3>
        <ul v-if="clinic.doctors.length!==0"><li v-for="doc in clinic.doctors" :key="doc">{{doc}}</li></ul>
        <p v-else>No</p>
        
        
        <img class="clinics" :src="clinic.photo" alt="clinic">

        <h3>About the clinic:</h3>
        <p>{{clinic.description}}</p>
        <div class="appointmentButton"> <el-button type="danger" plain @click="()=>makeAnAppointment(clinic._id)">Make an appointment</el-button></div> 

        
        </div>
</div>
<!-- <div v-else-if="!search&&!filtered&&clinics.length!==0"> -->
<div v-else-if="!filtered&&clinics.length!==0">
  
    <div class="border" v-for="clinic in clinics" :key="clinic._id">
        <h1>{{clinic.name}}</h1>
        <h4>{{clinic.country}}, {{clinic.city}}</h4>
        
        <h3>Services:</h3>
        <ul v-if="clinic.services.length!==0"><li v-for="serv in clinic.services" :key="serv">{{serv}}</li></ul>
        <p v-else>No</p>

        <h3>Doctors:</h3>
        <ul v-if="clinic.doctors.length!==0"><li v-for="doc in clinic.doctors" :key="doc">{{doc}}</li></ul>
        <p v-else>No</p>
        
        
        <img class="clinics" :src="clinic.photo" alt="clinic">

        <h3>About the clinic:</h3>
        <p>{{clinic.description}}</p>
          <div class="appointmentButton"> <el-button type="danger" plain @click="()=>makeAnAppointment(clinic._id)">Make an appointment</el-button></div> 
        
        
        </div>
</div>
<h2 v-else>NO</h2>

</div>
    

</template>
<script>
export default {
    data(){
        return{
            clinics:[],
            searchedClinics:[],
            search:false,
            filtered:false,
            // photos:[],
            photos:['https://forevervets.com/wp-content/uploads/bb-plugin/cache/mobile-dog-panorama.jpg', 'https://gaapp.org/wp-content/uploads/2021/05/Katze_1000x500.jpg', 'https://content.alphapaw.com/wp-content/uploads/2020/12/Hot-Spots-on-Dogs-Causes-Treatment-Pre....jpg', 'https://www.hamptonvetcentre.co.uk/wp-content/uploads/sites/12/2017/12/Misc-3-1000x500.jpg', 'https://advancedpetvet.com/wp-content/uploads/bb-plugin/cache/Advanced-Care-12-3-2019-6814-edit-panorama.jpg', 'https://www.winsfordvets.co.uk/wp-content/uploads/sites/10/2017/02/Emergency-care-1000x500.jpg', 'https://meowwiki.com/images/cat-cancer-treatment-1000x500.jpg' ],
            appointment:false,

        }
    },
    methods:{
        makeAnAppointment(id){
            this.appointment=true
            console.log("clinic id", id)
        }
    },
    async beforeMount() {
        this.clinics = await this.$store.dispatch('info/getInfo', {type:'clinics'}, {root:true,})
        // this.photos = await this.$store.info.state.photos
    },
    

}
</script>
<style scoped>
.clinics{
        background:lightgray;
}
.el-carousel{
    height:500px;
}
.el-carousel__item{
        /* overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center; */
    width: 100%; /* Ширина области */
    height: 500px; /* Высота области */
    margin: 0; /* Обнуляем отступы */
    overflow: hidden; /* Прячем всё за пределами */
    min-width: 600px;
}
.el-carousel-item img{
     /* height: 100%;
     width: auto; */
    width: 100%; 
    margin: -10% 0 0 0; 
}
.appointmentButton{
    text-align: center;
}
/* button.el-carousel__arrow{
    top:82%;
} */
</style>