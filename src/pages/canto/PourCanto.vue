<template>
  <tafalk-stream-authorization-required v-if="!isAllowed"/>
  <v-container v-else>
    <tafalk-canto-introduction v-if="isCantoNew"/>
    <v-card flat>
      <v-toolbar dense flat>
        <v-toolbar-title v-if="processState === 'saved'">
          <span class="grey--text"><v-icon>mdi-check-circle-outline</v-icon>&nbsp;{{ $t('stream.pour.savedLabel') }}</span>
        </v-toolbar-title>
        <v-toolbar-title v-else-if="processState === 'saving'">
          <span class="grey--text"><v-icon>mdi-cached</v-icon>&nbsp;{{ $t('stream.pour.savingLabel') }}</span>
        </v-toolbar-title>
        <v-toolbar-title v-else-if="processState === 'error'"><span class="grey--text"><v-icon>mdi-close-circle-outline</v-icon>&nbsp;{{ $t('stream.pour.saveErrorLabel') }}</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-form>
        <!-- body -->
        <v-textarea
          ref="pourBody"
          solo
          flat
          v-model="body"
          auto-grow
          autofocus
          :placeholder="$t('stream.pour.bodyPlaceholder')"
          rows="9"
          @keydown.delete.prevent="onBodyBackspaceOrDeleteKeydown"
          @keyup.delete.prevent="onBodyBackspaceOrDeleteKeyup"
          @paste="onPaste"
          @cut="onCut"
          @keyup="onDefaultKeyup"
          @keydown="onDefaultKeydown"
          @mousedown="onMouseDown"
          @mouseup="onMouseUp"
          @contextmenu.prevent="onRightClick"
        ></v-textarea>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { Logger } from '@aws-amplify/core'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { GetCantoBody, CreateCanto, UpdateCantoBody } from '@/graphql/Canto'
import TafalkStreamAuthorizationRequired from '@/components/nocontent/AuthorizationRequired.vue'
import TafalkCantoIntroduction from '@/components/canto/dialogs/CantoIntroduction.vue'
import { IsNullOrWhitespace, StrikethroughStr } from '@/utils/typeUtils'
import { GetKeyName } from '@/utils/ioUtils'

const logger = new Logger('PourCanto')

export default {
  name: 'PourCanto',
  data () {
    return {
      body: null,
      cantoStatus: 'OK',
      isCantoCreated: false,
      authorUsername: null,
      isCantoNew: false,
      processState: '',
      savedStateConstant: 'saved',
      savingStateConstant: 'saving',
      errorStateConstant: 'error'
    }
  },
  components: {
    TafalkStreamAuthorizationRequired,
    TafalkCantoIntroduction
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getCanto: 'canto/getCanto',
      getIsPageReady: 'getIsPageReady'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    authenticatedUserId () {
      return this.authenticatedUser != null ? this.authenticatedUser.id : null
    },
    isAllowed () {
      return this.authenticatedUser && this.authenticatedUser.username === this.authorUsername
    }
  },
  created () {
    window.addEventListener('beforeunload', this.onBeforeUnload)
    this.setIsPageReady(false)
    this.authorUsername = this.$route.params.username
    const cantoId = this.authenticatedUser.id

    API.graphql(graphqlOperation(GetCantoBody, { id: cantoId }))
      .then(resp => {
        const currentBody = (resp.data.getCanto || {}).body
        if (!currentBody) {
          this.isCantoNew = true
        } else {
          // There's already a canto
          this.body = currentBody
          this.isCantoCreated = true
        }
      }).catch(err => {
        logger.error('Error occurred while getting canto info', JSON.stringify(err))
        this.setNewSiteError(err.message || err)
      }).finally(() => {
        this.setIsPageReady(true)
      })
  },
  async mounted () {
    // Require confirmation for accidental route changes
    this.setIsRouteChangeSafe(false)
  },
  async beforeDestroy () {
    window.removeEventListener('beforeunload', this.onBeforeUnload)
  },
  watch: {
    // whenever 'canto' changes, this function will run
    async body (newBody, oldBody) {
      if (!this.getIsPageReady || IsNullOrWhitespace(newBody)) return

      if (oldBody == null || oldBody.length === 0) {
        // Old body is null or empty, so create the entry here
        try {
          this.processState = this.savingStateConstant
          await API.graphql(graphqlOperation(CreateCanto, {
            // Setting the optional values to null, because DynamoDB rejects empty strings -but accepts null anyway
            id: this.authenticatedUserId,
            body: newBody,
            startTime: new Date().toISOString(),
            lastUpdateTime: new Date().toISOString(),
            status: this.cantoStatus
          }))
          this.processState = this.savedStateConstant
          this.isCantoCreated = true
        } catch (err) {
          logger.error('An error occurred while creating the canto', err.message || JSON.stringify(err))
          this.processState = this.errorStateConstant
          this.setNewSiteError(err.message || err)
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      setIsPageReady: 'setIsPageReady',
      setIsRouteChangeSafe: 'stream/setIsRouteChangeSafe'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    onBodyBackspaceOrDeleteKeydown (event) {
      const exactKey = GetKeyName(event.keyCode)

      // get the selected text
      // See https://stackoverflow.com/questions/48145727/insert-character-at-cursor-position-in-vue-js
      const bodyTextArea = this.$refs.pourBody.$el.querySelector('textarea')
      const selectionStartPos = bodyTextArea.selectionStart
      const selectionEndPos = bodyTextArea.selectionEnd
      const initialBody = this.body
      const bodyTextLength = bodyTextArea.value.length

      if (!bodyTextLength || bodyTextLength === 0) return

      if (selectionStartPos === selectionEndPos) {
        // There is no selection, but regular cursor
        let cursorPos = selectionStartPos

        if (exactKey === 'backspace' && cursorPos > 0) {
          // backspace keydown

          // Update body
          this.body = initialBody.substring(0, cursorPos - 1) +
            StrikethroughStr(initialBody.charAt(cursorPos - 1)) +
            this.body.substring(cursorPos, initialBody.length)

          // Set new cursor position
          cursorPos--

          // Move cursor
          setTimeout(() => bodyTextArea.setSelectionRange(cursorPos, cursorPos))
        } else if (exactKey === 'delete' && cursorPos < this.body.length) {
          // delete keydown
          /*
          // find the first non-strikethrough char
          while (this.body.charAt(cursorPos) === strikethroughChar) {
            cursorPos++
          }
          */

          // Update body
          this.body = initialBody.substring(0, cursorPos) +
            StrikethroughStr(initialBody.charAt(cursorPos)) +
            this.body.substring(cursorPos + 1, initialBody.length)

          // Set new cursor position
          cursorPos += 2

          // Set new cursor position
          setTimeout(() => bodyTextArea.setSelectionRange(cursorPos, cursorPos))
        }
      } else {
        // There is a selection, literally
      }
    },
    onBodyBackspaceOrDeleteKeyup (event) {
      const bodyTextArea = this.$refs.pourBody.$el.querySelector('textarea')
      const bodyTextLength = bodyTextArea.value.length

      if (!bodyTextLength || bodyTextLength === 0) return

      clearTimeout(this.timeoutID)
      this.timeoutID = setTimeout(() => {
        bodyTextArea.setSelectionRange(bodyTextLength, bodyTextLength)
      }, this.deleteTimeToIdle)
    },
    // disable pasting
    onPaste (event) {
      event.preventDefault()
    },
    // disable cutting
    onCut (event) {
      event.preventDefault()
    },
    onMouseDown (event) {
      event.preventDefault()
    },
    onMouseUp (event) {
      event.preventDefault()
    },
    async onDefaultKeyup (event) {
      if (IsNullOrWhitespace(this.body) || !this.isCantoCreated) return

      try {
        this.processState = this.savingStateConstant
        await API.graphql(graphqlOperation(UpdateCantoBody, {
          id: this.authenticatedUserId,
          body: this.body,
          lastUpdateTime: new Date().toISOString()
        }))
        this.processState = this.savedStateConstant
      } catch (err) {
        logger.error('An error occurred while updating the canto', err.message || JSON.stringify(err))
        this.processState = this.errorStateConstant
        this.setNewSiteError(err.message || err)
      }
    },
    onDefaultKeydown (event) {
      // Disable Undo with keyboard
      if (event.ctrlKey && event.key === 'z') {
        event.preventDefault()
      }
    },
    onRightClick (event) {
      // already prevented. do nothing
    },
    async onBeforeUnload (event) {
      // An attempt to leave? Save last state immediately
      event.preventDefault()
      return ''
    }
  }
}
</script>

<style scoped>

</style>
