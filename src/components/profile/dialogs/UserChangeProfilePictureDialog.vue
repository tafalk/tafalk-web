<template>
  <v-dialog v-model="getIsChangeProfilePictureDialogVisible" persistent max-width="750px">
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ $t('user.profilePicture.dialog.title') }}</h3>
          <div>
            <span class="grey--text">{{ $t('user.profilePicture.dialog.subtitle') }}</span>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-lg text-xs-center>
          <v-avatar pt-1 size="200" color="grey" v-if="imageUrl">
            <v-img :src="imageUrl" height="200" />
          </v-avatar>
          <v-file-input
            v-model="file"
            flat
            clearable
            :label="$t('user.profilePicture.selectImageLabel')"
            accept="image/*"
            @change="onFileChange"
          ></v-file-input>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click.stop="closeAndClearDialog"
        >{{ $t('common.options.cancelButtonText') }}</v-btn>
        <v-btn
          color="primary"
          @click.stop="onUploadSelectedProfilePictureClick"
          :loading="uploadLoading"
          :disabled="uploadLoading || !file"
        >{{ $t('common.options.uploadButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { GenerateProfilePictureFileName } from '@/utils/generators'

export default {
  name: 'UserChangeProfilePictureDialog',
  props: ['userId', 'existingProfilePictureObjectUrl'],
  data () {
    return {
      file: null,
      imageUrl: null,
      profilePicturesFolderVisibility: 'protected',
      uploadLoading: false
    }
  },
  computed: {
    ...mapGetters({
      getIsChangeProfilePictureDialogVisible: 'visitedUser/dialog/getIsChangeProfilePictureDialogVisible'
    })
  },
  methods: {
    ...mapMutations({
      setIsChangeProfilePictureDialogVisible: 'visitedUser/dialog/setIsChangeProfilePictureDialogVisible'
    }),
    ...mapActions({
      setProfilePicture: 'visitedUser/setProfilePicture',
      setNewSiteError: 'shared/setNewSiteError'
    }),
    onFileChange () {
      if (!this.file) {
        this.clearDialog()
      }
      let reader = new FileReader()
      reader.onload = () => {
        this.imageUrl = reader.result
      }
      reader.readAsDataURL(this.file)
    },
    async onUploadSelectedProfilePictureClick () {
      this.uploadLoading = true

      // A file is chosen, call vuex action
      try {
        await this.setProfilePicture({
          userId: this.userId,
          profilePicture: {
            level: this.profilePicturesFolderVisibility,
            key: GenerateProfilePictureFileName(this.file, this.userId),
            type: this.file.type,
            fileObject: this.file
          }
        })
        this.setIsChangeProfilePictureDialogVisible(false)
      } catch (err) {
        this.setNewSiteError(err.message || err)
      } finally {
        this.clearDialog()
      }
    },
    closeAndClearDialog () {
      this.setIsChangeProfilePictureDialogVisible(false)
      this.clearDialog()
    },
    clearDialog () {
      this.uploadLoading = false
      this.file = null
      this.imageUrl = null
    }
  }
}
</script>
