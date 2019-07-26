<template>
  <div class="font-family-lato margin-bottom-128">
    <p class="page-title-main">Change Confirmation</p>
    <div class="margin-top-30 row">
      <p class="page-title-sub">
        You have now cancelled your change for policy number
        <strong>{{ policyNumber }}</strong> on Yoga’s self-service portal.
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
