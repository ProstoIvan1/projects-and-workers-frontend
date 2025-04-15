<template>
  <input type="text" v-model="name" @keyup="keyupTrigger" placeholder="Search" required>
  <select v-model="changedWorker" @change="$emit('getData', changedWorker)">
    <div v-for="worker in workers" :key="worker.id">
        <option :value="worker">{{ worker.firstName + " " + worker.lastName + " " + worker.patronymic }}</option>
    </div>
  </select>
</template>

<script>
import { getWorkers } from "../data/workerData.js"

export default {
    data() {
        return {
            name: "",
            changedWorker: 0,
            workers: []
        }
    },
    methods: {
        async keyupTrigger() {
            const data = await getWorkers(this.name)
            this.workers = data.workers
        }
    },

    async mounted() {
        const data = await getWorkers(this.name)
        this.workers = data.workers
    },

    emits: ['getData']
}
</script>

<style>

</style>