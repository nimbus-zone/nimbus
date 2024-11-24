import type { AppBskyActorDefs, AppBskyFeedDefs } from '@atproto/api'
import { withoutProtocol } from 'ufo'

export function getAccountRoute(account: AppBskyActorDefs.ProfileView) {
  return useRouter().resolve({
    name: 'account-index',
    params: {
      server: currentServer.value,
      account: extractAccountHandle(account),
    },
  })
}
export function getAccountFollowingRoute(account: AppBskyActorDefs.ProfileView) {
  return useRouter().resolve({
    name: 'account-following',
    params: {
      server: currentServer.value,
      account: extractAccountHandle(account),
    },
  })
}
export function getAccountFollowersRoute(account: AppBskyActorDefs.ProfileView) {
  return useRouter().resolve({
    name: 'account-followers',
    params: {
      server: currentServer.value,
      account: extractAccountHandle(account),
    },
  })
}

export function getReportRoute(id: string | number) {
  return `https://${currentUser.value?.server}/admin/reports/${encodeURIComponent(id)}`
}

export function getStatusRoute(status: AppBskyFeedDefs.PostView) {
  return useRouter().resolve({
    name: 'status',
    params: {
      server: currentServer.value,
      account: extractAccountHandle(status.author),
      status: status.uri,
    },
  })
}

export function getTagRoute(tag: string) {
  return useRouter().resolve({
    name: 'tag',
    params: {
      server: currentServer.value,
      tag,
    },
  })
}

export function getStatusPermalinkRoute(status: AppBskyFeedDefs.PostView) {
  // TODO: Fix this
  return status.url ? withoutProtocol(status.uri) : null
}

export function getStatusInReplyToRoute(status: AppBskyFeedDefs.PostView) {
  return useRouter().resolve({
    name: 'status-by-id',
    params: {
      server: currentServer.value,
      status: status.inReplyToId,
    },
  })
}

export function navigateToStatus({ status, focusReply = false }: {
  status: AppBskyFeedDefs.PostView
  focusReply?: boolean
}) {
  return navigateTo({
    path: getStatusRoute(status).href,
    state: { focusReply },
  })
}
