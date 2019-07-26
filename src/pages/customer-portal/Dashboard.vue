<template>
  <q-page class="dashboard">
    <div class="dashboard-message font-family-lato row">
      <p class="main-message col-11 col-md-8">Welcome back, {{user ? user.firstname : ''}}</p>
      <p class="sub-message white col-11 col-md-8">
      </p>
    </div>
    <div class="wavy-line"></div>
    <div class="dashboard-content row">
      <p class="sub-message hidden-message col-12">
      </p>
      <div class="col-12 col-xl-8 content-item first">
        <ul class="row">
          <li class="content-item-box first col-12 col-md-6">
            <div class="title-box-main row items-center">
              <p class="title-text-main">Policies</p>
            </div>
            <div class="content-box bg-color-customer-main relative-position">
              <q-card-main v-show="showPolicyData">
              <div v-if="policies != null && policies.length > 0" class="item-row-box"><p class="text-font-17">You have {{ totalActivePolicies }} active policies:</p></div>
                <q-transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                  <div v-if="policies != null && policies.length > 0">
                    <div class="item-row-box row justify-between items-center" v-for="(policy, idx) in policies" :key="`${idx}`">
                      <div class="col-2 row justify-start items-center">
                        <div class="img-icon-car-wrapper row flex-center"><img src="~assets/img/icon-car.png"/></div>
                      </div>
                      <div class="row col-10 justify-end">
                        <div class="row justify-between items-center policy-detail">
                          <p class="text-font-17">{{ policy.registration }}</p>
                          <q-btn
                            v-if="policy.canAmendPolicy"
                            class="btn-round-first btn-make-change"
                            label="make a change"
                            @click="policyChange(policy.policyNumber)"
                          />
                          <q-btn
                            v-if="policy.canAmendPolicy"
                            class="btn-round-first btn-make-change-mobile text-font-21"
                            label="Update"
                            @click="policyChange(policy.policyNumber)"
                          />
                          <q-btn
                            v-if="policy.canAmendPolicy"
                            class="btn-round-first btn-make-change-mobile text-font-21"
                            label="Cancel"
                            color="tertiary"
                          />
                          <q-btn
                            v-else
                            class="btn-round-first btn-make-change"
                            label="details"
                            @click="getPolicyHistoryDetail(policy.policyId)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="item-row-box">
                    <p class="text-font-17 claim-note">You have no active policies</p>
                  </div>
                </q-transition>
              <div v-if="policies != null && policies.length > 0">
                <div v-if="totalActivePolicies > 1" class="item-row-box"><a href="#/policies"><span class="mobile-hide-view">View</span> All policies</a></div>
                <div v-else class="item-row-box"><a v-if="totalActivePolicies == 1" style="cursor:pointer;" @click="getPolicyHistory()">View policy</a></div>
              </div>
              </q-card-main>
              <q-inner-loading :visible="!showPolicyData">
                <q-spinner-dots size="50px" color="primary"></q-spinner-dots>
              </q-inner-loading>
            </div>
          </li>
          <li class="content-item-box last col-12 col-md-6">
            <div class="title-box-main row items-center">
              <p class="title-text-main q-display-4">Renewals</p>
            </div>
            <div class="content-box bg-color-customer-main relative-position">
              <q-card-main v-show="showRenewalData">
              <q-transition v-show="renewalPolicy !== null" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
              <div class="item-row-box mobile-hide"><p class="text-font-17">Your next renewal date is:</p></div>
              <div class="item-row-box row justify-between items-center">
                <p v-if="nextRenewalDate.length > 0" class="text-font-17 renewal-date">{{ getFullRenewalDate(nextRenewalDate) }}</p>
                               <q-btn class="btn-round-first btn-make-change" label="DETAILS" @click="renawalClick" />
              </div>
              </q-transition>
              <div class="item-row-box"><a href="#/policies"><span class="mobile-hide-view">View</span> All renewals</a></div>
              </q-card-main>
               <q-inner-loading :visible="!showRenewalData">
                <q-spinner-dots size="50px" color="primary"></q-spinner-dots>
              </q-inner-loading>
            </div>
          </li>
          <li class="content-item-box first col-12 col-md-6">
            <div class="title-box-main row items-center">
              <p class="title-text-main q-display-4">Claims</p>
            </div>
            <div class="content-box bg-color-customer-main relative-position">
              <q-card-main v-show="showClaimData">
                <q-transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                  <div class="item-row-box">
                    <p v-if="claims != null && claims.length > 0" class="text-font-17 claim-note">You have made {{ claims.length }} claims
                      <q-btn class="btn-round-first btn-make-change" label="DETAILS" to="/claims" />
                    </p>
                    <p v-else class="text-font-17 claim-note">You have no current claims</p>
                    </div>
                  <div class="item-row-box row justify-between items-center btn-claims-box">
                    <q-btn v-if="showCallNumber" class="btn-round-second btn-broken-down" label="Call 0800 123 1234" />
                    <q-btn v-else class="btn-round-second btn-broken-down" label="BROKEN DOWN NOW?" @click="showCallNumber=!showCallNumber" />
                  </div>
                </q-transition>
                <div class="item-row-box"><a href="#/claims"><span class="mobile-hide-view">View</span> All claims</a></div>
              </q-card-main>
              <q-inner-loading :visible="!showClaimData">
                <q-spinner-dots size="50px" color="primary"></q-spinner-dots>
              </q-inner-loading>
            </div>
          </li>
          <li class="content-item-box last col-12 col-md-6">
            <div class="title-box-main row items-center">
              <p class="title-text-main q-display-4">Quotes</p>
            </div>
            <div class="content-box bg-color-customer-main relative-position">
              <q-card-main v-show="showQuoteData">
                <q-transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                  <div v-if="quotes.length > 0">
                    <div class="item-row-box row items-center" v-for="(quote, idx) in quotes" :key="`${idx}`">
                      <div class="col-2 row justify-start items-center">
                        <div class="img-icon-car-wrapper row flex-center"><img src="~assets/img/icon-car.png"/></div>
                      </div>
                      <div class="row col-10 justify-between items-center">
                        <p class="text-font-17">{{ quote.registrationNumber }}  (£{{ quote.premium }})</p>
                        <q-btn class="btn-round-second btn-buy" label="BUY" @click="quoteSelect(quote.quoteId)" to="/QuoteJourney/car-details" />
                      </div>
                    </div>
                  </div>
                  <div v-else class="item-row-box">
                    <p class="text-font-17 claim-note">You have no current quotes</p>
                  </div>
                  <div class="item-row-box btn-new-quote-box">
                    <q-btn label="Insure Another Vehicle" class="btn-round-first btn-broken-down" @click="newQuote" />
                  </div>
                </q-transition>
                <div class="item-row-box"><a href="#/quotes"><span class="mobile-hide-view">View</span> All quotes</a></div>
              </q-card-main>
              <q-inner-loading :visible="!showQuoteData">
                <q-spinner-dots size="50px" color="primary"></q-spinner-dots>
              </q-inner-loading>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-12 col-xl-4 content-item last document">
        <div class="title-box-main row items-center">
          <p class="title-text-main q-display-4">Documents</p>
        </div>
        <ul class="document-content bg-color-customer-main relative-position">
          <q-card-main v-show="showDocumentData">
            <q-transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
              <div v-if="documents.length > 0">
                <li v-for="(document, idx) in documents" :key="`${idx}`"
                    class="item-row-box row justify-between items-center">
                  <div class="col-9 row justify-between">
                    <div class="col-12 row">
                      <div class="col-5">
                        <p class="item-box-text-first">Policy Number</p>
                        <p class="item-box-text-second mobile-font-size-13" v-if="document.policyNumber.length > 0">{{ document.policyNumber }}</p>
                      </div>
                      <div class="col-7">
                        <p class="item-box-text-first">Description</p>
                        <p class="item-box-text-second mobile-font-size-13">{{ document.name }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-3 row flex-center">
                    <q-btn
                      class="btn-round-first btn-download img-icon-download-customer"
                      @click="downloadDocument(document.path)"
                    />
                     <!-- <q-btn style="margin-left:5px;" class="btn-round-second btn-download img-icon-general-help">
                      <q-tooltip anchor="center right" self="center left" :offset="[5, 10]">
                        <strong>Created</strong> on {{ getDate(document.correspondenceDate) }}
                      </q-tooltip>
                    </q-btn> -->
                  </div>
                </li>
              </div>
          <div v-else class="item-row-box">
            <p class="text-font-17">You have not yet been issued any documents. If you have just taken up a policy, then please try again later.</p>
          </div>
          </q-transition>
          <li class="item-row-box all-documents-box">
            <a href="#/documents"><span class="mobile-hide-view">View</span> All documents</a>
          </li>
          </q-card-main>
          <q-inner-loading :visible="!showDocumentData">
            <q-spinner-dots size="51px" color="primary"></q-spinner-dots>
          </q-inner-loading>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<style>
  .content-box, .document-content { min-height: 200px; }
</style>

<script>
import { QInnerLoading, QSpinnerDots, QTooltip, QCardMain } from 'quasar'
import moment from 'moment'
import Services from 'src/services/'
import 'src/css/app.styl'
import 'src/css/customer-portal.styl'
export default {
  name: 'Dashboard',
  data () {
    return {
      anchorOrigin: {vertical: 'bottom', horizontal: 'middle'},
      selfOrigin: {vertical: 'top', horizontal: 'middle'},
      showCallNumber: false,
      showPolicyData: false,
      showDocumentData: false,
      showRenewalData: false,
      showClaimData: false,
      showQuoteData: false,
      totalActivePolicies: 0,
      policies: [],
      quotes: [],
      documents: [],
      claims: [],
      nextRenewalDate: '',
      renewalPolicy: null,
      pdfPath: '',
      permissions: {},
      pdfFileName: ''
    }
  },
  components: { QInnerLoading, QSpinnerDots, QTooltip, QCardMain },
  created () {
    this.getAllCustomerActivePoliciesFromApi()
    this.getCustomerCompletedQuotesFromApi()
    this.getRecentCustomerDocumentsFromApi()
    this.getUpcomingCustomerRenewalFromApi()
    this.getAllCustomerClaimsFromApi()
  },
  computed: {
    user: {
      get () { return this.$store.state.customerPortal.user },
      set (val) { this.$store.commit('customerPortal/setUser', val) }
    }
  },
  methods: {
    newQuote () {
      this.$store.commit('quoteJourney/clear', null)
      this.$router.push('QuoteJourney/question-set')
    },
    policySelect (id) {
      if (this.policies.length > 1) {
        this.$store.commit('customerPortal/setPolicyNumber', id)
        this.$router.push({name: 'Policy'})
      } else {
        this.$store.commit('customerPortal/setPolicyNumber', id)
        this.$router.push({name: 'Policy'})
      }
    },
    getPolicyHistoryDetail (policyId) {
      for (var i = 0; i < this.policies.length; i++) {
        let policy = this.policies[i]
        if (policy.policyId === policyId) {
          this.$store.commit('customerPortal/setCurrentPolicy', policy)
        }
      }
      this.$router.push({name: 'Policy'})
    },
    quoteSelect (id) {
      this.$store.commit('quoteJourney/setQuoteId', id)
      this.$router.push({name: 'CarDetails'})
    },
    renawalClick () {
      this.$store.commit('customerPortal/setPolicyNumber', this.$data.renewalPolicy)
      this.$router.push({name: 'Policies'})
    },
    getDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getFullRenewalDate (date) {
      let dayOfMonth = moment(date).format('Do')
      let month = moment(date).format('MMMM')
      let year = moment(date).format('YYYY')
      return dayOfMonth + ' ' + month + ' ' + year
    },
    checkPermissionCallback (status) {
      let permissions = this.permissions
      let pdfPath = this.pdfPath
      console.log('pdfpath')
      console.log(pdfPath)
      console.log('checking permissions')
      console.log(status)
      let self = this
      if (!status.hasPermission) {
        var errorCallback = function () {
          console.warn('Storage permission is not turned on')
        }
        permissions.requestPermission(
          permissions.WRITE_EXTERNAL_STORAGE,
          function (status) {
            if (!status.hasPermission) {
              errorCallback()
            } else {
              // proceed with downloading
              console.log('111')
              console.log(pdfPath)
              self.downloadFile(pdfPath)
            }
          },
          errorCallback)
      } else {
        console.log('222')
        self.downloadFile(pdfPath)
      }
    },
    downloadFile (pdfPath) {
      let filePath = ''
      let deviceMod = window.device.platform
      let filename = this.pdfFileName
      console.log(deviceMod)
      if (deviceMod === 'Android') {
        console.log('android')
        filePath = cordova.file.externalRootDirectory + 'download/' + filename + '.pdf'
      } else if (deviceMod === 'iOS') {
        filePath = cordova.file.documentsDirectory + 'Download'
      }
      console.log('111')
      console.log(pdfPath)
      let fileTransfer = new window.FileTransfer()
      let uri = encodeURI(decodeURIComponent(pdfPath))
      // Downloading the file
      fileTransfer.download(uri, filePath,
        function (entry) {
          console.log('Successfully downloaded file, full path is ' + entry.fullPath)
          console.log(entry)
        },
        function (error) {
          console.log('error')
          console.log(error)
        },
        false,
        {}
      )
    },
    async downloadDocument (path) {
      if (cordova.file) {
        this.pdfPath = Services.downloadDocument(path)
        this.pdfFileName = path
        this.permissions = cordova.plugins.permissions
        console.log('333')
        console.log(this.permissions)
        this.permissions.checkPermission(this.permissions.WRITE_EXTERNAL_STORAGE, this.checkPermissionCallback, null)
      } else {
        window.location = Services.downloadDocument(path)
      }
    },
    async getAllCustomerActivePoliciesFromApi () {
      Services.getAllCustomerActivePolicies(5).then(result => {
        this.policies = result.data.policies
        this.totalActivePolicies = result.data.totalPolicies
        this.showPolicyData = true
      }, error => {
        console.debug(error)
        this.showPolicyData = false
      })
    },
    async getPolicyHistory () {
      this.$store.commit('customerPortal/setCurrentPolicy', this.policies[0])
      this.$router.push({name: 'Policy'})
    },
    async getCustomerCompletedQuotesFromApi () {
      Services.getCustomerCompletedQuotes(1).then(result => {
        this.quotes = result.data
        this.showQuoteData = true
      }, error => {
        console.debug(error)
        this.showQuoteData = false
      })
    },
    async getRecentCustomerDocumentsFromApi () {
      Services.getRecentCustomerDocuments(5).then(result => {
        console.debug('documents_data', result.data)
        this.documents = result.data.slice(0, 3)
        if (this.documents == null) {
          this.documents = []
        }
        this.showDocumentData = true
      }, error => {
        this.documents = []
        this.showDocumentData = true
        console.debug(error)
        this.showPolicyData = false
      })
    },
    async getUpcomingCustomerRenewalFromApi () {
      Services.getCustomerUpcomingRenewals(1).then(result => {
        this.showRenewalData = true
        if (result.data.policies.length !== 0) {
          this.renewalPolicy = result.data.policies[0].policyNumber
          this.nextRenewalDate = result.data.policies[0].renewalDate
        }
      }, error => {
        console.debug(error)
        this.showRenewalData = false
      })
    },
    async getAllCustomerClaimsFromApi () {
      Services.getAllCustomerClaims().then(result => {
        this.claims = result.data.claims
        this.showClaimData = true
      }, error => {
        console.debug(error)
        this.showClaimData = false
      })
    },
    policyChange (policyNumber) {
      this.$store.commit('customerPortal/setPolicyNumber', policyNumber)
      this.$router.push({ name: 'ChangeStepFirst' })
    }
  }
}
</script>
