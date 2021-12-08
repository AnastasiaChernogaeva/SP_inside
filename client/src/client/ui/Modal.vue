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


export default {
    emits:['closeModal'],
    props:['edit'],
    components:{
    },
    data(){
        return{
            type:'',
        }
    },
    methods:{
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
