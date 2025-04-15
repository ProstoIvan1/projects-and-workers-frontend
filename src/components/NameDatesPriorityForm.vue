<template>
    <div @change="$emit('getData', name, startDate, endDate, priority)">
        <label>Name:</label>
        <input type="text" v-model="name" required>
        
        <label>Start date:</label>
        <input type="date" v-model="startDate" required>

        <label>End date:</label>
        <input type="date" v-model="endDate" required>

        <label>Priority:</label>
        <input type="number" v-model="priority" required>
    </div>

</template>

<script>
export default {
    data() {
        return {
            name: '',
            startDate: new Date(),
            endDate: new Date(),
            priority: null
        }
    },

    emits: ['getData']
}
</script>

<style>

</style>