<script setup lang="ts">
defineProps<{
  text: string
  did: string
}>()

// TODO create link to mentioned profile. Could also have hover card
</script>

<template>
  <NuxtLink href="#">
    {{ text }}
  </NuxtLink>
</template>
