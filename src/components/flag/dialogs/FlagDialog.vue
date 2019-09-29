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
      >{{ $t('flag.dialog.steps.type.stepName') }}</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <!-- Step 1 content -->
      <v-stepper-content step="1" >
        <v-subheader class="grey--text"
        >{{ $t('flag.dialog.steps.category.header') }}</v-subheader>
        <v-list two-line>
          <v-list-item
            :disabled="isSelectedCategorySpam"
          >
            <v-list-item-content @click="onClickCategory(spamCategoryValue)">
              <v-list-item-title>{{ $t('flag.dialog.steps.category.options.spam.header') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('flag.dialog.steps.category.options.spam.detail') }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action
              v-if="isSelectedCategorySpam"
            >
                <v-icon :color="selectedOptionIndicatorColor">mdi-check-circle</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            :disabled="isSelectedCategoryRude"
          >
            <v-list-item-content @click="onClickCategory(rudeCategoryValue)">
              <v-list-item-title>{{ $t('flag.dialog.steps.category.options.rude.header') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('flag.dialog.steps.category.options.rude.detail') }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action
              v-if="isSelectedCategoryRude"
            >
                <v-icon :color="selectedOptionIndicatorColor">mdi-check-circle</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            :disabled="isSelectedCategoryLowQuality"
          >
            <v-list-item-content @click="onClickCategory(lowQualityCategoryValue)">
              <v-list-item-title>{{ $t('flag.dialog.steps.category.options.lowQuality.header') }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('flag.dialog.steps.category.options.lowQuality.detail') }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action
              v-if="isSelectedCategoryLowQuality"
            >
                <v-icon :color="selectedOptionIndicatorColor">mdi-check-circle</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-btn
          color="primary"
          :disabled="!selectedCategory"
          @click="flagCurrentStep = 2"
        >{{ $t('flag.dialog.steps.category.buttons.continue') }}</v-btn>
        <v-btn
          text
          @click="onCancelFlagButtonClick"
        >{{ $t('flag.dialog.steps.category.buttons.cancel') }}</v-btn>
      </v-stepper-content>

      <!-- Step 2 content -->
      <v-stepper-content step="2" >
        <!-- Spam Details -->
        <template v-if="isSelectedCategorySpam">
          <v-subheader class="grey--text"
          >{{ $t('flag.dialog.steps.type.spam.header') }}</v-subheader>
          <v-list two-line>
            <v-list-item
              :disabled="isSelectedSpamDetailAd"
            >
              <v-list-item-content @click="onClickSpamDetail(spamAdDetailValue)">
                <v-list-item-subtitle>{{ $t('flag.dialog.steps.type.spam.options.ad.detail') }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action
                v-if="isSelectedSpamDetailAd"
              >
                <v-icon :color="selectedOptionIndicatorColor">mdi-check-circle</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item
              :disabled="isSelectedSpamDetailHarmfulLink"
            >
              <v-list-item-content @click="onClickSpamDetail(spamHarmfulLinkDetailValue)">
                <v-list-item-subtitle>{{ $t('flag.dialog.steps.type.spam.options.harmful.detail') }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action
                v-if="isSelectedSpamDetailHarmfulLink"
              >
                <v-icon :color="selectedOptionIndicatorColor">mdi-check-circle</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
        </template>
        <!-- Rude Content details -->
        <template v-else-if="isSelectedCategoryRude">
            <v-list-item
              :disabled="isSelectedRudeDetailHate"
            >
              <v-list-item-content @click="onClickRudeDetail(rudeHateDetailValue)">
                <v-list-item-subtitle>{{ $t('flag.dialog.steps.type.rude.options.hate.detail') }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action
                v-if="isSelectedRudeDetailHate"
              >
                <v-icon :color="selectedOptionIndicatorColor">mdi-check-circle</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item
              :disabled="isSelectedRudeDetailThreat"
            >
              <v-list-item-content @click="onClickRudeDetail(rudeThreatDetailValue)">
                <v-list-item-subtitle>{{ $t('flag.dialog.steps.type.rude.options.threat.detail') }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action
                v-if="isSelectedRudeDetailThreat"
              >
                <v-icon :color="selectedOptionIndicatorColor">mdi-check-circle</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item
              :disabled="isSelectedRudeDetailOffensive"
            >
              <v-list-item-content @click="onClickRudeDetail(rudeOffensiveDetailValue)">
                <v-list-item-subtitle>{{ $t('flag.dialog.steps.type.rude.options.offensive.detail') }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action
                v-if="isSelectedRudeDetailOffensive"
              >
                <v-icon :color="selectedOptionIndicatorColor">mdi-check-circle</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item
              :disabled="isSelectedRudeDetailPrivate"
            >
              <v-list-item-content @click="onClickRudeDetail(rudePrivateDetailValue)">
                <v-list-item-subtitle>{{ $t('flag.dialog.steps.type.rude.options.private.detail') }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action
                v-if="isSelectedRudeDetailPrivate"
              >
                <v-icon :color="selectedOptionIndicatorColor">mdi-check-circle</v-icon>
              </v-list-item-action>
            </v-list-item>
        </template>
        <!-- Low Quality Content details -->
        <template v-else>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t('flag.dialog.steps.type.lowQuality.options.default.detail') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-textarea
            v-model="additionalInfo"
            box
            rows="4"
            :label="$t('flag.dialog.steps.type.detail.label')"
        ></v-textarea>
        <v-btn
          color="primary"
          :loading="isFlagLoading"
          :disabled="!selectedType"
          @click="onFlagCompletionClick"
        >{{ $t('flag.dialog.steps.type.buttons.done') }}</v-btn>
        <v-btn
          text
          @click="flagCurrentStep = 1"
        >{{ $t('flag.dialog.steps.type.buttons.previous') }}</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</v-dialog>
</template>

<script>
import { API, graphqlOperation, Logger } from 'aws-amplify'
import { mapGetters, mapMutations } from 'vuex'
import { CreateFlag } from '@/graphql/Flag'

const logger = new Logger('FlagDialog')

export default {
  name: 'FlagDialog',
  props: ['contentType', 'contentId'],
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
      selectedType: '',
      isFlagLoading: false
    }
  },
  computed: {
    ...mapGetters({
      getIsFlagDialogVisible: 'flag/dialog/getIsFlagDialogVisible',
      getAuthenticatedUser: 'authenticatedUser/getUser'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
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
      return this.selectedType === this.spamAdDetailValue
    },
    isSelectedSpamDetailHarmfulLink () {
      return this.selectedType === this.spamHarmfulLinkDetailValue
    },
    isSelectedRudeDetailHate () {
      return this.selectedType === this.rudeHateDetailValue
    },
    isSelectedRudeDetailThreat () {
      return this.selectedType === this.rudeThreatDetailValue
    },
    isSelectedRudeDetailOffensive () {
      return this.selectedType === this.rudeOffensiveDetailValue
    },
    isSelectedRudeDetailPrivate () {
      return this.selectedType === this.rudePrivateDetailValue
    }
  },
  methods: {
    ...mapMutations({
      hideFlagDialog: 'flag/dialog/hideFlagDialog'
    }),
    onClickCategory (catg) {
      this.selectedCategory = catg
    },
    onClickSpamDetail (dtl) {
      this.selectedType = dtl
    },
    onClickRudeDetail (dtl) {
      this.selectedType = dtl
    },
    onCancelFlagButtonClick () {
      this.selectedCategory = ''
      this.hideFlagDialog()
    },
    async onFlagCompletionClick () {
      this.isFlagLoading = true
      try {
        await API.graphql(graphqlOperation(CreateFlag, {
          contentType: this.contentType,
          contentId: this.contentId,
          flaggerUserId: this.authenticatedUser.id,
          category: this.selectedCategory,
          type: this.selectedType,
          detail: this.additionalInfo || null,
          createTime: new Date().toISOString()
        }))
      } catch (err) {
        logger.error('An error occurred while adding the flag', err)
      } finally {
        // this.setIsFlaggedByAuthenticatedUser(false)
        this.isFlagLoading = false
        this.hideFlagDialog()
      }
    }
  }
}
</script>
