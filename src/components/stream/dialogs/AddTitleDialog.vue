<template>
  <v-dialog v-model="getIsAddTitleDialogVisible" persistent max-width="400">
    <v-card>
      <v-card-title class="headline">{{ $t('stream.pour.titleLabel') }}</v-card-title>
      <v-card-text>
        <v-text-field
          ref="pourTitle"
          v-model="title"
          @keydown.delete.prevent="onTitleBackspaceOrDeleteKeydown"
          @keyup.delete="onTitleBackspaceOrDeleteKeyup"
          @paste="onPaste"
          @cut="onCut"
          @keydown="onDefaultKeydown"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click.native="onDoneClick"
        >
          {{ $t('stream.pour.doneButtonText') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { API, graphqlOperation, Logger } from 'aws-amplify'
import { mapGetters, mapMutations } from 'vuex'
import { print as gqlToString } from 'graphql/language'
import { UpdateStreamTitle } from '@/graphql/Stream'
import { GetKeyName } from '@/utils/IOUtils'
import { pourStrikethroughTimeToIdle } from '@/utils/Constants'
import { StrikethroughStr } from '@/utils/StringUtils'

const logger = new Logger('AddTitleDialog')

export default {
  name: 'AddTitleDialog',
  props: ['streamId'],
  data () {
    return {
      title: null,
      processState: '',
      savedStateConstant: 'saved',
      savingStateConstant: 'saving',
      errorStateConstant: 'error',
      incompleteSealedAtValue: 'NA',
      timeoutID: null,
      deleteTimeToIdle: pourStrikethroughTimeToIdle
    }
  },
  watch: {
    // whenever 'title' changes, this function will run
    async title (newTitle, oldTitle) {
      // Update the title, if body is not null
      try {
        this.processState = this.savingStateConstant
        await API.graphql(graphqlOperation(gqlToString(UpdateStreamTitle), {
          id: this.streamId,
          title: newTitle
        }))
        this.processState = this.savedStateConstant
      } catch (err) {
        logger.error('An error occurred while updating the stream title', err.message || JSON.stringify(err))
        this.processState = this.errorStateConstant
        this.setNewSiteError(err.message || err)
      }
    }
  },
  computed: {
    ...mapGetters({
      getIsAddTitleDialogVisible: 'stream/dialog/getIsAddTitleDialogVisible'
    })
  },
  methods: {
    ...mapMutations({
      hideAddTitleDialog: 'stream/dialog/hideAddTitleDialog',
      setIsRouteChangeSafe: 'stream/setIsRouteChangeSafe'
    }),
    // disable backspace or delete buttons (title)
    onTitleBackspaceOrDeleteKeydown (event) {
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
    onDefaultKeydown (event) {
      // Disable Undo with keyboard
      if (event.ctrlKey && event.key === 'z') {
        event.preventDefault()
      }
    },
    onDoneClick () {
      this.hideAddTitleDialog()
      this.$router.push({ name: 'stream', params: { id: this.streamId } })
      this.setIsRouteChangeSafe(false)
    }
  }
}
</script>
