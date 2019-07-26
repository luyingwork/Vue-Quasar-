<template>
  <div class="font-family-lato margin-bottom-128">
    <p class="page-title-main">Change Confirmation</p>
    <div class="margin-top-30 row">
      <p class="page-title-sub">
        You have now changed policy number
        <strong>{{ policyNumber }}</strong> on Yoga’s self-service portal.
      </p>
    </div>
    <div class="margin-top-30 row">
      <p class="page-title-sub">The documents will be issued to you shortly.</p>
    </div>
    <div class="margin-top-30 row" v-if="isRefund">
      <p class="page-title-sub">Your refund will be issued to you in the next 7 days.</p>
    </div>
    <div class="margin-top-30 row" v-if="isDirectDebit">
      <p class="page-title-sub">
        Your direct debit has been amended with the premium finance provider.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ChangeConfirmation',
  computed: {
    policyNumber () {
      return this.$store.state.customerPortal.policyNumber
    },
    isRefund () {
      return this.quoteDetails.calculatedTotalPayable < 0
    },
    isDirectDebit () {
      return this.quoteDetails.currentPaymentMethod === 'Direct Debit'
    },
    quoteDetails () {
      return this.$store.state.policyChange.mtaQuoteResultSummary.quoteDetails
    }
  }
}
</script>
