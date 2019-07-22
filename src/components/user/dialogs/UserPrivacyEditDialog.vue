<template>
  <v-layout row justify-center>
    <v-dialog v-model="getIsUserPrivacyEditDialogVisible" persistent max-width="750px">
      <v-card>
        <v-card-title class="headline" primary-title>
          {{ $t('user.edit.privacy.dialog.title') }}
        </v-card-title>
        <v-card-text>
        <v-form>
          <!-- Profile Privacy -->
          <v-select
            :label="$t('user.edit.privacy.dialog.profilePrivacyLabel')"
            :items="profilePrivacyOptions"
            v-model="profilePrivacyModel"
            :hint="profilePrivacyHint"
            item-text="displayValue"
            item-value="backendValue"
            return-object
            persistent-hint
          ></v-select>
          <br/>
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
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'UserPrivacyEditDialog',
  props: ['userId', 'profilePrivacy', 'allowDirectMesages'],
  data () {
    return {
      profilePrivacyModel: null,
      allowDirectMessagesModel: null,
      profilePrivacyOptions: [
        {
          displayValue: this.$i18n.t('user.edit.privacy.dialog.profilePrivacyOptionDisplayPublic'),
          backendValue: 'Public'
        },
        {
          displayValue: this.$i18n.t('user.edit.privacy.dialog.profilePrivacyOptionDisplayPrivate'),
          backendValue: 'Private'
        },
        {
          displayValue: this.$i18n.t('user.edit.privacy.dialog.profilePrivacyOptionDisplayProtected'),
          backendValue: 'Protected'
        }
      ],
      allowDirectMesagesOptions: [
        {
          displayValue: this.$i18n.t('user.edit.privacy.dialog.allowDmOptionDisplayYes'),
          backendValue: true
        },
        {
          displayValue: this.$i18n.t('user.edit.privacy.dialog.allowDmOptionDisplayNo'),
          backendValue: false
        }
      ],
      profilePrivacyPublicHint: this.$i18n.t('user.edit.privacy.dialog.profilePrivacyPublicHint'),
      profilePrivacyProtectedHint: this.$i18n.t('user.edit.privacy.dialog.profilePrivacyProtectedHint'),
      profilePrivacyPrivateHint: this.$i18n.t('user.edit.privacy.dialog.profilePrivacyPrivateHint'),
      profilePrivacyUnknownHint: this.$i18n.t('user.edit.privacy.dialog.profilePrivacyUnknownHint')
    }
  },
  created () {
    this.profilePrivacyModel = this.getObjectFromProfilePrivacyBackendValue(this.profilePrivacy)
    this.allowDirectMessagesModel = this.getObjectFromAllowDirectMessagesBackendValue(this.allowDirectMesages)
  },
  computed: {
    ...mapGetters({
      getIsUserPrivacyEditDialogVisible: 'visitedUser/dialog/getIsUserPrivacyEditDialogVisible'
    }),
    userPrivacyEditDialog () {
      return this.getUserPrivacyEditDialog
    },
    profilePrivacyHint () {
      if (this.profilePrivacyModel.backendValue === 'Public') {
        return this.profilePrivacyPublicHint
      } else if (this.profilePrivacyModel.backendValue === 'Private') {
        return this.profilePrivacyPrivateHint
      } else if (this.profilePrivacyModel.backendValue === 'Protected') {
        return this.profilePrivacyProtectedHint
      } else {
        return this.profilePrivacyUnknownHint
      }
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
        profilePrivacy: this.profilePrivacyModel.backendValue,
        allowDirectMesages: this.allowDirectMessagesModel.backendValue
      })

      this.setIsUserPrivacyEditDialogVisible(false)
    },
    getObjectFromProfilePrivacyBackendValue (backendValue) {
      if (backendValue === 'Public') {
        return {
          displayValue: this.$i18n.t('user.edit.privacy.dialog.profilePrivacyOptionDisplayPublic'),
          backendValue: 'Public'
        }
      } else if (backendValue === 'Private') {
        return {
          displayValue: this.$i18n.t('user.edit.privacy.dialog.profilePrivacyOptionDisplayPrivate'),
          backendValue: 'Private'
        }
      } else if (backendValue === 'Protected') {
        return {
          displayValue: this.$i18n.t('user.edit.privacy.dialog.profilePrivacyOptionDisplayProtected'),
          backendValue: 'Protected'
        }
      } else {
        return { displayValue: null, backendValue: null }
      }
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
