import type { Emoji, EmojiMartData } from '@emoji-mart/data'
import type { SuggestionOptions } from '@tiptap/suggestion'
import type { GetReferenceClientRect, Instance } from 'tippy.js'
import type { Component } from 'vue'
import { VueRenderer } from '@tiptap/vue-3'
import { PluginKey } from 'prosemirror-state'
import tippy from 'tippy.js'
import TiptapEmojiList from '~/components/tiptap/TiptapEmojiList.vue'
import TiptapHashtagList from '~/components/tiptap/TiptapHashtagList.vue'
import TiptapMentionList from '~/components/tiptap/TiptapMentionList.vue'

export type { Emoji }

export const TiptapMentionSuggestion: Partial<SuggestionOptions> = import.meta.server
  ? {}
  : {
      pluginKey: new PluginKey('mention'),
      char: '@',
      async items({ query }) {
        if (query.length === 0)
          return []

        const paginator = useMastoClient().v2.search.list({ q: query, type: 'accounts', limit: 25, resolve: true })
        return (await paginator.next()).value?.accounts ?? []
      },
      render: createSuggestionRenderer(TiptapMentionList),
    }

export const TiptapHashtagSuggestion: Partial<SuggestionOptions> = {
  pluginKey: new PluginKey('hashtag'),
  char: '#',
  async items({ query }) {
    if (query.length === 0)
      return []

    const paginator = useMastoClient().v2.search.list({
      q: query,
      type: 'hashtags',
      limit: 25,
      resolve: false,
      excludeUnreviewed: true,
    })
    return (await paginator.next()).value?.hashtags ?? []
  },
  render: createSuggestionRenderer(TiptapHashtagList),
}

export const TiptapEmojiSuggestion: Partial<SuggestionOptions> = {
  pluginKey: new PluginKey('emoji'),
  char: ':',
  async items({ query }): Promise<Emoji[]> {
    if (import.meta.server || query.length === 0)
      return []

    const lowerCaseQuery = query.toLowerCase()

    const { data } = await useAsyncData<EmojiMartData>('emoji-data', () => import('@emoji-mart/data').then(r => r.default as EmojiMartData))
    const emojis: Emoji[] = Object.values(data.value?.emojis || []).filter(({ id }) => id.toLowerCase().startsWith(lowerCaseQuery))

    return emojis
  },
  command: ({ editor, props, range }) => {
    const emoji: Emoji = props.emoji
    editor.commands.deleteRange(range)
    const skin = emoji.skins.find(skin => skin.native !== undefined)
    if (skin)
      editor.commands.insertEmoji(skin.native)
  },
  render: createSuggestionRenderer(TiptapEmojiList),
}

function createSuggestionRenderer(component: Component): SuggestionOptions['render'] {
  return () => {
    let renderer: VueRenderer
    let popup: Instance

    return {
      onStart(props) {
        renderer = new VueRenderer(component, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect)
          return

        popup = tippy(document.body, {
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
          appendTo: () => document.body,
          content: renderer.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      // Use arrow function here because Nuxt will transform it incorrectly as Vue hook causing the build to fail
      onBeforeUpdate: (props) => {
        if (props.editor.isFocused)
          renderer.updateProps({ ...props, isPending: true })
      },

      onUpdate(props) {
        if (!props.editor.isFocused)
          return

        renderer.updateProps({ ...props, isPending: false })

        if (!props.clientRect)
          return

        popup?.setProps({
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup?.hide()
          return true
        }
        return renderer?.ref?.onKeyDown(props.event)
      },

      onExit() {
        popup?.destroy()
        renderer?.destroy()
      },
    }
  }
}
