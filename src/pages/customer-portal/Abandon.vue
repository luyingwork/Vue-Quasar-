<template>
  <q-page class="policy-cancel row">
    <div class="col-12 col-md-10 col-lg-8">
      <div class="font-family-lato margin-bottom-128">
        <p class="page-title-main">Abandoned</p>
        <div class="margin-top-30 row">
          <p class="page-title-sub">
            You have abandoned the cancellation of policy number <strong>{{ policyNumber }}</strong>
          </p>
        </div>
        <div class="margin-top-30 row">
          <p class="page-title-sub">
            Please note that once a policy has been cancelled this cannot be reverted.
            If you wish to reinstate your insurance, you will need to take up a ne
          </p>
        </div>
      </div>
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
export default {
  name: 'Abandon',
  data () {
    return {
      pageStatus: 'cancel',
      policyNumber: ''
    }
  },
  created () {
    this.policyNumber = this.$store.state.customerPortal.policyNumber
  },
  methods: {
  }
}
</script>
