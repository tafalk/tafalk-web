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
          :items="allowDirectMesagesOptions"
          v-model="allowDirectMessagesModel"
          item-text="displayValue"
          item-value="backendValue"
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
  props: ['userId', 'allowDirectMesages'],
  data () {
    return {
      profilePrivacyModel: null,
      allowDirectMessagesModel: null,
      allowDirectMesagesOptions: [
        {
          displayValue: this.$i18n.t('user.edit.privacy.dialog.allowDmOptionDisplayYes'),
          backendValue: true
        },
        {
          displayValue: this.$i18n.t('user.edit.privacy.dialog.allowDmOptionDisplayNo'),
          backendValue: false
        }
      ]
    }
  },
  created () {
    this.allowDirectMessagesModel = this.getObjectFromAllowDirectMessagesBackendValue(this.allowDirectMesages)
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
        allowDirectMesages: this.allowDirectMessagesModel.backendValue
      })

      this.setIsUserPrivacyEditDialogVisible(false)
    },
    getObjectFromAllowDirectMessagesBackendValue (backendValue) {
      if (backendValue === true) {
        return {
          displayValue: this.$i18n.t('user.edit.privacy.dialog.allowDmOptionDisplayYes'),
          backendValue: true
        }
      } else {
        return {
          displayValue: this.$i18n.t('user.edit.privacy.dialog.allowDmOptionDisplayNo'),
          backendValue: false
        }
      }
    }
  }
}
</script>
