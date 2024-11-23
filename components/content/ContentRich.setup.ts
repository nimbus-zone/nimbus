defineOptions({
  name: 'ContentRich',
})

const {
  content,
  hideEmojis = false,
  markdown = true,
} = defineProps<{
  content: string
  hideEmojis?: boolean
  markdown?: boolean
}>()

export default () => h(
  'span',
  { class: 'content-rich', dir: 'auto' },
  contentToVNode(content, {
    hideEmojis,
    markdown,
  }),
)
