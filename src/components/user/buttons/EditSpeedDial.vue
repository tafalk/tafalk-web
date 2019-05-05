<template>
  <v-speed-dial
    fixed
    dark
    v-model="fab"
    bottom
    right
    large
    color="cyan"
    direction="top"
    transition="slide-y-reverse-transition"
  >
    <v-btn
      slot="activator"
      v-model="fab"
      color="blue darken-2"
      dark
      large
      fab
    >
      <v-icon>account_circle</v-icon>
      <v-icon>close</v-icon>
    </v-btn>

    <v-btn
      fab
      dark
      color="green"
      @click.stop="onEditInfoFabClick"
    >
      <v-icon>edit</v-icon>
    </v-btn>

    <v-btn
      fab
      dark
      color="brown"
      @click.stop="onEditPrivacyFabClick"
    >
      <v-icon>lock</v-icon>
    </v-btn>

    <v-btn
      fab
      dark
      color="red"
      @click.stop="onDeleteAccountFabClick"
    >
      <v-icon>delete</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'EditSpeedDial',
  data () {
    return {
      fab: false
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
