<template>
    <div>
        <label>Choose documents to upload</label>
        <input type="file" @change="handleChange" ref="fileInput" multiple accept=".doc, .docx, .pdf"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            files: []
        }
    },

    methods: {
        handleChange() {
            this.files = this.$refs.fileInput.files
            this.$emit('getData', this.files)
        }
    },

    emits: ['getData']
}
</script>
<style>
    
</style>