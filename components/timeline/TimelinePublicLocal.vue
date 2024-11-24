<script setup lang="ts">
const paginator = await useMastoClient().app.bsky.feed.getFeed(
  {
    feed: 'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot',
    limit: 30,
  },
  // {
  //   headers: {
  //     'Accept-Language': preferredLanguages,
  //   },
  // },
).then(res => res.data)

const stream = useStreaming(client => client.public.local.subscribe())
</script>

<template>
  <div>
    <TimelinePaginator v-bind="{ paginator, stream }" context="public" />
  </div>
</template>
