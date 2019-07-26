<template>
  <q-page class="policy-cancel row">
    <div class="col-12 col-md-10 col-lg-8">
      <CancelConfirmation v-if="confirmType=='cancel'"/>
      <ChangeConfirmation v-if="confirmType=='change'"/>
      <CancelChangeConfirmation v-if="confirmType=='cancelChange'"/>
      <div class="action-btn-box row justify-between">
        <q-btn
          class="btn-round-first bg-color-customer-primary"
          label="RETURN TO DASHBOARD"
          to="/dashboard"
        />
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import 'src/css/app.styl'
import 'src/css/customer-portal.styl'
import CancelConfirmation from 'src/components/CancelConfirmation'
import ChangeConfirmation from 'src/components/ChangeConfirmation'
export default {
  name: 'Confirm',
  components: {
    CancelConfirmation,
    ChangeConfirmation
  },
  data () {
    return {
      policyNumber: '',
      confirmType: 'cancel'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.setConfirmType(to.name))
  },
  created () {
    this.policyNumber = this.$store.state.customerPortal.policyNumber
  },
  methods: {
    setConfirmType (toName) {
      if (toName === 'ConfirmChange') {
        this.confirmType = 'change'
      } else if (toName === 'Confirm') {
        this.confirmType = 'cancel'
      } else if (toName === 'ConfirmCancelChange') {
        this.confirmType = 'cancelChange'
      }
    }
  }
}
</script>
