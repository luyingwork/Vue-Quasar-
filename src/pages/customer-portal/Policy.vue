<template>
  <q-page class="policies">
    <div class="font-family-lato">
      <p class="page-title-main fs25 mt20">Manage Your Policy</p>
      <div class="margin-top-30 row justify-between items-end">
        <p class="page-title-sub col-7">
        </p>
      </div>
    </div>
    <div class="page-content">
      <div class="policy-summary bg-color-main item-box-first row">
        <div class="item col-12 col-sm-6 col-xl-2">
          <p class="item-box-text-first">Policy Number</p>
          <p class="item-box-text-third">{{ policyNumber }}</p>
        </div>
        <div class="item col-12 col-sm-6 col-xl-3">
          <p class="item-box-text-first">Effective Dates</p>
          <p class="item-box-text-third">{{ getDate(startDate) }} - {{ getDate(endDate) }}</p>
        </div>
        <div class="item col-12 col-sm-6 col-xl-3">
          <p class="item-box-text-first">Cover Type</p>
          <p class="item-box-text-third">Comprehensive</p>
        </div>
        <div class="item col-12 col-sm-6 col-xl-2">
          <p class="item-box-text-first">Registration Number</p>
          <p class="item-box-text-third">{{ vehicleRegistration }}</p>
        </div>
        <div class="item col-12 col-sm-6 col-xl-2">
          <p class="item-box-text-first">Policy Status</p>
          <p class="item-box-text-third">{{ policyStatus }}</p>
        </div>
      </div>
      <div class="action-btn-box row justify-between">
        <div>
          <q-btn
            v-if="canAmendPolicy"
            class="btn-round-first margin-right-20 margin-top-main"
            label="MAKE POLICY CHANGE"
            @click="policyChange(policyNumber)"
          />
          <q-btn
            v-if="canCancelAmendment"
            class="btn-round-first margin-right-20 margin-top-main"
            label="CANCEL PENDING CHANGE"
            @click="cancelPolicyChange(policyNumber)"
          />
          <q-btn
            v-if="canCancelPolicy"
            class="btn-round-first bg-color-customer-primary margin-top-main"
            label="CANCEL POLICY"
            @click="getPolicyCancellation(policyNumber, vehicleRegistration, startDate, endDate)"
          />
        </div>
        <div>
          <q-btn
            class="btn-round-first bg-color-main margin-top-main"
            label="GO BACK"
            @click="goBack"
          />
        </div>
      </div>
      <div class="other row">
        <div class="history col-12 col-xl-6">
          <p class="page-title-other fs25">Policy History</p>
          <ul>
            <li class="item-box-first" v-for="(policy, idx) in policyHistories" :key="`${idx}`">
              <div class="row">
                <div class="item col-12 col-sm-6 col-xl-3">
                  <p class="item-box-text-first">Transaction Date</p>
                  <p class="item-box-text-third">{{ getDate(policy.transactionDate) }}</p>
                </div>
                <div class="item col-12 col-sm-6 col-xl-3">
                  <p class="item-box-text-first">Type</p>
                  <p class="item-box-text-third">{{ policy.type }}</p>
                </div>
                <div class="item col-12 col-sm-6 col-xl-3">
                  <p class="item-box-text-first">Amount</p>
                  <p class="item-box-text-third">{{ policy.amount }}</p>
                </div>
                <div class="item col-12 col-sm-6 col-xl-3">
                  <p class="item-box-text-first">Payment Type</p>
                  <p class="item-box-text-third">{{ policy.paymentType }}</p>
                </div>
              </div>
            </li>
            <li class="item-box-first">
              <q-pagination v-if="policyHistoryPages > 1" v-model="currentHistoryPage" @change="val => { currentHistoryPage = val}" color="primary" :min="1" :max="policyHistoryPages" :max-pages="6" />
            </li>
          </ul>
        </div>
        <div class="document col-12 col-xl-6">
          <p class="page-title-other fs25">Documents</p>
          <ul>
            <li class="item-box-first" v-for="(document, idx) in documents" :key="`${idx}`">
              <div class="row">
                <div class="item col-12 col-lg-5">
                  <p class="item-box-text-first">Correspondence Date</p>
                  <p class="item-box-text-third">{{ getCorrespondenceFullDate(document.correspondenceDate) }}</p>
                </div>
                <div class="item col-12 col-lg-5">
                  <p class="item-box-text-first">Description</p>
                  <p class="item-box-text-third">{{ document.name }}</p>
                </div>
                <div class="row justify-end col-12 col-lg-2">
                  <div class="row flex-center">
                    <q-btn
                      class="btn-round-first btn-download img-icon-download-customer"
                      @click="downloadDocument(document.path)"
                    />
                  </div>
                </div>
              </div>
            </li>
            <li class="item-box-first">
              <q-pagination v-if="docPages > 1" v-model="currentDocPage" @change="val => { currentDocPage = val}" color="primary" :min="1" :max="docPages" :max-pages="6" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { QPagination } from 'quasar'
import Services from 'src/services/'
import moment from 'moment'
import 'src/css/app.styl'
import 'src/css/customer-portal.styl'
export default {
  name: 'Policy',
  data () {
    return {
      docPages: 0,
      policyHistoryPages: 0,
      size: 3,
      currentDocPage: 1,
      currentHistoryPage: 1,
      policyNumber: '',
      vehicleRegistration: '',
      coverType: '',
      policyStatus: '',
      canCancelPolicy: false,
      startDate: '',
      endDate: '',
      documents: [],
      policyHistories: []
    }
  },
  watch: {
    currentDocPage: function (val) {
      this.getAllCustomerPolicyDocumentsFromApi()
    },
    policyHistoryPages: function (val) {
      this.getPolicyHistoryInformationFromApi()
    }
  },
  components: { QPagination },
  created () {
    this.policyNumber = this.$store.state.customerPortal.currentPolicy.policyNumber
    this.canCancelPolicy = this.$store.state.customerPortal.currentPolicy.canCancelPolicy
    this.canAmendPolicy = this.$store.state.customerPortal.currentPolicy.canAmendPolicy
    this.canCancelAmendment = this.$store.state.customerPortal.currentPolicy.canCancelAmendment
    this.vehicleRegistration = this.$store.state.customerPortal.currentPolicy.registration
    this.coverType = this.$store.state.customerPortal.currentPolicy.coverType
    this.policyStatus = this.$store.state.customerPortal.currentPolicy.policyStatus
    this.startDate = this.$store.state.customerPortal.currentPolicy.startDate
    this.endDate = this.$store.state.customerPortal.currentPolicy.endDate
    this.getAllCustomerPolicyDocumentsFromApi()
    this.getPolicyHistoryInformationFromApi()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    policyChange (policyNumber) {
      this.$store.dispatch('policyChange/makePolicyChange', policyNumber)
      this.$router.push({ name: 'ChangeStepFirst' })
    },
    async downloadDocument (path) {
      window.location = Services.downloadDocument(path)
    },
    getCorrespondenceFullDate (date) {
      let fullDate = moment(date).format('DD/MM/YYYY')
      let time = moment(date).format('LT').toLowerCase()
      return fullDate + ' at ' + time
    },
    getDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getPolicyCancellation (policyNumber, vehicleRegistration, startDate, endDate) {
      this.$store.commit('customerPortal/setPolicyNumber', policyNumber)
      this.$store.commit('customerPortal/setVehicleRegistration', vehicleRegistration)
      this.$store.commit('customerPortal/setPolicyEffectiveDate', startDate)
      this.$store.commit('customerPortal/setPolicyEndDate', endDate)
      this.$router.push({name: 'Cancel'})
    },
    async getAllCustomerPolicyDocumentsFromApi () {
      this.$q.loading.show()
      Services.getAllCustomerPolicyDocuments(this.policyNumber, this.currentDocPage, this.size).then(result => {
        this.documents = result.data.documents
        this.docPages = result.data.totalPages
        this.$q.loading.hide()
      }, error => {
        console.debug(error)
        this.$q.loading.hide()
      })
    },
    async getPolicyHistoryInformationFromApi () {
      this.$q.loading.show()
      Services.getPolicyHistoryInformation(this.policyNumber, this.currentHistoryPage, this.size).then(result => {
        this.policyHistories = result.data.policyHistories
        this.policyHistoryPages = result.data.totalPages
        this.$q.loading.hide()
      }, error => {
        console.debug(error)
        this.$q.loading.hide()
      })
    },
    cancelPolicyChange (policyNumber) {
      // Todo
    }
  }
}
</script>
