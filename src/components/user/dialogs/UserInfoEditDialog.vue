<template>
  <v-layout row justify-center>
    <v-dialog v-model="getIsUserInfoEditDialogVisible" lazy persistent max-width="750px">
      <v-card>
        <v-card-title class="headline" primary-title>{{ $t('user.edit.info.dialog.title') }}</v-card-title>
        <v-card-text>
        <v-form v-model="valid">
          <!-- Preferred Name -->
          <!--
          <v-text-field
            v-model="preferredNameModel"
            :rules="preferredNameRules"
            :counter="24"
            min="2"
            max="24"
            maxlength="24"
            :label="$t('user.edit.info.dialog.preferredNameLabel')"
            required
          ></v-text-field>
          -->

          <!-- Bio -->
          <v-textarea
            v-model="bioModel"
            :rules="bioRules"
            :counter="1000"
            max="1000"
            maxlength="1000"
            :placeholder="$t('user.edit.info.dialog.bioPlaceholder')"
          >
            <div slot="label">{{ $t('user.edit.info.dialog.bioLabel') }} <small>{{ $t('common.label.optionalPares') }}</small></div>
          </v-textarea>

          <!-- Location -->
          <v-autocomplete
            :label="$t('user.edit.info.dialog.locationLabel')"
            v-model="autocompleteLocationModel"
            :items="locationFoundItems"
            :search-input.sync="locationSearchText"
            :loading="isLocationDataLoading"
            item-text="value"
            item-value="id"
            hide-no-data
            return-object
          >
          </v-autocomplete>

          <!-- Sites -->
          <v-text-field
            v-model="siteModel"
            :rules="siteRules"
            :label="$t('user.edit.info.dialog.siteLabel')"
          ></v-text-field>
        </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            flat
            @click.native="setIsUserInfoEditDialogVisible(false)"
          >{{ $t('common.options.closeButtonText') }}</v-btn>
          <v-btn
            color="blue darken-1"
            flat
            @click.native="onSaveInfoEditClick"
          >{{ $t('common.options.saveButtonText') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
/* eslint handle-callback-err: "warn" */
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { GetSuggestions } from '@/utils/PlaceUtils'

export default {
  name: 'UserInfoEditDialog',
  props: ['userId', 'preferredName', 'bio', 'location', 'site'],
  data () {
    return {
      valid: false,
      preferredNameModel: '',
      bioModel: '',
      siteModel: '',
      preferredNameRules: [
        v => !!v || this.$i18n.t('user.edit.info.rules.preferredNameReq'),
        v => v.length <= 24 || this.$i18n.t('user.edit.info.rules.preferredNameUpLimit')
      ],
      bioRules: [
        v => (v != null && v.length <= 1000) || this.$i18n.t('user.edit.info.rules.bioUpLimit')
      ],
      siteRules: [
        v => (v === null || v === undefined || v === '' || /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(v)) || this.$i18n.t('user.edit.info.rules.notValidSite')
      ],
      autocompleteLocationModel: null,
      locationSearchText: null,
      locationEntries: [],
      isLocationDataLoading: false
    }
  },
  created () {
    if (this.location) {
      // TODO: Make this work properly
      this.autocompleteLocationModel = this.location
      this.locationEntries.push(this.location)
    }

    this.preferredNameModel = this.preferredName
    this.bioModel = this.bio
    this.siteModel = this.site
  },
  destroyed () {
    this.autocompleteLocationModel = null
    this.preferredNameModel = null
    this.bioModel = null
    this.siteModel = null
  },
  computed: {
    ...mapGetters({
      getIsUserInfoEditDialogVisible: 'visitedUser/dialog/getIsUserInfoEditDialogVisible'
    }),
    locationFoundItems () {
      return this.locationEntries
    }
  },
  watch: {
    locationSearchText (newVal) {
      var _vue = this // << here

      // Items have already been loaded
      // if (this.locationFoundItems != null && this.locationFoundItems.length > 0) return

      // If less than 3 chars typed, do not search
      if (!newVal || newVal.length <= 3) return

      this.isLocationDataLoading = true

      GetSuggestions(newVal)
        .then(function (res) {
          _vue.locationEntries = res
          _vue.isLocationDataLoading = false
        })
        .catch(function (err) {
          _vue.isLocationDataLoading = false
        })
    }
  },
  methods: {
    ...mapMutations({
      setIsUserInfoEditDialogVisible: 'visitedUser/dialog/setIsUserInfoEditDialogVisible'
    }),
    ...mapActions({
      setUserBasicInfo: 'visitedUser/setBasicInfo'
    }),
    async onSaveInfoEditClick () {
      await this.setUserBasicInfo({
        userId: this.userId,
        preferredName: this.preferredNameModel,
        bio: this.bioModel,
        location: this.autocompleteLocationModel,
        site: this.siteModel
      })

      this.setIsUserInfoEditDialogVisible(false)
    }
  }
}
</script>
