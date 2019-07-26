<template>
  <div class="font-family-lato margin-bottom-128">
    <p class="page-title-main">Confirmation</p>
    <div class="margin-top-30 row">
      <p class="page-title-sub">
        You have now cancelled policy number
        <strong>{{ policyNumber }}</strong> on Yoga’s self-service portal.
      </p>
    </div>
    <div class="margin-top-30 row">
      <p class="page-title-sub">The cancellation documents will be issued to you shortly.</p>
    </div>
    <div class="margin-top-30 row">
      <p class="page-title-sub">Your refund will be issued to you in the next 7 days.</p>
    </div>
    <div class="margin-top-30 row">
      <p class="page-title-sub">
        Your direct debit has been cancelled with the premium finance provider.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CancelConfirmation',
  computed: {
    policyNumber () {
      return this.$store.state.customerPortal.policyNumber
    }
  }
}
</script>
