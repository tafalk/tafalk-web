<template>
  <v-list three-line color="transparent">
    <v-divider/>
    <v-divider/>
    <v-subheader>
      {{ $t('stream.comments.title') }} ({{ commentCount }})
    </v-subheader>
    <template v-for="(comment, index) in paginatedStreamCommentItems">
      <tafalk-stream-comment-list-item :key="comment.content"
        :comment="comment"
      ></tafalk-stream-comment-list-item>
      <v-divider
        v-if="index < commentCount"
        :key="index"
      ></v-divider>
    </template>
    <infinite-loading force-use-infinite-wrapper="true" @infinite="infiniteCommentHandler"></infinite-loading>
  </v-list>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { mapGetters, mapMutations } from 'vuex'
import { ListPaginatedStreamComments } from '@/graphql/StreamReaction'
import { streamCommentFetchLength } from '@/utils/constants'
import TafalkStreamCommentListItem from '@/components/listitems/StreamCommentListItem.vue'

export default {
  name: 'StreamCommentList',
  components: {
    TafalkStreamCommentListItem
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
      if (!this.stream.comments) return 0
      return this.stream.comments.length
    }
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
