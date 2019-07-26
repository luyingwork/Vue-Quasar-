<template>
  <q-page class="policy-cancel row">
    <div class="col-12 col-md-10 col-lg-8">
      <div class="font-family-lato">
        <p class="page-title-main">Cancel Your Policy</p>
        <div class="margin-top-30 row">
          <p class="page-title-sub">
            You are processing a cancellation on policy number <strong>{{ policyNumber }}</strong>
            - vehicle registration <strong>{{ vehicleRegistration }}</strong>
          </p>
        </div>
        <div v-if="pageStep==='last'" class="margin-top-30 row">
          <p class="page-title-sub">
            Please note that once a policy has been cancelled this cannot be reverted.
            If you wish to reinstate your insurance, you will need to take up a new policy.
          </p>
        </div>
      </div>
      <div class="page-content">
        <div v-if="pageStep==='first'">
          <div class="date-box margin-top-22">
            <p class="text-font-main"><b>When</b> would you like your policy to end?</p>
              <div class="input-wrapper-box margin-top-main relative-position row items-center justify-between">
              <q-datetime
                type="date"
                hide-underline
                format="DD/MM/YYYY 23:59"
                placeholder="DD/MM/YYYY"
                class="col-12 data-hj-whitelist"
                v-model="cancellationDate"
              />
              <div class="row items-center icon-box">
                <img src="assets/img/icon-calendar.png"  />
              </div>
            </div>
          </div>
          <div class="reason-box">
            <p class="text-font-main margin-bottom-main"><b>What is your reason</b> for wanting to end your policy?</p>
            <div class="row items-center">
              <q-select
                inverted
                separator
                class="select-common col-9 col-md-10 data-hj-whitelist"
                :options="cancellationReasons"
                v-model="cancellationReasonId"
              />
            </div>
          </div>
        </div>
        <div v-if="pageStep==='last'">
          <div class="policy-info">
            <div>
              <div class="row justify-between">
                <div class="col-8 page-title-sub">Last Take Up Payment Method</div>
                <div class="col-4 page-title-sub font-weight-regular">{{ lastTakeUpMethod }}</div>
              </div>
              <div class="row">
                <div class="col-8 page-title-sub">Inception Date</div>
                <div class="col-4 page-title-sub font-weight-regular">{{ moment(inceptionDate) }}</div>
              </div>
              <div class="row">
                <div class="col-8 page-title-sub">Cancellation Date</div>
                <div class="col-4 page-title-sub font-weight-regular">{{ moment(cancellationDate) }}</div>
              </div>
              <div class="row">
                <div class="col-8 page-title-sub">Days of Cover</div>
                <div class="col-4 page-title-sub font-weight-regular">{{ daysOfCover }} days</div>
              </div>
              <div class="row">
                <div class="col-8 page-title-sub">Insurer</div>
                <div class="col-4 page-title-sub font-weight-regular">{{ insurer }}</div>
              </div>
            </div>
            <div class="margin-top-44">
              <div class="row">
                <div class="col-8 page-title-sub">Cancellation Refund Premium (Incl IPT)</div>
                <div class="col-4 page-title-sub font-weight-regular">{{ insurerReturnPremium }}</div>
              </div>
              <div class="row">
                <div class="col-8 page-title-sub">Fees</div>
                <div class="col-4 page-title-sub font-weight-regular">{{ totalFees }}</div>
              </div>
              <div class="row">
                <div class="col-8 page-title-sub">Additional Products</div>
                <div class="col-4 page-title-sub font-weight-regular">{{ totalVaps }}</div>
              </div>
              <div v-if="lastTakeUpMethod == 'Direct Debit'" class="row">
                <div class="col-8 page-title-sub">Outstanding Finance</div>
                <div class="col-4 page-title-sub font-weight-regular">{{ totalOutstandingFinance }}</div>
              </div>
            </div>
          </div>
          <div class="policy-note row">
            <p v-if="lastTakeUpMethod == 'Direct Debit'" class="page-title-sub color-standard">
              Please note if you have a direct debit payment due plus or minus 5 days the direct debit reclaim charge may change.
              In this scenario one of the YOGA team will get in touch.
            </p>
            <p v-if="hasClaimedDuringPolicyPeriod == true && isRefund" class="page-title-sub color-standard font-weight-regular margin-top-30">
              There is currently a pending or fault claim against this policy therefore no refund has been issued.
            </p>
          </div>
          <div class="policy-total-pay row">
            <p v-if="isRefund" class="col-6 page-title-sub">Total to be refund</p>
            <p v-else class="col-6 page-title-sub">Total to be paid</p>
            <p class="col-6 page-title-sub font-weight-regular">{{ totalCancellation }}</p>
          </div>
        </div>
      </div>
      <div class="action-btn-box">
        <div v-if="pageStep==='first'" class="row justify-between">
          <q-btn
            class="btn-round-first bg-color-customer-primary"
            label="BACK"
            to="/policies"
          />
          <q-btn
            class="btn-round-first"
            label="NEXT"
            @click="doNext()"
          />
        </div>
        <div v-if="pageStep==='last'" class="row justify-between">
          <q-btn
            class="btn-round-first bg-color-customer-primary"
            label="ABANDON"
            to="/abandon"
          />
          <q-btn
            class="btn-round-first"
            label="CONFIRM"
            @click="putPolicyCancellationConfirmFromApi()"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import 'src/css/app.styl'
import 'src/css/customer-portal.styl'
import moment from 'moment'
import Services from 'src/services/'
export default {
  name: 'Cancel',
  data () {
    return {
      policyNumber: '',
      vehicleRegistration: '',
      pageStatus: '',
      pageStep: 'first',
      lastTakeUpMethod: '',
      hasClaimedDuringPolicyPeriod: false,
      inceptionDate: '',
      daysOfCover: 0,
      insurer: '',
      canxBreakDownResponse: {},
      totalCancellation: '',
      isRefund: false,
      totalFees: '',
      totalVaps: '',
      totalOutstandingFinance: '',
      insurerReturnPremium: '',
      cancellationDate: null,
      cancellationReasonId: 0,
      cancellationReasons: []
    }
  },
  created () {
    this.policyNumber = this.$store.state.customerPortal.policyNumber
    this.vehicleRegistration = this.$store.state.customerPortal.vehicleRegistration
    this.getAllProductCancellationReasonsFromApi()
  },
  methods: {
    moment (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    async getAllProductCancellationReasonsFromApi () {
      Services.getAllProductCancellationReasons('ModernCar').then(result => {
        this.cancellationReasons = []
        for (var i = 0; i < result.data.cancellationReasons.length; i++) {
          let reason = result.data.cancellationReasons[i]
          this.cancellationReasons.push({ label: reason.name, value: reason.cancellationReasonId })
        }
      }, error => {
        console.debug(error)
      })
    },
    doNext () {
      if (this.cancellationReasonId === 0 || this.$data.cancellationDate.length < 1) {
        this.$q.notify('You need to enter a date and select a cancellation reason')
      } else {
        this.putPolicyCancellationRequestFromApi()
      }
    },
    async putPolicyCancellationConfirmFromApi () {
      this.$q.loading.show({
        delay: 400 // ms
      })
      let cancellation = {
        policyNumber: this.policyNumber,
        cancellationEffectiveDate: this.cancellationDate,
        cancellationReasonId: 7,
        directDebitReclaimAmount: this.totalOutstandingFinance,
        canxBreakDownResponse: this.canxBreakDownResponse,
        currentMileage: 0
      }
      Services.putPolicyCancellationConfirm(cancellation).then(result => {
        this.$q.loading.hide()
        this.$router.push({name: 'Confirm'})
      }, error => {
        console.debug(error)
        this.$q.loading.hide()
      })
    },
    async putPolicyCancellationRequestFromApi () {
      this.$q.loading.show({
        delay: 400 // ms
      })
      let cancellation = {
        policyNumber: this.policyNumber,
        cancellationEffectiveDate: this.cancellationDate,
        cancellationReasonId: 7,
        cancellationText: 'test',
        currentMileage: 0
      }
      Services.putPolicyCancellationRequest(cancellation).then(result => {
        if (result.error) {
          if (result.error.invalidcancellationdate) {
            this.$q.notify(result.error.invalidcancellationdate)
            this.$q.loading.hide()
            return
          }
        }
        this.lastTakeUpMethod = result.data.lastTakeUpMethod
        this.insurer = result.data.insurer
        this.inceptionDate = result.data.inceptionDate
        this.hasClaimedDuringPolicyPeriod = result.data.hasClaimedDuringPolicyPeriod
        this.isRefund = result.data.isRefund
        this.daysOfCover = result.data.daysOfCover
        this.totalFees = result.data.totalFees
        this.canxBreakDownResponse = result.data.canxBreakDownResponse
        this.totalVaps = result.data.totalVaps
        this.totalOutstandingFinance = result.data.outstandingFinance
        this.insurerReturnPremium = result.data.insurerReturnPremium
        this.totalCancellation = result.data.totalCancellation
        this.pageStep = 'last'
        this.$q.loading.hide()
      }, error => {
        console.debug(error)
        this.$q.loading.hide()
      })
    }
  }
}
</script>
