<template>
  <button v-if="stepIndex > 0" @click="$emit('prev')">Previous</button>
  <button v-if="stepIndex < stepCount - 1" @click="$emit('next')">Next</button>
  <button v-if="stepIndex == stepCount - 1" @click="$emit('create')">Create project</button>
</template>

<script>
export default {
  props: ['stepIndex', 'stepCount'],
  emits: ['next', 'prev', 'create']
}
</script>

<style>

</style>