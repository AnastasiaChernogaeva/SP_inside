<template>
  <div class="modal-backdrop" @click="$emit('close')">
      <div class="modal">
          <slot/>
      </div>
  </div>
</template>

 <script>
export default {
  emits:['close',],
}
</script>