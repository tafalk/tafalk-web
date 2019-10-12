<template>
  <v-dialog v-model="getIsUserPrivacyEditDialogVisible" persistent max-width="750px">
    <v-card>
      <v-card-title class="headline" primary-title>
        {{ $t('user.edit.privacy.dialog.title') }}
      </v-card-title>
      <v-card-text>
      <v-form>
        <!-- Allow Direct Messages -->
        <v-select
          :label="$t('user.edit.privacy.dialog.allowDmLabel')"
          :items="allowDirectMessagesOptions"
          v-model="allowDirectMessagesModel"
          return-object
          persistent-hint
        ></v-select>
      </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click.native="setIsUserPrivacyEditDialogVisible(false)"
        >{{ $t('common.options.closeButtonText') }}</v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click.native="onSavePrivacyEditClick"
        >{{ $t('common.options.saveButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'UserPrivacyEditDialog',
  props: ['userId', 'allowDirectMessages'],
  data () {
    return {
      profilePrivacyModel: null,
      allowDirectMessagesModel: null,
      allowDirectMessagesOptions: [
        {
          text: this.$i18n.t('user.edit.privacy.dialog.allowDmOptionDisplayYes'),
          value: true
        },
        {
          text: this.$i18n.t('user.edit.privacy.dialog.allowDmOptionDisplayNo'),
          value: false
        }
      ]
    }
  },
  created () {
    this.allowDirectMessagesModel = this.getObjectFromAllowDirectMessagesValue(this.allowDirectMessages)
  },
  computed: {
    ...mapGetters({
      getIsUserPrivacyEditDialogVisible: 'visitedUser/dialog/getIsUserPrivacyEditDialogVisible'
    }),
    userPrivacyEditDialog () {
      return this.getUserPrivacyEditDialog
    }
  },
  methods: {
    ...mapMutations({
      setIsUserPrivacyEditDialogVisible: 'visitedUser/dialog/setIsUserPrivacyEditDialogVisible'
    }),
    ...mapActions({
      setProfilePrivacy: 'visitedUser/setProfilePrivacy'
    }),
    onSavePrivacyEditClick () {
      this.setProfilePrivacy({
        userId: this.userId,
        allowDirectMessages: this.allowDirectMessagesModel.value
      })

      this.setIsUserPrivacyEditDialogVisible(false)
    },
    getObjectFromAllowDirectMessagesValue (val) {
      if (val) {
        return {
          text: this.$i18n.t('user.edit.privacy.dialog.allowDmOptionDisplayYes'),
          value: true
        }
      }
      return {
        text: this.$i18n.t('user.edit.privacy.dialog.allowDmOptionDisplayNo'),
        value: false
      }
    }
  }
}
</script>
