<template>
    <v-card
      hover
      :max-height="maxHeight"
      @click.native="onToStreamButtonClick"
    >
        <v-card-title dense primary class="title grey--text">
          {{ stream.title || $t('stream.noTitlePlaceholder') }}
          <v-spacer />
          <div v-if="isSealed">
            <span class="pa-2 grey--text caption">
              <v-icon class="grey--text caption">airline_seat_flat</v-icon>{{ timeFromSealedToNow }}
            </span>
            <span class="pa-2 grey--text caption">
              <v-icon class="grey--text caption">timer</v-icon>{{ timeSpentForStream }}
            </span>
          </div>
          <div v-else>
            <span class="pa-2 grey--text caption">
              <v-icon class="grey--text caption">play_arrow</v-icon>&nbsp;Live Now
            </span>
            <span class="pa-2 grey--text caption">
              <v-icon class="grey--text caption">timer</v-icon>&nbsp;{{ timeSpentForStream }}
            </span>
          </div>
          <span class="pa-2 grey--text caption">
            <v-icon class="grey--text caption">bookmark</v-icon>&nbsp;{{ likeCount }}
          </span>
          <span class="pa-2 grey--text caption">
            <v-icon class="grey--text caption">comment</v-icon>&nbsp;{{ commentCount }}
          </span>
        </v-card-title>
        <v-card-text class="text-truncate">{{ stream.body }}</v-card-text>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { GetElapsedTimeTillNow, GetElapsedTimeBetween } from '@/utils/typeUtils'

export default {
  name: 'SlimProfileOwnStreamCard',
  props: ['stream'],
  data () {
    return {
      maxHeight: 185
    }
  },
  computed: {
    ...mapGetters({
      getNowTime: 'time/getNowTime'
    }),
    likeCount () {
      if (this.stream.likes == null) return 0
      return this.stream.likes.length
    },
    commentCount () {
      if (this.stream.comments == null) return 0
      return this.stream.comments.length
    },
    isSealed () {
      return this.stream.isSealed
    },
    timeFromSealedToNow () {
      if (this.isSealed === 0) {
        return null
      }
      return GetElapsedTimeTillNow(this.getNowTime, this.stream.sealTime)
    },
    timeSpentForStream () {
      if (this.isSealed === 0) {
        return GetElapsedTimeTillNow(this.getNowTime, this.stream.startTime)
      }

      return GetElapsedTimeBetween(this.stream.startTime, this.stream.sealTime)
    }
  },
  methods: {
    onToStreamButtonClick () {
      this.$router.push({ name: 'stream', params: { id: this.stream.id } })
    }
  }
}
</script>
