<template>
  <q-page class="policies">
    <div class="font-family-lato">
      <p class="page-title-main fs25 mt20">Manage Your Policies</p>
      <div class="margin-top-30 row justify-between items-end">
        <p class="page-title-sub col-12 col-md-7">
        </p>
      </div>
    </div>
    <div class="page-content">
      <ul>
        <li v-for="(policy, idx) in policies" :key="`${idx}`">
          <div v-if="idx===selectedIndex && showPolicyLink" class="selected">
            <div class="item-box-first row justify-between ibfpd0">
              <div class="item col-12 col-sm-6 col-md-4 col-lg-2">
                <p class="item-box-text-first">Policy Number</p>
                <p class="item-box-text-third">{{ policy.policyNumber }}</p>
              </div>
              <div class="item col-12 col-sm-6 col-md-4 col-lg-2">
                <p class="item-box-text-first">Effective Dates</p>
                <p class="item-box-text-third">{{ moment(policy.startDate) }} - {{ moment(policy.endDate) }}</p>
              </div>
              <div class="item col-12 col-sm-6 col-md-4 col-lg-2">
                <p class="item-box-text-first">Cover Type</p>
                <p class="item-box-text-third">{{ policy.coverType }}</p>
              </div>
              <div class="item col-12 col-sm-6 col-md-4 col-lg-2">
                <p class="item-box-text-first">Registration Number</p>
                <p class="item-box-text-third">{{ policy.registration }}</p>
              </div>
              <div class="item col-12 col-sm-6 col-md-4 col-lg-2">
                <p class="item-box-text-first">Policy Status</p>
                <p class="item-box-text-third">{{ policy.policyStatus }}</p>
              </div>
              <div class="item row justify-end items-center">
                <q-btn
                  class="btn-round-first btn-select-policy"
                  label="SELECT"
                  @click="getPolicyHistory(policy.policyId)"
                />
              </div>
            </div>
            <!-- <div class="action-box row justify-between items-center">
              <div class="row col-10 col-sm-10">
                <span class="col-12 col-lg-3 item-box-text-second white clickable" @click="getPolicyDocuments(policy.policyNumber)">Documents</span>
                <span class="col-12 col-lg-3 item-box-text-second white clickable" @click="getPolicyHistory(policy.policyId)">Policy History</span>
                <span v-if="policy.canAmendPolicy" class="col-12 col-lg-3 item-box-text-second white clickable" @click="policyChange(policy.policyNumber)">Make Change</span>
                <span v-if="policy.canCancelAmendment" class="col-12 col-lg-3 item-box-text-second white clickable" @click="cancelPolicyChange(policy)">Cancel Pending Change</span>
                <span v-if="policy.canCancelPolicy" class="col-12 col-lg-3 item-box-text-second white clickable" @click="getPolicyCancellation(policy.policyNumber, policy.registration, policy.startDate, policy.endDate)">Cancel Policy</span>
              </div>
              <div class="action-btn-wrapper-box">
                <q-btn
                  class="img-icon-prev"
                  @click="closeQuote()"
                />
              </div>
            </div> -->
          </div>
          <div v-else>
            <div class="item-box-first row justify-between items-center ibfpd0">
              <div class="item col-6 col-sm-6 col-md-4 col-xl-2">
                <p class="item-box-text-first">Policy Number</p>
                <p class="item-box-text-third">{{ policy.policyNumber }}</p>
              </div>
              <div class="item col-12 col-sm-6 col-md-4 col-xl-2 hide-item">
                <p class="item-box-text-first">Effective Dates</p>
                <p class="item-box-text-third">{{ moment(policy.startDate) }} - {{ moment(policy.endDate) }}</p>
              </div>
              <div class="item col-12 col-sm-6 col-md-4 col-xl-3 hide-item">
                <p class="item-box-text-first">Cover Type</p>
                <p class="item-box-text-third">{{ policy.coverType }}</p>
              </div>
              <div class="item col-12 col-sm-6 col-md-4 col-xl-2 hide-item">
                <p class="item-box-text-first">Registration Number</p>
                <p class="item-box-text-third">{{ policy.registration }}</p>
              </div>
              <div class="item col-12 col-sm-6 col-md-4 col-xl-2 hide-item">
                <p class="item-box-text-first">Policy Status</p>
                <p class="item-box-text-third">{{ policy.policyStatus }}</p>
              </div>
              <div class="item row justify-end items-center col-6 col-md-12 col-xl-1">
                <q-btn
                  class="btn-round-first btn-select-policy"
                  label="SELECT"
                  @click="getPolicyHistory(policy.policyId)"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <q-pagination v-if="pages > 1" v-model="currentPage" @change="val => { currentPage = val}" color="primary" :min="1" :max="pages" :max-pages="6" />
  </q-page>
</template>

<style>
  .clickable { cursor: pointer; }
</style>

<script>
import { QPagination } from 'quasar'
import moment from 'moment'
import Services from 'src/services/'
import 'src/css/app.styl'
import 'src/css/customer-portal.styl'
export default {
  name: 'Policies',
  data () {
    return {
      selectedIndex: -1,
      showPolicyLink: false,
      policies: [],
      pages: 0,
      size: 5,
      currentPage: 1
    }
  },
  watch: {
    currentPage: function (val) {
      this.selectedIndex = -1
      this.getAllCustomerPoliciesFromApi()
    }
  },
  components: { QPagination },
  created () {
    this.getAllCustomerPoliciesFromApi()
  },
  methods: {
    selectQuote (idx) {
      if (this.selectedIndex !== idx) this.showPolicyLink = true
      else this.showPolicyLink = !this.showPolicyLink
      this.selectedIndex = idx
    },
    closeQuote () {
      this.selectedIndex = -1
    },
    moment (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    getPolicyHistory (policyId) {
      for (var i = 0; i < this.policies.length; i++) {
        let policy = this.policies[i]
        if (policy.policyId === policyId) {
          this.$store.commit('customerPortal/setCurrentPolicy', policy)
        }
      }
      this.$router.push({name: 'Policy'})
    },
    getPolicyCancellation (policyNumber, vehicleRegistration, startDate, endDate) {
      this.$store.commit('customerPortal/setPolicyNumber', policyNumber)
      this.$store.commit('customerPortal/setVehicleRegistration', vehicleRegistration)
      this.$store.commit('customerPortal/setPolicyEffectiveDate', startDate)
      this.$store.commit('customerPortal/setPolicyEndDate', endDate)
      this.$router.push({name: 'Cancel'})
    },
    getPolicyDocuments (policyNumber) {
      this.$store.commit('customerPortal/setPolicyNumber', policyNumber)
      this.$router.push({name: 'Documents'})
    },
    async getAllCustomerPoliciesFromApi () {
      this.$q.loading.show({
        delay: 400 // ms
      })
      Services.getAllCustomerPolicies(this.currentPage, this.size).then(result => {
        this.policies = result.data.policies
        this.pages = result.data.totalPages
        if (this.$store.state.customerPortal.policyNumber !== null && this.$store.state.customerPortal.policyNumber !== '') {
          for (var index = 0; index < this.policies.length; index++) {
            if (this.policies[index].policyNumber === this.$store.state.customerPortal.policyNumber) {
              this.selectedIndex = index
              this.selectQuote(this.selectedIndex)
              this.$store.state.customerPortal.policyNumber = null
            }
          }
        }
        this.$q.loading.hide()
      }, error => {
        console.debug(error)
        this.$q.loading.hide()
      })
    },
    policyChange (policyNumber) {
      this.$store.dispatch('policyChange/makePolicyChange', policyNumber)
      this.$router.push({ name: 'ChangeStepFirst' })
    },
    cancelPolicyChange (policy) {
      if (policy.isRefundedPendingChange) {
        this.$store.dispatch('policyChange/cancelPendingChange', policy)
          .then(() => {
            this.$router.push({name: 'ChangeStepPayment'})
          })
      } else {
        Services.cancelPendingChangePayment({policyNumber: policy.policyNumber})
          .then((success) => {
            this.$store.dispatch('policyChange/setCompletedPolicyChangeCancelled', success.data.policyNumber)
            this.$router.push('ConfirmCancelChange')
          })
      }
    }
  }
}
</script>
