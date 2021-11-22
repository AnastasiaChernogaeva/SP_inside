<template>
  <el-row>
                  <el-button class="icon" type="primary" icon="el-icon-edit"  @click="editInfo" circle></el-button>
                  <el-button class="icon" type="danger" icon="el-icon-delete"  @click="deleteInfo" circle></el-button>
  </el-row>
</template>
// <script>
export default {
  emits:['edited', 'deleted'],
  data:{
    // return {}
  },
  methods:{
    editInfo(){
      this.$emit('edited')
    },
    deleteInfo(){
      this.$emit('deleted')
    },

  }

}
</script>