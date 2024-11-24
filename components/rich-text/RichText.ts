import type { RichtextSegment } from '@atcute/bluesky-richtext-segmenter'
import type { AppBskyRichtextFacet } from '@atcute/client/lexicons'
import { segmentize } from '@atcute/bluesky-richtext-segmenter'

interface Props {
  text: string
  facets?: AppBskyRichtextFacet.Main[]
}

function renderSegment(segment: RichtextSegment) {
  const feature = segment.features?.at(0)

  switch (feature?.$type) {
    case 'app.bsky.richtext.facet#link':
      return h('a', { href: feature.uri }, segment.text) // TODO use NuxtLink and better parse link (internal?)
    case 'app.bsky.richtext.facet#mention':
      return h('a', { href: feature.did }, segment.text) // TODO use NuxtLink and create proper profile link
    case 'app.bsky.richtext.facet#tag':
      return h('a', { href: feature.tag }, segment.text) // TODO use NuxtLink and create proper search links (dropdown author-specific tag?)
    default:
      return segment.text
  }
}

export default function RichText(props: Props) {
  const segments = segmentize(props.text, props.facets)

  return h('div', segments.map(renderSegment))
}
