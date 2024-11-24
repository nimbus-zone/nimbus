import type { AppBskyActorDefs } from '@atproto/api'

export function getDisplayName(
  profile: AppBskyActorDefs.ProfileView,
) {
  const displayName = profile.displayName || profile.handle
  return displayName
}

export function accountToShortHandle(handle: string) {
  return `@${handle.includes('.bsky.social') ? handle.split('.bsky.social')[0] : handle}`
}

export function getShortHandle({ handle }: AppBskyActorDefs.ProfileView) {
  if (!handle)
    return ''
  return accountToShortHandle(handle)
}

export function getServerName(profile: AppBskyActorDefs.ProfileView) {
  if (profile.handle.includes('@'))
    return profile.handle.split('@')[1]
  // We should only lack the server name if we're on the same server as the profile
  return currentInstance.value ? getInstanceDomain(currentInstance.value) : ''
}

export function getFullHandle(profile: AppBskyActorDefs.ProfileView) {
  const handle = `@${profile.handle}`
  if (!currentUser.value || profile.handle.includes('@'))
    return handle
  return `${handle}@${getServerName(profile)}`
}

export function toShortHandle(fullHandle: string) {
  if (!currentUser.value)
    return fullHandle
  const server = currentUser.value.server
  if (fullHandle.endsWith(`@${server}`))
    return fullHandle.slice(0, -server.length - 1)
  return fullHandle
}

export function extractAccountHandle(profile: AppBskyActorDefs.ProfileView) {
  let handle = getFullHandle(profile).slice(1)
  const uri = currentInstance.value ? getInstanceDomain(currentInstance.value) : currentServer.value
  if (currentInstance.value && handle.endsWith(`@${uri}`))
    handle = handle.slice(0, -uri.length - 1)

  return handle
}

export function useAccountHandle(profile: AppBskyActorDefs.ProfileView, fullServer = true) {
  return computed(() => fullServer
    ? getFullHandle(profile)
    : getShortHandle(profile),
  )
}
