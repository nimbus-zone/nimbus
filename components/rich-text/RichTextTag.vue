<script setup lang="ts">
defineProps<{
  tag: string
  text: string
}>()

// TODO create link to mentioned tag. Could reimplement dropdown with record author only tag
</script>

<template>
  <NuxtLink href="#">
    {{ text }}
  </NuxtLink>
</template>
