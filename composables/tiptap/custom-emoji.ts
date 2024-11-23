export interface EmojiOptions {
  inline: boolean
  allowBase64: boolean
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    emoji: {
      /**
       * Insert a emoji.
       */
      insertEmoji: (native: string) => ReturnType
    }
  }
}
