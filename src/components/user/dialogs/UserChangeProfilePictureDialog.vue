<template>
  <v-layout row justify-center>
    <v-dialog v-model="getIsChangeProfilePictureDialogVisible" lazy persistent max-width="750px">
      <!--
        Taken from: https://jsfiddle.net/meyubaraj/fLbe7r72/
      -->
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
          <v-container grid-list-md text-xs-center>
            <v-avatar pt-1 size="200" color="grey" v-if="imageUrl">
              <img :src=imageUrl height="200" />
            </v-avatar>
            <v-text-field
              :label="$t('user.profilePicture.selectImageLabel')"
              @click='onPickFile'
              v-model='imageFileName'
              prepend-icon='attach_file'
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked"
            >
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            color="primary"
            @click.stop="closeAndClearDialog"
          >{{ $t('common.options.cancelButtonText') }}</v-btn>
          <v-btn
            color="primary"
            @click.stop="onUploadSelectedProfilePictureClick"
            :loading="loading"
          >{{ $t('common.options.uploadButtonText') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { Logger } from 'aws-amplify'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { GenerateProfilePictureFileName } from '@/utils/FileNameGenerator'

const logger = new Logger('UserChangeProfilePictureDialog')

export default {
  name: 'UserChangeProfilePictureDialog',
  props: ['userId', 'existingProfilePictureObjectUrl'],
  data () {
    return {
      imageFileName: '',
      imageUrl: '',
      imageFileObject: null,
      profilePicturesFolderVisibility: 'protected',
      loading: false,
      loader: null
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
      setProfilePicture: 'visitedUser/setProfilePicture'
    }),

    // Pick profile photo methods
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files

      if (files[0] !== undefined) {
        this.imageFileName = files[0].name

        // Check validity of file
        if (this.imageFileName.lastIndexOf('.') <= 0) {
          return
        }

        // If valid, continue
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFileObject = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageFileName = ''
        this.imageFileObject = null
        this.imageUrl = ''
      }
    },
    async onUploadSelectedProfilePictureClick () {
      this.loading = true
      this.loader = 'loading'
      const imageFileObjectToUpload = this.imageFileObject

      // A file is not chosen
      if (!imageFileObjectToUpload) {
        this.closeAndClearDialog()
      }

      const imageFileObjectKey = GenerateProfilePictureFileName(imageFileObjectToUpload, this.userId)

      // A file is chosen, call vuex action
      try {
        await this.setProfilePicture({
          userId: this.userId,
          profilePicture: {
            level: this.profilePicturesFolderVisibility,
            key: imageFileObjectKey,
            type: imageFileObjectToUpload.type,
            fileObject: imageFileObjectToUpload
          }
        })
      } catch (err) {
        logger.error('Error occurred while setting profile picture', err)
        throw err
      } finally {
        this.closeAndClearDialog()
      }
    },
    closeAndClearDialog () {
      this.loader = null
      this.loading = false
      this.imageFileName = ''
      this.imageFileObject = null
      this.imageUrl = ''
      this.setIsChangeProfilePictureDialogVisible(false)
    }
  }
}
</script>
