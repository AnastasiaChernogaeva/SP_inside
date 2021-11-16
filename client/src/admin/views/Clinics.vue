<template>
    
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{

    },
    beforeMount() {
        this.$store.dispatch('info/addNew', this.login, {root:true,})
    },
}
</script>
