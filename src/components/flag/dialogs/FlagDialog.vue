<template>
<v-dialog v-model="getIsFlagDialogVisible" persistent max-width="600">
  <v-stepper v-model="flagCurrentStep">
    <v-stepper-header>
      <v-stepper-step
        :complete="flagCurrentStep > 1"
        step="1"
      >{{ $t('flag.dialog.steps.category.stepName') }}</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step
        step="2"
      >{{ $t('flag.dialog.steps.detail.stepName') }}</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <!-- Step 1 content -->
      <v-stepper-content step="1" >
        <v-subheader class="grey--text"
        >{{ $t('flag.dialog.steps.category.header') }}</v-subheader>
        <v-list two-line>
          <v-list-tile
            :disabled="isSelectedCategorySpam"
          >
            <v-list-tile-content @click="onClickCategory(spamCategoryValue)">
              <v-list-tile-title>{{ $t('flag.dialog.steps.category.options.spam.header') }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ $t('flag.dialog.steps.category.options.spam.detail') }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action
              v-if="isSelectedCategorySpam"
            >
                <v-icon :color="selectedOptionIndicatorColor">check_circle</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile
            :disabled="isSelectedCategoryRude"
          >
            <v-list-tile-content @click="onClickCategory(rudeCategoryValue)">
              <v-list-tile-title>{{ $t('flag.dialog.steps.category.options.rude.header') }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ $t('flag.dialog.steps.category.options.rude.detail') }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action
              v-if="isSelectedCategoryRude"
            >
                <v-icon :color="selectedOptionIndicatorColor">check_circle</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile
            :disabled="isSelectedCategoryLowQuality"
          >
            <v-list-tile-content @click="onClickCategory(lowQualityCategoryValue)">
              <v-list-tile-title>{{ $t('flag.dialog.steps.category.options.lowQuality.header') }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ $t('flag.dialog.steps.category.options.lowQuality.detail') }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action
              v-if="isSelectedCategoryLowQuality"
            >
                <v-icon :color="selectedOptionIndicatorColor">check_circle</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-btn
          color="primary"
          :disabled="!selectedCategory"
          @click="flagCurrentStep = 2"
        >{{ $t('flag.dialog.steps.category.buttons.continue') }}</v-btn>
        <v-btn
          flat
          @click="onCancelFlagButtonClick"
        >{{ $t('flag.dialog.steps.category.buttons.cancel') }}</v-btn>
      </v-stepper-content>

      <!-- Step 2 content -->
      <v-stepper-content step="2" >
        <!-- Spam Details -->
        <template v-if="isSelectedCategorySpam">
          <v-subheader class="grey--text"
          >{{ $t('flag.dialog.steps.detail.spam.header') }}</v-subheader>
          <v-list two-line>
            <v-list-tile
              :disabled="isSelectedSpamDetailAd"
            >
              <v-list-tile-content @click="onClickSpamDetail(spamAdDetailValue)">
                <v-list-tile-sub-title>{{ $t('flag.dialog.steps.detail.spam.options.ad.detail') }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action
                v-if="isSelectedSpamDetailAd"
              >
                <v-icon :color="selectedOptionIndicatorColor">check_circle</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile
              :disabled="isSelectedSpamDetailHarmfulLink"
            >
              <v-list-tile-content @click="onClickSpamDetail(spamHarmfulLinkDetailValue)">
                <v-list-tile-sub-title>{{ $t('flag.dialog.steps.detail.spam.options.harmful.detail') }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action
                v-if="isSelectedSpamDetailHarmfulLink"
              >
                <v-icon :color="selectedOptionIndicatorColor">check_circle</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
          </v-list>
        </template>
        <!-- Rude Content details -->
        <template v-else-if="isSelectedCategoryRude">
            <v-list-tile
              :disabled="isSelectedRudeDetailHate"
            >
              <v-list-tile-content @click="onClickRudeDetail(rudeHateDetailValue)">
                <v-list-tile-sub-title>{{ $t('flag.dialog.steps.detail.rude.options.hate.detail') }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action
                v-if="isSelectedRudeDetailHate"
              >
                <v-icon :color="selectedOptionIndicatorColor">check_circle</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile
              :disabled="isSelectedRudeDetailThreat"
            >
              <v-list-tile-content @click="onClickRudeDetail(rudeThreatDetailValue)">
                <v-list-tile-sub-title>{{ $t('flag.dialog.steps.detail.rude.options.threat.detail') }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action
                v-if="isSelectedRudeDetailThreat"
              >
                <v-icon :color="selectedOptionIndicatorColor">check_circle</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile
              :disabled="isSelectedRudeDetailOffensive"
            >
              <v-list-tile-content @click="onClickRudeDetail(rudeOffensiveDetailValue)">
                <v-list-tile-sub-title>{{ $t('flag.dialog.steps.detail.rude.options.offensive.detail') }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action
                v-if="isSelectedRudeDetailOffensive"
              >
                <v-icon :color="selectedOptionIndicatorColor">check_circle</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile
              :disabled="isSelectedRudeDetailPrivate"
            >
              <v-list-tile-content @click="onClickRudeDetail(rudePrivateDetailValue)">
                <v-list-tile-sub-title>{{ $t('flag.dialog.steps.detail.rude.options.private.detail') }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action
                v-if="isSelectedRudeDetailPrivate"
              >
                <v-icon :color="selectedOptionIndicatorColor">check_circle</v-icon>
              </v-list-tile-action>
            </v-list-tile>
        </template>
        <!-- Low Quality Content details -->
        <template v-else>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>{{ $t('flag.dialog.steps.detail.lowQuality.options.default.detail') }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-textarea
            v-model="additionalInfo"
            box
            rows="4"
            :label="$t('flag.dialog.steps.detail.additionalInfo.label')"
        ></v-textarea>
        <v-btn
          color="primary"
          :loading="isFlagLoading"
          :disabled="!selectedDetail"
          @click="onFlagCompletionClick"
        >{{ $t('flag.dialog.steps.detail.buttons.done') }}</v-btn>
        <v-btn
          flat
          @click="flagCurrentStep = 1"
        >{{ $t('flag.dialog.steps.detail.buttons.previous') }}</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</v-dialog>
</template>

<script>
import { API, graphqlOperation, Logger } from 'aws-amplify'
import { mapGetters, mapMutations } from 'vuex'
import { CreateStreamFlag, CreateCommentFlag } from '@/graphql/Flag'

const logger = new Logger('FlagDialog')

export default {
  name: 'FlagDialog',
  data () {
    return {
      flagCurrentStep: 0,
      additionalInfo: '',
      selectedOptionIndicatorColor: 'orange darken-1',
      spamCategoryValue: 'spam',
      rudeCategoryValue: 'rude',
      lowQualityCategoryValue: 'lowQuality',
      spamAdDetailValue: 'ad',
      spamHarmfulLinkDetailValue: 'harmfulLink',
      rudeHateDetailValue: 'hate',
      rudeThreatDetailValue: 'threat',
      rudeOffensiveDetailValue: 'offensive',
      rudePrivateDetailValue: 'privateInfo',
      selectedCategory: '',
      selectedDetail: '',
      isFlagLoading: false
    }
  },
  computed: {
    ...mapGetters({
      getIsFlagDialogVisible: 'flag/dialog/getIsFlagDialogVisible',
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getStream: 'stream/getStream',
      getFlag: 'flag/getFlag'
    }),
    stream () {
      return this.getStream
    },
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    flag () {
      return this.getFlag
    },
    isSelectedCategorySpam: {
      get () {
        return this.selectedCategory === this.spamCategoryValue
      },
      set (val) {
        this.spamCategoryValue = val
      }
    },
    isSelectedCategoryRude: {
      get () {
        return this.selectedCategory === this.rudeCategoryValue
      },
      set (val) {
        this.rudeCategoryValue = val
      }
    },
    isSelectedCategoryLowQuality: {
      get () {
        return this.selectedCategory === this.lowQualityCategoryValue
      },
      set (val) {
        this.lowQualityCategoryValue = val
      }
    },
    isSelectedSpamDetailAd () {
      return this.selectedDetail === this.spamAdDetailValue
    },
    isSelectedSpamDetailHarmfulLink () {
      return this.selectedDetail === this.spamHarmfulLinkDetailValue
    },
    isSelectedRudeDetailHate () {
      return this.selectedDetail === this.rudeHateDetailValue
    },
    isSelectedRudeDetailThreat () {
      return this.selectedDetail === this.rudeThreatDetailValue
    },
    isSelectedRudeDetailOffensive () {
      return this.selectedDetail === this.rudeOffensiveDetailValue
    },
    isSelectedRudeDetailPrivate () {
      return this.selectedDetail === this.rudePrivateDetailValue
    }
  },
  methods: {
    ...mapMutations({
      hideFlagDialog: 'flag/dialog/hideFlagDialog',
      setStream: 'stream/setStream',
      clearFlag: 'flag/clearFlag'
    }),
    onClickCategory (catg) {
      this.selectedCategory = catg
    },
    onClickSpamDetail (dtl) {
      this.selectedDetail = dtl
    },
    onClickRudeDetail (dtl) {
      this.selectedDetail = dtl
    },
    onCancelFlagButtonClick () {
      this.selectedCategory = ''
      this.hideFlagDialog()
    },
    async onFlagCompletionClick () {
      this.isFlagLoading = true
      try {
        if (this.flag.type === 'stream') {
          // stream flag
          const flagGraphqlResult = await API.graphql(graphqlOperation(CreateStreamFlag, {
            streamId: this.flag.streamId,
            commentId: null,
            userId: this.authenticatedUser.id,
            category: this.selectedCategory,
            detail: this.selectedDetail,
            note: this.additionalInfo || null,
            time: new Date().toISOString()
          }))

          let currentStream = JSON.parse(JSON.stringify(this.getStream)) // deep copy
          currentStream.flags.push(flagGraphqlResult.data.createFlag)
          this.setStream(currentStream)
        } else if (this.flag.type === 'comment') {
          // comment flag
          await API.graphql(graphqlOperation(CreateCommentFlag, {
            streamId: null,
            commentId: this.flag.commentId,
            userId: this.authenticatedUser.id,
            category: this.selectedCategory,
            detail: this.selectedDetail,
            note: this.additionalInfo || null,
            time: new Date().toISOString()
          }))
          // TODO: make it responsive as the stream
        }
      } catch (err) {
        logger.error('An error occurred while adding the flag', err)
      } finally {
        // this.setIsFlaggedByAuthenticatedUser(false)
        this.isFlagLoading = false
        this.clearFlag()
        this.hideFlagDialog()
      }
    }
  }
}
</script>
