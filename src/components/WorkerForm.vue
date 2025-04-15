<template>
  <div>
    <label>Choose the workers</label>
    <WorkerSearchBox @getData="handleGetData"/>
    <div v-for="worker in workers" :key="worker.id">
      <p>{{ worker.firstName + " " + worker.lastName + " " + worker.patronymic }}</p>
      <button @click="remove(worker)">Remove</button>
    </div>

  </div>
  <!--TBA-->
</template>

<script>
import WorkerSearchBox from './WorkerSearchBox.vue'

export default {
    components: {WorkerSearchBox},
    data() {
        return {
            workers: []
        }
    },

    methods: {
      handleGetData(worker) {
        if(!this.isAdded(worker.id))
        {
            this.workers.push(worker)
            this.$emit('getData', this.workers)        
        }

      },

      isAdded(workerId) {
        for (let i = 0; i < this.workers.length; i++) {
          const worker = this.workers[i];
          
          if (worker.id === workerId)
            return true
        }

        return false
      },

      remove(worker) {
        const i = this.workers.indexOf(worker)
        if (i >= 0)
        {
          this.workers.splice(i, 1)
          this.$emit('getData', this.workers)
        }
      }
    },

    emits: ['getData']
}
</script>

<style>

</style>