<template>
       <teleport to="body"> 
           <div class="modal-backdrop" @click="$emit('closeModal')">
             <div class="modal">
                 <keep-alive>
                    <component :is="'form-'+type" @click.stop :edit="edit" @edited="$emit('closeModal')" ></component>
                </keep-alive>
            </div>
          </div>
       </teleport> 
</template>
<script>
import AppModal from '../../ui/AppModal.vue'
import FormServices from "../forms/FormServices.vue"
import FormShopgoods from "../forms/FormShopgoods.vue"
import FormPets from "../forms/FormPets.vue"
import FormClinics from "../forms/FormClinics.vue"
import FormDoctors from "../forms/FormDoctors.vue"
import FormClients from "../forms/FormClients.vue"

// import FormCities from "../forms/FormServices.vue"
// import FormTreatments from "../forms/FormServices.vue"
// import FormWorkingtime from "../forms/FormServices.vue" @closeNow="close"


export default {
    emits:['closeModal'],
    props:['edit'],
    components:{
      AppModal,
      FormShopgoods,
      FormServices,
      FormPets,
      FormClinics,
      FormDoctors,
      FormClients
    //   FormCities,
    //   FormTreatments,
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
      let type = this.$route.path.split('/')[this.$route.path.split('/').length-1]

      if(type === 'clInfo')
        this.type = 'clients'
      else
        this.type = type
    },
}
</script>
