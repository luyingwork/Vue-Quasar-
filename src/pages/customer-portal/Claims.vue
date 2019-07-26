<template>
  <q-page class="claims">
    <div class="font-family-lato">
      <p class="page-title-main fs25">Your claims</p>
      <div class="margin-top-30 row justify-between items-center">
        <div v-if="claims.length < 1">
          <p class="page-title-sub col-12 col-md-8 col-lg-6">
            You have not yet made any claims
          </p>
        </div>
        <div>
          <q-btn
            class="btn-round-second margin-top-30 margin-right-20"
            label="BROKEN DOWN NOW?"
            @click="brokenDownModalOpened = true" />
          <q-btn
            class="btn-round-first margin-top-30"
            label="MAKE A CLAIM"
            @click="claimModalOpened = true" />
        </div>
      </div>
    </div>
    <div class="page-content">
      <ul>
        <div v-if="claims.length > 0">
        <li v-for="(claim, idx) in claims" :key="`${idx}`">
          <div class="item-box-first row">
            <div class="item col-12 col-sm-6 col-md-4 col-xl-3">
              <p class="item-box-text-first">Policy Number</p>
              <p class="item-box-text-third">{{claim.policyNumber}}</p>
            </div>
            <div class="item col-12 col-sm-6 col-md-4 col-xl-2">
              <p class="item-box-text-first">Claim Date</p>
              <p class="item-box-text-third">{{ moment(claim.claimDate) }}</p>
            </div>
            <div class="item col-12 col-sm-6 col-md-4 col-xl-2">
              <p class="item-box-text-first">Claim Status</p>
              <p class="item-box-text-third">{{claim.claimStatus}}</p>
            </div>
            <div class="item col-12 col-sm-6 col-md-4 col-xl-2">
              <p class="item-box-text-first">Driver</p>
              <p class="item-box-text-third">{{claim.driverName}}</p>
            </div>
            <div class="item col-12 col-sm-6 col-md-4 col-xl-2">
              <p class="item-box-text-first">Current Costs</p>
              <p class="item-box-text-third">£{{claim.currentCosts}}</p>
            </div>
            <div class="item col-12 col-sm-6 col-md-4 col-xl-1">
              <p class="item-box-text-first">Settled</p>
              <p class="item-box-text-third">{{claim.settled}}</p>
            </div>
          </div>
        </li>
        </div>
      </ul>
    </div>

    <q-modal v-model="claimModalOpened" minimized ref="modalRef">
      <div style="padding: 50px">
        <div class="q-display-1 q-mb-md"><strong>Make a claim</strong></div>
        <p>Please call <strong>0800 123 1234</strong> to discuss your claim further.</p>
        <q-btn class="btn-round-second margin-top-10" v-close-overlay label="Close" @click="claimModalOpened = false" />
      </div>
    </q-modal>

    <q-modal v-model="brokenDownModalOpened" minimized ref="modalRef">
      <div style="padding: 50px">
        <div class="q-display-1 q-mb-md"><strong>Broken down now?</strong></div>
        <p>Please call <strong>0800 123 1234</strong> to discuss your break down further.</p>
        <q-btn class="btn-round-second margin-top-10" v-close-overlay label="Close" @click="brokenDownModalOpened = false" />
      </div>
    </q-modal>

  </q-page>
</template>

<style>
</style>

<script>
import { QModal } from 'quasar'
import moment from 'moment'
import Services from 'src/services/'
import 'src/css/app.styl'
import 'src/css/customer-portal.styl'
export default {
  name: 'Quotes',
  data () {
    return {
      claimModalOpened: false,
      brokenDownModalOpened: false,
      claims: []
    }
  },
  created () {
    this.getAllCustomerClaimsFromApi()
  },
  components: { QModal },
  methods: {
    selectDocument (idx) {
      this.selectedIndex = idx
    },
    closeDocument () {
      this.selectedIndex = -1
    },
    moment (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    async getAllCustomerClaimsFromApi () {
      this.$q.loading.show()
      Services.getAllCustomerClaims().then(result => {
        this.claims = result.data.claims
        this.$q.loading.hide()
      }, error => {
        console.debug(error)
      })
    }
  }
}
</script>
