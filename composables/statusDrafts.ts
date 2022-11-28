import type { Account, Attachment, CreateStatusParams, Status, StatusVisibility } from 'masto'
import { STORAGE_KEY_DRAFTS } from '~/constants'
import type { Mutable } from '~/types/utils'

export interface Draft {
  editingStatus?: Status
  params: Omit<Mutable<CreateStatusParams>, 'status'> & {
    status?: Exclude<CreateStatusParams['status'], null>
  }
  attachments: Attachment[]
}
export type DraftMap = Record<string, Draft>

const allDrafts = useLocalStorage<Record<string, DraftMap>>(STORAGE_KEY_DRAFTS, {})

export const currentUserDrafts = computed(() => {
  if (!currentUser.value?.account.id)
    return {}
  const id = `${currentUser.value.account.acct}@${currentUser.value.server}`
  if (!allDrafts.value[id])
    allDrafts.value[id] = {}
  return allDrafts.value[id]
})

export function getDefaultDraft({
  status = '',
  inReplyToId,
  visibility = 'public',
}: Partial<Draft['params']> = {}): Draft {
  return {
    params: {
      status,
      inReplyToId,
      visibility,
    },
    attachments: [],
  }
}

export function getParamsFromStatus(status: Status): Draft['params'] {
  return {
    status: status.content,
    mediaIds: status.mediaAttachments.map(att => att.id),
    visibility: status.visibility,
  }
}

export function useDraft(draftKey: string, inReplyToId?: string, inReplyToVisibility?: StatusVisibility) {
  const draft = computed({
    get() {
      if (!currentUserDrafts.value[draftKey])
        currentUserDrafts.value[draftKey] = getDefaultDraft({ inReplyToId, visibility: inReplyToVisibility })
      return currentUserDrafts.value[draftKey]
    },
    set(val) {
      currentUserDrafts.value[draftKey] = val
    },
  })

  const isEmpty = computed(() => {
    return (draft.value.params.status ?? '').trim().length === 0
      && draft.value.attachments.length === 0
  })

  return { draft, isEmpty }
}

export const dialogDraft = useDraft('dialog')

export function mentionUser(account: Account) {
  openPublishDialog('dialog', getDefaultDraft({
    status: `@${account.acct} `,
  }))
}

export function directMessageUser(account: Account) {
  openPublishDialog('dialog', getDefaultDraft({
    status: `@${account.acct} `,
    visibility: 'direct',
  }))
}

export function clearUserDrafts(account?: Account) {
  if (!account)
    account = currentUser.value?.account

  if (!account)
    return

  const id = `${account.acct}@${currentUser.value?.server}`
  if (!allDrafts.value[id])
    return

  delete allDrafts.value[id]
}
