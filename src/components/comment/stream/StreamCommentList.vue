<!-- See https://vuetifyjs.com/en/components/lists -->
<template>
<v-layout row wrap>
  <v-flex xs12 lg12 >
  <v-card flat>
    <v-list three-line>
      <v-subheader>
        {{ $t('stream.comments.title') }} ({{ commentCount }})
      </v-subheader>
      <template v-for="(comment, index) in paginatedStreamCommentItems">
        <tafalk-stream-comment :key="comment.content"
          :comment="comment"
        ></tafalk-stream-comment>
        <v-divider
          v-if="index + 1 < commentCount"
          :key="index"
        ></v-divider>
      </template>
      <infinite-loading force-use-infinite-wrapper="true" @infinite="infiniteCommentHandler"></infinite-loading>
    </v-list>
  </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { API, graphqlOperation } from 'aws-amplify'
import { ListPaginatedStreamComments } from '@/graphql/StreamReaction'
// import { GetElapsedTimeTillNow } from '@/utils/TimeUtils'
import { streamCommentFetchLength } from '@/utils/Constants'
import TafalkStreamComment from '@/components/comment/stream/StreamComment.vue'

export default {
  name: 'StreamCommentList',
  components: {
    TafalkStreamComment
  },
  data () {
    return {
      datenow: '',
      fetchLimit: streamCommentFetchLength
    }
  },
  computed: {
    ...mapGetters({
      getStream: 'stream/getStream',
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getPaginatedStreamComments: 'stream/getPaginatedStreamComments'
    }),
    stream () {
      return this.getStream
    },
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    paginatedStreamComments () {
      return this.getPaginatedStreamComments
    },
    paginatedStreamCommentItems () {
      return this.paginatedStreamComments.items
    },
    paginatedStreamCommentNextToken () {
      return this.paginatedStreamComments.nextToken
    },
    commentCount () {
      if (!this.stream.comments) {
        return 0
      }
      return this.stream.comments.length
    }
  },
  mounted () {
    this.interval = setInterval(this.tick, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    ...mapMutations({
      setPaginatedStreamComments: 'stream/setPaginatedStreamComments'
    }),
    async infiniteCommentHandler ($state) {
      // if no new things to load, complete
      if (this.paginatedStreamCommentNextToken == null) {
        $state.complete()
      } else {
        const scrollEndNewFetchResult = await API.graphql(graphqlOperation(ListPaginatedStreamComments, {
          streamId: this.stream.id,
          limit: this.fetchLimit,
          nextToken: this.paginatedStreamCommentNextToken
        }))

        const newPaginatedStreamCommentType = scrollEndNewFetchResult.data.listPaginatedStreamComments

        this.setPaginatedStreamComments({
          streamId: this.stream.id,
          items: [...this.paginatedStreamCommentItems, ...newPaginatedStreamCommentType.items],
          nextToken: newPaginatedStreamCommentType.nextToken
        })
        $state.loaded()
      }
    }
  }
}
</script>
