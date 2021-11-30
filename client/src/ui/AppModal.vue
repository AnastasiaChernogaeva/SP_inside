<template>
  <div class="modal-backdrop" @click="$emit('close')">
      <div class="modal">
          <slot @edited="clOOse"/>
      </div>
  </div>
</template>

 <script>
export default {
  emits:['close',],
  methods:{
    clOOse(){
      this.$emit('close')
      // console.log('CLOSECLOSECLOSE')
    }
  }
}
</script>