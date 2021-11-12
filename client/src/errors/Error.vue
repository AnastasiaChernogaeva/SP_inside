<template>
          <el-button :plain="true" @click="open">error</el-button>    
</template>
<script>
export default {
    methods:{
        open(){
        ElMessage({
        showClose: true,
        message: 'Oops, this is a error message.',
        type: 'error',
      })
        }
    }
}
</script>
