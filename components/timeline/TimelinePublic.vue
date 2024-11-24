<script setup lang="ts">
import type { mastodon } from 'masto'

const paginator = await useMastoClient().app.bsky.feed.getFeed(
  {
    feed: 'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot',
    limit: 30,
  },
).then(res => res.data)

const stream = useStreaming(client => client.public.subscribe())
function reorderAndFilter(items: mastodon.v1.Status[]) {
  return reorderedTimeline(items, 'public')
}
</script>

<template>
  <div>
    <TimelinePaginator v-bind="{ paginator, stream }" :preprocess="reorderAndFilter" context="public" />
  </div>
</template>
