<template>
  <v-speed-dial
    fixed
    dark
    v-model="fab"
    bottom
    right
    open-on-hover
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        :x-large="$vuetify.breakpoint.smAndUp"
        :large="$vuetify.breakpoint.xsOnly"
        :color="mainButtonColor"
        dark
        depressed
        fab
      >
        <v-icon v-if="!fab">mdi-account-circle</v-icon>
        <v-icon v-else>mdi-close</v-icon>
      </v-btn>
    </template>

    <v-btn
      fab
      :large="$vuetify.breakpoint.smAndUp"
      dark
      color="green"
      @click.stop="onEditInfoFabClick"
    >
      <v-icon>mdi-circle-edit-outline</v-icon>
    </v-btn>

    <v-btn
      fab
      :large="$vuetify.breakpoint.smAndUp"
      dark
      color="brown"
      @click.stop="onEditPrivacyFabClick"
    >
      <v-icon>mdi-shield-half-full</v-icon>
    </v-btn>

    <v-btn
      fab
      :large="$vuetify.breakpoint.smAndUp"
      dark
      color="red"
      @click.stop="onDeleteAccountFabClick"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'EditSpeedDial',
  data () {
    return {
      fab: false,
      mainButtonColor: 'cyan'
    }
  },
  methods: {
    ...mapMutations({
      setIsUserInfoEditDialogVisible: 'visitedUser/dialog/setIsUserInfoEditDialogVisible',
      setIsUserPrivacyEditDialogVisible: 'visitedUser/dialog/setIsUserPrivacyEditDialogVisible',
      setIsDeleteAccountConfirmationDialogVisible: 'visitedUser/dialog/setIsDeleteAccountConfirmationDialogVisible'
    }),
    onEditInfoFabClick () {
      this.setIsUserInfoEditDialogVisible(true)
    },
    onEditPrivacyFabClick () {
      this.setIsUserPrivacyEditDialogVisible(true)
    },
    onDeleteAccountFabClick () {
      this.setIsDeleteAccountConfirmationDialogVisible(true)
    }
  }
}
</script>
