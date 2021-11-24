<template>
       <teleport to="body"> 
        <app-modal @close="$emit('closeModal')" >
          <keep-alive>
             <component :is="'form-'+type" @click.stop :edit="edit" @edited="$emit('edited')" ></component>
          </keep-alive>
        </app-modal>
       </teleport> 
</template>
<script>
import AppModal from '../../ui/AppModal.vue'
import FormServices from "../forms/FormServices.vue"
// import FormCities from "../forms/FormServices.vue"
// import FormClinics from "../forms/FormServices.vue"
// import FormDoctors from "../forms/FormServices.vue"
// import FormPets from "../forms/FormServices.vue"
// import FormShopgoods from "../forms/FormServices.vue"
// import FormTreatments from "../forms/FormServices.vue"
// import FormUsers from "../forms/FormServices.vue"
// import FormWorkingtime from "../forms/FormServices.vue" @closeNow="close"


export default {
    emits:['closeModal', 'edited'],
    props:['edit'],
    components:{
      AppModal,
      FormServices,
    //   FormCities,
    //   FormClinics,
    //   FormDoctors,
    //   FormPets,
    //   FormShopgoods,
    //   FormTreatments,
    //   FormUsers,
    //   FormWorkingtime
    },
    data(){
        return{
            type:'',
            // modal:false,
        }
    },
    methods:{
      // close(){
      //   this.$emit('closeModal') 
      //   console.log('Modal')
      // }
    },
    beforeMount() {
        this.type = this.$route.path.split('/')[this.$route.path.split('/').length-1]
    },
}
</script>
