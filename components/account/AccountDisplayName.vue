<script setup lang="ts">
import type { AppBskyActorDefs } from '@atproto/api'

const { account, hideEmojis = false } = defineProps<{
  account: AppBskyActorDefs.ProfileView
  hideEmojis?: boolean
}>()
</script>

<template>
  <ContentRich
    :content="getDisplayName(account)"
    :emojis="account.emojis"
    :hide-emojis="hideEmojis"
    :markdown="false"
  />
</template>
