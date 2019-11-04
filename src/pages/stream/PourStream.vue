<template>
  <tafalk-stream-authorization-required v-if="!authenticatedUser" />
  <v-container v-else>
    <tafalk-stream-introduction
      v-if="isFirstStreamOfUser"
    ></tafalk-stream-introduction>
    <v-card flat>
      <v-toolbar dense flat>
        <v-toolbar-title v-if="processState === 'saved'">
          <span class="grey--text"
            ><v-icon>mdi-check-circle-outline</v-icon>&nbsp;{{
              $t('stream.pour.savedLabel')
            }}</span
          >
        </v-toolbar-title>
        <v-toolbar-title v-else-if="processState === 'saving'">
          <span class="grey--text"
            ><v-icon>mdi-cached</v-icon>&nbsp;{{
              $t('stream.pour.savingLabel')
            }}</span
          >
        </v-toolbar-title>
        <v-toolbar-title v-else-if="processState === 'error'"
          ><span class="grey--text"
            ><v-icon>mdi-close-circle-outline</v-icon>&nbsp;{{
              $t('stream.pour.saveErrorLabel')
            }}</span
          >
        </v-toolbar-title>
        <v-spacer />
        <span class="grey--text caption">{{
          $t('stream.pour.regularLeavePageDisclaimerLabel')
        }}</span>
      </v-toolbar>
      <v-form>
        <v-container pt-0>
          <v-row>
            <v-col cols="12">
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
            </v-col>
          </v-row>
          <v-row align="baseline">
            <!-- title, mood etc -->
            <v-col cols="12" sm="4">
              <v-select
                @change="onMoodChange"
                :label="$t('stream.pour.moodSelectLabel')"
                v-model="moodModel"
                :items="moodOptions"
                menu-props="top"
                return-object
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                @change="onPositionChange"
                :label="$t('stream.pour.positionSelectLabel')"
                v-model="positionModel"
                :items="positionOptions"
                menu-props="top"
                return-object
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                ref="pourTitle"
                :label="$t('stream.pour.titleLabel')"
                :disabled="body == null || body.length === 0"
                v-model="title"
                @keydown.delete.prevent="onTitleBackspaceOrDeleteKeydown"
                @keyup.delete="onTitleBackspaceOrDeleteKeyup"
                @paste="onPaste"
                @cut="onCut"
                @keydown="onDefaultKeydown"
              ></v-text-field>
            </v-col>
            <v-col cols="12" offset-sm="10" sm="2">
              <v-btn
                aria-label="Seal Stream"
                block
                color="primary"
                @click="onDoneClick"
                :disabled="!body || !body.length || loading"
                :loading="loading"
              >
                {{ $t('stream.pour.sealButtonText') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<!-- UUID -->
<script src="http://wzrd.in/standalone/uuid%2Fv5@latest"></script>
<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { Logger } from '@aws-amplify/core'
import uuidv4 from 'uuid/v4'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { ListStreamsByUser } from '@/graphql/Profile'
import {
  CreateStream,
  UpdateStreamBody,
  UpdateStreamTitle,
  UpdatePosition,
  UpdateMood,
  SealStreamForEver
} from '@/graphql/Stream'
import TafalkStreamAuthorizationRequired from '@/components/nocontent/AuthorizationRequired.vue'
import TafalkStreamIntroduction from '@/components/stream/dialogs/StreamIntroduction.vue'
import { IsNullOrWhitespace, StrikethroughStr } from '@/utils/typeUtils'
import {
  streamMoodOptions,
  streamPositionOptions,
  pourStrikethroughTimeToIdle
} from '@/utils/constants'
import { GetKeyName } from '@/utils/ioUtils'

const logger = new Logger('PourStream')

export default {
  name: 'PourStream',
  data() {
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
      loading: false
    }
  },
  components: {
    TafalkStreamAuthorizationRequired,
    TafalkStreamIntroduction
  },
  created() {
    // In case of the need to add it globally, see https://forum.vuejs.org/t/detect-browser-close/5001
    window.addEventListener('beforeunload', this.onBeforeUnload)
    // window.addEventListener('unload', () => this.sealForEver)

    // Create a UUID for the new stream
    this.streamId = uuidv4()
  },
  async mounted() {
    // Check if first stream of user
    const graphqlVisitedProfileStreamsResult = await API.graphql(
      graphqlOperation(ListStreamsByUser, {
        userId: this.authenticatedUserId,
        limit: 1,
        nextToken: null
      })
    )
    const userStreamsShortList =
      graphqlVisitedProfileStreamsResult.data.listStreamsByUser.items
    if (userStreamsShortList == null || userStreamsShortList.length === 0) {
      this.isFirstStreamOfUser = true
    }

    // Require confirmation for accidental route changes
    this.setIsRouteChangeSafe(false)
  },
  async beforeDestroy() {
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
  async beforeRouteLeave(to, from, next) {
    if (
      this.getIsRouteChangeSafe ||
      window.confirm(
        this.$i18n.t('stream.pour.message.beforeRouteConfirmationText')
      )
    ) {
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
    authenticatedUser() {
      return this.getAuthenticatedUser
    },
    authenticatedUserId() {
      return this.authenticatedUser != null ? this.authenticatedUser.id : null
    }
  },
  watch: {
    // whenever 'stream' changes, this function will run
    async body(newBody, oldBody) {
      // Check if the text is all whitespace
      if (IsNullOrWhitespace(newBody)) return

      if (oldBody == null || oldBody.length === 0) {
        // Old body is null or empty, so create the entry here
        try {
          this.processState = this.savingStateConstant
          await API.graphql(
            graphqlOperation(CreateStream, {
              // Setting the optional values to null, because DynamoDB rejects empty strings -but accepts null anyway
              id: this.streamId,
              userId: this.authenticatedUserId,
              url: null,
              title: this.title !== '' ? this.title : null,
              privacy: this.privacy,
              mood: this.moodModel ? this.moodModel.value : null,
              position: this.positionModel ? this.positionModel.value : null,
              body: newBody,
              location: null,
              track: null,
              startTime: new Date().toISOString(),
              sealTime: this.incompleteSealTimeValue
            })
          )
          this.processState = this.savedStateConstant
          this.isStreamCreated = true
        } catch (err) {
          logger.error(
            'An error occurred while creating the stream',
            err.message || JSON.stringify(err)
          )
          this.processState = this.errorStateConstant
          this.setNewSiteError(err.message || err)
        }
      }
    },
    async title(newTitle, oldTitle) {
      // Update the title, if body is not null
      try {
        this.processState = this.savingStateConstant
        await API.graphql(
          graphqlOperation(UpdateStreamTitle, {
            id: this.streamId,
            title: newTitle
          })
        )
        this.processState = this.savedStateConstant
      } catch (err) {
        logger.error(
          'An error occurred while updating the stream title',
          err.message || JSON.stringify(err)
        )
        this.processState = this.errorStateConstant
        this.setNewSiteError(err.message || err)
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
    onBodyBackspaceOrDeleteKeydown(event) {
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
          this.body =
            initialBody.substring(0, cursorPos - 1) +
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
          this.body =
            initialBody.substring(0, cursorPos) +
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
    onBodyBackspaceOrDeleteKeyup(event) {
      const bodyTextArea = this.$refs.pourBody.$el.querySelector('textarea')
      const bodyTextLength = bodyTextArea.value.length

      if (!bodyTextLength || bodyTextLength === 0) return

      clearTimeout(this.timeoutID)
      this.timeoutID = setTimeout(() => {
        bodyTextArea.setSelectionRange(bodyTextLength, bodyTextLength)
      }, this.deleteTimeToIdle)
    },
    // disable backspace or delete buttons (title)
    onTitleBackspaceOrDeleteKeydown(event) {
      const exactKey = GetKeyName(event.keyCode)

      // get the selected text
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
          this.title =
            initialTitle.substring(0, cursorPos - 1) +
            StrikethroughStr(initialTitle.charAt(cursorPos - 1)) +
            this.title.substring(cursorPos, initialTitle.length)

          // Set new cursor position
          cursorPos--

          // Move cursor
          setTimeout(() =>
            titleTextField.setSelectionRange(cursorPos, cursorPos)
          )
        } else if (exactKey === 'delete' && cursorPos < this.body.length) {
          // delete keydown

          // Update body
          this.body =
            initialTitle.substring(0, cursorPos) +
            StrikethroughStr(initialTitle.charAt(cursorPos)) +
            this.body.substring(cursorPos + 1, initialTitle.length)

          // Set new cursor position
          cursorPos += 2

          // Set new cursor position
          setTimeout(() =>
            titleTextField.setSelectionRange(cursorPos, cursorPos)
          )
        }
      } else {
        // There is a selection, literally
      }
    },
    onTitleBackspaceOrDeleteKeyup(event) {
      const titleTextField = this.$refs.pourTitle.$el.querySelector('input')
      const titleTextLength = titleTextField.value.length

      if (!titleTextLength || titleTextLength === 0) return

      clearTimeout(this.timeoutID)
      this.timeoutID = setTimeout(() => {
        titleTextField.setSelectionRange(titleTextLength, titleTextLength)
      }, this.deleteTimeToIdle)
    },
    // disable pasting
    onPaste(event) {
      event.preventDefault()
    },
    // disable cutting
    onCut(event) {
      event.preventDefault()
    },
    onMouseDown(event) {
      event.preventDefault()
    },
    onMouseUp(event) {
      event.preventDefault()
    },
    async onDefaultKeyup(event) {
      if (IsNullOrWhitespace(this.body) || !this.isStreamCreated) return
      try {
        this.processState = this.savingStateConstant
        await API.graphql(
          graphqlOperation(UpdateStreamBody, {
            id: this.streamId,
            body: this.body
          })
        )
        this.processState = this.savedStateConstant
      } catch (err) {
        logger.error(
          'An error occurred while updating the stream',
          err.message || JSON.stringify(err)
        )
        this.processState = this.errorStateConstant
        this.setNewSiteError(err.message || err)
      }
    },
    onDefaultKeydown(event) {
      // Disable Undo with keyboard
      if (event.ctrlKey && event.key === 'z') {
        event.preventDefault()
      }
    },
    onRightClick(event) {
      // already prevented. do nothing
    },
    async onMoodChange() {
      if (!this.body || !this.body.length) return
      try {
        this.processState = this.savingStateConstant
        await API.graphql(
          graphqlOperation(UpdateMood, {
            // Setting the optional values to null, because DynamoDB rejects empty strings -but accepts null anyway
            id: this.streamId,
            mood: this.moodModel ? this.moodModel.value : null
          })
        )
        this.processState = this.savedStateConstant
      } catch (err) {
        logger.error(
          'An error occurred while updating the mood',
          err.message || JSON.stringify(err)
        )
        this.processState = this.errorStateConstant
        this.setNewSiteError(err.message || err)
      }
    },
    async onPositionChange() {
      if (!this.body || !this.body.length) return
      try {
        this.processState = this.savingStateConstant
        await API.graphql(
          graphqlOperation(UpdatePosition, {
            // Setting the optional values to null, because DynamoDB rejects empty strings -but accepts null anyway
            id: this.streamId,
            position: this.positionModel ? this.positionModel.value : null
          })
        )
        this.processState = this.savedStateConstant
      } catch (err) {
        logger.error(
          'An error occurred while updating the position',
          err.message || JSON.stringify(err)
        )
        this.processState = this.errorStateConstant
        this.setNewSiteError(err.message || err)
      }
    },
    async onDoneClick() {
      this.loading = true
      try {
        await this.sealForEver()
      } catch (err) {
        logger.error('Error occurred while sealing the stream', err)
        this.setNewSiteError(err.message || err)
      } finally {
        this.$router.push({ name: 'stream', params: { id: this.streamId } })
        this.setIsRouteChangeSafe(false)
        this.loading = false
      }
    },
    async sealForEver() {
      // Check if something to seal
      if (!this.body || !this.body.length) return
      try {
        await API.graphql(
          graphqlOperation(SealStreamForEver, {
            id: this.streamId,
            title: this.title,
            body: this.body,
            privacy: this.privacy,
            mood: this.moodModel ? this.moodModel.value : null,
            position: this.positionModel ? this.positionModel.value : null,
            location: null,
            track: null,
            sealTime: new Date().toISOString()
          })
        )
      } catch (err) {
        logger.error(
          'An error occurred while sealing the stream',
          err.message || JSON.stringify(err)
        )
        this.setNewSiteError(err.message || err)
      }
    },
    async onBeforeUnload(event) {
      // An attempt to leave? Save last state immediately
      event.preventDefault()
      // sealing should be done as a part of 'beforeDestroy'
      await this.sealForEver()
      return ''
    }
  }
}
</script>
