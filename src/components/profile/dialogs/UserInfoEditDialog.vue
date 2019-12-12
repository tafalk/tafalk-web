<template>
  <v-dialog
    v-model="getIsUserInfoEditDialogVisible"
    persistent
    max-width="750px"
  >
    <v-card>
      <v-card-title class="headline" primary-title>{{
        $t('user.edit.info.dialog.title')
      }}</v-card-title>
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
        ></v-text-field>
        -->
          <!-- Bio -->
          <v-textarea
            v-model="bioModel"
            :rules="bioRules"
            :counter="40"
            max="40"
            maxlength="40"
            no-resize
            rows="1"
            :placeholder="$t('user.edit.info.dialog.bioPlaceholder')"
          >
            <div slot="label">
              {{ $t('user.edit.info.dialog.bioLabel') }}
              <small>{{ $t('common.label.optionalPares') }}</small>
            </div>
          </v-textarea>
          <!-- Location -->
          <v-autocomplete
            :label="$t('user.edit.info.dialog.locationLabel')"
            v-model="locationModel"
            :items="locationEntries"
            :search-input.sync="locationSearchText"
            :loading="isLocationDataLoading"
            flat
            dense
            item-text="name"
            item-value="name"
            hide-no-data
          >
            <template v-slot:item="{ item }">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action class="grey--text">{{
                item.type
              }}</v-list-item-action>
            </template>
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
          aria-label="Close"
          color="blue darken-1"
          text
          @click.native="setIsUserInfoEditDialogVisible(false)"
          >{{ $t('common.options.closeButtonText') }}</v-btn
        >
        <v-btn
          aria-label="Save"
          color="blue darken-1"
          text
          @click.native="onSaveInfoEditClick"
          >{{ $t('common.options.saveButtonText') }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import debounce from 'debounce'
import { postTypeDelay } from '@/utils/constants'
import { GenerateGeocoderRequestLink } from '@/utils/generators'

export default {
  name: 'UserInfoEditDialog',
  props: ['userId', 'preferredName', 'bio', 'location', 'site'],
  data() {
    return {
      valid: false,
      preferredNameModel: '',
      bioModel: '',
      siteModel: '',
      omittedPlaceTypes: ['subcity', 'street'],
      preferredNameRules: [
        v => !!v || this.$i18n.t('user.edit.info.rules.preferredNameReq'),
        v =>
          v.length <= 24 ||
          this.$i18n.t('user.edit.info.rules.preferredNameUpLimit')
      ],
      bioRules: [
        v =>
          (v != null && v.length <= 1000) ||
          this.$i18n.t('user.edit.info.rules.bioUpLimit')
      ],
      siteRules: [
        v =>
          v === null ||
          v === undefined ||
          v === '' ||
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(
            v
          ) ||
          this.$i18n.t('user.edit.info.rules.notValidSite')
      ],
      locationModel: null,
      locationSearchText: null,
      foundItems: [],
      isLocationDataLoading: false
    }
  },
  created() {
    this.locationModel = this.location
    this.preferredNameModel = this.preferredName
    this.bioModel = this.bio
    this.siteModel = this.site

    // Replace method with debounced version at start
    this.searchLocations = debounce(this.searchLocations, postTypeDelay)
  },
  destroyed() {
    this.locationModel = null
    this.preferredNameModel = null
    this.bioModel = null
    this.siteModel = null
  },
  computed: {
    ...mapGetters({
      getIsUserInfoEditDialogVisible:
        'visitedUser/dialog/getIsUserInfoEditDialogVisible'
    }),
    locationEntries() {
      return this.foundItems
        .filter(el => !this.omittedPlaceTypes.includes(el.type))
        .map(el => ({
          name: el.display_name,
          type: el.type
        }))
    }
  },
  watch: {
    locationSearchText(newVal) {
      // If less than 3 chars typed, do not search
      if (newVal?.length < 3) return

      this.isLocationDataLoading = true

      try {
        this.searchLocations(newVal)
      } catch (err) {
        this.setNewSiteError(err.message ?? err)
      } finally {
        this.isLocationDataLoading = false
      }
    }
  },
  methods: {
    ...mapMutations({
      setIsUserInfoEditDialogVisible:
        'visitedUser/dialog/setIsUserInfoEditDialogVisible'
    }),
    ...mapActions({
      setUserBasicInfo: 'visitedUser/setBasicInfo',
      setNewSiteError: 'shared/setNewSiteError'
    }),
    searchLocations(text) {
      var vm = this
      fetch(GenerateGeocoderRequestLink(text), {
        headers: { Accept: 'application/json' }
      })
        .then(resp => resp.json())
        .then(resp => {
          vm.foundItems = resp.results
        })
    },
    async onSaveInfoEditClick() {
      await this.setUserBasicInfo({
        userId: this.userId,
        preferredName: this.preferredNameModel,
        bio: this.bioModel,
        location: this.locationModel,
        site: this.siteModel
      })

      this.setIsUserInfoEditDialogVisible(false)
    }
  }
}
</script>
