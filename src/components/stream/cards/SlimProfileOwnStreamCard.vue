<template>
    <v-card
      hover
      :max-height="maxHeight"
      @click.native="onToStreamButtonClick">
        <v-card-title dense primary class="title grey--text">
          {{ stream.title || $t('stream.noTitlePlaceholder') }}
          <v-spacer />
          <div v-if="isSealed">
            <v-btn
              small
              flat
              color="grey"
              disabled
              class="text-lowercase"
            >
              <v-icon>airline_seat_flat</v-icon>&nbsp;
              {{ timeFromSealedToNow }}
            </v-btn>
            <v-btn
              small
              flat
              color="grey"
              disabled
              class="text-lowercase"
            >
              <v-icon>timer</v-icon>&nbsp;
              {{ timeSpentForStream }}
            </v-btn>
          </div>
          <div v-else>
            <v-btn
              small
              flat
              color="grey"
              disabled
            >
              <v-icon>play_arrow</v-icon>&nbsp;
              Live Now
            </v-btn>
            <v-btn
              small
              flat
              color="grey"
              disabled
              class="text-lowercase"
            >
              <v-icon>timer</v-icon>&nbsp;
              {{ timeSpentForStream }}
            </v-btn>
          </div>
          <v-btn
            small
            flat
            color="grey"
            disabled
          >
            <v-icon>bookmark</v-icon>&nbsp;{{ likeCount }}
          </v-btn>
          <v-btn
            small
            flat
            color="grey"
            disabled
          >
            <v-icon>comment</v-icon>&nbsp;{{ commentCount }}
          </v-btn>
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
      return GetElapsedTimeTillNow(this.getNowTime, this.stream.sealedAt)
    },
    timeSpentForStream () {
      if (this.isSealed === 0) {
        return GetElapsedTimeTillNow(this.getNowTime, this.stream.startedAt)
      }

      return GetElapsedTimeBetween(this.stream.startedAt, this.stream.sealedAt)
    }
  },
  methods: {
    onToStreamButtonClick () {
      this.$router.push({ name: 'stream', params: { id: this.stream.id } })
    }
  }
}
</script>
