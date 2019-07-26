<template>
  <q-page class="documents">
    <div class="font-family-lato">
      <p class="page-title-main fs25">Documents</p>
      <div class="margin-top-30 row justify-between items-end">
        <p v-if="policyNumber.length > 0" class="page-title-sub col-12 col-md-10 col-lg-8">
          <span v-if="documents.length > 0">
            You are currently viewing all documents for policy <strong>{{ policyNumber }}</strong> or <q-btn @click="getAllCustomerDocumentsFromApi" style="padding-left:10px; padding-right:10px; font-size:18px;" class="btn-round-first btn-make-change" label="view all" />
          </span>
          <span v-else>
            You have not yet been issued any documents for policy <strong>{{ policyNumber }}</strong>
          </span>
        </p>
        <div v-else class="page-title-sub col-12 col-md-10 col-lg-8">
          <span v-if="documents.length > 0">
            You are currently viewing all documents
          </span>
          <span v-else>
            You have not yet been issued any documents
          </span>
        </div>
      </div>
    </div>
    <div class="page-content">
      <ul>
        <li v-for="(document, idx) in documents" :key="`${idx}`">
          <div>
            <div class="document-summary item-box-first row justify-end">
              <div class="item col-12 col-md-6 col-xl-3">
                <p class="item-box-text-first">Correspondence Date</p>
                <p class="item-box-text-third">{{ moment(document.correspondenceDate) }}</p>
              </div>
              <div class="item col-12 col-md-6 col-xl-3">
                <p class="item-box-text-first">Policy Number</p>
                <p class="item-box-text-third">{{ document.policyNumber }}</p>
              </div>
              <div class="item col-12 col-md-6 col-xl-3">
                <p class="item-box-text-first">Description</p>
                <p class="item-box-text-third">{{ document.name }}</p>
              </div>
              <div class="item col-12 col-md-6 col-xl-3 row items-center justify-end">
                <div class="row flex-center">
                </div>
                <div class="row flex-center">
                  <q-btn
                    class="btn-round-first btn-download img-icon-download-customer"
                    @click="downloadDocument(document.path)"
                  />
                </div>
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
  .bg-primary { border-radius: 8px; }
  .q-btn-inner { font-size: 18px; }
</style>

<script>
import { QSpinnerIos, Loading, QPagination } from 'quasar'
import Services from 'src/services/'
import moment from 'moment'
import 'src/css/app.styl'
import 'src/css/customer-portal.styl'
export default {
  name: 'Documents',
  data () {
    return {
      selectedIndex: -1,
      documents: [],
      pages: 0,
      size: 5,
      currentPage: 1,
      policyNumber: ''
    }
  },
  watch: {
    currentPage: function (val) {
      this.$store.commit('customerPortal/setPolicyNumber', this.policyNumber)
      this.getPolicyOrAllCustomerDocuments()
    }
  },
  components: { QPagination },
  created () {
    this.getPolicyOrAllCustomerDocuments()
  },
  methods: {
    moment (date) {
      let fullDate = moment(date).format('DD/MM/YYYY')
      let time = moment(date).format('h:mm a')
      return fullDate + ' at ' + time
    },
    async downloadDocument (path) {
      window.location = Services.downloadDocument(path)
    },
    async getPolicyOrAllCustomerDocuments () {
      let policyNumber = this.$store.state.customerPortal.policyNumber
      if (policyNumber != null && policyNumber.length > 0) {
        this.getAllCustomerPolicyDocuments(policyNumber)
      } else {
        this.getAllCustomerDocumentsFromApi()
      }
    },
    async getAllCustomerDocumentsFromApi () {
      Loading.show({
        spinner: QSpinnerIos,
        message: 'Getting documents. Please wait...'
      })
      this.policyNumber = ''
      this.$store.commit('customerPortal/setPolicyNumber', null)
      Services.getAllCustomerDocuments(this.currentPage, this.size).then(result => {
        if (result.data !== null && result.data !== undefined) {
          this.documents = result.data.documents
          this.pages = result.data.totalPages
        }
        Loading.hide()
      }, error => {
        console.debug(error)
        Loading.hide()
      })
    },
    async getAllCustomerPolicyDocuments (policyNumber) {
      this.$q.loading.show()
      Services.getAllCustomerPolicyDocuments(policyNumber, this.currentPage, this.size).then(result => {
        if (result.data !== null && result.data !== undefined) {
          this.documents = result.data.documents
          this.pages = result.data.totalPages
        }
        this.policyNumber = policyNumber
        this.$store.commit('customerPortal/setPolicyNumber', null)
        this.$q.loading.hide()
      }, error => {
        console.debug(error)
        this.$q.loading.hide()
      })
    }
  }
}
</script>
