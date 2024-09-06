<script setup lang="ts">

const { data: oldDat } = useNuxtData('mountains') // always null

const { data, refresh, status } = await useAsyncData(
  'mountains',
  () => $fetch('http://localhost:3000/content'),
)

console.log('new Data', data.value)
</script>


<template>
  <div>
    <button @click="() => refresh()">Refresh data</button>
    <pre>{{ { status } }}</pre>
    <span v-html="data"></span>
  </div>
</template>
