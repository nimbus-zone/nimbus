// this is just some hardcoded WIP dummy data

import type { AppBskyFeedPost } from '@atcute/client/lexicons'

export const bskyRecordWithRichText = {
  $type: 'app.bsky.feed.post',
  createdAt: '2024-11-24T07:53:52.540Z',
  embed: {
    $type: 'app.bsky.embed.external',
    external: {
      description: '',
      title: '',
      uri: 'https://github.com/es-tooling/module-replacements/blob/main/docs/modules/grapheme.md',
    },
  },
  facets: [
    {
      features: [
        {
          $type: 'app.bsky.richtext.facet#tag',
          tag: 'Unicode',
        },
      ],
      index: {
        byteEnd: 96,
        byteStart: 88,
      },
    },
    {
      $type: 'app.bsky.richtext.facet',
      features: [
        {
          $type: 'app.bsky.richtext.facet#mention',
          did: 'did:plc:vr6isybvv4ixzvo6qf4w2q66',
        },
      ],
      index: {
        byteEnd: 142,
        byteStart: 133,
      },
    },
    {
      features: [
        {
          $type: 'app.bsky.richtext.facet#link',
          uri: 'https://github.com/es-tooling/module-replacements/blob/main/docs/modules/grapheme.md',
        },
      ],
      index: {
        byteEnd: 186,
        byteStart: 160,
      },
    },
  ],
  langs: [
    'en',
  ],
  text: 'unicode-segmenter has recently become even smaller. It only takes 5.3 KB to be aware of #Unicode graphemes, like emojis!\n\nAnd is now @e18e.dev recommendation!\n\ngithub.com/es-tooling/m...',
} as AppBskyFeedPost.Record
