<script setup lang="ts">
defineProps<{
  tag: string
  text: string
}>()

// TODO reimplement dropdown with record author only tag / mute tag
</script>

<template>
  <NuxtLink :to="`/hashtag/${tag}`">
    {{ text }}
  </NuxtLink>
</template>
