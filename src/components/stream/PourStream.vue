<template>
  <tafalk-stream-authorization-required v-if="!authenticatedUser"></tafalk-stream-authorization-required>
  <div v-else>
    <tafalk-stream-introduction v-if="isFirstStreamOfUser"></tafalk-stream-introduction>
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
        <v-spacer/>
        <span class="grey--text">{{ $t('stream.pour.regularLeavePageDisclaimerLabel') }}</span>
      </v-toolbar>
      <v-form class="pa-3 pt-4">
        <!-- body -->
        <v-textarea
          ref="pourBody"
          outline
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

        <!-- title -->
        <tafalk-stream-add-title-dialog
          :streamId="streamId"
        ></tafalk-stream-add-title-dialog>

        <v-layout align-center wrap>
          <v-flex xs12 sm5 md5>
            <v-select
              dense
              flat
              @change="onMoodChange"
              :label="$t('stream.pour.moodSelectLabel')"
              v-model="moodModel"
              :items="moodOptions"
              item-text="displayValue"
              item-value="backendValue"
              chips
              multiple
              menu-props="top"
              return-object
            ></v-select>
          </v-flex>
          <v-spacer/>
          <v-flex xs12 sm5 md5>
            <v-select
              dense
              flat
              @change="onPositionChange"
              :label="$t('stream.pour.positionSelectLabel')"
              v-model="positionModel"
              :items="positionOptions"
              item-text="displayValue"
              item-value="backendValue"
              chips
              multiple
              menu-props="top"
              return-object
            ></v-select>
          </v-flex>
          <v-spacer/>
          <v-btn
            color="primary"
            @click="onDoneClick"
            :disabled="body == null || body.length === 0"
            :loading="loading"
            flat
          >{{ $t('stream.pour.sealButtonText') }}</v-btn>
        </v-layout>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { API, graphqlOperation, Logger } from 'aws-amplify'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { ListStreamsByUser } from '@/graphql/Profile'
import { CreateStream, UpdateStreamBody, UpdatePosition, UpdateMood, SealStreamForEver } from '@/graphql/Stream'
import TafalkStreamAuthorizationRequired from '@/components/nocontent/AuthorizationRequired.vue'
import TafalkStreamAddTitleDialog from '@/components/stream/dialogs/AddTitleDialog.vue'
import TafalkStreamIntroduction from '@/components/stream/dialogs/StreamIntroduction.vue'
import { GenerateUuid4 } from '@/utils/generators'
import { IsNullOrWhitespace, StrikethroughStr } from '@/utils/typeUtils'
import { streamMoodOptions, streamPositionOptions, pourStrikethroughTimeToIdle } from '@/utils/constants'
import { GetKeyName } from '@/utils/ioUtils'

const logger = new Logger('PourStream')

export default {
  name: 'PourStream',
  data () {
    return {
      valid: false,
      title: null,
      body: null,
      isStreamCreated: false,
      privacy: 'Public', // Default
      moodModel: null,
      positionModel: null,
      moodOptions: streamMoodOptions,
      positionOptions: streamPositionOptions,
      isFirstStreamOfUser: false,
      streamId: '',
      processState: '',
      savedStateConstant: 'saved',
      savingStateConstant: 'saving',
      errorStateConstant: 'error',
      incompleteSealTimeValue: 'NA',
      timeoutID: null,
      deleteTimeToIdle: pourStrikethroughTimeToIdle,
      loading: false,
      loader: null
    }
  },
  components: {
    TafalkStreamAuthorizationRequired,
    TafalkStreamAddTitleDialog,
    TafalkStreamIntroduction
  },
  created () {
    // In case of the need to add it globally, see https://forum.vuejs.org/t/detect-browser-close/5001
    window.addEventListener('beforeunload', this.onBeforeUnload)
    // window.addEventListener('unload', () => this.sealForEver)

    // Create a UUID for the new stream
    this.streamId = GenerateUuid4()
  },
  async mounted () {
    // Check if first stream of user
    const graphqlVisitedProfileStreamsResult = await API.graphql(graphqlOperation(ListStreamsByUser, { userId: this.authenticatedUserId, limit: 1, nextToken: null }))
    const userStreamsShortList = graphqlVisitedProfileStreamsResult.data.listStreamsByUser.items
    if (userStreamsShortList == null || userStreamsShortList.length === 0) {
      this.isFirstStreamOfUser = true
    }

    // Require confirmation for accidental route changes
    this.setIsRouteChangeSafe(false)
  },
  async beforeDestroy () {
    try {
      await this.sealForEver()
    } catch (err) {
      logger.error('Error occurred while sealing the stream', err)
      this.setNewSiteError(err.message || err)
    } finally {
      window.removeEventListener('beforeunload', this.onBeforeUnload)
      // window.removeEventListener('unload', this.sealForEver)
    }
  },
  async beforeRouteLeave (to, from, next) {
    if (this.getIsRouteChangeSafe || window.confirm(this.$i18n.t('stream.pour.message.beforeRouteConfirmationText'))) {
      try {
        await this.sealForEver()
      } catch (err) {
        logger.error('Error occurred while sealing the stream', err)
        this.setNewSiteError(err.message || err)
      } finally {
        next()
      }
    } else {
      next(false)
    }
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getIsRouteChangeSafe: 'stream/getIsRouteChangeSafe'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    authenticatedUserId () {
      return this.authenticatedUser != null ? this.authenticatedUser.id : null
    }
  },
  watch: {
    // whenever 'stream' changes, this function will run
    async body (newBody, oldBody) {
      // Check if the text is all whitespace
      if (IsNullOrWhitespace(newBody)) return

      if (oldBody == null || oldBody.length === 0) {
        // Old body is null or empty, so create the entry here
        try {
          this.processState = this.savingStateConstant
          await API.graphql(graphqlOperation(CreateStream, {
            // Setting the optional values to null, because DynamoDB rejects empty strings -but accepts null anyway
            id: this.streamId,
            userId: this.authenticatedUserId,
            url: null,
            title: this.title !== '' ? this.title : null,
            privacy: this.privacy,
            mood: (this.moodModel != null && this.moodModel.length > 0) ? this.moodModel.map(b => b.backendValue) : null,
            position: (this.positionModel != null && this.positionModel.length > 0) ? this.positionModel.map(b => b.backendValue) : null,
            body: newBody,
            location: null,
            track: null,
            startTime: new Date().toISOString(),
            sealTime: this.incompleteSealTimeValue
          }))
          this.processState = this.savedStateConstant
          this.isStreamCreated = true
        } catch (err) {
          logger.error('An error occurred while creating the stream', err.message || JSON.stringify(err))
          this.processState = this.errorStateConstant
          this.setNewSiteError(err.message || err)
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      showAddTitleDialog: 'stream/dialog/showAddTitleDialog',
      setIsRouteChangeSafe: 'stream/setIsRouteChangeSafe'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    // disable backspace or delete buttons (body)
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
    // disable backspace or delete buttons (title)
    onTitleBackspaceOrDeleteKeydown (event) {
      const exactKey = GetKeyName(event.keyCode)

      // get the selected text
      // See https://stackoverflow.com/questions/48145727/insert-character-at-cursor-position-in-vue-js
      const titleTextField = this.$refs.pourTitle.$el.querySelector('input')
      const selectionStartPos = titleTextField.selectionStart
      const selectionEndPos = titleTextField.selectionEnd
      const initialTitle = this.title
      const titleTextLength = titleTextField.value.length

      if (!titleTextLength || titleTextLength === 0) return

      if (selectionStartPos === selectionEndPos) {
        // There is no selection, but regular cursor
        let cursorPos = selectionStartPos

        if (exactKey === 'backspace' && cursorPos > 0) {
          // backspace keydown

          // Update body
          this.title = initialTitle.substring(0, cursorPos - 1) +
            StrikethroughStr(initialTitle.charAt(cursorPos - 1)) +
            this.title.substring(cursorPos, initialTitle.length)

          // Set new cursor position
          cursorPos--

          // Move cursor
          setTimeout(() => titleTextField.setSelectionRange(cursorPos, cursorPos))
        } else if (exactKey === 'delete' && cursorPos < this.body.length) {
          // delete keydown

          // Update body
          this.body = initialTitle.substring(0, cursorPos) +
            StrikethroughStr(initialTitle.charAt(cursorPos)) +
            this.body.substring(cursorPos + 1, initialTitle.length)

          // Set new cursor position
          cursorPos += 2

          // Set new cursor position
          setTimeout(() => titleTextField.setSelectionRange(cursorPos, cursorPos))
        }
      } else {
        // There is a selection, literally
      }
    },
    onTitleBackspaceOrDeleteKeyup (event) {
      const titleTextField = this.$refs.pourTitle.$el.querySelector('input')
      const titleTextLength = titleTextField.value.length

      if (!titleTextLength || titleTextLength === 0) return

      clearTimeout(this.timeoutID)
      this.timeoutID = setTimeout(() => {
        titleTextField.setSelectionRange(titleTextLength, titleTextLength)
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
      if (IsNullOrWhitespace(this.body) || !this.isStreamCreated) return
      try {
        this.processState = this.savingStateConstant
        await API.graphql(graphqlOperation(UpdateStreamBody, {
          id: this.streamId,
          body: this.body
        }))
        this.processState = this.savedStateConstant
      } catch (err) {
        logger.error('An error occurred while updating the stream', err.message || JSON.stringify(err))
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
    async onMoodChange () {
      logger.info('Mood changed:')
      logger.info(JSON.stringify(this.moodModel))
      if (this.body == null || this.body.length === 0) {
        return
      }

      try {
        this.processState = this.savingStateConstant
        await API.graphql(graphqlOperation(UpdateMood, {
          // Setting the optional values to null, because DynamoDB rejects empty strings -but accepts null anyway
          id: this.streamId,
          mood: (this.moodModel != null && this.moodModel.length > 0) ? this.moodModel.map(b => b.backendValue) : null
        }))
        this.processState = this.savedStateConstant
      } catch (err) {
        logger.error('An error occurred while updating the mood', err.message || JSON.stringify(err))
        this.processState = this.errorStateConstant
        this.setNewSiteError(err.message || err)
      }
    },
    async onPositionChange () {
      if (this.body == null || this.body.length === 0) {
        return
      }

      try {
        this.processState = this.savingStateConstant
        await API.graphql(graphqlOperation(UpdatePosition, {
          // Setting the optional values to null, because DynamoDB rejects empty strings -but accepts null anyway
          id: this.streamId,
          position: (this.positionModel != null && this.positionModel.length > 0) ? this.positionModel.map(b => b.backendValue) : null
        }))
        this.processState = this.savedStateConstant
      } catch (err) {
        logger.error('An error occurred while updating the position', err.message || JSON.stringify(err))
        this.processState = this.errorStateConstant
        this.setNewSiteError(err.message || err)
      }
    },
    async onDoneClick () {
      this.loading = true
      this.loader = 'loading'

      try {
        await this.sealForEver()
      } catch (err) {
        logger.error('Error occurred while sealing the stream', err)
        throw err
      } finally {
        this.setIsRouteChangeSafe(true)
        this.showAddTitleDialog()
        this.loading = false
        this.loader = null
      }
    },
    async sealForEver () {
      // Check if nothing to seal
      if (this.body != null && this.body.length > 0) {
        try {
          await API.graphql(graphqlOperation(SealStreamForEver, {
            id: this.streamId,
            title: this.title,
            body: this.body,
            privacy: this.privacy,
            mood: (this.moodModel != null && this.moodModel.length > 0) ? this.moodModel.map(b => b.backendValue) : null,
            position: (this.positionModel != null && this.positionModel.length > 0) ? this.positionModel.map(b => b.backendValue) : null,
            location: null,
            track: null,
            sealTime: new Date().toISOString()
          }))
        } catch (err) {
          logger.error('An error occurred while sealing the stream', err.message || JSON.stringify(err))
          this.setNewSiteError(err.message || err)
        }
      }
    },
    async onBeforeUnload (event) {
      // An attempt to leave? Save last state immediately
      event.preventDefault()
      // sealing should be done as a part of 'beforeDestroy'
      await this.sealForEver()
      return ''
    }
  }
}
</script>
