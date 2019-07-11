<template>
  <v-dialog v-model="isFirstVisitIntroDialogVisible"
    persistent
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition">
    <v-card flat>
      <v-window
        height="auto"
        v-model="itemNum">
        <v-window-item v-for="item in windowItems" :key="item.id">
          <v-card flat color="transparent" height="auto">
            <v-img
              contain
              max-width="100"
              max-height="100vh"
              height="auto"
              :src="item.img"></v-img>
            <v-card-text>
              <span class="blue-grey--text">{{ item.body }}</span>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
      <v-card-actions class="justify-center">
        <v-item-group v-model="itemNum" class="text-xs-center" mandatory>
          <v-item v-for="item in windowItems" :key="item.id">
            <v-btn
              small
              class="blue-grey--text"
              slot-scope="{ active, toggle }"
              :input-value="active"
              icon
              @click="toggle"
            >
              <v-icon>mdi-record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
      </v-card-actions>
      <v-card-actions class="justify-center">
        <v-btn color="primary" class="mono" flat @click.native="onEndIntroClick">{{ $t('intro.closeButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TheFirstVisiIntroDialog',
  data () {
    return {
      isFirstVisitIntroDialogVisible: true,
      itemNum: 0,
      windowItems: [
        {
          id: 1,
          img: require('@/assets/intro_doodle_1.png'),
          title: this.$i18n.t('intro.item1.title'),
          body: this.$i18n.t('intro.item1.body')
        },
        {
          id: 2,
          img: require('@/assets/intro_doodle_2.png'),
          title: this.$i18n.t('intro.item2.title'),
          body: this.$i18n.t('intro.item2.body')
        },
        {
          id: 3,
          img: require('@/assets/intro_doodle_3.png'),
          title: this.$i18n.t('intro.item3.title'),
          body: this.$i18n.t('intro.item3.body')
        }
      ]
    }
  },
  computed: {
    itemCount () {
      return this.windowItems.length
    }
  },
  methods: {
    ...mapActions({
      setHasVisitedBefore: 'setHasVisitedBefore'
    }),
    next () {
      this.itemNum = this.itemNum + 1 === this.itemCount ? 0 : this.itemNum + 1
    },
    prev () {
      this.itemNum = this.itemNum - 1 < 0 ? this.itemCount - 1 : this.itemNum - 1
    },
    onEndIntroClick () {
      // TESTME: For testing welcome screen, remove following line as well as the existing localStorage object in browser
      this.setHasVisitedBefore('true')
      this.isFirstVisitIntroDialogVisible = false
    }
  }
}
</script>

<style scoped>
.mono {
  font-family: monospace;
}
</style>
