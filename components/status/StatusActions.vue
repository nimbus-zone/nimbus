<script setup lang="ts">
import type { AppBskyFeedDefs } from '@atproto/api'

const props = defineProps<{
  status: AppBskyFeedDefs.PostView
  details?: boolean
  command?: boolean
}>()

const focusEditor = inject<typeof noop>('focus-editor', noop)

const { details, command } = props // TODO

const userSettings = useUserSettings()
const useStarFavoriteIcon = usePreferences('useStarFavoriteIcon')

const {
  status,
  isLoading,
  canReblog,
  toggleFavourite,
  toggleReblog,
} = useStatusActions(props)

function reply() {
  if (!checkLogin())
    return
  if (details)
    focusEditor()
  else
    navigateToStatus({ status: status.value, focusReply: true })
}
</script>

<template>
  <div flex justify-between items-center class="status-actions">
    <div flex-1>
      <StatusActionButton
        :content="$t('action.reply')"
        :text="!getPreferences(userSettings, 'hideReplyCount') && status.replyCount || ''"
        color="text-blue" hover="text-blue" nimbus-group-hover="bg-blue/10"
        icon="i-ri:chat-1-line"
        :command="command"
        @click="reply"
      >
        <template v-if="status.replyCount && !getPreferences(userSettings, 'hideReplyCount')" #text>
          <CommonLocalizedNumber
            keypath="action.reply_count"
            :count="status.replyCount"
          />
        </template>
      </StatusActionButton>
    </div>

    <div flex-1>
      <StatusActionButton
        :content="$t(status.reblogged ? 'action.boosted' : 'action.boost')"
        :text="!getPreferences(userSettings, 'hideBoostCount') && status.repostCount ? status.repostCount : ''"
        color="text-green" hover="text-green" nimbus-group-hover="bg-green/10"
        icon="i-ri:repeat-line"
        active-icon="i-ri:repeat-fill"
        inactive-icon="i-tabler:repeat-off"
        :active="!!status.reblogged"
        :disabled="isLoading.reblogged || !canReblog"
        :command="command"
        @click="toggleReblog()"
      >
        <template v-if="status.reblogsCount && !getPreferences(userSettings, 'hideBoostCount')" #text>
          <CommonLocalizedNumber
            keypath="action.boost_count"
            :count="status.repostCount ?? 0"
          />
        </template>
      </StatusActionButton>
    </div>

    <div flex-1>
      <StatusActionButton
        :content="$t(status.favourited ? 'action.favourited' : 'action.favourite')"
        :text="!getPreferences(userSettings, 'hideFavoriteCount') && status.likeCount ? status.likeCount : ''"
        :color="useStarFavoriteIcon ? 'text-yellow' : 'text-rose'"
        :hover="useStarFavoriteIcon ? 'text-yellow' : 'text-rose'"
        :nimbus-group-hover="useStarFavoriteIcon ? 'bg-yellow/10' : 'bg-rose/10'"
        :icon="useStarFavoriteIcon ? 'i-ri:star-line' : 'i-ri:heart-3-line'"
        :active-icon="useStarFavoriteIcon ? 'i-ri:star-fill' : 'i-ri:heart-3-fill'"
        :active="!!status.favourited"
        :disabled="isLoading.favourited"
        :command="command"
        @click="toggleFavourite()"
      >
        <template v-if="status.favouritesCount && !getPreferences(userSettings, 'hideFavoriteCount')" #text>
          <CommonLocalizedNumber
            keypath="action.favourite_count"
            :count="status.likeCount ?? 0"
          />
        </template>
      </StatusActionButton>
    </div>
  </div>
</template>
