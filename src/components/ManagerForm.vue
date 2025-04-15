<template>
  <div @change="$emit('getData', managerId)">
    <label>Choose the manager</label>
    
    <WorkerSearchBox @getData="setId"/>
  </div>
  <!--TBA-->
</template>

<script>
import WorkerSearchBox from './WorkerSearchBox.vue'

export default {
  data() {
    return {
      managerId: null
    }
  },
  components: {WorkerSearchBox},

  methods:{
    setId(id) {
      this.managerId = id
    }
  },

  emits: ['getData']
}
</script>

<style>

</style>