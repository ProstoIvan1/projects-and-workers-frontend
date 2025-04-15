<template>
    <div @change="$emit('getData', customer, performer)">
        <label>Customer</label>
        <input v-model="customer" type="text" required>
        
        <label>Performer</label>
        <input v-model="performer" type="text" required>        
    </div>
</template>

<script>
export default {
    data() {
        return {
            customer: '',
            performer: ''
        }
    },

    emits: ['getData']
}
</script>

<style>

</style>