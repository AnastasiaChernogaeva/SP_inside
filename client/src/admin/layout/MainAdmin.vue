<template>
<div>
       <router-view></router-view>
       <teleport to="body"> 
        <app-modal v-if="modal" @close="modal = false" >
          <keep-alive>
             <component :is="'editing-'+type" @click.stop @added="modal = false"></component>
          </keep-alive>
        </app-modal>
       </teleport> 
</div>
</template>
<script>
import AppModal from '../../ui/AppModal.vue'

export default {
    components:{
      AppModal,
    },
    data(){
        return{
            type:'',
            modal:false,
        }
    },
    beforeMount() {
        this.type = this.$route.path.split('/')[this.$route.path.split('/').length-1]
        console.log(this.type)
    },
}
</script>
